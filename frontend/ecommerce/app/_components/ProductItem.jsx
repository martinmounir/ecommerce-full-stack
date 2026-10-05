import React from 'react'
import Image from 'next/image'
import { Tag } from 'lucide-react'
import Link from 'next/link'

function ProductItem({ product }) {
  return (
    <Link
      href={`/product-details/${product.id}`}
      className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary"
    >
      {/* Product Image */}
      <div className="overflow-hidden h-[190px]">
        <Image
          src={product.banner.url}
          alt={product.title}
          width={400}
          height={250}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex justify-between items-center p-4 bg-gray-50">
        <div>
          {/* Title (unchanged) */}
          <h2 className="text-lg font-bold line-clamp-2">{product.title}</h2>

          {/* Category */}
          <div className="flex items-center gap-1 mt-1 text-gray-600">
            <Tag className="w-4 h-4" />
            <span>{product.category}</span>
          </div>
        </div>

        {/* Price (unchanged) */}
        <h2 className="text-lg font-bold text-gray-600">
          ${product.price.toFixed(2)}
        </h2>
      </div>
    </Link>
  )
}

export default ProductItem
