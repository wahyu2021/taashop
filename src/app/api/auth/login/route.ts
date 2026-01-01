/**
 * @fileoverview Admin Login API Route
 * 
 * Endpoint untuk autentikasi admin panel.
 * 
 * Fitur Keamanan:
 * - Rate limiting (5 attempt / 15 menit per IP)
 * - Account lockout setelah 5 kali gagal
 * - JWT dengan enhanced claims (jti, issuer, audience)
 * - Random delay untuk mencegah timing attacks
 * - HttpOnly cookie dengan secure flag
 * 
 * @endpoint POST /api/auth/login
 * @body { email: string, password: string }
 * @returns { success: boolean, message: string }
 */

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { getClientIP } from '@/lib/request-utils'
import { loginLimiter } from '@/lib/rate-limit'
import { sanityClient } from '@/lib/sanity-api'

/** Maksimum percobaan gagal sebelum account dikunci */
const MAX_FAILED_ATTEMPTS = 5

/** Durasi lockout dalam milliseconds (15 menit) */
const LOCKOUT_DURATION_MS = 15 * 60 * 1000

/** Konfigurasi JWT */
const JWT_EXPIRY = '1h'
const JWT_CONFIG = {
  algorithm: 'HS256' as const,
  issuer: 'taashop-admin',
  audience: 'taashop-admin-panel',
}

/** Random delay 100-500ms untuk mencegah timing attacks */
const randomDelay = () => 
  new Promise<void>(resolve => 
    setTimeout(resolve, Math.floor(Math.random() * 400) + 100)
  )

/** Helper untuk JSON error response */
const errorResponse = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status })

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    
    // Rate limit check
    const { allowed } = loginLimiter.check(ip)
    if (!allowed) {
      await randomDelay()
      return errorResponse('Terlalu banyak percobaan login. Coba lagi dalam 15 menit.', 429)
    }

    // Parse dan validasi input
    const { email, password } = await request.json()
    if (!email || !password) {
      await randomDelay()
      return errorResponse('Email dan password diperlukan', 400)
    }

    // Cari user di Sanity
    const user = await sanityClient.fetch(
      `*[_type == "adminUser" && email == $email][0]`,
      { email: email.toLowerCase() }
    )

    if (!user) {
      await randomDelay()
      return errorResponse('Email atau password salah', 401)
    }

    // Cek apakah account terkunci
    if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
      await randomDelay()
      return errorResponse('Akun terkunci. Coba lagi nanti.', 423)
    }

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    
    if (!isValidPassword) {
      // Update failed attempts
      const newFailedAttempts = (user.failedAttempts || 0) + 1
      const shouldLock = newFailedAttempts >= MAX_FAILED_ATTEMPTS

      await sanityClient.patch(user._id).set({
        failedAttempts: newFailedAttempts,
        ...(shouldLock && { 
          lockedUntil: new Date(Date.now() + LOCKOUT_DURATION_MS).toISOString() 
        }),
      }).commit()

      await randomDelay()
      return errorResponse(
        shouldLock 
          ? 'Akun terkunci karena terlalu banyak percobaan gagal.'
          : 'Email atau password salah',
        401
      )
    }

    // Login berhasil - reset failed attempts
    await sanityClient.patch(user._id).set({
      failedAttempts: 0,
      lockedUntil: null,
      lastLogin: new Date().toISOString(),
    }).commit()

    // Generate JWT dengan enhanced security
    const now = Math.floor(Date.now() / 1000)
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        jti: uuidv4(),
        iat: now,
        nbf: now,
      },
      process.env.JWT_SECRET!,
      { expiresIn: JWT_EXPIRY, ...JWT_CONFIG }
    )

    // Set HttpOnly cookie
    const response = NextResponse.json(
      { success: true, message: 'Login berhasil' },
      { status: 200 }
    )

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // 'lax' allows cookie to be sent on navigation, 'strict' blocks it
      maxAge: 60 * 60,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    await randomDelay()
    return errorResponse('Terjadi kesalahan server', 500)
  }
}
