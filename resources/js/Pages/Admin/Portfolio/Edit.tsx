import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Save, 
    Image as ImageIcon,
    User,
    Calendar as CalendarIcon,
    Trash2
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { CategoryData, PortfolioData } from '@/types';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import ImageUploader from '@/Components/shared/ImageUploader';

interface Props {
    portfolio: PortfolioData;
    categories: CategoryData[];
    statuses: string[];
}

export default function Edit({ portfolio, categories, statuses }: Props) {
    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        category_id: portfolio.category?.id.toString() || '',
        title: portfolio.title,
        client_name: portfolio.client_name || '',
        description: portfolio.description || '',
        project_date: portfolio.project_date || '',
        order_priority: portfolio.order_priority,
        status: portfolio.status.toLowerCase(),
        image: null as File | null,
        _method: 'put',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.portfolios.update', portfolio.id));
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus portfolio ini?')) {
            destroy(route('admin.portfolios.destroy', portfolio.id));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Edit Portfolio: ${portfolio.title}`} />

            <AdminFormHeader 
                backHref={route('admin.portfolios.index')}
                backText="Kembali ke Daftar"
                title="Edit Portfolio"
                action={
                    <Button 
                        variant="ghost" 
                        onClick={handleDelete}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold text-xs uppercase tracking-widest"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Portfolio
                    </Button>
                }
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <AdminSectionCard icon={ImageIcon} title="Informasi Hasil Jadi">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-stone-500">Judul Portfolio</Label>
                                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Contoh: Jersey Tim Esports Galaxy" className="bg-stone-50 border-stone-200" />
                                {errors.title && <p className="text-xs font-bold text-destructive italic">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category_id" className="text-xs font-bold uppercase tracking-widest text-stone-500">Kategori Galeri</Label>
                                <select id="category_id" value={data.category_id} onChange={e => setData('category_id', e.target.value)} className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all">
                                    <option value="">Pilih Kategori</option>
                                    {categories.filter(c => c.type === 'gallery').map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="client_name" className="text-xs font-bold uppercase tracking-widest text-stone-500">Nama Klien / Tim</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                    <Input id="client_name" value={data.client_name} onChange={e => setData('client_name', e.target.value)} className="bg-stone-50 border-stone-200 pl-10" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="project_date" className="text-xs font-bold uppercase tracking-widest text-stone-500">Tanggal Selesai</Label>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                    <Input id="project_date" type="date" value={data.project_date} onChange={e => setData('project_date', e.target.value)} className="bg-stone-50 border-stone-200 pl-10" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-xs font-bold uppercase tracking-widest text-stone-500">Status</Label>
                                <select id="status" value={data.status} onChange={e => setData('status', e.target.value)} className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all">
                                    {statuses.map(status => (
                                        <option key={status} value={status.toLowerCase()}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2 mt-6">
                            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-stone-500">Keterangan / Testimoni Klien</Label>
                            <textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={5} className="flex w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all" />
                        </div>
                    </AdminSectionCard>
                </div>

                <div className="space-y-6">
                    <AdminSectionCard title="Foto Hasil Jadi" className="sticky top-24" headerBg="bg-stone-50">
                        <ImageUploader value={portfolio.image_url} onChange={(file) => setData('image', file)} error={errors.image} aspectRatio="aspect-[4/3]" />
                        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col gap-3">
                            <Button type="submit" disabled={processing} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-12 shadow-lg shadow-primary/20">
                                <Save className="w-5 h-5 mr-2" /> Simpan Perubahan
                            </Button>
                            <Button asChild variant="ghost" className="w-full text-stone-400 font-bold"><Link href={route('admin.portfolios.index')}>Batal</Link></Button>
                        </div>
                    </AdminSectionCard>
                </div>
            </form>
        </AdminLayout>
    );
}
