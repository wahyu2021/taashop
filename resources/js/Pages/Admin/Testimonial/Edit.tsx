import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Save, UserCircle, Star, Image as ImageIcon } from 'lucide-react';
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
        proof: null as File | null,
    });

    const [avatarPreview, setAvatarPreview] = useState<string | null>(testimonial.avatar_url);
    const [proofPreview, setProofPreview] = useState<string | null>(testimonial.proof_url);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('avatar', file);
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('proof', file);
        if (file) {
            setProofPreview(URL.createObjectURL(file));
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
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
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

                        <AdminSectionCard 
                            icon={ImageIcon}
                            title="Bukti Testimoni (Screenshot Chat/Produk)"
                        >
                            <div className="space-y-6">
                                <div className="aspect-video w-full max-w-md mx-auto bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl overflow-hidden flex items-center justify-center relative group">
                                    {proofPreview ? (
                                        <img src={proofPreview} alt="Proof Preview" className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="text-center p-6">
                                            <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                                            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Pilih Gambar Bukti</p>
                                        </div>
                                    )}
                                    <label className="absolute inset-0 cursor-pointer opacity-0" htmlFor="proof" />
                                </div>
                                <input 
                                    id="proof"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleProofChange}
                                />
                                <p className="text-[10px] text-center text-stone-400 uppercase tracking-widest font-bold">
                                    Ganti screenshot WhatsApp atau foto produk.
                                </p>
                            </div>
                        </AdminSectionCard>
                    </form>
                </div>

                <div className="space-y-6">
                    <AdminSectionCard icon={Star} title="Foto Profil">
                        <div className="space-y-4">
                            <div className="w-32 h-32 mx-auto rounded-full bg-stone-100 border-2 border-dashed border-stone-200 overflow-hidden flex items-center justify-center relative group">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <UserCircle className="w-12 h-12 text-stone-300" />
                                )}
                                <label className="absolute inset-0 cursor-pointer opacity-0" htmlFor="avatar" />
                            </div>
                            <input 
                                id="avatar"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                            <div className="text-center">
                                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Ganti Foto Profil</p>
                            </div>
                        </div>
                    </AdminSectionCard>
                </div>
            </div>
        </AdminLayout>
    );
}
