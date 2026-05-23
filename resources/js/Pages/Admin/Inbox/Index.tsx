import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ContactSubmissionData, PaginatedData } from '@/types';
import { 
    Inbox, 
    Eye, 
    Trash2, 
    Filter,
    Mail,
    Phone,
    Calendar,
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
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import AdminPageHeader from '@/Components/shared/AdminPageHeader';
import AdminToolbar from '@/Components/shared/AdminToolbar';
import AdminTableFooter from '@/Components/shared/AdminTableFooter';
import StatusBadge from '@/Components/shared/StatusBadge';
import Pagination from '@/Components/shared/Pagination';
import { useDebounce } from '@/hooks/useDebounce';

interface Props {
    submissions: PaginatedData<ContactSubmissionData>;
    filters: {
        search?: string;
        status?: string;
    };
    statuses: string[];
}

export default function Index({ submissions, filters, statuses }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
            router.delete(route('admin.inbox.destroy', id));
        }
    };

    const updateFilters = (newFilters: any) => {
        router.get(route('admin.inbox.index'), {
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
        router.get(route('admin.inbox.index'), {}, {
            preserveState: true,
            replace: true
        });
    };

    const hasActiveFilters = filters.status || filters.search;

    return (
        <AdminLayout>
            <Head title="Inbox Pesan Masuk" />

            <AdminPageHeader 
                title="Inbox Pesan"
                description="Pantau dan respon pesan dari calon pelanggan Anda."
            />

            <AdminToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Cari nama, email, atau subjek..."
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
                                    {filters.status && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-2" align="end">
                                <div className="space-y-1">
                                    {statuses.map(s => {
                                        const val = s.toLowerCase();
                                        const active = filters.status === val;
                                        return (
                                            <Button key={val} variant={active ? 'default' : 'ghost'} className="w-full justify-start text-[10px] font-black uppercase tracking-widest h-9" onClick={() => updateFilters({ status: active ? null : val })}>
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
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Pengirim</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Subjek & Pesan</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Waktu</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto">Status</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-bold text-stone-400 uppercase tracking-widest h-auto text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-stone-100">
                            {submissions.data.length > 0 ? (
                                submissions.data.map((sub) => (
                                    <TableRow key={sub.id} className={`group border-stone-100 transition-colors ${sub.status === 'new' ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-stone-50/50'}`}>
                                        <TableCell className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-foreground flex items-center gap-1">
                                                    {sub.name}
                                                    {sub.status === 'new' && <div className="w-2 h-2 rounded-full bg-primary" />}
                                                </span>
                                                <div className="flex flex-col gap-0.5 mt-1">
                                                    {sub.email && (
                                                        <span className="text-[10px] text-stone-400 flex items-center gap-1 lowercase">
                                                            <Mail className="w-3 h-3" /> {sub.email}
                                                        </span>
                                                    )}
                                                    {sub.phone && (
                                                        <span className="text-[10px] text-stone-400 flex items-center gap-1">
                                                            <Phone className="w-3 h-3" /> {sub.phone}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="max-w-[250px]">
                                                <p className="text-sm font-bold text-stone-700 truncate">{sub.subject || 'Tanpa Subjek'}</p>
                                                <p className="text-xs text-stone-400 truncate mt-0.5">{sub.message}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-stone-500 whitespace-nowrap">
                                                    {format(new Date(sub.submitted_at), 'dd MMM yyyy', { locale: id })}
                                                </span>
                                                <span className="text-[10px] text-stone-400">
                                                    {format(new Date(sub.submitted_at), 'HH:mm')} WIB
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <StatusBadge status={sub.status} />
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('admin.inbox.show', sub.id!)}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-primary hover:bg-primary/10">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(sub.id!)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="px-6 py-20 text-center">
                                        <p className="text-stone-500 font-medium italic">Tidak ada pesan ditemukan.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
                <AdminTableFooter count={submissions.meta.total} label="Pesan" />
                <Pagination links={submissions.links} />
            </div>
        </AdminLayout>
    );
}
