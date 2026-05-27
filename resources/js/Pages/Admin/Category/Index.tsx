import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { CategoryData, PaginatedData } from '@/types';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Layers, 
    Filter,
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
import AdminPageHeader from '@/Components/shared/AdminPageHeader';
import AdminToolbar from '@/Components/shared/AdminToolbar';
import AdminTableFooter from '@/Components/shared/AdminTableFooter';
import StatusBadge from '@/Components/shared/StatusBadge';
import Pagination from '@/Components/shared/Pagination';
import { useDebounce } from '@/hooks/useDebounce';
import { motion } from 'framer-motion';
import ConfirmationModal from '@/Components/shared/ConfirmationModal';

interface Props {
    categories: PaginatedData<CategoryData>;
    filters: {
        search?: string;
        type?: string;
        per_page?: string;
    };
}

export default function Index({ categories, filters }: Props) {
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
            router.delete(route('admin.categories.destroy', deletingId), {
                onFinish: () => {
                    setIsConfirmOpen(false);
                    setDeletingId(null);
                }
            });
        }
    };

    const updateFilters = (newFilters: any) => {
        router.get(route('admin.categories.index'), {
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
        router.get(route('admin.categories.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

    const hasActiveFilters = filters.type || filters.search || (filters.per_page && filters.per_page !== '10');
    
    const totalCount = categories.meta?.total ?? categories.total ?? 0;

    return (
        <AdminLayout>
            <Head title="Manajemen Kategori | Taaashop" />

            <AdminPageHeader 
                title="Kategori"
                description="Kelola kategori untuk katalog produk dan galeri portfolio."
                action={
                    <Link href={route('admin.categories.create')}>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-lg shadow-primary/20 transition-all active:scale-95">
                            <Plus className="w-5 h-5 mr-2" />
                            Tambah Kategori
                        </Button>
                    </Link>
                }
            />

            <AdminToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                perPage={filters.per_page}
                onPerPageChange={(v) => updateFilters({ per_page: v })}
                placeholder="Cari kategori..."
                action={
                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <Button 
                                variant="ghost" 
                                onClick={clearFilters}
                                className="text-xs font-bold text-stone-400 hover:text-destructive"
                            >
                                <X className="w-3 h-3 mr-1" /> Bersihkan
                            </Button>
                        )}
                        <Popover>
                            <PopoverTrigger render={
                                <Button variant="outline" className="border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider relative">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter Tipe
                                    {filters.type && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                                    )}
                                </Button>
                            } />
                            <PopoverContent className="w-56 p-2" align="end">
                                <div className="space-y-1">
                                    <Button 
                                        variant={filters.type === 'gallery' ? 'default' : 'ghost'} 
                                        className="w-full justify-start text-[10px] font-black uppercase tracking-widest h-9"
                                        onClick={() => updateFilters({ type: filters.type === 'gallery' ? null : 'gallery' })}
                                    >
                                        Galeri Portfolio
                                    </Button>
                                    <Button 
                                        variant={filters.type === 'package' ? 'default' : 'ghost'} 
                                        className="w-full justify-start text-[10px] font-black uppercase tracking-widest h-9"
                                        onClick={() => updateFilters({ type: filters.type === 'package' ? null : 'package' })}
                                    >
                                        Paket Harga
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                }
            />

            {/* Categories Table */}
            <Card className="border-none shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-stone-50">
                            <TableRow className="hover:bg-transparent border-stone-100">
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Kategori</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Slug</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Tipe</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-stone-100">
                            {categories.data && categories.data.length > 0 ? (
                                categories.data.map((category, index) => (
                                    <motion.tr 
                                        key={category.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-stone-50/50 transition-colors group border-stone-100"
                                    >
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                    <Layers className="w-5 h-5" />
                                                </div>
                                                <span className="font-bold text-foreground">{category.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <span className="text-sm font-medium text-stone-500 font-mono bg-stone-100 px-2 py-1 rounded">
                                                {category.slug}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <StatusBadge 
                                                status={category.type === 'package' ? 'contacted' : 'new'} 
                                                className={category.type === 'package' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}
                                            />
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('admin.categories.edit', category.id!)}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-primary hover:bg-primary/10">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(category.id!)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="px-6 py-20 text-center">
                                        <p className="text-stone-500 font-medium italic">Tidak ada kategori ditemukan.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                <AdminTableFooter count={totalCount} label="Kategori" />
                <Pagination links={categories.links} />
            </div>

            <ConfirmationModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Hapus Kategori?"
                description="Kategori yang dihapus mungkin mempengaruhi data produk atau galeri yang terkait. Apakah Anda yakin?"
            />
        </AdminLayout>
    );
}
