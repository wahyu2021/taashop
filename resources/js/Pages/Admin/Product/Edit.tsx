import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { ShoppingBag, Star, Trash2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { CategoryData, ProductData } from '@/types';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import FormField from '@/Components/shared/FormField';
import FormSelect from '@/Components/shared/FormSelect';
import FormSidebar from '@/Components/shared/FormSidebar';
import ConfirmationModal from '@/Components/shared/ConfirmationModal';
import { useState } from 'react';

interface Props {
    product: ProductData;
    categories: CategoryData[];
    statuses: string[];
}

export default function Edit({ product, categories, statuses }: Props) {
    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        category_id: product.category?.id?.toString() || '',
        title: product.title,
        description: product.description || '',
        is_featured: product.is_featured,
        order_priority: product.order_priority,
        status: product.status.toLowerCase(),
        image: null as File | null,
        _method: 'put',
    });

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.update', product.id!));
    };

    const handleDelete = () => {
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        destroy(route('admin.products.destroy', product.id!), {
            onFinish: () => setIsConfirmOpen(false)
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit Produk: ${product.title} | Admin Taaashop`} />

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
                <div className="lg:col-span-2 space-y-6">
                    <AdminSectionCard icon={ShoppingBag} title="Informasi Produk">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Nama Produk" htmlFor="title" error={errors.title} colSpan={2}>
                                <Input 
                                    id="title"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Contoh: Jersey Esport Custom V1"
                                    className="bg-stone-50 border-stone-200"
                                />
                            </FormField>

                            <FormField label="Kategori" htmlFor="category_id" error={errors.category_id}>
                                <FormSelect
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={v => setData('category_id', v)}
                                    placeholder="Pilih Kategori"
                                    options={categories.map(cat => ({
                                        value: String(cat.id!),
                                        label: `${cat.name} (${cat.type === 'package' ? 'Paket' : 'Galeri'})`,
                                    }))}
                                />
                            </FormField>

                            <FormField label="Status" htmlFor="status" error={errors.status}>
                                <FormSelect
                                    id="status"
                                    value={data.status}
                                    onChange={v => setData('status', v)}
                                    options={statuses.map(s => ({ value: s.toLowerCase(), label: s }))}
                                />
                            </FormField>

                            <FormField label="Deskripsi Produk" htmlFor="description" error={errors.description} colSpan={2}>
                                <textarea 
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={5}
                                    placeholder="Jelaskan detail produk, bahan, dan keunggulan..."
                                    className="flex w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                />
                            </FormField>
                        </div>
                    </AdminSectionCard>

                    <AdminSectionCard icon={Star} title="Pengaturan Tambahan">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

                            <FormField label="Prioritas Urutan" htmlFor="order_priority" hint="Semakin kecil angkanya, semakin awal munculnya.">
                                <Input 
                                    id="order_priority"
                                    type="number"
                                    value={data.order_priority}
                                    onChange={e => setData('order_priority', parseInt(e.target.value))}
                                    className="bg-stone-50 border-stone-200"
                                />
                            </FormField>
                        </div>
                    </AdminSectionCard>
                </div>

                <FormSidebar
                    imageUrl={product.image_url}
                    onImageChange={file => setData('image', file)}
                    imageError={errors.image}
                    imageDescription="Klik pada area di atas untuk mengganti gambar produk."
                    processing={processing}
                    submitLabel="Simpan Perubahan"
                    cancelHref={route('admin.products.index')}
                />
            </form>

            <ConfirmationModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Hapus Produk?"
                description="Produk yang dihapus tidak dapat dikembalikan. Apakah Anda yakin?"
            />
        </AdminLayout>
    );
}
