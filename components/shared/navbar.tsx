'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Bell, Menu } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center bg-bg-dark px-4">
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-text-primary">LUDOLEX</div>
          </Link>

          {/* Search Bar */}
          <div className="mx-4 flex max-w-2xl flex-1">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"/>
              <input
                  type="text"
                  placeholder="Search for a game"
                  className="h-10 w-full rounded-full bg-bg-nav pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-primary"/>
            </div>
          </div>

          {/* Right section: User controls */}
          <div className="flex items-center gap-4">
            {status === 'authenticated' && session?.user ? (
                <>
                  {/* Notifications */}
                  <button
                      className="relative rounded-full p-2 text-text-secondary transition-colors hover:bg-accent-primary hover:text-text-primary">
                    <Bell className="h-5 w-5"/>
                    <span
                        className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
                  3
                </span>
                  </button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <div
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary text-sm font-medium text-text-primary transition-colors hover:bg-accent-secondary">
                        {session.user.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-56 bg-bg-nav text-text-primary"
                    >
                      <div className="border-b border-custom-border-light px-2 py-2">
                        <p className="text-sm font-medium">{session.user.email}</p>
                      </div>
                      <DropdownMenuItem
                          className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
                          onClick={() => router.push(`/users/${session.user.email}`)}
                      >
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                          className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
                          onClick={() => router.push('/settings')}
                      >
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                          className="flex cursor-pointer items-center gap-2 text-sm text-destructive hover:text-destructive/90"
                          onClick={() => signOut({callbackUrl: '/'})}
                      >
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
            ) : (
                <Link
                    href="/login"
                    className="rounded-md bg-accent-primary px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-accent-secondary"
                >
                  Sign In
                </Link>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;