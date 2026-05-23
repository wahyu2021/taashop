import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PackageData } from '@/types';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Package as PackageIcon, 
    ExternalLink,
    Search,
    Image as ImageIcon,
    Tag
} from 'lucide-react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Badge } from '@/Components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useState } from 'react';

interface Props {
    packages: PackageData[];
}

export default function Index({ packages }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus paket harga ini?')) {
            router.delete(route('admin.packages.destroy', id));
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const filteredPackages = packages.filter(pkg => 
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.product_type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Manajemen Paket Harga" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                        Paket Harga
                    </h1>
                    <p className="text-stone-500 mt-1 font-medium">
                        Kelola daftar harga paket jersey dan sablon untuk pelanggan.
                    </p>
                </div>
                <Link href={route('admin.packages.create')}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-lg shadow-primary/20 transition-all active:scale-95">
                        <Plus className="w-5 h-5 mr-2" />
                        Tambah Paket
                    </Button>
                </Link>
            </div>

            {/* Toolbar Section */}
            <Card className="mb-6 border-none shadow-sm bg-white/50 backdrop-blur-sm">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 z-10" />
                        <Input 
                            type="text" 
                            placeholder="Cari paket atau tipe produk..." 
                            className="pl-10 bg-stone-100 border-none focus-visible:ring-primary/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Packages Table */}
            <Card className="border-none shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-stone-50">
                            <TableRow className="hover:bg-transparent border-stone-100">
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Paket</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Range Harga</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Tipe Print</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Status</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-stone-100">
                            {filteredPackages.length > 0 ? (
                                filteredPackages.map((pkg) => (
                                    <TableRow key={pkg.id} className="hover:bg-stone-50/50 transition-colors group border-stone-100">
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0">
                                                    {pkg.image_url ? (
                                                        <img src={pkg.image_url} alt={pkg.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                                                            <ImageIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-foreground block leading-tight">{pkg.title}</span>
                                                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{pkg.product_type}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-stone-700">{formatCurrency(pkg.min_price)}</span>
                                                <span className="text-[10px] text-stone-400 font-medium">s/d {formatCurrency(pkg.max_price)}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            {pkg.print_type ? (
                                                <Badge variant="outline" className="text-[10px] font-bold border-stone-200 text-stone-500 bg-stone-50">
                                                    {pkg.print_type}
                                                </Badge>
                                            ) : (
                                                <span className="text-stone-300 italic text-xs">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Badge 
                                                className={`
                                                    text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border-none
                                                    ${pkg.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-500'}
                                                `}
                                            >
                                                {pkg.status === 'published' ? 'Aktif' : 'Draft'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('admin.packages.edit', pkg.id!)}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-primary hover:bg-primary/10">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(pkg.id!)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="px-6 py-12 text-center text-stone-500 italic">
                                        Tidak ada paket ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Quick Info Footer */}
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
                <ExternalLink className="w-3 h-3" />
                <span>Total {filteredPackages.length} Paket Terdaftar</span>
            </div>
        </AdminLayout>
    );
}
