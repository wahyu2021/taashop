import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { MaterialData } from '@/types';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    Package, 
    ExternalLink,
    Search,
    Image as ImageIcon,
    CheckCircle2
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
    materials: MaterialData[];
}

export default function Index({ materials }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus material ini?')) {
            router.delete(route('admin.materials.destroy', id));
        }
    };

    const filteredMaterials = materials.filter(material => 
        material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.summary?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Manajemen Material Bahan" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                        Material Bahan
                    </h1>
                    <p className="text-stone-500 mt-1 font-medium">
                        Kelola berbagai jenis bahan kain dan kualitas sablon yang Anda tawarkan.
                    </p>
                </div>
                <Link href={route('admin.materials.create')}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-lg shadow-primary/20 transition-all active:scale-95">
                        <Plus className="w-5 h-5 mr-2" />
                        Tambah Material
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
                            placeholder="Cari material..." 
                            className="pl-10 bg-stone-100 border-none focus-visible:ring-primary/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Materials Table */}
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
                            {filteredMaterials.length > 0 ? (
                                filteredMaterials.map((material) => (
                                    <TableRow key={material.id} className="hover:bg-stone-50/50 transition-colors group border-stone-100">
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0">
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
                                                    <Badge key={i} variant="outline" className="text-[10px] font-bold border-stone-200 text-stone-500 whitespace-nowrap">
                                                        {feature}
                                                    </Badge>
                                                ))}
                                                {material.features.length > 3 && (
                                                    <span className="text-[10px] text-stone-400 font-bold">+{material.features.length - 3} lagi</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Badge 
                                                className={`
                                                    text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border-none
                                                    ${material.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-500'}
                                                `}
                                            >
                                                {material.status === 'published' ? 'Aktif' : 'Draft'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={route('admin.materials.edit', material.id!)}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-400 hover:text-primary hover:bg-primary/10">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(material.id!)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="px-6 py-12 text-center text-stone-500 italic">
                                        Tidak ada material ditemukan.
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
                <span>Total {filteredMaterials.length} Material Terdaftar</span>
            </div>
        </AdminLayout>
    );
}
