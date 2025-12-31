/**
 * @fileoverview Sanity API Client
 * 
 * Client untuk operasi write ke Sanity CMS.
 * Digunakan oleh API routes yang memerlukan write access.
 * 
 * @note Untuk read-only operations, gunakan client dari @/sanity/client
 * @note Token disimpan di environment variable SANITY_API_TOKEN
 */

import { createClient } from '@sanity/client'

/**
 * Sanity client dengan write access untuk API routes
 * 
 * Konfigurasi:
 * - useCdn: false (required untuk write operations)
 * - token: dari SANITY_API_TOKEN env var
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

