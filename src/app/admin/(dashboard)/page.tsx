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
import { TopPagesChart, DonutChart } from '@/components/admin/Charts'

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
      color: 'orange',
    },
    { 
      label: 'Unique Visitors', 
      value: data?.uniqueVisitors ?? 0, 
      change: null,
      icon: Users, 
      description: 'Bulan ini',
      color: 'green',
    },
    { 
      label: 'Views Hari Ini', 
      value: data?.todayViews ?? 0, 
      change: null,
      icon: Calendar, 
      description: 'Hari ini',
      color: 'blue',
    },
    { 
      label: 'Leads', 
      value: data?.leadsCount ?? 0, 
      change: null,
      icon: TrendingUp, 
      description: 'Kontak masuk bulan ini',
      color: 'purple',
    },
  ]

  const colorMap: Record<string, string> = {
    orange: 'bg-orange-500/10 text-orange-500',
    green: 'bg-green-500/10 text-green-500',
    blue: 'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
  }

  // Prepare data for donut chart
  const donutLabels = ['Page Views', 'Unique Visitors', 'Today Views', 'Leads']
  const donutValues = [
    data?.totalViews ?? 0,
    data?.uniqueVisitors ?? 0,
    data?.todayViews ?? 0,
    data?.leadsCount ?? 0,
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
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${colorMap[stat.color]?.split(' ')[0] || 'bg-orange-500/10'}`}>
                <stat.icon className={`h-6 w-6 ${colorMap[stat.color]?.split(' ')[1] || 'text-orange-500'}`} />
              </div>
              {stat.change !== null && stat.change !== 0 && (
                <span className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${
                  stat.change >= 0 ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Pages Chart */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">📊 Halaman Populer</h2>
          {loading ? (
            <div className="flex justify-center items-center h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
            </div>
          ) : data?.topPages && data.topPages.length > 0 ? (
            <TopPagesChart data={data.topPages.slice(0, 8)} />
          ) : (
            <div className="flex justify-center items-center h-[300px] text-slate-500">
              Belum ada data
            </div>
          )}
        </div>

        {/* Donut Chart - Overview */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">📈 Overview Statistik</h2>
          {loading ? (
            <div className="flex justify-center items-center h-[280px]">
              <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
            </div>
          ) : (
            <DonutChart 
              labels={donutLabels} 
              values={donutValues}
              colors={['#f97316', '#22c55e', '#3b82f6', '#a855f7']}
            />
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">⚡ Aksi Cepat</h2>
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



