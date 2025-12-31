/**
 * @fileoverview Analytics Page View Tracker
 * 
 * Endpoint untuk mencatat page view pengunjung.
 * Dipanggil otomatis oleh AnalyticsTracker component di setiap navigasi.
 * 
 * Data yang Disimpan:
 * - path: URL halaman yang dikunjungi
 * - timestamp: waktu kunjungan
 * - sessionId: ID sesi browser (untuk unique visitors)
 * - referrer: halaman sebelumnya
 * - userAgent: browser info
 * - country: negara pengunjung (dari Vercel/Cloudflare headers)
 * 
 * @endpoint POST /api/analytics/track
 * @public (tidak memerlukan authentication)
 */

import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity-api'

export async function POST(request: NextRequest) {
  try {
    const { path, referrer, sessionId } = await request.json()

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    const userAgent = request.headers.get('user-agent') || ''
    const country = request.headers.get('x-vercel-ip-country') || 
                    request.headers.get('cf-ipcountry') || 
                    'Unknown'

    await sanityClient.create({
      _type: 'pageView',
      path,
      timestamp: new Date().toISOString(),
      sessionId: sessionId || null,
      referrer: referrer || null,
      userAgent,
      country,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking page view:', error)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
