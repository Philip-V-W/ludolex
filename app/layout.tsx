import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Navbar from '@/components/shared/navbar'
import AuthProvider from '@/providers/auth-provider'
import './globals.css'

const inter = localFont({
  src: './fonts/Inter.ttf',
  variable: '--Inter',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'LudoLex - Video Game Database',
  description: 'Your comprehensive source for video game information',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-bg-dark">
            <Navbar />
            <main className="container mx-auto pt-16">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
