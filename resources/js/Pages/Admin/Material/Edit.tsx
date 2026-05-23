import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Package, Plus, X, CheckCircle2, Trash2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Badge } from '@/Components/ui/badge';
import { useState } from 'react';
import { MaterialData } from '@/types';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import FormField from '@/Components/shared/FormField';
import FormSelect from '@/Components/shared/FormSelect';
import FormSidebar from '@/Components/shared/FormSidebar';

interface Props {
    material: MaterialData;
    statuses: string[];
}

export default function Edit({ material, statuses }: Props) {
    const [newFeature, setNewFeature] = useState('');

    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        name: material.name,
        summary: material.summary || '',
        description: material.description || '',
        order_priority: material.order_priority,
        status: material.status.toLowerCase(),
        image: null as File | null,
        features: material.features || [],
        _method: 'put',
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
        post(route('admin.materials.update', material.id!));
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus material ini?')) {
            destroy(route('admin.materials.destroy', material.id!));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Edit Material: ${material.name}`} />

            <AdminFormHeader 
                backHref={route('admin.materials.index')}
                backText="Kembali ke Daftar"
                title="Edit Material"
                action={
                    <Button 
                        variant="ghost" 
                        onClick={handleDelete}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold text-xs uppercase tracking-widest"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Material
                    </Button>
                }
            />

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-6">
                    <AdminSectionCard icon={Package} title="Informasi Dasar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Nama Material" htmlFor="name" error={errors.name} colSpan={2}>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="bg-stone-50 border-stone-200" />
                            </FormField>

                            <FormField label="Ringkasan Singkat" htmlFor="summary" colSpan={2}>
                                <Input id="summary" value={data.summary} onChange={e => setData('summary', e.target.value)} className="bg-stone-50 border-stone-200" />
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
                    imageUrl={material.image_url}
                    onImageChange={file => setData('image', file)}
                    imageError={errors.image}
                    imageTitle="Foto Tekstur"
                    processing={processing}
                    submitLabel="Simpan Perubahan"
                    cancelHref={route('admin.materials.index')}
                />
            </form>
        </AdminLayout>
    );
}
