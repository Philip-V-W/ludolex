import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db/prisma'
import { compare } from 'bcrypt'
import NextAuth from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import { AuthUser } from '@/features/auth/types'

// Configuration NextAuth.js avec adaptateur Prisma
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // Système d'authentification avec validation des credentials
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            role: true,
            email: true,
            username: true,
            password: true,
          },
        })

        if (!user) {
          console.log('User not found')
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          console.log('Invalid password')
          return null
        }

        // Return type matching AuthUser
        return {
          id: user.id.toString(),
          role: user.role,
          email: user.email,
          username: user.username,
        } as AuthUser
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
          username: token.username as string,
        },
      }
    },
  },
  debug: true,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }