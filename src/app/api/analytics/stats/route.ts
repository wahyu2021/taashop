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
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

    // Get this month's page views
    const thisMonthViews = await sanityClient.fetch(
      `count(*[_type == "pageView" && timestamp >= $startOfMonth])`,
      { startOfMonth }
    )

    // Get last month's page views for comparison
    const lastMonthViews = await sanityClient.fetch(
      `count(*[_type == "pageView" && timestamp >= $startOfLastMonth && timestamp <= $endOfLastMonth])`,
      { startOfLastMonth, endOfLastMonth }
    )

    // Get unique visitors this month (by sessionId)
    const uniqueVisitors = await sanityClient.fetch(
      `count(array::unique(*[_type == "pageView" && timestamp >= $startOfMonth && defined(sessionId)].sessionId))`,
      { startOfMonth }
    )

    // Get today's views
    const todayViews = await sanityClient.fetch(
      `count(*[_type == "pageView" && timestamp >= $startOfToday])`,
      { startOfToday }
    )

    // Get top pages
    const topPages = await sanityClient.fetch(
      `*[_type == "pageView" && timestamp >= $startOfMonth] | order(path asc) {path}`,
      { startOfMonth }
    )

    // Count pages
    const pageCounts: Record<string, number> = {}
    topPages.forEach((view: { path: string }) => {
      pageCounts[view.path] = (pageCounts[view.path] || 0) + 1
    })

    const topPagesArray = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Get contact submissions (leads)
    const leadsCount = await sanityClient.fetch(
      `count(*[_type == "contactSubmission" && submittedAt >= $startOfMonth])`,
      { startOfMonth }
    )

    // Calculate percentage change
    const viewsChange = lastMonthViews > 0 
      ? Math.round(((thisMonthViews - lastMonthViews) / lastMonthViews) * 100)
      : 0

    return NextResponse.json({
      totalViews: thisMonthViews,
      uniqueVisitors,
      todayViews,
      topPages: topPagesArray,
      leadsCount,
      viewsChange,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
