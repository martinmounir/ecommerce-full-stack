'use client'

import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

export default function CheckoutForm({ amount }) {
  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setLoading(true)
    setErrorMessage('')

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-16 max-w-xl rounded-xl border bg-white p-8 shadow-lg"
    >
      <PaymentElement />

      {errorMessage && (
        <div className="mt-4 rounded-lg bg-red-100 p-3 text-red-600">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="mt-6 w-full rounded-lg bg-primary py-3 font-semibold text-white"
      >
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  )
}
