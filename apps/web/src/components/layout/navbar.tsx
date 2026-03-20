'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Brain, Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <Brain className="h-7 w-7" />
          AIDA
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <Link href="/benefits/us" className="hover:text-blue-600 transition-colors">Benefits</Link>
          <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Get started free
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link href="/benefits/us" className="block text-sm font-medium text-gray-700">Benefits</Link>
          <Link href="#pricing" className="block text-sm font-medium text-gray-700">Pricing</Link>
          {session ? (
            <>
              <Link href="/dashboard" className="block text-sm font-medium text-gray-700">Dashboard</Link>
              <button onClick={() => signOut()} className="block text-sm font-medium text-gray-700">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-sm font-medium text-gray-700">Sign in</Link>
              <Link href="/register" className="block text-sm font-semibold text-blue-600">Get started free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
