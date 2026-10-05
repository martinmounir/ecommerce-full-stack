import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Side */}
        <section className="relative hidden lg:flex lg:col-span-5 xl:col-span-6 items-end">
          <Image
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Background"
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/75" />

          {/* Content */}
          <div className="relative z-10 p-14 text-white">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={65}
              height={65}
              className="mb-8"
            />

            <h1 className="text-5xl font-bold leading-tight">
              Welcome Back 👋
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/90">
              Sign in to continue exploring premium courses, manage your
              purchases, and start learning anytime, anywhere.
            </p>
          </div>
        </section>

        {/* Right Side */}
        <main className="flex items-center justify-center px-8 py-12 lg:col-span-7 xl:col-span-6 bg-gray-50">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 flex justify-center lg:hidden">
              <Image src="/logo.svg" alt="Logo" width={60} height={60} />
            </div>

            <SignIn
              appearance={{
                variables: {
                  colorPrimary: '#6D28D9',
                  colorText: '#111827',
                  borderRadius: '12px',
                },
                elements: {
                  rootBox: 'w-full',
                  card: 'shadow-xl border rounded-2xl w-full',
                  headerTitle: 'text-3xl font-bold',
                  headerSubtitle: 'text-gray-500',
                  socialButtonsBlockButton:
                    'rounded-xl border hover:bg-gray-100 transition',
                  formButtonPrimary:
                    'rounded-xl bg-primary hover:bg-primary/90 text-white',
                  footerActionLink: 'text-primary hover:text-primary/80',
                  formFieldInput: 'rounded-xl',
                },
              }}
            />
          </div>
        </main>
      </div>
    </section>
  )
}
