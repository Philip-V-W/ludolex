import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Admin routes
  const adminRoutes = ['/admin']
  const isAdminRoute = adminRoutes.some(route => path.startsWith(route))

  // Moderator routes
  const moderatorRoutes = ['/moderator']
  const isModeratorRoute = moderatorRoutes.some(route => path.startsWith(route))

  // User routes
  const userRoutes = ['/profile', '/library', '/wishlist', '/settings']
  const isUserRoute = userRoutes.some(route => path.startsWith(route))

  // Check admin routes
  if (isAdminRoute) {
    if (!token) {
      const url = new URL('/login', req.url)
      url.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(url)
    }
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Check moderator routes
  if (isModeratorRoute) {
    if (!token) {
      const url = new URL('/login', req.url)
      url.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(url)
    }
    if (!['ADMIN', 'MODERATOR'].includes(token.role as string)) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Check protected routes
  if (isUserRoute && !token) {
    const url = new URL('/login', req.url)
    url.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(url)
  }

  // Auth routes
  const authPaths = ['/login', '/register']
  if (token && authPaths.includes(path)) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/library/:path*',
    '/wishlist/:path*',
    '/settings/:path*',
    '/admin/:path*',
    '/moderator/:path*',
    '/login',
    '/register',
  ],
}
