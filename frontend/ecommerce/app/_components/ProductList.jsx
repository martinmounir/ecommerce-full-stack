import React from 'react'
import ProductItem from './ProductItem'

function ProductList({ productList = [] }) {
  if (productList.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        No similar products found.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {productList.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </div>
  )
}

export default ProductList
