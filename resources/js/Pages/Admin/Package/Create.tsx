import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Package as PackageIcon, DollarSign } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import FormField from '@/Components/shared/FormField';
import FormSelect from '@/Components/shared/FormSelect';
import FormSidebar from '@/Components/shared/FormSidebar';

interface Props {
    statuses: string[];
    printTypes: { name: string, value: string }[];
}

export default function Create({ statuses, printTypes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        product_type: '',
        includes: '',
        print_type: '',
        min_price: 0,
        max_price: 0,
        order_priority: 0,
        status: 'published',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.packages.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah Paket | Admin Taaashop" />

            <AdminFormHeader 
                backHref={route('admin.packages.index')}
                backText="Kembali ke Daftar"
                title="Tambah Paket"
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <AdminSectionCard icon={PackageIcon} title="Informasi Paket">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Nama Paket" htmlFor="title" error={errors.title} colSpan={2}>
                                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Contoh: Paket Futsal Premium" className="bg-stone-50 border-stone-200" />
                            </FormField>

                            <FormField label="Tipe Produk" htmlFor="product_type" error={errors.product_type}>
                                <Input id="product_type" value={data.product_type} onChange={e => setData('product_type', e.target.value)} placeholder="Contoh: Jersey Bola, Kaos Sablon" className="bg-stone-50 border-stone-200" />
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
                                <Input id="includes" value={data.includes} onChange={e => setData('includes', e.target.value)} placeholder="Contoh: Baju & Celana, Free Design" className="bg-stone-50 border-stone-200" />
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
                    onImageChange={file => setData('image', file)}
                    imageError={errors.image}
                    imageTitle="Gambar Cover Paket"
                    processing={processing}
                    submitLabel="Simpan Paket"
                    cancelHref={route('admin.packages.index')}
                />
            </form>
        </AdminLayout>
    );
}
