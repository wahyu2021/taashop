import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Save, 
    Package as PackageIcon,
    DollarSign
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import ImageUploader from '@/Components/shared/ImageUploader';

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
            <Head title="Tambah Paket Baru" />

            <AdminFormHeader 
                backHref={route('admin.packages.index')}
                backText="Kembali ke Daftar"
                title="Tambah Paket"
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <AdminSectionCard icon={PackageIcon} title="Informasi Paket">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-stone-500">Nama Paket</Label>
                                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Contoh: Paket Futsal Premium" className="bg-stone-50 border-stone-200" />
                                {errors.title && <p className="text-xs font-bold text-destructive italic">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="product_type" className="text-xs font-bold uppercase tracking-widest text-stone-500">Tipe Produk</Label>
                                <Input id="product_type" value={data.product_type} onChange={e => setData('product_type', e.target.value)} placeholder="Contoh: Jersey Bola, Kaos Sablon" className="bg-stone-50 border-stone-200" />
                                {errors.product_type && <p className="text-xs font-bold text-destructive italic">{errors.product_type}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="print_type" className="text-xs font-bold uppercase tracking-widest text-stone-500">Tipe Print</Label>
                                <select id="print_type" value={data.print_type} onChange={e => setData('print_type', e.target.value)} className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all">
                                    <option value="">Pilih Tipe</option>
                                    {printTypes.map(pt => (
                                        <option key={pt.value} value={pt.value}>{pt.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="includes" className="text-xs font-bold uppercase tracking-widest text-stone-500">Sudah Termasuk</Label>
                                <Input id="includes" value={data.includes} onChange={e => setData('includes', e.target.value)} placeholder="Contoh: Baju & Celana, Free Design" className="bg-stone-50 border-stone-200" />
                            </div>
                        </div>
                    </AdminSectionCard>

                    <AdminSectionCard icon={DollarSign} title="Pengaturan Harga & Urutan">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="min_price" className="text-xs font-bold uppercase tracking-widest text-stone-500">Harga Terendah (IDR)</Label>
                                <Input id="min_price" type="number" value={data.min_price} onChange={e => setData('min_price', parseFloat(e.target.value))} className="bg-stone-50 border-stone-200" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="max_price" className="text-xs font-bold uppercase tracking-widest text-stone-500">Harga Tertinggi (IDR)</Label>
                                <Input id="max_price" type="number" value={data.max_price} onChange={e => setData('max_price', parseFloat(e.target.value))} className="bg-stone-50 border-stone-200" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-xs font-bold uppercase tracking-widest text-stone-500">Status</Label>
                                <select id="status" value={data.status} onChange={e => setData('status', e.target.value)} className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all">
                                    {statuses.map(status => (
                                        <option key={status} value={status.toLowerCase()}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order_priority" className="text-xs font-bold uppercase tracking-widest text-stone-500">Prioritas Urutan</Label>
                                <Input id="order_priority" type="number" value={data.order_priority} onChange={e => setData('order_priority', parseInt(e.target.value))} className="bg-stone-50 border-stone-200" />
                            </div>
                        </div>
                    </AdminSectionCard>
                </div>

                <div className="space-y-6">
                    <AdminSectionCard title="Gambar Cover Paket" className="sticky top-24" headerBg="bg-stone-50">
                        <ImageUploader onChange={(file) => setData('image', file)} error={errors.image} />
                        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col gap-3">
                            <Button type="submit" disabled={processing} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-12 shadow-lg shadow-primary/20">
                                <Save className="w-5 h-5 mr-2" /> Simpan Paket
                            </Button>
                            <Button asChild variant="ghost" className="w-full text-stone-400 font-bold"><Link href={route('admin.packages.index')}>Batal</Link></Button>
                        </div>
                    </AdminSectionCard>
                </div>
            </form>
        </AdminLayout>
    );
}
