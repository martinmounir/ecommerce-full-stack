'use client'

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import { CartContext } from '../_context/CartContext'
import CartApis from '../_utils/CartApis'
import Cart from './Cart'

function Header() {
  const { cart, setCart } = useContext(CartContext)
  const { isLoaded, user } = useUser()

  const [openCart, setOpenCart] = useState(false)

  useEffect(() => {
    if (user) {
      getCartItems()
    } else {
      setCart([])
    }
  }, [user])

  const getCartItems = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress

      if (!email) return

      const res = await CartApis.getUserCartItems(email)

      const cartItems = res.data.data.map((item) => ({
        id: item.id,
        product: item.products?.[0],
      }))

      setCart(cartItems)
    } catch (error) {
      console.error('Error loading cart:', error)
    }
  }

  if (!isLoaded) return null

  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          {/* Navigation */}
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 transition hover:text-primary"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/explore"
                  className="text-gray-500 transition hover:text-primary"
                >
                  Explore
                </Link>
              </li>

              <li>
                <Link
                  href="/projects"
                  className="text-gray-500 transition hover:text-primary"
                >
                  Projects
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-gray-500 transition hover:text-primary"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 transition hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  Hi, {user.firstName}
                </span>

                <div className="flex items-center gap-3">
                  {/* Cart */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenCart((prev) => !prev)}
                      className="relative rounded-full p-2 transition hover:bg-gray-100"
                    >
                      <ShoppingCart className="h-6 w-6 text-gray-700" />

                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                        {cart.length}
                      </span>
                    </button>

                    {openCart && <Cart setOpenCart={setOpenCart} />}
                  </div>

                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  className="hidden rounded-lg border border-primary px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white sm:block"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <button className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-700 md:hidden">
              <span className="sr-only">Toggle menu</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
