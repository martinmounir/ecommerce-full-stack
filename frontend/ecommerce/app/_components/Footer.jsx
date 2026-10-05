'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'

function Footer() {
  const { isLoaded, user } = useUser()

  if (!isLoaded) return null

  if (!user) return null

  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>© 2026 E-Commerce. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
