import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Package, Plus, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Badge } from '@/Components/ui/badge';
import { useState } from 'react';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import FormField from '@/Components/shared/FormField';
import FormSelect from '@/Components/shared/FormSelect';
import FormSidebar from '@/Components/shared/FormSidebar';

interface Props {
    statuses: string[];
}

export default function Create({ statuses }: Props) {
    const [newFeature, setNewFeature] = useState('');

    const { data, setData, post, processing, errors } = useForm({   
        name: '',
        summary: '',
        description: '',
        order_priority: 0,
        status: 'published',
        image: null as File | null,
        features: [] as string[],
    });

    const addFeature = () => {
        if (newFeature.trim()) {
            setData('features', [...data.features, newFeature.trim()]);
            setNewFeature('');
        }
    };

    const removeFeature = (index: number) => {
        setData('features', data.features.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.materials.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah Material Baru" />

            <AdminFormHeader
                backHref={route('admin.materials.index')}
                backText="Kembali ke Daftar"
                title="Tambah Material"
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <AdminSectionCard icon={Package} title="Informasi Dasar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Nama Material" htmlFor="name" error={errors.name} colSpan={2}>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Contoh: Drifit Milano, Combed 30s" className="bg-stone-50 border-stone-200" />
                            </FormField>

                            <FormField label="Ringkasan Singkat" htmlFor="summary" colSpan={2}>
                                <Input id="summary" value={data.summary} onChange={e => setData('summary', e.target.value)} placeholder="Ringkasan 1 baris untuk katalog..." className="bg-stone-50 border-stone-200" />
                            </FormField>

                            <FormField label="Deskripsi Lengkap" htmlFor="description" colSpan={2}>
                                <Textarea 
                                    id="description" 
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)} 
                                    placeholder="Tuliskan deskripsi lengkap mengenai bahan/material ini..." 
                                    className="bg-stone-50 border-stone-200 min-h-[120px]" 
                                />
                            </FormField>

                            <FormField label="Status" htmlFor="status">                                <FormSelect
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

                    <AdminSectionCard icon={CheckCircle2} title="Fitur Unggulan">
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input value={newFeature} onChange={e => setNewFeature(e.target.value)} placeholder="Tambah fitur (misal: Anti UV, Cepat Kering)" onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} className="bg-stone-50" />
                                <Button type="button" onClick={addFeature} variant="secondary" className="font-bold">
                                    <Plus className="w-4 h-4 mr-2" /> Tambah
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {data.features.map((feature, index) => (
                                    <Badge key={index} className="bg-stone-100 text-stone-600 hover:bg-stone-200 border-none px-3 py-1.5 flex items-center gap-2 group">
                                        <span className="font-bold">{feature}</span>
                                        <button type="button" onClick={() => removeFeature(index)} className="text-stone-400 hover:text-destructive transition-colors"><X className="w-3 h-3" /></button>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </AdminSectionCard>
                </div>

                <FormSidebar
                    onImageChange={file => setData('image', file)}
                    imageError={errors.image}
                    imageTitle="Foto Tekstur"
                    processing={processing}
                    submitLabel="Simpan Material"
                    cancelHref={route('admin.materials.index')}
                />
            </form>
        </AdminLayout>
    );
}
