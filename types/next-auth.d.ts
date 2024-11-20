import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      email: string
      username: string
      role: 'USER' | 'MODERATOR' | 'ADMIN'
    }
  }

  interface User extends DefaultUser {
    username: string
    role: 'USER' | 'MODERATOR' | 'ADMIN'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username: string
    role: 'USER' | 'MODERATOR' | 'ADMIN'
  }
}
