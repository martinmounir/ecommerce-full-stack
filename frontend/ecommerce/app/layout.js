import { ClerkProvider } from '@clerk/nextjs'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from './_components/Header'
import Footer from './_components/Footer'
import Providers from './Providers'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Your Store',
  description: 'E-commerce website built with Next.js and Strapi',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <Providers>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
