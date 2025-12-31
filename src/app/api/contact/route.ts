/**
 * @fileoverview Contact Form API Route
 * 
 * Endpoint untuk menerima pesan dari form kontak website.
 * 
 * Fitur Keamanan:
 * - Rate limiting (5 submission / 15 menit per IP)
 * - Validasi input dengan Zod schema
 * - Sanitasi XSS (strip semua HTML tags)
 * 
 * @endpoint POST /api/contact
 * @body { name, email, phone?, subject?, message }
 * @returns { message: string, id: string }
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import sanitizeHtml from 'sanitize-html'
import { getClientIP } from '@/lib/request-utils'
import { contactLimiter } from '@/lib/rate-limit'
import { sanityClient } from '@/lib/sanity-api'

/** Schema validasi untuk contact form */
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter')
    .regex(/^[a-zA-Z\s'-]+$/, 'Nama hanya boleh mengandung huruf'),
  email: z.string()
    .email('Format email tidak valid')
    .max(254, 'Email terlalu panjang'),
  phone: z.string()
    .max(20, 'Nomor telepon terlalu panjang')
    .regex(/^[\d\s+()-]*$/, 'Format nomor telepon tidak valid')
    .optional()
    .or(z.literal('')),
  subject: z.string()
    .max(200, 'Subjek maksimal 200 karakter')
    .optional()
    .or(z.literal('')),
  message: z.string()
    .min(10, 'Pesan minimal 10 karakter')
    .max(5000, 'Pesan maksimal 5000 karakter'),
})

/** Sanitasi input - hapus semua HTML tags untuk mencegah XSS */
const sanitize = (input: string) => 
  sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }).trim()

/** Helper untuk JSON response */
const jsonResponse = (data: object, status: number) =>
  NextResponse.json(data, { status })

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const ip = getClientIP(request)
    const { allowed } = contactLimiter.check(ip)
    
    if (!allowed) {
      return jsonResponse(
        { error: 'Terlalu banyak pengiriman. Coba lagi dalam 15 menit.' },
        429
      )
    }

    // Validasi input dengan Zod
    const body = await request.json()
    const result = contactSchema.safeParse(body)
    
    if (!result.success) {
      return jsonResponse({ error: result.error.issues[0].message }, 400)
    }

    // Sanitasi dan simpan ke Sanity
    const { name, email, phone, subject, message } = result.data
    
    const doc = await sanityClient.create({
      _type: 'contactSubmission',
      name: sanitize(name),
      email: sanitize(email),
      phone: phone ? sanitize(phone) : '',
      subject: subject ? sanitize(subject) : 'No Subject',
      message: sanitize(message),
      submittedAt: new Date().toISOString(),
      status: 'new',
      source: 'contact-page',
    })

    return jsonResponse({ message: 'Pesan berhasil dikirim', id: doc._id }, 200)
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return jsonResponse({ error: 'Terjadi kesalahan server' }, 500)
  }
}

