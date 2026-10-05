import React from 'react'

function SkeletonProductInfo() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border p-8 animate-pulse">
      {/* Title */}
      <div className="h-8 w-3/4 bg-gray-200 rounded"></div>

      {/* Category */}
      <div className="mt-5 h-8 w-32 bg-gray-200 rounded-full"></div>

      {/* Description */}
      <div className="mt-8 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* Instant Delivery */}
      <div className="mt-8 h-5 w-60 bg-gray-200 rounded"></div>

      {/* Price */}
      <div className="mt-8 border-t pt-6">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>

        <div className="mt-3 h-12 w-40 bg-gray-200 rounded"></div>
      </div>

      {/* Button */}
      <div className="mt-8 h-14 w-full bg-gray-200 rounded-xl"></div>
    </div>
  )
}

export default SkeletonProductInfo
