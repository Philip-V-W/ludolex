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
      <div className="min-h-screen bg-bg-dark">
        <Navbar />
        <div className="pt-16">
          <div className="flex w-full gap-[8%] px-[8%]">
            <Sidebar />
            <main className="flex-1 min-w-0 py-[2%]">
              <div className="w-full min-w-0">
                {children}
              </div>
            </main>
          </div>
        </div>
        <Footer variant="default" className="mt-auto" />
      </div>
    </ScrollArea>
  )
}