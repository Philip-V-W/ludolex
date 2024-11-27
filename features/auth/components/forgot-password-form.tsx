'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/ui/icons'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)
    setError(null)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setMessage('If an account exists, you will receive a reset link')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] max-w-[480px]">
      <h1 className="fluid-max-48 font-bold text-text-primary mb-[3%] ml-[5%]">Reset</h1>
      <div className="bg-bg-nav/60 backdrop-blur-sm rounded-3xl p-[8%]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {message && (
            <Alert className="bg-rating-success text-text-primary">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1">
            <label className="block text-text-primary">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className={cn(
                'w-full bg-bg-dark/60 border-0',
                'focus:ring-1 focus:ring-text-primary',
                'placeholder:text-text-primary',
                'h-12',
                'text-text-primary',
              )}
              placeholder="Enter your email"
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
              'Send Reset Link'
            )}
          </button>

          <div className="space-y-4 text-center">
            <Link
              href="/login"
              className="block text-text-secondary hover:text-text-primary transition-colors"
            >
              Remember your password? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}