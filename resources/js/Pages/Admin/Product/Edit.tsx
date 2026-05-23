import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Save, 
    ShoppingBag,
    Star,
    Trash2
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { CategoryData, ProductData } from '@/types';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import ImageUploader from '@/Components/shared/ImageUploader';

interface Props {
    product: ProductData;
    categories: CategoryData[];
    statuses: string[];
}

export default function Edit({ product, categories, statuses }: Props) {
    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        category_id: product.category?.id.toString() || '',
        title: product.title,
        description: product.description || '',
        is_featured: product.is_featured,
        order_priority: product.order_priority,
        status: product.status.toLowerCase(),
        image: null as File | null,
        _method: 'put',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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

            <AdminFormHeader 
                backHref={route('admin.products.index')}
                backText="Kembali ke Daftar"
                title="Edit Produk"
                action={
                    <Button 
                        variant="ghost" 
                        onClick={handleDelete}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold text-xs uppercase tracking-widest"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Produk
                    </Button>
                }
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Main Form Content */}
                <div className="lg:col-span-2 space-y-6">
                    <AdminSectionCard 
                        icon={ShoppingBag}
                        title="Informasi Produk"
                    >
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

                            {/* Description */}
                            <div className="space-y-2 md:col-span-2">
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
                        </div>
                    </AdminSectionCard>

                    <AdminSectionCard 
                        icon={Star}
                        title="Pengaturan Tambahan"
                    >
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
                            </div>
                        </div>
                    </AdminSectionCard>
                </div>

                {/* Sidebar - Image Upload */}
                <div className="space-y-6">
                    <AdminSectionCard 
                        title="Gambar Utama"
                        className="sticky top-24"
                        headerBg="bg-stone-50"
                    >
                        <ImageUploader 
                            value={product.image_url}
                            onChange={(file) => setData('image', file)}
                            error={errors.image}
                            description="Klik pada area di atas untuk mengganti gambar produk."
                        />

                        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col gap-3">
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-12 shadow-lg shadow-primary/20"
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
                    </AdminSectionCard>
                </div>
            </form>
        </AdminLayout>
    );
}
