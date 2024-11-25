'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../hooks/use-auth'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/ui/icons'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

export function RegisterForm() {
  const router = useRouter()
  const { register, isLoading, error } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await register(formData)
    if (success) {
      router.push('/')
    }
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-bold text-text-primary mb-3 ml-5">Register</h1>
      <div className="bg-bg-nav/60 backdrop-blur-sm rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1">
            <Input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              disabled={isLoading}
              required
              className={cn(
                'w-full bg-bg-dark/60 border-0',
                'focus:ring-1 focus:ring-text-primary',
                'placeholder:text-text-primary',
                'h-12',
                'text-text-primary',
              )}
              placeholder="Choose a username"
            />
          </div>

          <div className="space-y-1">
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

          <div className="space-y-1">
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={isLoading}
              required
              className={cn(
                'w-full bg-bg-dark/60 border-0',
                'focus:ring-1 focus:ring-text-primary',
                'placeholder:text-text-primary',
                'h-12',
                'text-text-primary',
              )}
              placeholder="Create a password"
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
              'Create Account'
            )}
          </button>

          <div className="space-y-4 text-center">
            <Link
              href="/login"
              className="block text-text-secondary hover:text-text-primary transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}