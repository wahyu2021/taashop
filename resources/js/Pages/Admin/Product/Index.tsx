import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ProductData, CategoryData, PaginatedData } from '@/types';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Filter,
    Star,
    Image as ImageIcon,
    X
} from 'lucide-react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
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
import AdminPageHeader from '@/Components/shared/AdminPageHeader';
import AdminToolbar from '@/Components/shared/AdminToolbar';
import AdminTableFooter from '@/Components/shared/AdminTableFooter';
import StatusBadge from '@/Components/shared/StatusBadge';
import Pagination from '@/Components/shared/Pagination';
import { useDebounce } from '@/hooks/useDebounce';
import { motion } from 'framer-motion';
import ConfirmationModal from '@/Components/shared/ConfirmationModal';

interface Props {
    products: PaginatedData<ProductData>;
    categories: CategoryData[];
    filters: {
        search?: string;
        category_id?: string;
        status?: string;
        is_featured?: string;
        per_page?: string;
    };
    statuses: string[];
}

export default function Index({ products, categories, filters, statuses }: Props) {
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
            router.delete(route('admin.products.destroy', deletingId), {
                onFinish: () => {
                    setIsConfirmOpen(false);
                    setDeletingId(null);
                }
            });
        }
    };

    const updateFilters = (newFilters: any) => {
        router.get(route('admin.products.index'), {
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
        router.get(route('admin.products.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

    const hasActiveFilters = filters.category_id || filters.status || filters.is_featured || filters.search || (filters.per_page && filters.per_page !== '10');

    const totalCount = products.meta?.total ?? products.total ?? 0;

    return (
        <AdminLayout>
            <Head title="Manajemen Produk | Taaashop" />

            <AdminPageHeader 
                title="Produk"
                description="Kelola katalog produk jersey dan sablon kustom Anda."
                action={
                    <Link href={route('admin.products.create')}>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-lg shadow-primary/20 transition-all active:scale-95">
                            <Plus className="w-5 h-5 mr-2" />
                            Tambah Produk
                        </Button>
                    </Link>
                }
            />

            <AdminToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                perPage={filters.per_page}
                onPerPageChange={(v) => updateFilters({ per_page: v })}
                placeholder="Cari produk atau kategori..."
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
                                    {(filters.category_id || filters.status || filters.is_featured) && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                                    )}
                                </Button>
                            } />
                            <PopoverContent className="w-80 p-0" align="end">                                <div className="p-4 border-b border-stone-100 bg-stone-50/50">
                                    <h4 className="font-bold text-sm text-stone-700 uppercase tracking-widest">Filter Lanjutan</h4>
                                </div>
                                <div className="p-4 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Status Produk</label>
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
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id!}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-t border-stone-100 mt-4">
                                        <label className="text-xs font-bold text-stone-600">Hanya Unggulan</label>
                                        <button onClick={() => updateFilters({ is_featured: filters.is_featured === '1' ? null : '1' })} className={`w-10 h-5 rounded-full transition-colors relative ${filters.is_featured === '1' ? 'bg-primary' : 'bg-stone-200'}`}>
                                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${filters.is_featured === '1' ? 'translate-x-5' : ''}`} />
                                        </button>
                                    </div>
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
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Produk</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Kategori</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto text-center">Featured</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Status</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-stone-100">
                            {products.data && products.data.length > 0 ? (
                                products.data.map((product, index) => (
                                    <motion.tr 
                                        key={product.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-stone-50/50 transition-colors group border-stone-100"
                                    >
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                                                    {product.image_url ? (
                                                        <img src={product.image_url} alt={product.title} loading="lazy" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                                                            <ImageIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-foreground block leading-tight">{product.title}</span>
                                                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">{product.slug}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            {product.category ? (
                                                <Badge variant="secondary" className="bg-stone-100 text-stone-600 border-none font-bold text-[10px] uppercase">
                                                    {product.category.name}
                                                </Badge>
                                            ) : (
                                                <span className="text-stone-300 italic text-xs">Tanpa Kategori</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-center">
                                            {product.is_featured ? (
                                                <div className="flex justify-center">
                                                    <div className="p-1.5 rounded-full bg-orange-100 text-orange-500 shadow-sm border border-orange-200">
                                                        <Star className="w-4 h-4 fill-orange-500" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-stone-200">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <StatusBadge status={product.status} />
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('admin.products.edit', product.id!)}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-primary hover:bg-primary/10">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(product.id!)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="px-6 py-20 text-center">
                                        <p className="text-stone-500 font-medium italic">Tidak ada produk ditemukan.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                <AdminTableFooter count={totalCount} label="Produk" />
                <Pagination links={products.links} />
            </div>

            <ConfirmationModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Hapus Produk?"
                description="Produk yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?"
            />
        </AdminLayout>
    );
}
