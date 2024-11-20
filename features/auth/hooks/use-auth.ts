import { useSession, signIn, signOut } from 'next-auth/react'

export function useAuth() {
  const { data: session, status } = useSession()

  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    isAdmin: session?.user?.role === 'ADMIN',
    isModerator: session?.user?.role === 'MODERATOR',
    signIn: (email: string, password: string) =>
      signIn('credentials', { email, password, callbackUrl: '/' }),
    signOut: () => signOut({ callbackUrl: '/' }),
  }
}
