'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Footer from '@/components/shared/footer'

export default function AuthLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10 bg-bg-dark">
        <Image
          src="/auth-background2.png"
          alt="Background"
          fill
          className="object-cover opacity-80 scale-150"
          style={{
            objectPosition: '50% 50%',
          }}
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/90 to-bg-dark/70" />
      </div>

      {/* Header Section */}
      <header className="container py-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/ludolex_logo.svg"
            alt="LUDOLEX Logo"
            width={40}
            height={40}
            className="mr-40"
          />
          <div className="text-3xl text-text-primary tracking-widest">
            L U D O L E X
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>

      {/* Footer */}
      <Footer variant="transparent" />
    </div>
  )
}