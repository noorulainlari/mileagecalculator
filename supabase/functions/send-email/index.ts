import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, html, type } = await req.json()

    // For now, we'll simulate email sending and log the email
    console.log('Email would be sent:', { to, subject, type })

    // In a real implementation, you would integrate with:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    // etc.

    // Simulate successful email sending
    const emailLog = {
      recipient: to,
      subject: subject,
      type: type,
      sent_at: new Date().toISOString(),
      status: 'sent'
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully', log: emailLog }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})