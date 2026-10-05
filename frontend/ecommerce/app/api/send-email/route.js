import { Resend } from 'resend'
import EmailTemplate from '@/app/_components/email-template'
import { render } from '@react-email/render'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { email, firstName } = await request.json()

    console.log(email, firstName)

    const html = await render(<EmailTemplate firstName={firstName} />)

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Payment Successful',
      html,
    })

    if (error) {
      console.error('RESEND ERROR:', error)
      return Response.json({ error }, { status: 500 })
    }

    console.log('SUCCESS:', data)

    return Response.json(data)
  } catch (err) {
    console.error('CATCH ERROR:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
