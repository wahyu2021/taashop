import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {buildLegacyTheme} from 'sanity'
import {schemaTypes} from './src/sanity/schemaTypes'

// Custom theme colors matching admin panel (dark slate + orange)
const props = {
  '--my-white': '#ffffff',
  '--my-black': '#0c0c0f',
  
  // Brand colors (orange)
  '--my-brand': '#f97316',        // orange-500
  '--my-brand-light': '#fb923c',  // orange-400
  '--my-brand-dark': '#ea580c',   // orange-600
  
  // Gray/slate palette  
  '--my-gray-100': '#f1f5f9',     // slate-100
  '--my-gray-200': '#e2e8f0',     // slate-200
  '--my-gray-300': '#cbd5e1',     // slate-300
  '--my-gray-400': '#94a3b8',     // slate-400
  '--my-gray-500': '#64748b',     // slate-500
  '--my-gray-600': '#475569',     // slate-600
  '--my-gray-700': '#334155',     // slate-700
  '--my-gray-800': '#1e293b',     // slate-800
  '--my-gray-900': '#0f172a',     // slate-900
}

// Build the theme with custom colors
const taashopTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--my-black'],
  '--white': props['--my-white'],
  
  /* Brand colors - used for focus rings, buttons, etc */
  '--brand-primary': props['--my-brand'],
  
  /* Component colors - using slate for dark mode feel */
  '--component-bg': props['--my-gray-900'],
  '--component-text-color': props['--my-gray-100'],
  
  /* Default button */
  '--default-button-color': props['--my-gray-700'],
  '--default-button-primary-color': props['--my-brand'],
  '--default-button-success-color': '#22c55e',
  '--default-button-warning-color': '#eab308',
  '--default-button-danger-color': '#ef4444',
  
  /* State colors */
  '--state-info-color': props['--my-brand'],
  '--state-success-color': '#22c55e',
  '--state-warning-color': '#eab308',
  '--state-danger-color': '#ef4444',
  
  /* Navbar */
  '--main-navigation-color': props['--my-gray-800'],
  '--main-navigation-color--inverted': props['--my-gray-100'],
  
  /* Focus ring */
  '--focus-color': props['--my-brand'],
})

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

  // Apply custom theme
  theme: taashopTheme,
})
