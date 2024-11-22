'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      router.push('/login?reset=success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Reset Your Password</h1>
        <p className="text-text-muted">Please enter your new password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-sm text-destructive">{error}</div>}

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-custom-border-light bg-bg-dark p-2"
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-custom-border-light bg-bg-dark p-2"
            disabled={isLoading}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-accent-primary p-2 text-white hover:bg-accent-secondary disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  )
}
