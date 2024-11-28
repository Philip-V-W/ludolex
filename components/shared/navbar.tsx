'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Bell } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <nav className="left-0 right-0 top-0 z-50 flex pt-4 items-center bg-bg-dark">
      <div className="flex w-full px-[8%]">
        {/* Left Section */}
        <div className="flex w-72 items-center justify-between">
          {/* Logo */}
          <div className="w-10">
            <Image
              src="/ludolex_logo.svg"
              alt="LUDOLEX Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <span className="fluid-max-32 font-semibold tracking-widest text-text-primary whitespace-nowrap">
            L U D O L E X
          </span>
        </div>

        {/* Search Bar with User Menu */}
        <div className="flex-1 pl-[4%]">
          <div className="relative flex h-10 w-full items-center rounded-full bg-bg-nav">
            <Search className="ml-4 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search for a game"
              className="h-full flex-1 bg-transparent px-3 fluid-max-14 text-text-primary placeholder:text-text-secondary focus:outline-none"
            />

            {/* User Controls */}
            <div className="flex items-center gap-2 pr-4">
              {status === 'authenticated' && session?.user ? (
                <>
                  <button className="relative p-2 text-text-primary transition-colors hover:text-text-primary">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive fluid-max-14 font-medium text-white">
                      3
                    </span>
                  </button>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary fluid-max-14 font-medium text-text-primary transition-colors hover:bg-accent-secondary">
                        {session.user.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-bg-nav">
                      <div className="border-b border-custom-border-light px-2 py-2">
                        <p className="fluid-max-14 font-medium text-text-primary">{session.user.email}</p>
                      </div>
                      <DropdownMenuItem
                        className="fluid-max-14 text-text-secondary hover:text-text-primary"
                        onClick={() => router.push(`/users/${session.user.email}`)}
                      >
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="fluid-max-14 text-text-secondary hover:text-text-primary"
                        onClick={() => router.push('/settings')}
                      >
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="fluid-max-14 text-destructive hover:text-destructive/90"
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
                  className="rounded-md bg-accent-primary px-4 py-2 fluid-max-14 font-medium text-text-primary transition-colors hover:bg-accent-secondary"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar