import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PackageData, PaginatedData } from '@/types';
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
import { Input } from '@/Components/ui/input';
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
    packages: PaginatedData<PackageData>;
    filters: {
        search?: string;
        status?: string;
        print_type?: string;
        per_page?: string;
    };
    statuses: string[];
    printTypes: { name: string, value: string }[];
}

export default function Index({ packages, filters, statuses, printTypes }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus paket harga ini?')) {
            router.delete(route('admin.packages.destroy', id));
        }
    };

    const updateFilters = (newFilters: any) => {
        router.get(route('admin.packages.index'), {
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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const clearFilters = () => {
        setSearchQuery('');
        router.get(route('admin.packages.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

    const hasActiveFilters = filters.status || filters.print_type || filters.search || (filters.per_page && filters.per_page !== '10');
    
    const totalCount = packages.meta?.total ?? packages.total ?? 0;

    return (
        <AdminLayout>
            <Head title="Manajemen Paket Harga" />

            <AdminPageHeader 
                title="Paket Harga"
                description="Kelola daftar harga paket jersey dan sablon untuk pelanggan."
                action={
                    <Link href={route('admin.packages.create')}>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-lg shadow-primary/20 transition-all active:scale-95">
                            <Plus className="w-5 h-5 mr-2" />
                            Tambah Paket
                        </Button>
                    </Link>
                }
            />

            <AdminToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                perPage={filters.per_page}
                onPerPageChange={(v) => updateFilters({ per_page: v })}
                placeholder="Cari paket atau tipe produk..."
                action={
                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <Button variant="ghost" onClick={clearFilters} className="text-xs font-bold text-stone-400">
                                <X className="w-3 h-3 mr-1" /> Bersihkan
                            </Button>
                        )}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider relative">
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filter
                                    {(filters.status || filters.print_type) && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                                    )}
                                </Button>
                            </PopoverTrigger>
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
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Tipe Print</label>
                                    <select value={filters.print_type || ''} onChange={(e) => updateFilters({ print_type: e.target.value || null })} className="w-full bg-stone-50 border-stone-200 rounded-lg text-xs font-bold focus:ring-primary/20 transition-all">
                                        <option value="">Semua Tipe</option>
                                        {printTypes.map(pt => (
                                            <option key={pt.value} value={pt.value}>{pt.name}</option>
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
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Paket</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Range Harga</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Tipe Print</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Status</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-stone-100">
                            {packages.data && packages.data.length > 0 ? (
                                packages.data.map((pkg) => (
                                    <TableRow key={pkg.id} className="hover:bg-stone-50/50 transition-colors group border-stone-100">
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
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
                                                <span className="text-[10px] font-bold border border-stone-200 text-stone-500 bg-stone-50 px-2 py-0.5 rounded-full">
                                                    {pkg.print_type}
                                                </span>
                                            ) : (
                                                <span className="text-stone-300 italic text-xs">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <StatusBadge status={pkg.status} />
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('admin.packages.edit', pkg.id!)}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-primary hover:bg-primary/10">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(pkg.id!)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="px-6 py-20 text-center">
                                        <p className="text-stone-500 font-medium italic">Tidak ada paket ditemukan.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                <AdminTableFooter count={totalCount} label="Paket" />
                <Pagination links={packages.links} />
            </div>
        </AdminLayout>
    );
}
