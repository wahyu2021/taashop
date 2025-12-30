import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function GET() {
  try {
    // Fetch all leads (contact submissions) ordered by submission date (newest first)
    const leads = await sanityClient.fetch(
      `*[_type == "contactSubmission"] | order(submittedAt desc) {
        _id,
        name,
        email,
        phone,
        subject,
        message,
        submittedAt,
        status,
        source
      }`
    )

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}
