import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ContactSubmissionData } from '@/types';
import { 
    Inbox, 
    Eye, 
    Trash2, 
    Search, 
    ExternalLink,
    Mail,
    Phone,
    Calendar,
    ArrowUpRight
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
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Props {
    submissions: ContactSubmissionData[];
}

export default function Index({ submissions }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
            router.delete(route('admin.inbox.destroy', id));
        }
    };

    const filteredSubmissions = submissions.filter(sub => 
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.subject?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'new': return 'bg-blue-100 text-blue-600';
            case 'contacted': return 'bg-orange-100 text-orange-600';
            case 'closed': return 'bg-stone-100 text-stone-500';
            default: return 'bg-stone-100 text-stone-500';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status.toLowerCase()) {
            case 'new': return 'Baru';
            case 'contacted': return 'Dihubungi';
            case 'closed': return 'Selesai';
            default: return status;
        }
    };

    return (
        <AdminLayout>
            <Head title="Inbox Pesan Masuk" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                        Inbox Pesan
                    </h1>
                    <p className="text-stone-500 mt-1 font-medium">
                        Pantau dan respon pesan dari calon pelanggan Anda.
                    </p>
                </div>
            </div>

            {/* Toolbar Section */}
            <Card className="mb-6 border-none shadow-sm bg-white/50 backdrop-blur-sm">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 z-10" />
                        <Input 
                            type="text" 
                            placeholder="Cari nama, email, atau subjek..." 
                            className="pl-10 bg-stone-100 border-none focus-visible:ring-primary/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Submissions Table */}
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
                            {filteredSubmissions.length > 0 ? (
                                filteredSubmissions.map((sub) => (
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
                                            <Badge 
                                                className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border-none ${getStatusColor(sub.status)}`}
                                            >
                                                {getStatusLabel(sub.status)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('admin.inbox.show', sub.id!)}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-primary hover:bg-primary/10">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(sub.id!)}
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
                                        Tidak ada pesan ditemukan.
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
                <span>Total {filteredSubmissions.length} Pesan Masuk</span>
            </div>
        </AdminLayout>
    );
}
