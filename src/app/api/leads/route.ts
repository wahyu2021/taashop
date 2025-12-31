/**
 * @fileoverview Leads API
 * 
 * Endpoint untuk mengambil semua contact submissions (leads).
 * Memerlukan authentication (dilindungi oleh middleware).
 * Digunakan di halaman admin /admin/leads.
 * 
 * @endpoint GET /api/leads
 * @protected (memerlukan admin authentication)
 * @returns { leads: ContactSubmission[] }
 */

import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity-api'

export async function GET() {
  try {
    const leads = await sanityClient.fetch(
      `*[_type == "contactSubmission"] | order(submittedAt desc) {
        _id, name, email, phone, subject, message, submittedAt, status, source
      }`
    )

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}
