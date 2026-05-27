import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PartnerData, PaginatedData } from '@/types';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Image as ImageIcon, 
    X,
    CheckCircle2,
    XCircle
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
import { useState, useEffect } from 'react';
import AdminPageHeader from '@/Components/shared/AdminPageHeader';
import AdminToolbar from '@/Components/shared/AdminToolbar';
import AdminTableFooter from '@/Components/shared/AdminTableFooter';
import Pagination from '@/Components/shared/Pagination';
import { useDebounce } from '@/hooks/useDebounce';
import { motion } from 'framer-motion';
import ConfirmationModal from '@/Components/shared/ConfirmationModal';

interface Props {
    partners: PaginatedData<PartnerData>;
    filters: {
        search?: string;
        is_active?: string;
        per_page?: string;
    };
}

export default function Index({ partners, filters }: Props) {
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
            router.delete(route('admin.partners.destroy', deletingId), {
                onFinish: () => {
                    setIsConfirmOpen(false);
                    setDeletingId(null);
                }
            });
        }
    };

    const updateFilters = (newFilters: any) => {
        router.get(route('admin.partners.index'), {
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
        router.get(route('admin.partners.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

    const hasActiveFilters = filters.is_active || filters.search || (filters.per_page && filters.per_page !== '10');
    
    const totalCount = partners.meta?.total ?? partners.total ?? 0;

    return (
        <AdminLayout>
            <Head title="Manajemen Partner | Taaashop" />

            <AdminPageHeader 
                title="Partner & Klien"
                description="Kelola daftar logo partner atau klien yang sudah mempercayai Taaashop."
                action={
                    <Link href={route('admin.partners.create')}>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-lg shadow-primary/20 transition-all active:scale-95">
                            <Plus className="w-5 h-5 mr-2" />
                            Tambah Partner
                        </Button>
                    </Link>
                }
            />

            <AdminToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                perPage={filters.per_page}
                onPerPageChange={(v) => updateFilters({ per_page: v })}
                placeholder="Cari nama partner..."
                action={
                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <Button variant="ghost" onClick={clearFilters} className="text-xs font-bold text-stone-400">
                                <X className="w-3 h-3 mr-1" /> Bersihkan
                            </Button>
                        )}
                    </div>
                }
            />

            <Card className="border-none shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-stone-50">
                            <TableRow className="hover:bg-transparent border-stone-100">
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Logo & Nama</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Status</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-stone-100">
                            {partners.data && partners.data.length > 0 ? (
                                partners.data.map((partner, index) => (
                                    <motion.tr 
                                        key={partner.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-stone-50/50 transition-colors group border-stone-100"
                                    >
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-12 rounded-lg bg-white border border-stone-200 overflow-hidden shrink-0 p-1 flex items-center justify-center">
                                                    {partner.logo_url ? (
                                                        <img src={partner.logo_url} alt={partner.name} className="max-w-full max-h-full object-contain" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                                                            <ImageIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-foreground block leading-tight">{partner.name}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            {partner.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                    <CheckCircle2 className="w-3 h-3" /> Aktif
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-stone-100 text-stone-400 border border-stone-200">
                                                    <XCircle className="w-3 h-3" /> Nonaktif
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('admin.partners.edit', partner.id!)}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-primary hover:bg-primary/10">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(partner.id!)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="px-6 py-20 text-center">
                                        <p className="text-stone-500 font-medium italic">Tidak ada partner ditemukan.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                <AdminTableFooter count={totalCount} label="Partner" />
                <Pagination links={partners.links} />
            </div>

            <ConfirmationModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Hapus Partner?"
                description="Data partner ini akan dihapus permanen. Apakah Anda yakin?"
            />
        </AdminLayout>
    );
}
