'use client'

import { useEffect, useState } from 'react'
import { 
  Eye, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Database,
  ExternalLink,
  Loader2,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'

interface AnalyticsData {
  totalViews: number
  uniqueVisitors: number
  todayViews: number
  topPages: { path: string; count: number }[]
  leadsCount: number
  viewsChange: number
}

export default function AdminDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/analytics/stats')
      if (!response.ok) throw new Error('Failed to fetch')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError('Gagal memuat data analytics')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const stats = [
    { 
      label: 'Total Page Views', 
      value: data?.totalViews ?? 0, 
      change: data?.viewsChange ?? null,
      icon: Eye, 
      description: 'Bulan ini',
    },
    { 
      label: 'Unique Visitors', 
      value: data?.uniqueVisitors ?? 0, 
      change: null,
      icon: Users, 
      description: 'Bulan ini',
    },
    { 
      label: 'Views Hari Ini', 
      value: data?.todayViews ?? 0, 
      change: null,
      icon: Calendar, 
      description: 'Hari ini',
    },
    { 
      label: 'Leads', 
      value: data?.leadsCount ?? 0, 
      change: null,
      icon: TrendingUp, 
      description: 'Kontak masuk bulan ini',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Statistik dan analitik website TaaShop Konveksi</p>
        </div>
        <button
          onClick={fetchAnalytics}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-orange-500" />
              </div>
              {stat.change !== null && stat.change !== 0 && (
                <span className={`flex items-center text-sm ${
                  stat.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {Math.abs(stat.change)}%
                </span>
              )}
            </div>
            {loading ? (
              <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
            ) : (
              <p className="text-3xl font-bold text-white">{stat.value.toLocaleString()}</p>
            )}
            <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
            <p className="text-slate-500 text-xs mt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Top Pages */}
      {data?.topPages && data.topPages.length > 0 && (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Halaman Populer</h2>
          <div className="space-y-3">
            {data.topPages.map((page, index) => (
              <div key={page.path} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-sm w-6">{index + 1}.</span>
                  <span className="text-white">{page.path}</span>
                </div>
                <span className="text-slate-400">{page.count} views</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/studio"
            target="_blank"
            className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors group"
          >
            <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
              <Database className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Buka Sanity Studio</p>
              <p className="text-slate-400 text-sm">Kelola produk, galeri, testimoni, FAQ</p>
            </div>
            <ExternalLink className="h-5 w-5 text-slate-500" />
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors group"
          >
            <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
              <Eye className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Lihat Website</p>
              <p className="text-slate-400 text-sm">Preview tampilan frontend</p>
            </div>
            <ExternalLink className="h-5 w-5 text-slate-500" />
          </Link>
        </div>
      </div>
    </div>
  )
}


