import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { DashboardStats } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Package, Inbox, ShoppingBag, Layers } from 'lucide-react';

export default function Dashboard({ auth, stats }: PageProps<{ stats: DashboardStats }>) {
    const statCards = [
        {
            title: 'Total Produk',
            value: stats.total_products,
            icon: ShoppingBag,
            color: 'text-orange-600',
            bg: 'bg-orange-100',
        },
        {
            title: 'Material Bahan',
            value: stats.total_materials,
            icon: Layers,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
        },
        {
            title: 'Paket Harga',
            value: stats.total_packages,
            icon: Package,
            color: 'text-green-600',
            bg: 'bg-green-100',
        },
        {
            title: 'Pesan Masuk',
            value: stats.new_messages,
            icon: Inbox,
            color: 'text-purple-600',
            bg: 'bg-purple-100',
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-bold leading-tight text-stone-900">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-stone-900">Halo, {auth.user.name}! 👋</h1>
                        <p className="text-stone-500">Selamat datang kembali di panel manajemen Taashop.</p>
                    </div>

                    {/* Stats Grid - Mobile First (1 col), Tablet (2 col), Desktop (4 col) */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((stat, index) => (
                            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-stone-600">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-stone-900">
                                        {stat.value}
                                    </div>
                                    <p className="text-xs text-stone-500">Data terupdate hari ini</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Quick Actions / Activity (Placeholder for next tasks) */}
                    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Aktivitas Terakhir</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-stone-500 italic">Belum ada aktivitas terekam.</p>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-none shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Bantuan & Panduan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-stone-500">
                                    Gunakan menu di samping untuk mengelola katalog produk, bahan, dan pesan dari pelanggan.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
