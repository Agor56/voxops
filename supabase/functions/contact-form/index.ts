import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute per IP

// Cleanup old entries every 5 minutes to prevent memory bloat
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

function checkRateLimit(clientIP: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);

  if (!record || now > record.resetTime) {
    // New window or expired record
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

// Zod schema for server-side validation
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long").trim(),
  email: z.string().email("Invalid email").max(255).optional().or(z.literal('')),
  phone: z.string().regex(/^0[5-9]\d{7,8}$/, "Invalid Israeli phone number"),
  website: z.string().url("Invalid URL").max(500).optional().or(z.literal('')),
  type: z.enum(['voice_callback', 'demo']).optional(),
  agent: z.enum(['marcus', 'david']).optional(),
  businessType: z.string().max(200).optional(),
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
      || req.headers.get('cf-connecting-ip') 
      || req.headers.get('x-real-ip') 
      || 'unknown';

    // Check rate limit
    const { allowed, remaining } = checkRateLimit(clientIP);
    
    if (!allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': '60'
          } 
        }
      );
    }

    // Check payload size (max 10KB)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10240) {
      console.warn(`Payload too large from IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Payload too large' }),
        { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const webhookUrl = Deno.env.get('CONTACT_FORM_WEBHOOK_URL');
    
    if (!webhookUrl) {
      console.error('CONTACT_FORM_WEBHOOK_URL is not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate request body
    let rawData: unknown;
    try {
      rawData = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate with zod schema
    const validationResult = contactFormSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      console.warn(`Validation failed from IP ${clientIP}:`, validationResult.error.flatten());
      return new Response(
        JSON.stringify({ error: 'Invalid form data', details: validationResult.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const formData = validationResult.data;
    
    // Convert Israeli phone to international format (05xxxxxxxx -> 9725xxxxxxxx)
    let internationalPhone = formData.phone;
    if (formData.phone.startsWith('05')) {
      internationalPhone = '972' + formData.phone.slice(1);
    } else if (formData.phone.startsWith('0')) {
      internationalPhone = '972' + formData.phone.slice(1);
    }
    
    console.log('Contact form submission received:', {
      source: formData.type === 'voice_callback' ? 'Agent Call' : 'Demo Call',
      hasEmail: !!formData.email,
      hasWebsite: !!formData.website,
      rateLimitRemaining: remaining
    });

    // Determine source based on form type
    const source = formData.type === 'voice_callback' ? 'Agent Call' : 'Demo Call';

    // Build webhook payload - only include email if provided
    const webhookPayload: Record<string, unknown> = {
      name: formData.name,
      phone: internationalPhone,
      timestamp: new Date().toISOString(),
      source: source,
    };
    
    if (formData.email && formData.email.trim()) {
      webhookPayload.email = formData.email;
    }
    
    if (formData.website && formData.website.trim()) {
      webhookPayload.website = formData.website;
    }
    
    if (formData.agent) {
      webhookPayload.agent = formData.agent;
    }
    
    if (formData.businessType && formData.businessType.trim()) {
      webhookPayload.businessType = formData.businessType;
    }

    // Forward to webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    console.log('Webhook response status:', webhookResponse.status);

    if (!webhookResponse.ok) {
      console.error('Webhook error - status:', webhookResponse.status);
      return new Response(
        JSON.stringify({ error: 'Failed to process submission' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing contact form:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
