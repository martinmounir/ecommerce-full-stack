import React from 'react'
import Image from 'next/image'

function ProductBanner({ product }) {
  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-200 shadow-lg p-6 flex justify-center">
      {product?.banner?.url ? (
        <Image
          src={product.banner.url}
          alt={product.title || 'Product Banner'}
          width={product.banner.width}
          height={product.banner.height}
          priority
          className="rounded-xl object-contain transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <div className="w-full aspect-[16/9] rounded-xl bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}

export default ProductBanner
