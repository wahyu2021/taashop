import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { MaterialData, PaginatedData } from '@/types';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Filter,
    Image as ImageIcon,
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

interface Props {
    materials: PaginatedData<MaterialData>;
    filters: {
        search?: string;
        status?: string;
        per_page?: string;
    };
    statuses: string[];
}

export default function Index({ materials, filters, statuses }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus material ini?')) {
            router.delete(route('admin.materials.destroy', id));
        }
    };

    const updateFilters = (newFilters: any) => {
        router.get(route('admin.materials.index'), {
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
        router.get(route('admin.materials.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

    const hasActiveFilters = filters.status || filters.search || (filters.per_page && filters.per_page !== '10');
    
    const totalCount = materials.meta?.total ?? materials.total ?? 0;

    return (
        <AdminLayout>
            <Head title="Manajemen Material Bahan" />

            <AdminPageHeader 
                title="Material Bahan"
                description="Kelola berbagai jenis bahan kain dan kualitas sablon yang Anda tawarkan."
                action={
                    <Link href={route('admin.materials.create')}>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-lg shadow-primary/20 transition-all active:scale-95">
                            <Plus className="w-5 h-5 mr-2" />
                            Tambah Material
                        </Button>
                    </Link>
                }
            />

            <AdminToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                perPage={filters.per_page}
                onPerPageChange={(v) => updateFilters({ per_page: v })}
                placeholder="Cari material..."
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
                                    {filters.status && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                                    )}
                                </Button>
                            } />
                            <PopoverContent className="w-56 p-2" align="end">
                                <div className="space-y-1">
                                    {statuses.map(s => {
                                        const val = s.toLowerCase();
                                        const active = filters.status === val;
                                        return (
                                            <Button 
                                                key={val}
                                                variant={active ? 'default' : 'ghost'} 
                                                className="w-full justify-start text-[10px] font-black uppercase tracking-widest h-9"
                                                onClick={() => updateFilters({ status: active ? null : val })}
                                            >
                                                {s}
                                            </Button>
                                        );
                                    })}
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
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Material</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Fitur Unggulan</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Status</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-stone-100">
                            {materials.data && materials.data.length > 0 ? (
                                materials.data.map((material) => (
                                    <TableRow key={material.id} className="hover:bg-stone-50/50 transition-colors group border-stone-100">
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                                                    {material.image_url ? (
                                                        <img src={material.image_url} alt={material.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                                                            <ImageIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-foreground block leading-tight">{material.name}</span>
                                                    <span className="text-xs text-stone-400 line-clamp-1 max-w-[200px]">{material.summary || '-'}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1 max-w-[300px]">
                                                {material.features.slice(0, 3).map((feature, i) => (
                                                    <span key={i} className="text-[10px] font-bold border border-stone-200 text-stone-500 bg-stone-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                                        {feature}
                                                    </span>
                                                ))}
                                                {material.features.length > 3 && (
                                                    <span className="text-[10px] text-stone-400 font-bold">+{material.features.length - 3} lagi</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <StatusBadge status={material.status} />
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('admin.materials.edit', material.id!)}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-primary hover:bg-primary/10">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(material.id!)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="px-6 py-20 text-center">
                                        <p className="text-stone-500 font-medium italic">Tidak ada material ditemukan.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                <AdminTableFooter count={totalCount} label="Material" />
                <Pagination links={materials.links} />
            </div>
        </AdminLayout>
    );
}
