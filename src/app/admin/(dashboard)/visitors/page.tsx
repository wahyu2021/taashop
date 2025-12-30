'use client'

import { useEffect, useState } from 'react'
import { 
  Eye, 
  ArrowLeft,
  Globe,
  Loader2,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'

interface PageView {
  path: string
  count: number
}

interface VisitorData {
  totalViews: number
  uniqueVisitors: number
  topPages: PageView[]
}

export default function VisitorsPage() {
  const [data, setData] = useState<VisitorData | null>(null)
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
          <h1 className="text-3xl font-bold text-white">Pengunjung</h1>
          <p className="text-slate-400 mt-1">Detail statistik pengunjung website</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Eye className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
              ) : (
                <p className="text-3xl font-bold text-white">{data?.totalViews?.toLocaleString() ?? 0}</p>
              )}
              <p className="text-slate-400">Total Page Views (Bulan Ini)</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Globe className="h-6 w-6 text-green-500" />
            </div>
            <div>
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
              ) : (
                <p className="text-3xl font-bold text-white">{data?.uniqueVisitors?.toLocaleString() ?? 0}</p>
              )}
              <p className="text-slate-400">Unique Visitors (Bulan Ini)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Halaman Paling Banyak Dikunjungi</h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
          </div>
        ) : data?.topPages && data.topPages.length > 0 ? (
          <div className="space-y-3">
            {data.topPages.map((page, index) => (
              <div key={page.path} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-slate-600 w-8">{index + 1}</span>
                  <span className="text-white">{page.path}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-orange-400">{page.count}</span>
                  <span className="text-slate-500 text-sm">views</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">Belum ada data pengunjung</p>
        )}
      </div>
    </div>
  )
}
