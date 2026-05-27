import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { DashboardStats } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Package, Inbox, ShoppingBag, Layers } from 'lucide-react';
import StatCard from '@/Components/features/dashboard/StatCard';
import QuickGuide from '@/Components/features/dashboard/QuickGuide';
import { motion } from 'framer-motion';

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
            <Head title="Dashboard | Taaashop" />

            {/* Welcome Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                    Halo, {auth.user.name}! 👋
                </h1>
                <p className="text-stone-500 mt-1 font-medium">
                    Selamat datang kembali di panel manajemen <span className="text-primary font-bold">Taaashop</span>.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions / Activity */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3"
            >
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
                
                <QuickGuide />
            </motion.div>
        </AdminLayout>
    );
}