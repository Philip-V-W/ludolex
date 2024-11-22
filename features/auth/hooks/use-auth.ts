import { signIn, signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthSession,
  AuthHookReturn,
} from '../types'

export function useAuth(): AuthHookReturn {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (data: LoginCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/',
      })

      if (result?.error) {
        setError('Invalid email or password')
        return false
      }

      if (result?.ok) {
        window.location.href = '/'
        return true
      }

      return false
    } catch (err) {
      console.error('Login error:', err)
      setError('An unexpected error occurred')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: RegisterCredentials) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Registration failed')
        return false
      }

      return await login({
        email: data.email,
        password: data.password,
      })
    } catch (err) {
      setError('An unexpected error occurred')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      await signOut({ redirect: true, callbackUrl: '/' })
    } catch (err) {
      console.error('Logout error:', err)
      setError('Failed to logout')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    login,
    register,
    logout,
    isLoading,
    error,
    session: session as AuthSession | null,
    isAuthenticated: !!session,
  }
}
