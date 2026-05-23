import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Image as ImageIcon, User, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { CategoryData } from '@/types';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import FormField from '@/Components/shared/FormField';
import FormSelect from '@/Components/shared/FormSelect';
import FormSidebar from '@/Components/shared/FormSidebar';

interface Props {
    categories: CategoryData[];
    statuses: string[];
}

export default function Create({ categories, statuses }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        title: '',
        client_name: '',
        description: '',
        project_date: '',
        order_priority: 0,
        status: 'published',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.portfolios.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah Portfolio Baru" />

            <AdminFormHeader 
                backHref={route('admin.portfolios.index')}
                backText="Kembali ke Daftar"
                title="Tambah Portfolio"
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <AdminSectionCard icon={ImageIcon} title="Informasi Hasil Jadi">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Judul Portfolio" htmlFor="title" error={errors.title} colSpan={2}>
                                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Contoh: Jersey Tim Esports Galaxy" className="bg-stone-50 border-stone-200" />
                            </FormField>

                            <FormField label="Kategori Galeri" htmlFor="category_id">
                                <FormSelect
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={v => setData('category_id', v)}
                                    placeholder="Pilih Kategori"
                                    options={categories.filter(c => c.type === 'gallery').map(cat => ({
                                        value: String(cat.id!),
                                        label: cat.name,
                                    }))}
                                />
                            </FormField>

                            <FormField label="Nama Klien / Tim" htmlFor="client_name">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                    <Input id="client_name" value={data.client_name} onChange={e => setData('client_name', e.target.value)} placeholder="Nama pemesan..." className="bg-stone-50 border-stone-200 pl-10" />
                                </div>
                            </FormField>

                            <FormField label="Tanggal Selesai" htmlFor="project_date">
                                <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                    <Input id="project_date" type="date" value={data.project_date} onChange={e => setData('project_date', e.target.value)} className="bg-stone-50 border-stone-200 pl-10" />
                                </div>
                            </FormField>

                            <FormField label="Status" htmlFor="status">
                                <FormSelect
                                    id="status"
                                    value={data.status}
                                    onChange={v => setData('status', v)}
                                    options={statuses.map(s => ({ value: s.toLowerCase(), label: s }))}
                                />
                            </FormField>
                        </div>

                        <div className="space-y-2 mt-6">
                            <FormField label="Keterangan / Testimoni Klien" htmlFor="description">
                                <textarea id="description" value={data.description} onChange={e => setData('description', e.target.value)} rows={5} placeholder="Ceritakan tentang proyek ini atau kutipan kepuasan klien..." className="flex w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all" />
                            </FormField>
                        </div>
                    </AdminSectionCard>
                </div>

                <FormSidebar
                    onImageChange={file => setData('image', file)}
                    imageError={errors.image}
                    imageTitle="Foto Hasil Jadi"
                    aspectRatio="aspect-[4/3]"
                    processing={processing}
                    submitLabel="Simpan Portfolio"
                    cancelHref={route('admin.portfolios.index')}
                />
            </form>
        </AdminLayout>
    );
}
