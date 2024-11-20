import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname

      // Public routes
      if (path === '/' || path.startsWith('/games')) return true

      // Protected routes
      if (path.startsWith('/api')) {
        return !!token // Require authentication for API routes
      }

      // Admin routes
      if (path.startsWith('/admin')) {
        return token?.role === 'ADMIN'
      }

      return !!token // Require authentication for all other routes
    },
  },
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/profile/:path*',
    '/library/:path*',
    '/wishlist/:path*',
  ],
}
