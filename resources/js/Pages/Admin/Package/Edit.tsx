import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ChevronLeft, 
    Save, 
    Package as PackageIcon,
    Info,
    Upload,
    X,
    Tag,
    DollarSign,
    Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useState, useRef } from 'react';
import { PackageData } from '@/types';

interface Props {
    package: PackageData;
    statuses: string[];
    printTypes: { name: string, value: string }[];
}

export default function Edit({ package: pkg, statuses, printTypes }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(pkg.image_url || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        title: pkg.title,
        product_type: pkg.product_type,
        includes: pkg.includes || '',
        print_type: pkg.print_type || '',
        min_price: pkg.min_price,
        max_price: pkg.max_price,
        order_priority: pkg.order_priority,
        status: pkg.status.toLowerCase(),
        image: null as File | null,
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

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.packages.update', pkg.id));
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus paket harga ini?')) {
            destroy(route('admin.packages.destroy', pkg.id));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Edit Paket: ${pkg.title}`} />

            {/* Breadcrumbs / Back Button */}
            <div className="mb-8">
                <Link 
                    href={route('admin.packages.index')}
                    className="flex items-center text-xs font-bold text-stone-400 uppercase tracking-widest hover:text-primary transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Kembali ke Daftar
                </Link>
                <div className="flex items-center justify-between mt-4">
                    <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                        Edit Paket Harga
                    </h1>
                    <Button 
                        variant="ghost" 
                        onClick={handleDelete}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 font-bold text-xs uppercase tracking-widest"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Paket
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Main Form Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                            <CardTitle className="text-lg font-bold flex items-center gap-2 text-stone-700">
                                <PackageIcon className="w-5 h-5 text-primary" />
                                Informasi Paket
                              </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-stone-500">Nama Paket</Label>
                                    <Input 
                                        id="title"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="bg-stone-50 border-stone-200"
                                    />
                                    {errors.title && <p className="text-xs font-bold text-destructive italic">{errors.title}</p>}
                                </div>

                                {/* Product Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="product_type" className="text-xs font-bold uppercase tracking-widest text-stone-500">Tipe Produk</Label>
                                    <Input 
                                        id="product_type"
                                        value={data.product_type}
                                        onChange={e => setData('product_type', e.target.value)}
                                        className="bg-stone-50 border-stone-200"
                                    />
                                    {errors.product_type && <p className="text-xs font-bold text-destructive italic">{errors.product_type}</p>}
                                </div>

                                {/* Print Type */}
                                <div className="space-y-2">
                                    <Label htmlFor="print_type" className="text-xs font-bold uppercase tracking-widest text-stone-500">Tipe Print</Label>
                                    <select 
                                        id="print_type"
                                        value={data.print_type}
                                        onChange={e => setData('print_type', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                    >
                                        <option value="">Pilih Tipe</option>
                                        {printTypes.map(pt => (
                                            <option key={pt.value} value={pt.value}>{pt.name}</option>
                                        ))}
                                    </select>
                                    {errors.print_type && <p className="text-xs font-bold text-destructive italic">{errors.print_type}</p>}
                                </div>

                                {/* Includes */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="includes" className="text-xs font-bold uppercase tracking-widest text-stone-500">Sudah Termasuk</Label>
                                    <Input 
                                        id="includes"
                                        value={data.includes}
                                        onChange={e => setData('includes', e.target.value)}
                                        className="bg-stone-50 border-stone-200"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                            <CardTitle className="text-lg font-bold flex items-center gap-2 text-stone-700">
                                <DollarSign className="w-5 h-5 text-green-500" />
                                Pengaturan Harga & Urutan
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Min Price */}
                                <div className="space-y-2">
                                    <Label htmlFor="min_price" className="text-xs font-bold uppercase tracking-widest text-stone-500">Harga Terendah (IDR)</Label>
                                    <Input 
                                        id="min_price"
                                        type="number"
                                        value={data.min_price}
                                        onChange={e => setData('min_price', parseFloat(e.target.value))}
                                        className="bg-stone-50 border-stone-200"
                                    />
                                    {errors.min_price && <p className="text-xs font-bold text-destructive italic">{errors.min_price}</p>}
                                </div>

                                {/* Max Price */}
                                <div className="space-y-2">
                                    <Label htmlFor="max_price" className="text-xs font-bold uppercase tracking-widest text-stone-500">Harga Tertinggi (IDR)</Label>
                                    <Input 
                                        id="max_price"
                                        type="number"
                                        value={data.max_price}
                                        onChange={e => setData('max_price', parseFloat(e.target.value))}
                                        className="bg-stone-50 border-stone-200"
                                    />
                                    {errors.max_price && <p className="text-xs font-bold text-destructive italic">{errors.max_price}</p>}
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
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Image Upload */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden sticky top-24">
                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 text-stone-600 uppercase tracking-widest">
                                Gambar Cover Paket
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
                                    <Link href={route('admin.packages.index')}>Batal</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </AdminLayout>
    );
}
