import { NextRequest } from 'next/server'

/**
 * Extract client IP from request headers
 * Handles X-Forwarded-For and X-Real-IP headers
 */
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown'
}
