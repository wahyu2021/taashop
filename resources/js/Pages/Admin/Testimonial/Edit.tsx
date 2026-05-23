import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Save, UserCircle, Star } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import { useState } from 'react';
import { TestimonialData } from '@/types';

export default function Edit({ testimonial }: { testimonial: TestimonialData }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        customer_name: testimonial.customer_name,
        customer_title: testimonial.customer_title || '',
        content: testimonial.content,
        rating: testimonial.rating,
        order_priority: 0,
        is_published: true,
        avatar: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(testimonial.avatar_url);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('avatar', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.testimonials.update', testimonial.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Testimoni: ${testimonial.customer_name}`} />

            <AdminFormHeader 
                backHref={route('admin.testimonials.index')}
                backText="Kembali ke Daftar"
                title="Edit Testimoni"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                        <AdminSectionCard 
                            icon={UserCircle}
                            title="Profil & Isi Testimoni"
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="customer_name" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                            Nama Pelanggan
                                        </Label>
                                        <Input 
                                            id="customer_name"
                                            value={data.customer_name}
                                            onChange={(e) => setData('customer_name', e.target.value)}
                                            className={errors.customer_name ? 'border-destructive' : ''}
                                        />
                                        {errors.customer_name && <p className="text-xs font-bold text-destructive italic">{errors.customer_name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="customer_title" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                            Jabatan/Komunitas
                                        </Label>
                                        <Input 
                                            id="customer_title"
                                            value={data.customer_title}
                                            onChange={(e) => setData('customer_title', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                        Pesan Testimoni
                                    </Label>
                                    <Textarea 
                                        id="content"
                                        rows={4}
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className={errors.content ? 'border-destructive' : ''}
                                    />
                                    {errors.content && <p className="text-xs font-bold text-destructive italic">{errors.content}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="rating" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                            Rating Bintang
                                        </Label>
                                        <select 
                                            id="rating"
                                            value={data.rating}
                                            onChange={(e) => setData('rating', parseInt(e.target.value))}
                                            className="w-full bg-stone-50 border border-stone-200 rounded-lg h-10 px-3 text-sm"
                                        >
                                            {[5, 4, 3, 2, 1].map(num => (
                                                <option key={num} value={num}>{num} Bintang</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-3 pt-8">
                                        <Switch 
                                            id="is_published"
                                            checked={data.is_published}
                                            onCheckedChange={(val) => setData('is_published', val)}
                                        />
                                        <Label htmlFor="is_published" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                            Tampilkan di Web
                                        </Label>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-stone-100 flex justify-end">
                                    <Button type="submit" disabled={processing} className="font-bold px-8">
                                        <Save className="w-5 h-5 mr-2" />
                                        {processing ? 'Memperbarui...' : 'Simpan Perubahan'}
                                    </Button>
                                </div>
                            </div>
                        </AdminSectionCard>
                    </form>
                </div>

                <div className="space-y-6">
                    <AdminSectionCard icon={Star} title="Foto Profil">
                        <div className="space-y-4">
                            <div className="w-32 h-32 mx-auto rounded-full bg-stone-100 border-2 border-dashed border-stone-200 overflow-hidden flex items-center justify-center">
                                {preview ? (
                                    <img src={preview} alt="Avatar Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <UserCircle className="w-12 h-12 text-stone-300" />
                                )}
                            </div>
                            <div className="text-center">
                                <Label htmlFor="avatar" className="cursor-pointer bg-stone-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-stone-800 transition-colors">
                                    Ganti Foto
                                </Label>
                                <input 
                                    id="avatar"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </AdminSectionCard>
                </div>
            </div>
        </AdminLayout>
    );
}
