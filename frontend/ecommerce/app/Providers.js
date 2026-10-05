'use client'

import { useState } from 'react'
import { CartContext } from './_context/CartContext'

export default function Providers({ children }) {
  const [cart, setCart] = useState([])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}
