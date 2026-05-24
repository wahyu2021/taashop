import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Image as ImageIcon, Briefcase, Trash2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { PartnerData } from '@/types';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import FormField from '@/Components/shared/FormField';
import FormSelect from '@/Components/shared/FormSelect';
import FormSidebar from '@/Components/shared/FormSidebar';

interface Props {
    partner: PartnerData;
}

export default function Edit({ partner }: Props) {
    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        name: partner.name,
        is_active: partner.is_active ? '1' : '0',
        logo: null as File | null,
        _method: 'put',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.partners.update', partner.id!));
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus partner ini?')) {
            destroy(route('admin.partners.destroy', partner.id!));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Edit Partner: ${partner.name}`} />

            <AdminFormHeader 
                backHref={route('admin.partners.index')}
                backText="Kembali ke Daftar"
                title="Edit Partner"
                action={
                    <Button 
                        variant="ghost" 
                        onClick={handleDelete}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold text-xs uppercase tracking-widest"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Partner
                    </Button>
                }
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
                    imageUrl={partner.logo_url}
                    onImageChange={file => setData('logo', file)}
                    imageError={errors.logo}
                    imageTitle="Logo Partner"
                    aspectRatio="aspect-video"
                    imageObjectFit="object-contain"
                    processing={processing}
                    submitLabel="Simpan Perubahan"
                    cancelHref={route('admin.partners.index')}
                />
            </form>
        </AdminLayout>
    );
}
