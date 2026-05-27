import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { FileText, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import FormField from '@/Components/shared/FormField';
import FormSelect from '@/Components/shared/FormSelect';
import FormSidebar from '@/Components/shared/FormSidebar';

interface Props {
    statuses: string[];
}

export default function Create({ statuses }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        summary: '',
        content: '',
        status: 'published',
        published_at: new Date().toISOString().slice(0, 16),
        order_priority: 0,
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.news.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tulis Berita | Taaashop" />

            <AdminFormHeader 
                backHref={route('admin.news.index')}
                backText="Kembali ke Daftar"
                title="Tulis Berita"
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <AdminSectionCard icon={FileText} title="Konten Berita">
                        <div className="space-y-6">
                            <FormField label="Judul Berita" htmlFor="title" error={errors.title}>
                                <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Masukkan judul yang menarik..." className="bg-stone-50 border-stone-200 h-12 text-lg font-bold" />
                            </FormField>

                            <FormField label="Ringkasan (Snippet)" htmlFor="summary">
                                <textarea id="summary" value={data.summary} onChange={e => setData('summary', e.target.value)} rows={3} placeholder="Penjelasan singkat untuk halaman daftar berita..." className="flex w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all" />
                            </FormField>

                            <FormField label="Isi Berita Lengkap" htmlFor="content">
                                <textarea id="content" value={data.content} onChange={e => setData('content', e.target.value)} rows={15} placeholder="Tuliskan berita, edukasi, atau copy writing Anda di sini..." className="flex w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all leading-relaxed" />
                            </FormField>
                        </div>
                    </AdminSectionCard>
                </div>

                <FormSidebar
                    onImageChange={file => setData('image', file)}
                    imageError={errors.image}
                    imageTitle="Gambar Thumbnail"
                    aspectRatio="aspect-video"
                    processing={processing}
                    submitLabel="Terbitkan Berita"
                    cancelHref={route('admin.news.index')}
                >
                    <AdminSectionCard title="Status & Jadwal" headerBg="bg-stone-50">
                        <div className="space-y-6">
                            <FormField label="Status" htmlFor="status">
                                <FormSelect
                                    id="status"
                                    value={data.status}
                                    onChange={v => setData('status', v)}
                                    options={statuses.map(s => ({ value: s.toLowerCase(), label: s }))}
                                />
                            </FormField>

                            <FormField label="Tanggal Publikasi" htmlFor="published_at">
                                <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                    <Input id="published_at" type="datetime-local" value={data.published_at} onChange={e => setData('published_at', e.target.value)} className="bg-stone-50 border-stone-200 pl-10" />
                                </div>
                            </FormField>
                        </div>
                    </AdminSectionCard>
                </FormSidebar>
            </form>
        </AdminLayout>
    );
}
