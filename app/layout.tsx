import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Navbar from '@/components/shared/navbar'
import AuthProvider from '@/providers/auth-provider'
import './globals.css'
import Sidebar from "@/components/shared/sidebar";
import { ScrollArea } from '@/components/ui/scroll-area'
import Footer from '@/components/shared/footer'

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
      <ScrollArea className="h-screen">
        <div className="min-h-screen bg-bg-dark px-28 lg:px-15">
          <Navbar />
          <div className="pt-16">
            <div className="mx-auto flex max-w-[1920px]">
              <Sidebar />
              <main className="flex-1 px-4 py-6 lg:px-6 lg:py-8">
                {children}
              </main>
            </div>
          </div>
          <Footer className="mt-auto" />
        </div>
      </ScrollArea>
    </AuthProvider>
    </body>
    </html>
  )
}