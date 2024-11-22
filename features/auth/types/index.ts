import {Session, User} from "next-auth";
import {JWT} from "next-auth/jwt";

// Next-Auth Type Extensions
export interface AuthSession extends Session {
  user: {
    id: string
    email: string
    username: string
  }
}

export interface AuthUser extends User {
  username: string
}

export interface AuthToken extends JWT {
  id: string
  username: string
}

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