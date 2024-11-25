import type { Metadata } from 'next'
import localFont from 'next/font/local'
import AuthProvider from '@/providers/auth-provider'
import './globals.css'
import LayoutWrapper from '@/components/layout/layout-wrapper'

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
    <html lang="en">
    <body className={inter.className}>
    <AuthProvider>
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </AuthProvider>
    </body>
    </html>
  )
}