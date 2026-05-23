import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { DashboardStats } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Package, Inbox, ShoppingBag, Layers, ArrowUpRight } from 'lucide-react';

export default function Dashboard({ auth, stats }: PageProps<{ stats: DashboardStats }>) {
    const statCards = [
        {
            title: 'Total Produk',
            value: stats.total_products,
            icon: ShoppingBag,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            border: 'border-orange-100',
        },
        {
            title: 'Material Bahan',
            value: stats.total_materials,
            icon: Layers,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
        },
        {
            title: 'Paket Harga',
            value: stats.total_packages,
            icon: Package,
            color: 'text-green-600',
            bg: 'bg-green-50',
            border: 'border-green-100',
        },
        {
            title: 'Pesan Masuk',
            value: stats.new_messages,
            icon: Inbox,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            border: 'border-purple-100',
        },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                    Halo, {auth.user.name}! 👋
                </h1>
                <p className="text-stone-500 mt-1 font-medium">
                    Selamat datang kembali di panel manajemen <span className="text-primary font-bold">Taashop</span>.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, index) => (
                    <Card key={index} className={`border ${stat.border} shadow-sm hover:shadow-md transition-all duration-300 group`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-stone-600 uppercase tracking-wider">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2.5 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-2">
                                <div className="text-3xl font-black text-foreground">
                                    {stat.value}
                                </div>
                                <span className="text-xs font-bold text-stone-400">Unit</span>
                            </div>
                            <div className="mt-4 flex items-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                <span>Data Realtime</span>
                                <ArrowUpRight className="ml-1 h-3 w-3" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions / Activity */}
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
                    <CardHeader className="border-b border-stone-100 bg-stone-50/50">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <Layers className="w-5 h-5 text-primary" />
                            Aktivitas Terakhir
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-stone-100">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 flex items-center gap-4 hover:bg-stone-50/50 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-foreground">Pembaruan stok material "Jersey Drifit"</p>
                                        <p className="text-xs text-stone-400">2 jam yang lalu oleh Admin</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-xs font-bold text-primary hover:text-primary hover:bg-primary/10">
                                        Detail
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 text-center">
                            <Button variant="link" className="text-xs font-bold text-stone-400 hover:text-primary">
                                Lihat Semua Aktivitas
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="border-none shadow-sm bg-primary text-primary-foreground overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Package className="w-32 h-32 rotate-12" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Bantuan & Panduan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm font-medium leading-relaxed opacity-90">
                            Gunakan menu di samping untuk mengelola katalog produk, bahan, dan pesan dari pelanggan secara efisien.
                        </p>
                        <ul className="text-xs space-y-2 font-bold opacity-80">
                            <li className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-white" />
                                Tambah Produk Baru
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-white" />
                                Update Harga Paket
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-white" />
                                Balas Pesan Pelanggan
                            </li>
                        </ul>
                        <Button className="w-full bg-white text-primary hover:bg-stone-100 font-bold border-none">
                            Buka Dokumentasi
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
