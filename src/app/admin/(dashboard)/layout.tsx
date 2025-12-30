'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Eye,
  Database,
  ExternalLink,
  LogOut, 
  Loader2,
  Home,
  HelpCircle,
  Shield
} from 'lucide-react'
import { useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex bg-slate-900 overflow-hidden" data-admin="true">
      {/* Sidebar - Fixed */}
      <aside className="w-64 h-screen bg-slate-800 border-r border-slate-700 flex flex-col flex-shrink-0">
        {/* Header with Logo */}
        <div className="p-5 border-b border-slate-700">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
              <Image 
                src="/logo.svg" 
                alt="TaaShop" 
                width={28} 
                height={28}
                className="brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">TaaShop</h1>
              <div className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-orange-400" />
                <span className="text-xs text-orange-400 font-medium">Admin Panel</span>
              </div>
            </div>
          </Link>
        </div>


        <nav className="flex-1 p-4 overflow-y-auto">
          {/* Analytics Section */}
          <div className="mb-6">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Analytics
            </p>
            <ul className="space-y-1">
              <SidebarLink href="/admin" icon={<LayoutDashboard className="h-5 w-5" />}>
                Dashboard
              </SidebarLink>
              <SidebarLink href="/admin/visitors" icon={<Eye className="h-5 w-5" />}>
                Pengunjung
              </SidebarLink>
              <SidebarLink href="/admin/traffic" icon={<TrendingUp className="h-5 w-5" />}>
                Traffic
              </SidebarLink>
              <SidebarLink href="/admin/leads" icon={<Users className="h-5 w-5" />}>
                Leads
              </SidebarLink>
            </ul>
          </div>

          {/* Content Management Section */}
          <div className="mb-6">
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Kelola Konten
            </p>
            <ul className="space-y-1">
              <SidebarLink 
                href="/admin/studio" 
                icon={<Database className="h-5 w-5" />}
                external
              >
                Sanity Studio
              </SidebarLink>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Quick Links
            </p>
            <ul className="space-y-1">
              <SidebarLink 
                href="/" 
                icon={<Home className="h-5 w-5" />}
                external
              >
                Lihat Website
              </SidebarLink>
              <SidebarLink 
                href="/admin/guide" 
                icon={<HelpCircle className="h-5 w-5" />}
              >
                Panduan
              </SidebarLink>
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-3">
          <LogoutButton />
          <div className="text-center">
            <p className="text-slate-600 text-xs">v1.0.0 • TaaShop Konveksi</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

function SidebarLink({
  href,
  icon,
  children,
  external = false,
  disabled = false,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  external?: boolean
  disabled?: boolean
}) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  if (disabled) {
    return (
      <li>
        <span
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-600 cursor-not-allowed"
          title="Coming soon"
        >
          {icon}
          <span className="flex-1">{children}</span>
          <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">Soon</span>
        </span>
      </li>
    )
  }
  
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          isActive 
            ? 'text-white bg-orange-600' 
            : 'text-slate-400 hover:text-white hover:bg-slate-700'
        }`}
      >
        {icon}
        <span className="flex-1">{children}</span>
        {external && <ExternalLink className="h-4 w-4 opacity-50" />}
      </Link>
    </li>
  )
}

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/admin/login'
    } catch (error) {
      console.error('Logout error:', error)
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <LogOut className="h-5 w-5" />
      )}
      {isLoading ? 'Keluar...' : 'Keluar'}
    </button>
  )
}


