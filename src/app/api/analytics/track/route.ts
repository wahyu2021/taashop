/**
 * @fileoverview Analytics Page View Tracker with Rate Limiting
 * 
 * Endpoint untuk mencatat page view pengunjung dengan proteksi rate limiting.
 * Dipanggil otomatis oleh AnalyticsTracker component di setiap navigasi.
 * 
 * Optimizations:
 * - Rate limiting: Max 10 requests per sessionId per minute
 * - Async writes: Non-blocking write ke Sanity
 * - Request validation: Zod schema validation
 * 
 * @endpoint POST /api/analytics/track
 * @public (tidak memerlukan authentication)
 */

import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity-api'
import { z } from 'zod'

// Rate limiting store (in-memory, resets on serverless cold start)
// Using Map with sessionId as key and array of timestamps as value
const rateLimitStore = new Map<string, number[]>()

// Rate limit configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10 // Max 10 requests per window

// Request validation schema
const trackRequestSchema = z.object({
  path: z.string().min(1).max(500),
  referrer: z.string().max(2000).nullable().optional(),
  sessionId: z.string().max(100).nullable().optional(),
})

/**
 * Clean up expired entries from rate limit store
 * Runs periodically to prevent memory leaks
 */
function cleanupRateLimitStore() {
  const now = Date.now()
  for (const [sessionId, timestamps] of rateLimitStore.entries()) {
    const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(sessionId)
    } else {
      rateLimitStore.set(sessionId, validTimestamps)
    }
  }
}

/**
 * Check if request is rate limited
 * @returns true if rate limited, false otherwise
 */
function isRateLimited(sessionId: string): boolean {
  const now = Date.now()
  const timestamps = rateLimitStore.get(sessionId) || []
  
  // Filter to only timestamps within the window
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  
  if (validTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }
  
  // Add current timestamp
  validTimestamps.push(now)
  rateLimitStore.set(sessionId, validTimestamps)
  
  return false
}

// Cleanup rate limit store every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000)
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const parseResult = trackRequestSchema.safeParse(body)
    
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data' }, 
        { status: 400 }
      )
    }
    
    const { path, referrer, sessionId } = parseResult.data
    
    // Rate limiting check (use sessionId or IP as identifier)
    const rateLimitKey = sessionId || 
      request.headers.get('x-forwarded-for')?.split(',')[0] || 
      'anonymous'
    
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Max 10 requests per minute.' }, 
        { status: 429 }
      )
    }

    const userAgent = request.headers.get('user-agent') || ''
    const country = request.headers.get('x-vercel-ip-country') || 
                    request.headers.get('cf-ipcountry') || 
                    'Unknown'

    // Async write - don't wait for commit (fire and forget)
    sanityClient.create({
      _type: 'pageView',
      path,
      timestamp: new Date().toISOString(),
      sessionId: sessionId || null,
      referrer: referrer || null,
      userAgent,
      country,
    }).catch(err => {
      // Log error but don't fail the request
      console.error('Error writing analytics to Sanity:', err)
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking page view:', error)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
