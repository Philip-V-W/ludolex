'use client'

import { useAuth } from '@/features/auth/hooks/use-auth'
import SessionProvider from '@/components/shared/session-provider'
import { useState } from 'react'

export default function TestPage() {
  return (
    <SessionProvider>
      <TestContent />
    </SessionProvider>
  )
}

function TestContent() {
  const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn(email, password)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Auth Test Page</h1>

      {/* Auth Status */}
      <div className="rounded bg-accent-primary p-4">
        <p>Loading: {String(isLoading)}</p>
        <p>Authenticated: {String(isAuthenticated)}</p>
        <p>User: {JSON.stringify(user, null, 2)}</p>
      </div>

      {/* Login Form */}
      {!isAuthenticated && (
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded bg-bg-nav p-2 text-text-primary"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded bg-bg-nav p-2 text-text-primary"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-accent-secondary px-4 py-2 text-text-primary"
          >
            Sign In
          </button>
        </form>
      )}

      {/* Logout Button */}
      {isAuthenticated && (
        <button
          onClick={() => signOut()}
          className="rounded bg-rating-error px-4 py-2 text-text-primary"
        >
          Sign Out
        </button>
      )}
    </div>
  )
}
