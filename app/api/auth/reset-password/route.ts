import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { hash } from 'bcrypt'
import { z } from 'zod'
import crypto from 'crypto'

const requestResetSchema = z.object({
  email: z.string().email('Invalid email address'),
})

const resetSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = requestResetSchema.safeParse(body)

    if (!result.success) {
      if (!result.success) {
        const errorMessage = result.error?.issues?.[0]?.message || 'Invalid input'
        return NextResponse.json({ error: errorMessage }, { status: 400 })
      }
    }

    const { email } = result.data

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'If an account exists, a reset link has been sent' },
        { status: 200 },
      )
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    return NextResponse.json(
      {
        message: 'Reset token generated',
        resetToken, // In production, this would be sent via email
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const result = resetSchema.safeParse(body)

    if (!result.success) {
      if (!result.success) {
        const errorMessage = result.error?.issues?.[0]?.message || 'Invalid input'
        return NextResponse.json({ error: errorMessage }, { status: 400 })
      }
    }

    const { token, password } = result.data

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 },
      )
    }

    const hashedPassword = await hash(password, 12)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    })

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
