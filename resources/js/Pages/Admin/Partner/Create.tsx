import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Image as ImageIcon, Briefcase } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import FormField from '@/Components/shared/FormField';
import FormSelect from '@/Components/shared/FormSelect';
import FormSidebar from '@/Components/shared/FormSidebar';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        is_active: '1',
        logo: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.partners.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah Partner | Admin Taaashop" />

            <AdminFormHeader 
                backHref={route('admin.partners.index')}
                backText="Kembali ke Daftar"
                title="Tambah Partner"
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <AdminSectionCard icon={Briefcase} title="Informasi Partner">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Nama Perusahaan / Organisasi" htmlFor="name" error={errors.name} colSpan={2}>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Contoh: PT Galaxy Esports" className="bg-stone-50 border-stone-200" />
                            </FormField>

                            <FormField label="Status Publikasi" htmlFor="is_active">
                                <FormSelect
                                    id="is_active"
                                    value={data.is_active}
                                    onChange={v => setData('is_active', v)}
                                    options={[
                                        { value: '1', label: 'Aktif' },
                                        { value: '0', label: 'Nonaktif' },
                                    ]}
                                />
                            </FormField>
                        </div>
                    </AdminSectionCard>
                </div>

                <FormSidebar
                    onImageChange={file => setData('logo', file)}
                    imageError={errors.logo}
                    imageTitle="Logo Partner"
                    aspectRatio="aspect-video"
                    imageObjectFit="object-contain"
                    processing={processing}
                    submitLabel="Simpan Partner"
                    cancelHref={route('admin.partners.index')}
                />
            </form>
        </AdminLayout>
    );
}
