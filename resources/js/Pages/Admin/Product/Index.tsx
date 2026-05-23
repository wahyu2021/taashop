import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ProductData } from '@/types';
import { 
    Plus, 
    Pencil, 
    Trash2, 
    ShoppingBag, 
    ExternalLink,
    Search,
    Filter,
    Star,
    Image as ImageIcon
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
import AdminPageHeader from '@/Components/shared/AdminPageHeader';
import StatusBadge from '@/Components/shared/StatusBadge';

interface Props {
    products: ProductData[];
}

export default function Index({ products }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            router.delete(route('admin.products.destroy', id));
        }
    };

    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdminLayout>
            <Head title="Manajemen Produk" />

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

            {/* Toolbar Section */}
            <Card className="mb-6 border-none shadow-sm bg-white/50 backdrop-blur-sm">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 z-10" />
                        <Input 
                            type="text" 
                            placeholder="Cari produk atau kategori..." 
                            className="pl-10 bg-stone-100 border-none focus-visible:ring-primary/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                </CardContent>
            </Card>

            {/* Products Table */}
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
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <TableRow key={product.id} className="hover:bg-stone-50/50 transition-colors group border-stone-100">
                                        <TableCell className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden flex-shrink-0">
                                                    {product.image_url ? (
                                                        <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                                                            <ImageIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-foreground block leading-tight">{product.title}</span>
                                                    <span className="text-[10px] font-mono text-stone-400">{product.slug}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            {product.category ? (
                                                <Badge variant="secondary" className="bg-stone-100 text-stone-600 border-none font-bold">
                                                    {product.category.name}
                                                </Badge>
                                            ) : (
                                                <span className="text-stone-300 italic text-xs">Tanpa Kategori</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-center">
                                            {product.is_featured ? (
                                                <div className="flex justify-center">
                                                    <div className="p-1.5 rounded-full bg-orange-100 text-orange-500">
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
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-stone-400 hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(product.id!)}
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
                                        Tidak ada produk ditemukan.
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
                <span>Total {filteredProducts.length} Produk Terdaftar</span>
            </div>
        </AdminLayout>
    );
}
