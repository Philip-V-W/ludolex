'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../hooks/use-auth'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/ui/icons'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isLoading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const resetSuccess = searchParams.get('reset') === 'success'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login({ email, password })
    if (success) {
      router.push('/')
    }
  }

  return (
    <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] max-w-[480px]">
      <h1 className="fluid-max-48 font-bold text-text-primary mb-[3%] ml-[5%]">Login</h1>
      <div className="bg-bg-nav/60 backdrop-blur-sm rounded-3xl p-[8%]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {resetSuccess && (
            <Alert className="bg-rating-success text-text-primary">
              <AlertDescription>
                Password reset successful. Please sign in with your new password.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1">
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
              placeholder="Email"
            />
          </div>

          <div className="space-y-1">
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
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              'w-full h-12 rounded-md',
              'bg-gradient-to-r from-[#06BFFF] to-[#2D73FF]',
              'text-text-primary font-medium',
              'transition-all duration-200',
              'hover:brightness-110',
              'disabled:opacity-50 disabled:cursor-not-allowed',
            )}
          >
            {isLoading ? (
              <Icons.spinner className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              'Sign In'
            )}
          </button>

          <div className="space-y-4 text-center">
            <Link
              href="/register"
              className="block text-text-secondary hover:text-text-primary transition-colors"
            >
              New to Ludolex? Register
            </Link>

            <Link
              href="/forgot-password"
              className="block text-text-secondary hover:text-text-primary transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}