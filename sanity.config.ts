import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'taashop',
  title: 'TaaShop Konveksi',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  // Required for embedded studio in Next.js
  basePath: '/admin/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})

