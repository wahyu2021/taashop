/**
 * @fileoverview Security Middleware (Proxy)
 * 
 * Middleware untuk proteksi route admin dan API sensitif.
 * Memverifikasi JWT token dari cookie untuk authentication.
 * 
 * Routes yang Dilindungi:
 * - /admin/* (kecuali /admin/login) → redirect ke login jika tidak authenticated
 * - /api/leads → return 401 jika tidak authenticated
 * - /api/analytics/stats → return 401 jika tidak authenticated
 * 
 * Routes Publik:
 * - /api/auth/login, /api/auth/logout
 * - /api/contact
 * - /api/analytics/track
 */

import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

/** API routes yang memerlukan authentication */
const PROTECTED_API_ROUTES = ['/api/leads', '/api/analytics/stats']

/** API routes yang tidak memerlukan authentication */
const PUBLIC_API_ROUTES = [
  '/api/auth/login',
  '/api/auth/logout',
  '/api/contact',
  '/api/analytics/track',
]

const isProtectedApiRoute = (pathname: string) =>
  PROTECTED_API_ROUTES.some(route => pathname.startsWith(route))

const isPublicApiRoute = (pathname: string) =>
  PUBLIC_API_ROUTES.some(route => pathname.startsWith(route))

/**
 * Verifikasi JWT token
 * Mengecek signature, issuer, dan audience
 */
async function verifyJWT(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    await jwtVerify(token, secret, {
      issuer: 'taashop-admin',
      audience: 'taashop-admin-panel',
    })
    return true
  } catch {
    return false
  }
}

/**
 * Main proxy handler untuk proteksi routes
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('admin_token')?.value

  // === API Route Protection ===
  if (pathname.startsWith('/api/')) {
    if (isPublicApiRoute(pathname)) {
      return NextResponse.next()
    }

    if (isProtectedApiRoute(pathname)) {
      if (!token || !(await verifyJWT(token))) {
        return NextResponse.json(
          { error: 'Unauthorized - Authentication required' },
          { status: 401 }
        )
      }
    }

    return NextResponse.next()
  }

  // === Admin Page Protection ===
  
  // Skip untuk login page dan static assets
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Protect /admin/* routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    const isValid = await verifyJWT(token)
    if (!isValid) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete('admin_token')
      return response
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

/** Konfigurasi routes yang dihandle oleh middleware */
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/leads/:path*',
    '/api/analytics/:path*',
  ],
}

