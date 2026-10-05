'use client'

import React, { useContext } from 'react'
import { BadgeCheck, ShoppingCart, AlertOctagon, Tag } from 'lucide-react'
import SkeletonProductInfo from '@/app/_components/SkeletonProductInfo'
import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import CartApis from '@/app/_utils/CartApis'
import { CartContext } from '@/app/_context/CartContext'

function ProductInfo({ product }) {
  const router = useRouter()
  const { cart, setCart } = useContext(CartContext)
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  // Show skeleton while loading
  if (!product?.id) {
    return <SkeletonProductInfo />
  }

  const description =
    product.description
      ?.map((block) => block.children?.map((child) => child.text).join(''))
      .join('\n\n') || ''

  const handleAddToCart = async () => {
    if (!isSignedIn) {
      router.push('/sign-in')
      return
    }

    const data = {
      data: {
        username: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        products: [product.id],
      },
    }

    try {
      const res = await CartApis.addToCart(data)

      setCart((oldCart) => [
        ...oldCart,
        {
          id: res.data.data.id,
          product,
        },
      ])

      console.log('Cart Created Successfully')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-8 h-fit">
      {/* Product Title */}
      <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

      {/* Category */}
      <span className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
        <Tag size={16} />
        {product.category}
      </span>

      {/* Description */}
      <p className="mt-6 text-gray-600 leading-8 whitespace-pre-line">
        {description}
      </p>

      {/* Instant Delivery */}
      <div className="mt-6 flex items-center gap-2">
        {product.instantDelivery ? (
          <>
            <BadgeCheck size={20} className="text-green-600" />
            <span className="text-green-600 font-medium">
              Eligible for Instant Delivery
            </span>
          </>
        ) : (
          <>
            <AlertOctagon size={20} className="text-red-500" />
            <span className="text-red-500 font-medium">
              Instant Delivery Not Available
            </span>
          </>
        )}
      </div>

      {/* Price */}
      <div className="mt-8 border-t pt-6">
        <p className="text-gray-500 text-sm">Price</p>

        <h2 className="text-5xl font-bold text-primary mt-2">
          ${product.price.toFixed(2)}
        </h2>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full mt-8 bg-primary text-white rounded-xl py-4 flex items-center justify-center gap-3 font-semibold text-lg transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02]"
      >
        <ShoppingCart size={22} />
        Add to Cart
      </button>
    </div>
  )
}

export default ProductInfo
