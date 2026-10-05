'use client'

import { useContext, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { CartContext } from '@/app/_context/CartContext'
import { useUser } from '@clerk/nextjs'
import CartApis from '@/app/_utils/CartApis'
import OrderApis from '@/app/_utils/OrderApis'

export default function PaymentSuccess() {
  const { cart, setCart } = useContext(CartContext)
  const { user } = useUser()

  useEffect(() => {
    if (!user || cart.length === 0) return

    const finishOrder = async () => {
      try {
        const productIds = cart.map((item) => item.product.id)

        await OrderApis.createOrder({
          data: {
            email: user.primaryEmailAddress.emailAddress,
            username: user.fullName,
            amount: cart.reduce(
              (sum, item) => sum + Number(item.product.price),
              0,
            ),
            products: productIds,
          },
        })

        // Send Email
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress.emailAddress,
            firstName: user.firstName,
          }),
        })

        const result = await response.json()

        console.log('Email API Response:', result)

        await Promise.all(cart.map((item) => CartApis.deleteCartItem(item.id)))

        setCart([])
      } catch (err) {
        console.error('Finish Order Error:', err)
      }
    }

    finishOrder()
  }, [user, cart])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="rounded-xl bg-white p-10 text-center shadow-xl">
        <CheckCircle2 className="mx-auto text-green-500" size={80} />

        <h1 className="mt-5 text-3xl font-bold">Payment Successful</h1>

        <p className="mt-3 text-gray-500">Thank you for your purchase.</p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 text-white"
        >
          Back Home
        </Link>
      </div>
    </div>
  )
}
