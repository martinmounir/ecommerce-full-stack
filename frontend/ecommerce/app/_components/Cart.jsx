'use client'

import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartApis from '../_utils/CartApis'
import { Trash2 } from 'lucide-react'
import { CartContext } from '../_context/CartContext'
import { useRouter } from 'next/navigation'

function Cart({ setOpenCart }) {
  const { cart = [], setCart } = useContext(CartContext)
  const router = useRouter()

  const total = cart.reduce((total, item) => {
    return total + Number(item.product?.price ?? 0)
  }, 0)

  const handleRemove = async (id) => {
    try {
      await CartApis.deleteCartItem(id)

      setCart((prevCart) => prevCart.filter((item) => item.id !== id))
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  return (
    <div className="absolute right-0 top-14 z-50 w-96 overflow-hidden rounded-xl border bg-white shadow-xl">
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-bold">
          Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
        </h2>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b p-4 transition hover:bg-gray-50"
            >
              {/* Product Image */}
              <div className="relative h-20 w-20 overflow-hidden rounded-lg border">
                <Image
                  src={item.product?.banner?.url || '/placeholder.png'}
                  alt={item.product?.title || 'Product'}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="line-clamp-2 font-semibold">
                  {item.product?.title}
                </h3>

                <p className="mt-1 text-lg font-bold text-primary">
                  ${Number(item.product?.price ?? 0).toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.id)}
                className="rounded-full p-2 text-red-500 transition-all duration-200 hover:scale-110 hover:bg-red-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <>
          <div className="flex items-center justify-between border-t p-4">
            <span className="font-semibold">Subtotal</span>

            <span className="text-lg font-bold text-primary">
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="space-y-3 p-4">
            <Link
              href="/cart"
              onClick={() => setOpenCart(false)}
              className="block rounded-lg border border-primary py-2 text-center font-medium text-primary transition hover:bg-primary hover:text-white"
            >
              View Cart
            </Link>

            <button
              onClick={() => {
                setOpenCart(false)
                router.push(`/checkout?amount=${total.toFixed(2)}`)
              }}
              className="block w-full rounded-lg bg-primary py-2 text-center font-medium text-white transition hover:opacity-90"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
