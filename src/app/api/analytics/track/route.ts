import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, referrer, sessionId } = body

    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    // Get user agent and country from headers
    const userAgent = request.headers.get('user-agent') || ''
    const country = request.headers.get('x-vercel-ip-country') || 
                    request.headers.get('cf-ipcountry') || 
                    'Unknown'

    // Create page view document in Sanity
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
