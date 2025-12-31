/**
 * @fileoverview Analytics Statistics API
 * 
 * Endpoint untuk mengambil statistik analytics untuk admin dashboard.
 * Memerlukan authentication (dilindungi oleh middleware).
 * 
 * Data yang Dikembalikan:
 * - totalViews: total page views bulan ini
 * - uniqueVisitors: unique visitors bulan ini
 * - todayViews: page views hari ini
 * - topPages: 10 halaman paling banyak dikunjungi
 * - leadsCount: jumlah contact submission bulan ini
 * - viewsChange: persentase perubahan dari bulan lalu
 * 
 * @endpoint GET /api/analytics/stats
 * @protected (memerlukan admin authentication)
 */

import { NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity-api'

export async function GET() {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).toISOString()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

    // Parallel fetch untuk performa lebih baik
    const [thisMonthViews, lastMonthViews, uniqueVisitors, todayViews, topPages, leadsCount] = 
      await Promise.all([
        sanityClient.fetch(`count(*[_type == "pageView" && timestamp >= $startOfMonth])`, { startOfMonth }),
        sanityClient.fetch(`count(*[_type == "pageView" && timestamp >= $startOfLastMonth && timestamp <= $endOfLastMonth])`, { startOfLastMonth, endOfLastMonth }),
        sanityClient.fetch(`count(array::unique(*[_type == "pageView" && timestamp >= $startOfMonth && defined(sessionId)].sessionId))`, { startOfMonth }),
        sanityClient.fetch(`count(*[_type == "pageView" && timestamp >= $startOfToday])`, { startOfToday }),
        sanityClient.fetch(`*[_type == "pageView" && timestamp >= $startOfMonth] | order(path asc) {path}`, { startOfMonth }),
        sanityClient.fetch(`count(*[_type == "contactSubmission" && submittedAt >= $startOfMonth])`, { startOfMonth }),
      ])

    // Hitung page counts untuk top pages
    const pageCounts: Record<string, number> = {}
    topPages.forEach((view: { path: string }) => {
      pageCounts[view.path] = (pageCounts[view.path] || 0) + 1
    })

    const topPagesArray = Object.entries(pageCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Hitung persentase perubahan
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
