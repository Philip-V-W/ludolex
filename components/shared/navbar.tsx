'use client'

import React, { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Bell } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useSearchStore } from '@/features/games/stores/searchStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useDebouncedCallback } from '@/features/games/utils/debounce'
import { SearchResults } from '@/features/games/components/search/search-results'

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    query,
    setQuery,
    setResults,
    setIsLoading,
    setIsOpen,
    setError,
    clearSearch,
  } = useSearchStore()

  const handleSearch = useDebouncedCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)
    setIsOpen(true)

    try {
      const response = await fetch(`/api/games/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error)
      }

      setResults(data.data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to search games')
    } finally {
      setIsLoading(false)
    }
  }, 300)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }, [setIsOpen])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  return (
    <nav className="left-0 right-0 top-0 z-50 flex pt-4 items-center bg-bg-dark">
      <div className="flex w-full px-[8%]">
        {/* Left Section */}
        <div className="flex w-72 items-center justify-between">
          {/* Logo */}
          <div className="w-10">
            <Link href="/">
              <Image
                src="/ludolex_logo.svg"
                alt="LUDOLEX Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Title */}
          <Link
            href="/"
            className="fluid-max-32 font-semibold tracking-widest text-text-primary whitespace-nowrap"
          >
            L U D O L E X
          </Link>
        </div>

        {/* Search Bar with User Menu */}
        <div className="flex-1 pl-[4%]">
          <div ref={searchRef} className="relative">
            <div className="relative flex h-10 w-full items-center rounded-full bg-bg-nav hover:bg-bg-white group">
              <Search className="ml-4 h-4 w-4 text-text-primary group-hover:text-text-dark" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  handleSearch(e.target.value)
                }}
                placeholder="Search for a game"
                className="h-full flex-1 bg-transparent px-3 fluid-max-14 text-text-primary group-hover:text-text-dark placeholder:text-text-secondary focus:outline-none"
              />

              {/* User Controls */}
              <div className="flex items-center gap-2 pr-4">
                {status === 'authenticated' && session?.user ? (
                  <>
                    <button className="relative p-2 text-text-primary group-hover:text-text-dark">
                      <Bell className="h-5 w-5" />
                      <span
                        className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive fluid-max-14 font-medium text-white">
                        3
                      </span>
                    </button>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary fluid-max-14 font-medium text-text-primary transition-colors hover:bg-accent-secondary">
                          {session.user.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 bg-bg-nav">
                        <div className="border-b border-custom-border-light px-2 py-2">
                          <p className="fluid-max-14 font-medium text-text-primary">
                            {session.user.email}
                          </p>
                        </div>
                        <DropdownMenuItem
                          className="fluid-max-14 text-text-secondary hover:text-text-primary hover:cursor-pointer"
                          onClick={() => router.push(`/users/${session.user.email}`)}
                        >
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="fluid-max-14 text-text-secondary hover:text-text-primary hover:cursor-pointer"
                          onClick={() => router.push('/settings')}
                        >
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="fluid-max-14 text-destructive hover:text-destructive/90 hover:cursor-pointer"
                          onClick={() => signOut({ callbackUrl: '/' })}
                        >
                          Sign out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : null}
              </div>
            </div>
            <SearchResults />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar