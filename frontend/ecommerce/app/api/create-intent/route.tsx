import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
})

export async function POST(request) {
  try {
    const { amount } = await request.json()

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { error: 'Invalid payment amount.' },
        { status: 400 },
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: 'usd',
      payment_method_types: ['card'],
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Stripe Error:', error)

    return NextResponse.json(
      {
        error: 'Unable to create PaymentIntent.',
      },
      {
        status: 500,
      },
    )
  }
}
