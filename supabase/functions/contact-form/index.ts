import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactFormData {
  name: string;
  email?: string;
  website?: string;
  phone: string;
  type?: string;
  agent?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookUrl = Deno.env.get('CONTACT_FORM_WEBHOOK_URL');
    
    if (!webhookUrl) {
      console.error('CONTACT_FORM_WEBHOOK_URL is not configured');
      return new Response(
        JSON.stringify({ error: 'Webhook not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const formData: ContactFormData = await req.json();
    
    // Convert Israeli phone to international format (05xxxxxxxx -> 9725xxxxxxxx)
    let internationalPhone = formData.phone;
    if (formData.phone.startsWith('05')) {
      internationalPhone = '972' + formData.phone.slice(1);
    } else if (formData.phone.startsWith('0')) {
      internationalPhone = '972' + formData.phone.slice(1);
    }
    
    console.log('Received contact form submission:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      internationalPhone: internationalPhone,
      website: formData.website || 'Not provided',
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
      const errorText = await webhookResponse.text();
      console.error('Webhook error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to send to webhook' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});