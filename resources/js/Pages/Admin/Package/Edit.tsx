import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Package as PackageIcon, DollarSign, Trash2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { PackageData } from '@/types';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import FormField from '@/Components/shared/FormField';
import FormSelect from '@/Components/shared/FormSelect';
import FormSidebar from '@/Components/shared/FormSidebar';
import ConfirmationModal from '@/Components/shared/ConfirmationModal';
import { useState } from 'react';

interface Props {
    package: PackageData;
    statuses: string[];
    printTypes: { name: string, value: string }[];
}

export default function Edit({ package: pkg, statuses, printTypes }: Props) {
    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        title: pkg.title,
        product_type: pkg.product_type,
        includes: pkg.includes || '',
        print_type: pkg.print_type || '',
        min_price: pkg.min_price,
        max_price: pkg.max_price,
        order_priority: pkg.order_priority,
        status: pkg.status.toLowerCase(),
        image: null as File | null,
        _method: 'put',
    });

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.packages.update', pkg.id!));
    };

    const handleDelete = () => {
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        destroy(route('admin.packages.destroy', pkg.id!), {
            onFinish: () => setIsConfirmOpen(false)
        });
    };

    return (
        <AdminLayout>
            <Head title={`Edit Paket: ${pkg.title}`} />

            <AdminFormHeader 
                backHref={route('admin.packages.index')}
                backText="Kembali ke Daftar"
                title="Edit Paket Harga"
                action={
                    <Button 
                        variant="ghost" 
                        onClick={handleDelete}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold text-xs uppercase tracking-widest"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Paket
                    </Button>
                }
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <AdminSectionCard icon={PackageIcon} title="Informasi Paket">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Nama Paket" htmlFor="title" error={errors.title} colSpan={2}>
                                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="bg-stone-50 border-stone-200" />
                            </FormField>

                            <FormField label="Tipe Produk" htmlFor="product_type">
                                <Input id="product_type" value={data.product_type} onChange={e => setData('product_type', e.target.value)} className="bg-stone-50 border-stone-200" />
                            </FormField>

                            <FormField label="Tipe Print" htmlFor="print_type">
                                <FormSelect
                                    id="print_type"
                                    value={data.print_type}
                                    onChange={v => setData('print_type', v)}
                                    placeholder="Pilih Tipe"
                                    options={printTypes.map(pt => ({ value: pt.value, label: pt.name }))}
                                />
                            </FormField>

                            <FormField label="Sudah Termasuk" htmlFor="includes" colSpan={2}>
                                <Input id="includes" value={data.includes} onChange={e => setData('includes', e.target.value)} className="bg-stone-50 border-stone-200" />
                            </FormField>
                        </div>
                    </AdminSectionCard>

                    <AdminSectionCard icon={DollarSign} title="Pengaturan Harga & Urutan">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Harga Terendah (IDR)" htmlFor="min_price">
                                <Input id="min_price" type="number" value={data.min_price} onChange={e => setData('min_price', parseFloat(e.target.value))} className="bg-stone-50 border-stone-200" />
                            </FormField>

                            <FormField label="Harga Tertinggi (IDR)" htmlFor="max_price">
                                <Input id="max_price" type="number" value={data.max_price} onChange={e => setData('max_price', parseFloat(e.target.value))} className="bg-stone-50 border-stone-200" />
                            </FormField>

                            <FormField label="Status" htmlFor="status">
                                <FormSelect
                                    id="status"
                                    value={data.status}
                                    onChange={v => setData('status', v)}
                                    options={statuses.map(s => ({ value: s.toLowerCase(), label: s }))}
                                />
                            </FormField>

                            <FormField label="Prioritas Urutan" htmlFor="order_priority">
                                <Input id="order_priority" type="number" value={data.order_priority} onChange={e => setData('order_priority', parseInt(e.target.value))} className="bg-stone-50 border-stone-200" />
                            </FormField>
                        </div>
                    </AdminSectionCard>
                </div>

                <FormSidebar
                    imageUrl={pkg.image_url}
                    onImageChange={file => setData('image', file)}
                    imageError={errors.image}
                    imageTitle="Gambar Cover Paket"
                    processing={processing}
                    submitLabel="Simpan Perubahan"
                    cancelHref={route('admin.packages.index')}
                />
            </form>

            <ConfirmationModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title="Hapus Paket Harga?"
                description="Data paket harga ini akan dihapus permanen. Apakah Anda yakin?"
            />
        </AdminLayout>
    );
}
