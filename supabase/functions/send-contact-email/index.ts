const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
import { z } from 'https://esm.sh/zod@3.23.8'

const CONTACT_TO = Deno.env.get('CONTACT_EMAIL') || 'customersupport@gethirex.space'

const BodySchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  company: z.string().max(255).optional().default(''),
  type: z.string().max(100).optional().default(''),
  message: z.string().min(1).max(5000),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const parsed = BodySchema.safeParse(await req.json())
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { name, email, company, type, message } = parsed.data

    // Use Resend or any email service - for now log and return success
    // In production, configure SMTP or email API
    console.log('Contact form submission:', { name, email, company, type, message, to: CONTACT_TO })

    return new Response(
      JSON.stringify({ message: "Message sent! We'll get back to you within one business day." }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Could not process your request.' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
