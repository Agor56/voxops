import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// In-memory rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) rateLimitStore.delete(key);
  }
}, 5 * 60 * 1000);

function checkRateLimit(clientIP: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);
  if (!record || now > record.resetTime) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }
  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count };
}

// Schemas
const pinSchema = z.object({
  action: z.literal('validate_pin'),
  pin: z.string().length(4).regex(/^\d{4}$/, "PIN must be 4 digits"),
});

const demoSchema = z.object({
  action: z.literal('submit_demo'),
  full_name: z.string().min(1).max(100).trim(),
  phone_number: z.string().regex(/^0[5-9]\d{7,8}$/, "Invalid Israeli phone number"),
  business_type: z.string().min(1).max(200).trim(),
  pain_point: z.string().max(500).optional().or(z.literal('')),
  timeline: z.string().max(100).trim(),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('cf-connecting-ip')
      || req.headers.get('x-real-ip')
      || 'unknown';

    const { allowed, remaining } = checkRateLimit(clientIP);
    if (!allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '60' } }
      );
    }

    let rawData: unknown;
    try {
      rawData = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = rawData as Record<string, unknown>;
    const action = body?.action;

    // ── PIN Validation ──
    if (action === 'validate_pin') {
      const result = pinSchema.safeParse(body);
      if (!result.success) {
        return new Response(
          JSON.stringify({ error: 'Invalid PIN format' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const correctPin = Deno.env.get('DEMO_PIN');
      if (!correctPin) {
        console.error('DEMO_PIN is not configured');
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable' }),
          { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const valid = result.data.pin === correctPin;
      console.log(`PIN validation attempt from ${clientIP}: ${valid ? 'success' : 'failed'}`);

      return new Response(
        JSON.stringify({ valid }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ── Demo Submission ──
    if (action === 'submit_demo') {
      const result = demoSchema.safeParse(body);
      if (!result.success) {
        console.warn(`Demo validation failed from IP ${clientIP}:`, result.error.flatten());
        return new Response(
          JSON.stringify({ error: 'Invalid form data', details: result.error.flatten().fieldErrors }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const data = result.data;

      // Convert Israeli phone to international format
      let internationalPhone = data.phone_number;
      if (data.phone_number.startsWith('0')) {
        internationalPhone = '972' + data.phone_number.slice(1);
      }

      const webhookUrl = 'https://n8n.srv1100597.hstgr.cloud/webhook/voxops-11labs-agent';

      const webhookPayload = {
        full_name: data.full_name,
        phone_number: internationalPhone,
        business_type: data.business_type,
        pain_point: data.pain_point || '',
        timeline: data.timeline,
        demo_mode: true,
        submitted_at: new Date().toISOString(),
      };

      console.log('Demo submission received:', {
        business_type: data.business_type,
        timeline: data.timeline,
        rateLimitRemaining: remaining,
      });

      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        JSON.stringify({ success: true, message: 'Demo submitted successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing demo request:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
