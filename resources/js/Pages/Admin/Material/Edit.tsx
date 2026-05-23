import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Save, 
    Package,
    Plus,
    X,
    CheckCircle2,
    Trash2
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Badge } from '@/Components/ui/badge';
import { useState } from 'react';
import { MaterialData } from '@/types';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import ImageUploader from '@/Components/shared/ImageUploader';

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
        post(route('admin.materials.update', material.id));
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus material ini?')) {
            destroy(route('admin.materials.destroy', material.id));
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
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-stone-500">Nama Material</Label>
                                <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} className="bg-stone-50 border-stone-200" />
                                {errors.name && <p className="text-xs font-bold text-destructive italic">{errors.name}</p>}
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="summary" className="text-xs font-bold uppercase tracking-widest text-stone-500">Ringkasan Singkat</Label>
                                <Input id="summary" value={data.summary} onChange={e => setData('summary', e.target.value)} className="bg-stone-50 border-stone-200" />
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

                <div className="space-y-6">
                    <AdminSectionCard title="Foto Tekstur" className="sticky top-24" headerBg="bg-stone-50">
                        <ImageUploader value={material.image_url} onChange={(file) => setData('image', file)} error={errors.image} />
                        <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col gap-3">
                            <Button type="submit" disabled={processing} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-12 shadow-lg shadow-primary/20">
                                <Save className="w-5 h-5 mr-2" /> Simpan Perubahan
                            </Button>
                            <Button asChild variant="ghost" className="w-full text-stone-400 font-bold"><Link href={route('admin.materials.index')}>Batal</Link></Button>
                        </div>
                    </AdminSectionCard>
                </div>
            </form>
        </AdminLayout>
    );
}
