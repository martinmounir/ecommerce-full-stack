'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Sparkles } from 'lucide-react'

import ProductApis from '@/app/_utils/productApis'
import BreadCrumb from '@/app/_components/BreadCrumb'
import ProductList from '@/app/_components/ProductList'

import ProductBanner from '../_components/ProductBanner'
import ProductInfo from '../_components/ProductInfo'

function ProductDetails({ params }) {
  const pathname = usePathname()

  const [productDetails, setProductDetails] = useState({})
  const [productList, setProductList] = useState([])

  useEffect(() => {
    if (params?.productId) {
      getProductById()
    }
  }, [params?.productId])

  const getProductById = async () => {
    try {
      // Optional: Reset state to show skeleton while loading
      setProductDetails({})
      setProductList([])

      const res = await ProductApis.getProductById(params.productId)

      if (res.data.data.length > 0) {
        const product = res.data.data[0]

        setProductDetails(product)

        getProductListByCategory(product.category, product.id)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getProductListByCategory = async (category, currentProductId) => {
    try {
      const res = await ProductApis.getProductsByCategory(category)

      const filteredProducts = res.data.data.filter(
        (item) => item.id !== currentProductId,
      )

      setProductList(filteredProducts)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
      <BreadCrumb product={productDetails} path={pathname} />

      {/* Product Details */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mt-8">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </section>

      {/* Similar Products */}
      <section className="mt-24 border-t border-gray-200 pt-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary">
                Similar Products
              </h2>

              <p className="text-gray-500 mt-1">
                Explore more courses in this category
              </p>
            </div>
          </div>

          <div className="hidden md:block w-20 h-1 rounded-full bg-primary" />
        </div>

        <ProductList productList={productList} />
      </section>
    </div>
  )
}

export default ProductDetails
