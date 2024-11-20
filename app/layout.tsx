import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Navbar from '@/components/shared/navbar'
import AuthProvider from '@/providers/auth-provider'

const inter = localFont({
  src: './fonts/Inter.ttf',
  variable: '--Inter',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'LudoLex - Video Game Database',
  description: 'Your comprehensive source for video game information',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen bg-bg-dark">
            <Navbar />
            <div className="container mx-auto px-4 py-8">{children}</div>
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
