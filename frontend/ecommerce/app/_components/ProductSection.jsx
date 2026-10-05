'use client'

import { useEffect, useState } from 'react'
import ProductList from './ProductList'
import productApis from '../_utils/productApis'

function ProductSection() {
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLatestProducts()
  }, [])

  const getLatestProducts = async () => {
    try {
      const res = await productApis.getLatestProducts()
      setProductList(res.data.data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container mx-auto px-6 lg:px-10 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary">
          Latest Products
        </h2>

        <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
          Discover our newest digital products and start learning with
          high-quality courses and resources.
        </p>
      </div>

      {/* Products */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading products...
        </div>
      ) : (
        <ProductList productList={productList} />
      )}
    </section>
  )
}

export default ProductSection
