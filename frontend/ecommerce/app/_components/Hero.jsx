import React from 'react'

function Hero() {
  return (
    <section className="bg-white lg:grid lg:h-screen lg:place-content-center">
      <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            ALL YOU DIGITAL PRODUCTS{' '}
            <strong className="text-indigo-600">IS ONE CLICK AWAY</strong>{' '}
            conversions
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            START EXPLORINF STATE OF THE ART DIGITAL PRODUCTS AND SERVICES WITH
            US NOW!
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <a
              href="#"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Get Started
            </a>

            <a
              href="#"
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
