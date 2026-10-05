'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './_components/CheckoutForm'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout() {
  const searchParams = useSearchParams()

  const amount = Number(searchParams.get('amount') || 0)

  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (amount <= 0) return

    const createPaymentIntent = async () => {
      try {
        const res = await fetch('/api/create-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
          }),
        })

        const data = await res.json()

        setClientSecret(data.clientSecret)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    createPaymentIntent()
  }, [amount])

  if (amount <= 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">
          Invalid payment amount.
        </h2>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">Preparing your payment...</h2>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl font-semibold text-red-500">
          Failed to initialize payment.
        </h2>
      </div>
    )
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-2 text-center text-4xl font-bold">Checkout</h1>

        <p className="mb-8 text-center text-gray-500">
          Total Amount:{' '}
          <span className="font-semibold text-primary">
            ${amount.toFixed(2)}
          </span>
        </p>

        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm amount={amount} />
        </Elements>
      </div>
    </div>
  )
}
