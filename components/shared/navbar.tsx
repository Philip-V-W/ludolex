'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-custom-border-light bg-bg-nav">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-text-primary">
            LudoLex
          </Link>

          {/* Main Navigation */}
          <div className="hidden space-x-8 md:flex">
            <Link
              href="/games"
              className={`text-sm ${
                pathname === '/games'
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Games
            </Link>
            <Link
              href="/reviews"
              className={`text-sm ${
                pathname === '/reviews'
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Reviews
            </Link>
          </div>

          {/* Search & Auth */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="rounded-full p-2 text-text-secondary hover:bg-accent-primary hover:text-text-primary"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/login"
              className="text-sm text-text-secondary hover:text-text-primary"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
