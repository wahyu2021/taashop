import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createClient } from '@sanity/client'

// Rate limiting store (in production, use Redis)
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number } {
  const now = Date.now()
  const attempt = loginAttempts.get(ip)

  if (!attempt || now > attempt.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 }
  }

  if (attempt.count >= MAX_ATTEMPTS) {
    return { allowed: false, remainingAttempts: 0 }
  }

  attempt.count++
  return { allowed: true, remainingAttempts: MAX_ATTEMPTS - attempt.count }
}

// Random delay to prevent timing attacks (100-500ms)
async function randomDelay(): Promise<void> {
  const delay = Math.floor(Math.random() * 400) + 100
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    
    // Rate limit check
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      await randomDelay()
      return NextResponse.json(
        { error: 'Terlalu banyak percobaan login. Coba lagi dalam 15 menit.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      await randomDelay()
      return NextResponse.json(
        { error: 'Email dan password diperlukan' },
        { status: 400 }
      )
    }

    // Find admin user in Sanity
    const user = await sanityClient.fetch(
      `*[_type == "adminUser" && email == $email][0]`,
      { email: email.toLowerCase() }
    )

    if (!user) {
      await randomDelay()
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      )
    }

    // Check if account is locked
    if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
      await randomDelay()
      return NextResponse.json(
        { error: 'Akun terkunci. Coba lagi nanti.' },
        { status: 423 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)

    if (!isValidPassword) {
      // Increment failed attempts
      const newFailedAttempts = (user.failedAttempts || 0) + 1
      const shouldLock = newFailedAttempts >= MAX_ATTEMPTS

      await sanityClient
        .patch(user._id)
        .set({
          failedAttempts: newFailedAttempts,
          ...(shouldLock && { lockedUntil: new Date(Date.now() + LOCKOUT_DURATION).toISOString() }),
        })
        .commit()

      await randomDelay()
      return NextResponse.json(
        { 
          error: shouldLock 
            ? 'Akun terkunci karena terlalu banyak percobaan gagal.' 
            : 'Email atau password salah' 
        },
        { status: 401 }
      )
    }

    // Reset failed attempts on successful login
    await sanityClient
      .patch(user._id)
      .set({
        failedAttempts: 0,
        lockedUntil: null,
        lastLogin: new Date().toISOString(),
      })
      .commit()

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )

    // Create response with HttpOnly cookie
    const response = NextResponse.json(
      { success: true, message: 'Login berhasil' },
      { status: 200 }
    )

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    await randomDelay()
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
