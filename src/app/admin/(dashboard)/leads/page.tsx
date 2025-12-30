'use client'

import { useEffect, useState } from 'react'
import { 
  Users, 
  ArrowLeft,
  Loader2,
  RefreshCw,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react'
import Link from 'next/link'

interface Lead {
  _id: string
  name: string
  email?: string
  phone?: string
  message?: string
  submittedAt: string
  status: 'new' | 'contacted' | 'closed'
  source?: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [leadsCount, setLeadsCount] = useState(0)

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch stats
      const statsResponse = await fetch('/api/analytics/stats')
      if (statsResponse.ok) {
        const result = await statsResponse.json()
        setLeadsCount(result.leadsCount || 0)
      }
      
      // Fetch actual leads data
      const leadsResponse = await fetch('/api/leads')
      if (leadsResponse.ok) {
        const leadsData = await leadsResponse.json()
        setLeads(leadsData.leads || [])
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'contacted': return <CheckCircle className="h-4 w-4 text-blue-500" />
      case 'closed': return <XCircle className="h-4 w-4 text-green-500" />
      default: return <Clock className="h-4 w-4 text-slate-500" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Baru'
      case 'contacted': return 'Sudah Dihubungi'
      case 'closed': return 'Selesai'
      default: return status
    }
  }

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
          <h1 className="text-3xl font-bold text-white">Leads</h1>
          <p className="text-slate-400 mt-1">Kontak yang masuk dari website</p>
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

      {/* Stats Card */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-lg">
            <Users className="h-6 w-6 text-orange-500" />
          </div>
          <div>
            {loading ? (
              <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
            ) : (
              <p className="text-3xl font-bold text-white">{leadsCount}</p>
            )}
            <p className="text-slate-400">Total Leads Bulan Ini</p>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Daftar Leads</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
          </div>
        ) : leads.length > 0 ? (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div key={lead._id} className="p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-medium">{lead.name}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                      {lead.email && (
                        <a 
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1 hover:text-blue-400 transition-colors"
                        >
                          <Mail className="h-4 w-4" />
                          {lead.email}
                        </a>
                      )}
                      {lead.phone && (
                        <a 
                          href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-green-400 transition-colors"
                        >
                          <Phone className="h-4 w-4" />
                          {lead.phone}
                        </a>
                      )}
                    </div>
                    {lead.message && (
                      <p className="mt-2 text-slate-300 text-sm flex items-start gap-1">
                        <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        {lead.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {getStatusIcon(lead.status)}
                    <span className="text-slate-400">{getStatusLabel(lead.status)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">Belum ada leads yang masuk</p>
            <p className="text-slate-600 text-sm mt-1">
              Leads akan muncul di sini ketika ada pengunjung yang mengisi form kontak.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
