'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string;
  variant?: 'default' | 'transparent';
}

const Footer = ({ className, variant = 'default' }: FooterProps) => {
  return (
    <footer
      className={cn(
        'w-full py-8',
        variant === 'default' ? 'bg-bg-dark' : 'bg-transparent',
        className,
      )}
    >
      <div className="max-w-[1920px] mx-auto flex flex-col items-center gap-3">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/ludolex_logo.svg"
            alt="Ludolex"
            width={32}
            height={32}
          />
          <span className="text-2xl text-text-primary tracking-widest">
            L U D O L E X
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-text-secondary mt-3">
          © 2024 Ludolex Corporation. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex items-center gap-4 text-sm text-text-primary">
          <Link
            href="/about"
            className="hover:text-text-primary transition-colors"
          >
            About Ludolex
          </Link>
          <span className="text-text-primary">|</span>
          <Link
            href="/jobs"
            className="hover:text-text-primary transition-colors"
          >
            Jobs
          </Link>
          <span className="text-text-primary">|</span>
          <Link
            href="/support"
            className="hover:text-text-primary transition-colors"
          >
            Support
          </Link>
          <span className="text-text-primary">|</span>
          <Link
            href="/privacy"
            className="hover:text-text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-text-primary">|</span>
          <Link
            href="/legal"
            className="hover:text-text-primary transition-colors"
          >
            Legal
          </Link>
          <span className="text-text-primary">|</span>
          <Link
            href="/cookies"
            className="hover:text-text-primary transition-colors"
          >
            Cookies
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-4 mt-3">
          <Link
            href="#"
            className="text-text-secondary hover:text-text-primary transition-colors"
            rel="noopener noreferrer"
          >
            <Image
              src={'/footer_icons/X Logo.svg'}
              alt="X Logo"
              width={24}
              height={24}
              className="h-5 w-5"
            />
          </Link>
          <Link
            href="#"
            className="text-text-secondary hover:text-text-primary transition-colors"
            rel="noopener noreferrer"
          >
            <Image
              src={'/footer_icons/Logo Instagram.svg'}
              alt="Instagram Logo"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </Link>
          <Link
            href="#"
            className="text-text-secondary hover:text-text-primary transition-colors"
            rel="noopener noreferrer"
          >
            <Image
              src={'/footer_icons/Logo YouTube.svg'}
              alt="YouTube Logo"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </Link>
          <Link
            href="#"
            className="text-text-secondary hover:text-text-primary transition-colors"
            rel="noopener noreferrer"
          >
            <Image
              src={'/footer_icons/LinkedIn.svg'}
              alt="LinkedIn Logo"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer