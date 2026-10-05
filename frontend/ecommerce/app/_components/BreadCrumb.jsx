import Link from 'next/link'
import { Home, ChevronRight } from 'lucide-react'

function BreadCrumb({ product }) {
  return (
    <nav className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <li>
          <Link
            href="/"
            className="flex items-center hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>

        <ChevronRight className="w-4 h-4 text-gray-400" />

        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            {product?.category}
          </Link>
        </li>

        <ChevronRight className="w-4 h-4 text-gray-400" />

        <li className="font-semibold text-gray-900 truncate max-w-xs">
          {product?.title}
        </li>
      </ol>
    </nav>
  )
}

export default BreadCrumb
