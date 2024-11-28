import type { Session } from 'next-auth'
import type { User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

// Auth Types
export type AuthSession = Session
export type AuthUser = User
export type AuthToken = JWT

// Additional Auth Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  username: string
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: AuthUser | null
}

export interface AuthHookReturn {
  login: (data: LoginCredentials) => Promise<boolean>
  register: (data: RegisterCredentials) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
  error: string | null
  session: AuthSession | null
  isAuthenticated: boolean
}