'use client'

import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, ShoppingCart } from 'lucide-react'
import CartApis from '../_utils/CartApis'
import { CartContext } from '../_context/CartContext'

export default function CartPage() {
  const router = useRouter()
  const { cart = [], setCart } = useContext(CartContext)

  const subtotal = cart.reduce((total, item) => {
    return total + Number(item.product?.price ?? 0)
  }, 0)

  const tax = subtotal * 0.14

  const getTotalAmount = () => {
    return Number((subtotal + tax).toFixed(2))
  }

  const handleRemove = async (id) => {
    try {
      await CartApis.deleteCartItem(id)

      setCart((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error('Error removing item:', err)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-6">
        <ShoppingCart size={80} className="text-gray-300" />

        <h1 className="mt-6 text-3xl font-bold">Your cart is empty</h1>

        <p className="mt-3 text-gray-500">
          Looks like you haven't added any courses yet.
        </p>

        <Link
          href="/"
          className="mt-8 rounded-lg bg-primary px-8 py-3 text-white transition hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Products */}
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-lg">
                <Image
                  src={item.product?.banner?.url || '/placeholder.png'}
                  alt={item.product?.title || 'Product'}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.product?.title}</h2>

                <p className="mt-2 text-sm text-gray-500">
                  {item.product?.category}
                </p>

                <p className="mt-4 text-2xl font-bold text-primary">
                  ${Number(item.product?.price ?? 0).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="rounded-full p-3 text-red-500 transition hover:bg-red-100"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (14%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${getTotalAmount().toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const totalAmount = getTotalAmount()

              console.log('Total =', totalAmount)

              router.push(`/checkout?amount=${totalAmount}`)
            }}
            className="mt-8 w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:opacity-90"
          >
            Proceed to Checkout
          </button>
          <Link
            href="/"
            className="mt-3 block text-center text-primary transition hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  )
}
