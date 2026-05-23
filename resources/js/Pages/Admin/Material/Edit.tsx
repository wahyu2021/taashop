import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ChevronLeft, 
    Save, 
    Package,
    Info,
    Upload,
    X,
    Plus,
    CheckCircle2,
    Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Badge } from '@/Components/ui/badge';
import { useState, useRef } from 'react';
import { MaterialData } from '@/types';

interface Props {
    material: MaterialData;
    statuses: string[];
}

export default function Edit({ material, statuses }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(material.image_url || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

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

            {/* Breadcrumbs / Back Button */}
            <div className="mb-8">
                <Link 
                    href={route('admin.materials.index')}
                    className="flex items-center text-xs font-bold text-stone-400 uppercase tracking-widest hover:text-primary transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Kembali ke Daftar
                </Link>
                <div className="flex items-center justify-between mt-4">
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                        Edit Material
                    </h1>
                    <Button 
                        variant="ghost" 
                        onClick={handleDelete}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold text-xs uppercase tracking-widest"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Material
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Main Form Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                            <CardTitle className="text-lg font-bold flex items-center gap-2 text-stone-700">
                                <Package className="w-5 h-5 text-primary" />
                                Informasi Dasar
                              </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-stone-500">Nama Material</Label>
                                    <Input 
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="bg-stone-50 border-stone-200"
                                    />
                                    {errors.name && <p className="text-xs font-bold text-destructive italic">{errors.name}</p>}
                                </div>

                                {/* Summary */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="summary" className="text-xs font-bold uppercase tracking-widest text-stone-500">Ringkasan Singkat</Label>
                                    <Input 
                                        id="summary"
                                        value={data.summary}
                                        onChange={e => setData('summary', e.target.value)}
                                        className="bg-stone-50 border-stone-200"
                                    />
                                </div>

                                {/* Status */}
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-xs font-bold uppercase tracking-widest text-stone-500">Status</Label>
                                    <select 
                                        id="status"
                                        value={data.status}
                                        onChange={e => setData('status', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status.toLowerCase()}>{status}</option>
                                        ))}
                                    </select>
                                    {errors.status && <p className="text-xs font-bold text-destructive italic">{errors.status}</p>}
                                </div>

                                {/* Order Priority */}
                                <div className="space-y-2">
                                    <Label htmlFor="order_priority" className="text-xs font-bold uppercase tracking-widest text-stone-500">Prioritas Urutan</Label>
                                    <Input 
                                        id="order_priority"
                                        type="number"
                                        value={data.order_priority}
                                        onChange={e => setData('order_priority', parseInt(e.target.value))}
                                        className="bg-stone-50 border-stone-200"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-stone-500">Deskripsi Lengkap</Label>
                                <textarea 
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={5}
                                    className="flex w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dynamic Features List */}
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                            <CardTitle className="text-lg font-bold flex items-center gap-2 text-stone-700">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                Fitur Unggulan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex gap-2">
                                <Input 
                                    value={newFeature}
                                    onChange={e => setNewFeature(e.target.value)}
                                    placeholder="Tambah fitur (misal: Anti UV, Cepat Kering)"
                                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                    className="bg-stone-50"
                                />
                                <Button type="button" onClick={addFeature} variant="secondary" className="font-bold">
                                    <Plus className="w-4 h-4 mr-2" /> Tambah
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {data.features.map((feature, index) => (
                                    <Badge 
                                        key={index} 
                                        className="bg-stone-100 text-stone-600 hover:bg-stone-200 border-none px-3 py-1.5 flex items-center gap-2 group"
                                    >
                                        <span className="font-bold">{feature}</span>
                                        <button 
                                            type="button" 
                                            onClick={() => removeFeature(index)}
                                            className="text-stone-400 hover:text-destructive transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                            {errors.features && <p className="text-xs font-bold text-destructive italic">{errors.features}</p>}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Image Upload */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden sticky top-24">
                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-stone-600 uppercase tracking-widest">
                                Foto Tekstur/Bahan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className={`
                                    relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden
                                    ${imagePreview ? 'border-primary/20 bg-stone-50' : 'border-stone-200 hover:border-primary/40 hover:bg-primary/5'}
                                `}
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white text-xs font-bold uppercase tracking-widest">Klik untuk Ganti</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6">
                                        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-4">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Klik untuk Upload</p>
                                    </div>
                                )}
                                <input 
                                    ref={fileInputRef}
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                            {errors.image && <p className="text-xs font-bold text-destructive mt-3 italic">{errors.image}</p>}

                            <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col gap-3">
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 shadow-lg shadow-primary/20"
                                >
                                    <Save className="w-5 h-5 mr-2" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                                <Button 
                                    asChild
                                    variant="ghost"
                                    className="w-full text-stone-400 font-bold"
                                >
                                    <Link href={route('admin.materials.index')}>Batal</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </AdminLayout>
    );
}
