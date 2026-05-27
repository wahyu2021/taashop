import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PortfolioData, CategoryData, PaginatedData } from '@/types';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Image as ImageIcon, 
    Filter,
    Calendar,
    User,
    X
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import AdminPageHeader from '@/Components/shared/AdminPageHeader';
import AdminToolbar from '@/Components/shared/AdminToolbar';
import AdminTableFooter from '@/Components/shared/AdminTableFooter';
import StatusBadge from '@/Components/shared/StatusBadge';
import Pagination from '@/Components/shared/Pagination';
import { useDebounce } from '@/hooks/useDebounce';
import { motion } from 'framer-motion';
import ConfirmationModal from '@/Components/shared/ConfirmationModal';

interface Props {
    portfolios: PaginatedData<PortfolioData>;
    categories: CategoryData[];
    filters: {
        search?: string;
        category_id?: string;
        status?: string;
        per_page?: string;
    };
    statuses: string[];
}

export default function Index({ portfolios, categories, filters, statuses }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setDeletingId(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (deletingId) {
            router.delete(route('admin.portfolios.destroy', deletingId), {
                onFinish: () => {
                    setIsConfirmOpen(false);
                    setDeletingId(null);
                }
            });
        }
    };

    const updateFilters = (newFilters: any) => {
        router.get(route('admin.portfolios.index'), {
            ...filters,
            ...newFilters,
            page: 1
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        updateFilters({ search: debouncedSearch });
    }, [debouncedSearch]);

    const clearFilters = () => {
        setSearchQuery('');
        router.get(route('admin.portfolios.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

    const hasActiveFilters = filters.status || filters.category_id || filters.search || (filters.per_page && filters.per_page !== '10');
    
    const totalCount = portfolios.meta?.total ?? portfolios.total ?? 0;

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
                perPage={filters.per_page}
                onPerPageChange={(v) => updateFilters({ per_page: v })}
                placeholder="Cari portfolio atau klien..."
                action={
                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <Button variant="ghost" onClick={clearFilters} className="text-xs font-bold text-stone-400">
                                <X className="w-3 h-3 mr-1" /> Bersihkan
                            </Button>
                        )}
                        <Popover>
                            <PopoverTrigger render={
                                <Button variant="outline" className="border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider relative">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                    {(filters.status || filters.category_id) && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                                    )}
                                </Button>
                            } />
                            <PopoverContent className="w-64 p-4 space-y-6" align="end">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Status</label>
                                    <div className="flex flex-wrap gap-2">
                                        {statuses.map(s => {
                                            const val = s.toLowerCase();
                                            const active = filters.status === val;
                                            return (
                                                <Button key={val} variant={active ? 'default' : 'outline'} size="sm" className="text-[10px] h-7 px-3 font-bold uppercase" onClick={() => updateFilters({ status: active ? null : val })}>
                                                    {s}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Kategori</label>
                                    <select value={filters.category_id || ''} onChange={(e) => updateFilters({ category_id: e.target.value || null })} className="w-full bg-stone-50 border-stone-200 rounded-lg text-xs font-bold focus:ring-primary/20">
                                        <option value="">Semua Kategori</option>
                                        {categories.filter(c => c.type === 'gallery').map(cat => (
                                            <option key={cat.id} value={cat.id!}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                }
            />

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
                            {portfolios.data && portfolios.data.length > 0 ? (
                                portfolios.data.map((portfolio, index) => (
                                    <motion.tr 
                                        key={portfolio.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-stone-50/50 transition-colors group border-stone-100"
                                    >
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
                                                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">{portfolio.slug}</span>
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
                                            <span className="text-[10px] font-black uppercase tracking-widest text-stone-600 px-2 py-0.5 bg-stone-100 rounded-full">
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
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(portfolio.id!)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="px-6 py-20 text-center">
                                        <p className="text-stone-500 font-medium italic">Tidak ada portfolio ditemukan.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                <AdminTableFooter count={totalCount} label="Portfolio" />
                <Pagination links={portfolios.links} />
            </div>

            <ConfirmationModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Hapus Portfolio?"
                description="Portfolio yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?"
            />
        </AdminLayout>
    );
}
