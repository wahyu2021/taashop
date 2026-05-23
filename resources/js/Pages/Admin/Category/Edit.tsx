import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Save, 
    Layers,
    Info,
    Trash2
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { CategoryData } from '@/types';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';

interface Props {
    category: CategoryData;
}

export default function Edit({ category }: Props) {
    const { data, setData, put, processing, errors, delete: destroy } = useForm({
        name: category.name,
        type: category.type,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.categories.update', category.id!));
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus kategori ini? Semua produk terkait mungkin akan terpengaruh.')) {
            destroy(route('admin.categories.destroy', category.id!));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Edit Kategori: ${category.name}`} />

            <AdminFormHeader 
                backHref={route('admin.categories.index')}
                backText="Kembali ke Daftar"
                title="Edit Kategori"
                action={
                    <Button 
                        variant="ghost" 
                        onClick={handleDelete}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold text-xs uppercase tracking-widest"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Kategori
                    </Button>
                }
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
                                        {processing ? 'Memperbarui...' : 'Simpan Perubahan'}
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
                        title="Detail Metadata"
                        headerBg="bg-stone-50"
                    >
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">ID Kategori</p>
                                <p className="text-sm font-bold text-stone-700">#{category.id}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Current Slug</p>
                                <p className="text-sm font-mono text-stone-500 bg-stone-100 px-2 py-1 rounded inline-block">{category.slug}</p>
                            </div>
                            <p className="text-xs font-medium text-stone-500 italic leading-relaxed pt-2 border-t border-stone-200">
                                Perubahan nama akan memperbarui slug secara otomatis. Pastikan link eksternal yang menggunakan slug lama telah diperbarui.
                            </p>
                        </div>
                    </AdminSectionCard>
                </div>
            </div>
        </AdminLayout>
    );
}
