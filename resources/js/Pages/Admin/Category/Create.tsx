import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Save, 
    Layers,
    Info
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'gallery',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah Kategori Baru" />

            <AdminFormHeader 
                backHref={route('admin.categories.index')}
                backText="Kembali ke Daftar"
                title="Tambah Kategori"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                        <AdminSectionCard 
                            icon={Layers}
                            title="Informasi Kategori"
                        >
                            <div className="space-y-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                        Nama Kategori
                                    </Label>
                                    <Input 
                                        id="name"
                                        type="text"
                                        placeholder="Contoh: Jersey Futsal, Sablon DTF"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`bg-stone-50 border-stone-200 focus:border-primary focus:ring-primary/20 transition-all ${errors.name ? 'border-destructive' : ''}`}
                                    />
                                    {errors.name && <p className="text-xs font-bold text-destructive italic">{errors.name}</p>}
                                </div>

                                {/* Type Field */}
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                        Tipe Kategori
                                    </Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setData('type', 'gallery')}
                                            className={`
                                                p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                                                ${data.type === 'gallery' 
                                                    ? 'border-primary bg-primary/5 text-primary' 
                                                    : 'border-stone-100 bg-stone-50 text-stone-400 hover:border-stone-200'}
                                            `}
                                        >
                                            <span className="font-black uppercase tracking-widest text-[10px]">Galeri Portfolio</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setData('type', 'package')}
                                            className={`
                                                p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                                                ${data.type === 'package' 
                                                    ? 'border-orange-500 bg-orange-50 text-orange-600' 
                                                    : 'border-stone-100 bg-stone-50 text-stone-400 hover:border-stone-200'}
                                            `}
                                        >
                                            <span className="font-black uppercase tracking-widest text-[10px]">Paket Harga</span>
                                        </button>
                                    </div>
                                    {errors.type && <p className="text-xs font-bold text-destructive italic">{errors.type}</p>}
                                </div>

                                <div className="pt-6 border-t border-stone-100 flex justify-end">
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 shadow-lg shadow-primary/20 transition-all active:scale-95"
                                    >
                                        <Save className="w-5 h-5 mr-2" />
                                        {processing ? 'Menyimpan...' : 'Simpan Kategori'}
                                    </Button>
                                </div>
                            </div>
                        </AdminSectionCard>
                    </form>
                </div>

                {/* Info / Sidebar */}
                <div className="space-y-6">
                    <AdminSectionCard 
                        icon={Info}
                        title="Tips"
                        headerBg="bg-primary"
                        className="bg-primary text-primary-foreground"
                    >
                        <div className="space-y-4">
                            <p className="text-sm font-medium leading-relaxed opacity-90">
                                Gunakan nama yang deskriptif dan unik. Slug akan dibuat otomatis berdasarkan nama kategori.
                            </p>
                            <div className="pt-4 border-t border-white/10 text-[10px] font-bold uppercase tracking-widest opacity-80">
                                <p>Tipe Galeri: Untuk portofolio hasil sablon/jersey.</p>
                                <p className="mt-2">Tipe Paket: Untuk kategori produk dalam daftar harga.</p>
                            </div>
                        </div>
                    </AdminSectionCard>
                </div>
            </div>
        </AdminLayout>
    );
}
