'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/ui/icons'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

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
    <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] max-w-[480px]">
      <h1 className="fluid-max-48 font-bold text-text-primary mb-[3%] ml-[5%]">New Password</h1>
      <div className="bg-bg-nav/60 backdrop-blur-sm rounded-3xl p-[8%]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1">
            <label className="block text-text-primary">New Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              className={cn(
                'w-full bg-bg-dark/60 border-0',
                'focus:ring-1 focus:ring-text-primary',
                'placeholder:text-text-primary',
                'h-12',
                'text-text-primary',
              )}
              placeholder="Enter new password"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-text-primary">Confirm Password</label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
              className={cn(
                'w-full bg-bg-dark/60 border-0',
                'focus:ring-1 focus:ring-text-primary',
                'placeholder:text-text-primary',
                'h-12',
                'text-text-primary',
              )}
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full h-12 rounded-md",
              'bg-gradient-to-r from-[#06BFFF] to-[#2D73FF]',
              "text-text-primary font-medium",
              "transition-all duration-200",
              "hover:brightness-110",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <Icons.spinner className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}