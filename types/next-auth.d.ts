import type { AuthSession, AuthUser, AuthToken } from '@/features/auth/types'

declare module 'next-auth' {
  type Session = AuthSession
  type User = AuthUser
}

declare module 'next-auth/jwt' {
  type JWT = AuthToken
}