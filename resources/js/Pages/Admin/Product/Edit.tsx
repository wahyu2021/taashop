import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ChevronLeft, 
    Save, 
    ShoppingBag,
    Info,
    Upload,
    X,
    Star,
    Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { CategoryData, ProductData } from '@/types';
import { useState, useRef } from 'react';

interface Props {
    product: ProductData;
    categories: CategoryData[];
    statuses: string[];
}

export default function Edit({ product, categories, statuses }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(product.image_url || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        category_id: product.category?.id.toString() || '',
        title: product.title,
        description: product.description || '',
        is_featured: product.is_featured,
        order_priority: product.order_priority,
        status: product.status.toLowerCase(),
        image: null as File | null,
        _method: 'put', // Required for file upload in update
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use post because PUT/PATCH doesn't support multipart/form-data in PHP/Laravel easily
        post(route('admin.products.update', product.id));
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            destroy(route('admin.products.destroy', product.id));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Edit Produk: ${product.title}`} />

            {/* Breadcrumbs / Back Button */}
            <div className="mb-8">
                <Link 
                    href={route('admin.products.index')}
                    className="flex items-center text-xs font-bold text-stone-400 uppercase tracking-widest hover:text-primary transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Kembali ke Daftar
                </Link>
                <div className="flex items-center justify-between mt-4">
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                        Edit Produk
                    </h1>
                    <Button 
                        variant="ghost" 
                        onClick={handleDelete}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold text-xs uppercase tracking-widest"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Produk
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Main Form Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                            <CardTitle className="text-lg font-bold flex items-center gap-2 text-stone-700">
                                <ShoppingBag className="w-5 h-5 text-primary" />
                                Informasi Produk
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-stone-500">Nama Produk</Label>
                                    <Input 
                                        id="title"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Contoh: Jersey Esport Custom V1"
                                        className="bg-stone-50 border-stone-200"
                                    />
                                    {errors.title && <p className="text-xs font-bold text-destructive italic">{errors.title}</p>}
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="category_id" className="text-xs font-bold uppercase tracking-widest text-stone-500">Kategori</Label>
                                    <select 
                                        id="category_id"
                                        value={data.category_id}
                                        onChange={e => setData('category_id', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name} ({cat.type === 'package' ? 'Paket' : 'Galeri'})</option>
                                        ))}
                                    </select>
                                    {errors.category_id && <p className="text-xs font-bold text-destructive italic">{errors.category_id}</p>}
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-xs font-bold uppercase tracking-widest text-stone-500">Status</Label>
                                    <select 
                                        id="status"
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status.toLowerCase()}>{status}</option>
                                        ))}
                                    </select>
                                    {errors.status && <p className="text-xs font-bold text-destructive italic">{errors.status}</p>}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-stone-500">Deskripsi Produk</Label>
                                <textarea 
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={5}
                                    placeholder="Jelaskan detail produk, bahan, dan keunggulan..."
                                    className="flex w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                />
                                {errors.description && <p className="text-xs font-bold text-destructive italic">{errors.description}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                            <CardTitle className="text-lg font-bold flex items-center gap-2 text-stone-700">
                                <Star className="w-5 h-5 text-orange-500" />
                                Pengaturan Tambahan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Featured Toggle */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-stone-50 border border-stone-100">
                                    <div>
                                        <p className="text-sm font-bold text-stone-700">Tampilkan di Unggulan</p>
                                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">Muncul di Landing Page</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setData('is_featured', !data.is_featured)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${data.is_featured ? 'bg-primary' : 'bg-stone-200'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${data.is_featured ? 'translate-x-6' : ''}`} />
                                    </button>
                                </div>

                                {/* Order Priority */}
                                <div className="space-y-2">
                                    <Label htmlFor="order_priority" className="text-xs font-bold uppercase tracking-widest text-stone-500">Prioritas Urutan</Label>
                                    <Input 
                                        id="order_priority"
                                        type="number"
                                        value={data.order_priority}
                                        onChange={e => setData('order_priority', parseInt(e.target.value))}
                                        className="bg-stone-50 border-stone-200"
                                    />
                                    <p className="text-[10px] text-stone-400 font-medium italic">Semakin kecil angkanya, semakin awal munculnya.</p>
                                    {errors.order_priority && <p className="text-xs font-bold text-destructive italic">{errors.order_priority}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Image Upload */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden sticky top-24">
                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-stone-600 uppercase tracking-widest">
                                Gambar Utama
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className={`
                                    relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden
                                    ${imagePreview ? 'border-primary/20 bg-stone-50' : 'border-stone-200 hover:border-primary/40 hover:bg-primary/5'}
                                `}
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white text-xs font-bold uppercase tracking-widest">Klik untuk Ganti</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6">
                                        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Klik untuk Upload</p>
                                    </div>
                                )}
                                <input 
                                    ref={fileInputRef}
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            {errors.image && <p className="text-xs font-bold text-destructive mt-3 italic">{errors.image}</p>}

                            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col gap-3">
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 shadow-lg shadow-primary/20"
                                >
                                    <Save className="w-5 h-5 mr-2" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                                <Button 
                                    asChild
                                    variant="ghost"
                                    className="w-full text-stone-400 font-bold"
                                >
                                    <Link href={route('admin.products.index')}>Batal</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </AdminLayout>
    );
}
