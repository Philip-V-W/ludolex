'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Bell } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center bg-bg-nav px-4">
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="text-2xl font-bold text-text-primary">LUDOLEX</div>
        </Link>

        {/* Search Bar */}
        <div className="mx-4 flex max-w-xl flex-1">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search for a game"
              className="h-10 w-full rounded-md bg-bg-dark pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent-primary"
            />
          </div>
        </div>

        {/* Auth Status Debug */}
        {/*<div className="mr-4 text-sm text-text-muted">*/}
        {/*  Status: {status} | User: {session?.user?.email}*/}
        {/*</div>*/}

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {status === 'authenticated' && session?.user ? (
            <>
              <button className="rounded-full p-2 text-text-secondary hover:bg-accent-primary hover:text-text-primary">
                <Bell className="h-5 w-5" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary text-text-primary">
                    {session.user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    className="text-sm"
                    onClick={() => router.push(`/users/${session.user.email}`)}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-sm"
                    onClick={() => router.push('/settings')}
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-sm text-destructive"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-accent-primary px-4 py-2 text-sm font-medium text-text-primary hover:bg-accent-secondary"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
