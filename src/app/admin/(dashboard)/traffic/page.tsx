'use client'

import { useEffect, useState } from 'react'
import { 
  TrendingUp, 
  ArrowLeft,
  Loader2,
  RefreshCw,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

interface TrafficData {
  totalViews: number
  todayViews: number
  viewsChange: number
}

export default function TrafficPage() {
  const [data, setData] = useState<TrafficData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/analytics/stats')
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/admin" 
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-slate-400" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">Traffic</h1>
          <p className="text-slate-400 mt-1">Analisis traffic website</p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
              ) : (
                <p className="text-3xl font-bold text-white">{data?.totalViews?.toLocaleString() ?? 0}</p>
              )}
              <p className="text-slate-400">Total Views Bulan Ini</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
              ) : (
                <p className="text-3xl font-bold text-white">{data?.todayViews?.toLocaleString() ?? 0}</p>
              )}
              <p className="text-slate-400">Views Hari Ini</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
              ) : (
                <p className={`text-3xl font-bold ${(data?.viewsChange ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {(data?.viewsChange ?? 0) >= 0 ? '+' : ''}{data?.viewsChange ?? 0}%
                </p>
              )}
              <p className="text-slate-400">vs Bulan Lalu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Traffic Sources</h2>
        <p className="text-slate-500">
          Data traffic sources (referrer) akan tersedia setelah lebih banyak data terkumpul.
          Kunjungi website Anda dari berbagai sumber untuk melihat breakdown traffic.
        </p>
      </div>
    </div>
  )
}
