import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PortfolioData } from '@/types';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Image as ImageIcon, 
    Calendar,
    User
} from 'lucide-react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import AdminPageHeader from '@/Components/shared/AdminPageHeader';
import AdminToolbar from '@/Components/shared/AdminToolbar';
import AdminTableFooter from '@/Components/shared/AdminTableFooter';
import StatusBadge from '@/Components/shared/StatusBadge';

interface Props {
    portfolios: PortfolioData[];
}

export default function Index({ portfolios }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus portfolio ini?')) {
            router.delete(route('admin.portfolios.destroy', id));
        }
    };

    const filteredPortfolios = portfolios.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Manajemen Portfolio" />

            <AdminPageHeader 
                title="Portfolio Galeri"
                description="Tampilkan hasil jadi produk terbaik Anda kepada calon pelanggan."
                action={
                    <Link href={route('admin.portfolios.create')}>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-lg shadow-primary/20 transition-all active:scale-95">
                            <Plus className="w-5 h-5 mr-2" />
                            Tambah Portfolio
                        </Button>
                    </Link>
                }
            />

            <AdminToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Cari portfolio, klien, atau kategori..."
            />

            {/* Portfolios Table */}
            <Card className="border-none shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-stone-50">
                            <TableRow className="hover:bg-transparent border-stone-100">
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Hasil Jadi</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Klien & Tanggal</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Kategori</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Status</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-stone-100">
                            {filteredPortfolios.length > 0 ? (
                                filteredPortfolios.map((portfolio) => (
                                    <TableRow key={portfolio.id} className="hover:bg-stone-50/50 transition-colors group border-stone-100">
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                                                    {portfolio.image_url ? (
                                                        <img src={portfolio.image_url} alt={portfolio.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                                                            <ImageIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-foreground block leading-tight">{portfolio.title}</span>
                                                    <span className="text-[10px] font-mono text-stone-400">{portfolio.slug}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
                                                    <User className="w-3 h-3" /> {portfolio.client_name || '-'}
                                                </span>
                                                <span className="text-[10px] text-stone-400 flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3" /> 
                                                    {portfolio.project_date ? format(new Date(portfolio.project_date), 'dd MMM yyyy', { locale: id }) : '-'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span className="text-xs font-bold text-stone-600 px-2 py-0.5 bg-stone-100 rounded-full">
                                                {portfolio.category?.name || '-'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <StatusBadge status={portfolio.status} />
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('admin.portfolios.edit', portfolio.id!)}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-primary hover:bg-primary/10">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(portfolio.id!)}
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
                                        Tidak ada portfolio ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <AdminTableFooter count={filteredPortfolios.length} label="Portfolio" />
        </AdminLayout>
    );
}
