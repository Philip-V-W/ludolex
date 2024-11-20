import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      username: string
      role: 'USER' | 'MODERATOR' | 'ADMIN'
    }
  }

  interface User {
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
