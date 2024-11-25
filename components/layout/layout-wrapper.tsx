'use client'

import { usePathname } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import Sidebar from '@/components/shared/sidebar'

function isAuthPage(pathname: string) {
  return pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password')
}

export default function LayoutWrapper({
                                        children,
                                      }: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuth = isAuthPage(pathname)

  if (isAuth) {
    return children
  }

  return (
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
        <Footer variant="default" className="mt-auto" />
      </div>
    </ScrollArea>
  )
}