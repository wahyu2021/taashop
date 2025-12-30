import { 
  ArrowLeft,
  LayoutDashboard,
  Eye,
  TrendingUp,
  Users,
  Database,
  Home,
  LogOut,
  HelpCircle,
  CheckCircle,
  Sparkles,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'

export default function GuidePage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/admin" 
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-slate-400" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-orange-500" />
            Panduan Admin Panel
          </h1>
          <p className="text-slate-400 mt-1">Cara menggunakan fitur-fitur admin panel TaaShop</p>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-slate-800 rounded-2xl p-8 border border-orange-500/20 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-6 w-6 text-orange-400" />
          <h2 className="text-2xl font-bold text-white">Quick Start</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
            <h3 className="text-white font-semibold mb-2">Lihat Dashboard</h3>
            <p className="text-slate-400 text-sm">Cek ringkasan statistik pengunjung dan leads di halaman <Link href="/admin" className="text-orange-400 hover:underline">Dashboard</Link></p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mb-4">2</div>
            <h3 className="text-white font-semibold mb-2">Kelola Konten</h3>
            <p className="text-slate-400 text-sm">Gunakan <Link href="/admin/studio" className="text-orange-400 hover:underline">Sanity Studio</Link> untuk menambah atau edit konten website</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
            <h3 className="text-white font-semibold mb-2">Pantau Leads</h3>
            <p className="text-slate-400 text-sm">Lihat pesan masuk dari pengunjung di halaman <Link href="/admin/leads" className="text-orange-400 hover:underline">Leads</Link></p>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <h2 className="text-xl font-semibold text-white mb-4">Fitur-Fitur Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Dashboard */}
        <FeatureCard
          icon={LayoutDashboard}
          title="Dashboard"
          description="Halaman utama dengan ringkasan statistik website"
          features={[
            'Total Page Views bulan ini',
            'Unique Visitors',
            'Views hari ini',
            'Jumlah Leads',
            'Top 10 halaman populer',
          ]}
        />

        {/* Pengunjung */}
        <FeatureCard
          icon={Eye}
          title="Pengunjung"
          description="Detail statistik pengunjung website"
          features={[
            'Total page views',
            'Unique visitors by session',
            'Daftar halaman paling populer',
          ]}
        />

        {/* Traffic */}
        <FeatureCard
          icon={TrendingUp}
          title="Traffic"
          description="Analisis traffic dan performa website"
          features={[
            'Total views bulan ini',
            'Views hari ini',
            'Perbandingan dengan bulan lalu',
          ]}
        />

        {/* Leads */}
        <FeatureCard
          icon={Users}
          title="Leads"
          description="Kelola pesan dan kontak dari pengunjung"
          features={[
            'Daftar pesan masuk',
            'Status: Baru, Dihubungi, Selesai',
            'Detail kontak (nama, email, telepon)',
          ]}
        />
      </div>

      {/* Sanity Studio */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <Database className="h-8 w-8 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">Sanity Studio</h3>
            <p className="text-slate-400 mb-4">Content Management System untuk mengelola semua konten website Anda.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <p className="text-white font-medium">Produk</p>
                <p className="text-slate-400 text-xs mt-1">Tambah/edit produk</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <p className="text-white font-medium">Galeri</p>
                <p className="text-slate-400 text-xs mt-1">Upload gambar</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <p className="text-white font-medium">Testimoni</p>
                <p className="text-slate-400 text-xs mt-1">Kelola testimoni</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <p className="text-white font-medium">FAQ</p>
                <p className="text-slate-400 text-xs mt-1">Edit FAQ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Navigasi Sidebar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-orange-400 font-medium text-sm mb-3 uppercase tracking-wider">Analytics</p>
            <div className="space-y-2">
              <NavItem icon={LayoutDashboard} label="Dashboard" desc="Ringkasan statistik" />
              <NavItem icon={Eye} label="Pengunjung" desc="Detail visitor" />
              <NavItem icon={TrendingUp} label="Traffic" desc="Analisis traffic" />
              <NavItem icon={Users} label="Leads" desc="Pesan masuk" />
            </div>
          </div>
          <div>
            <p className="text-orange-400 font-medium text-sm mb-3 uppercase tracking-wider">Lainnya</p>
            <div className="space-y-2">
              <NavItem icon={Database} label="Sanity Studio" desc="Kelola konten" />
              <NavItem icon={Home} label="Lihat Website" desc="Preview frontend" />
              <NavItem icon={HelpCircle} label="Panduan" desc="Bantuan" />
              <NavItem icon={LogOut} label="Keluar" desc="Logout" />
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-500/10 to-slate-800 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          💡 Tips Penggunaan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TipItem text="Klik tombol Refresh untuk memperbarui data statistik" />
          <TipItem text="Sanity Studio akan terbuka di tab baru" />
          <TipItem text="Data analytics dikumpulkan otomatis dari pengunjung" />
          <TipItem text="Gunakan Leads untuk memantau calon pelanggan" />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  features 
}: { 
  icon: React.ElementType
  title: string
  description: string
  features: string[]
}) {
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-orange-500/10 rounded-lg">
          <Icon className="h-6 w-6 text-orange-500" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-slate-400 text-sm mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function NavItem({ icon: Icon, label, desc }: { icon: React.ElementType; label: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-700/30">
      <Icon className="h-4 w-4 text-slate-400" />
      <div>
        <p className="text-white text-sm">{label}</p>
        <p className="text-slate-500 text-xs">{desc}</p>
      </div>
    </div>
  )
}

function TipItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 text-slate-300 text-sm">
      <span className="text-orange-400">•</span>
      {text}
    </div>
  )
}

