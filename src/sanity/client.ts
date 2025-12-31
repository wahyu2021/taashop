import { createClient } from 'next-sanity'
import { createImageUrlBuilder, type ImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = createImageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any): ImageUrlBuilder {
  return builder.image(source)
}

// Next.js fetch caching configuration
// Revalidate content every 1 hour (3600 seconds)
export const fetchConfig = {
  next: { revalidate: 3600 }
}

// For data that rarely changes, use longer cache (24 hours)
export const staticFetchConfig = {
  next: { revalidate: 86400 }
}

