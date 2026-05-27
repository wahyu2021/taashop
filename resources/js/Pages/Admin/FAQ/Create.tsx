import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Save, HelpCircle, Info } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';
import AdminFormHeader from '@/Components/shared/AdminFormHeader';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        question: '',
        answer: '',
        order_priority: 0,
        is_published: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.faqs.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah FAQ | Admin Taaashop" />

            <AdminFormHeader 
                backHref={route('admin.faqs.index')}
                backText="Kembali ke Daftar"
                title="Tambah FAQ"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                        <AdminSectionCard 
                            icon={HelpCircle}
                            title="Detail Pertanyaan & Jawaban"
                        >
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="question" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                        Pertanyaan
                                    </Label>
                                    <Input 
                                        id="question"
                                        type="text"
                                        placeholder="Contoh: Berapa lama waktu pengerjaan?"
                                        value={data.question}
                                        onChange={(e) => setData('question', e.target.value)}
                                        className={errors.question ? 'border-destructive' : ''}
                                    />
                                    {errors.question && <p className="text-xs font-bold text-destructive italic">{errors.question}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="answer" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                        Jawaban
                                    </Label>
                                    <Textarea 
                                        id="answer"
                                        placeholder="Tuliskan jawaban lengkap di sini..."
                                        rows={5}
                                        value={data.answer}
                                        onChange={(e) => setData('answer', e.target.value)}
                                        className={errors.answer ? 'border-destructive' : ''}
                                    />
                                    {errors.answer && <p className="text-xs font-bold text-destructive italic">{errors.answer}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="order_priority" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                            Urutan Tampil
                                        </Label>
                                        <Input 
                                            id="order_priority"
                                            type="number"
                                            value={data.order_priority}
                                            onChange={(e) => setData('order_priority', parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="flex items-center gap-3 pt-8">
                                        <Switch 
                                            id="is_published"
                                            checked={data.is_published}
                                            onCheckedChange={(val) => setData('is_published', val)}
                                        />
                                        <Label htmlFor="is_published" className="text-xs font-bold uppercase tracking-widest text-stone-500">
                                            Publikasikan
                                        </Label>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-stone-100 flex justify-end">
                                    <Button type="submit" disabled={processing} className="font-bold px-8">
                                        <Save className="w-5 h-5 mr-2" />
                                        {processing ? 'Menyimpan...' : 'Simpan FAQ'}
                                    </Button>
                                </div>
                            </div>
                        </AdminSectionCard>
                    </form>
                </div>

                <div className="space-y-6">
                    <AdminSectionCard icon={Info} title="Tips Pengaturan">
                        <p className="text-sm text-stone-600 leading-relaxed">
                            Gunakan bahasa yang mudah dimengerti pelanggan. FAQ yang baik dapat mengurangi jumlah pertanyaan berulang di WhatsApp.
                        </p>
                    </AdminSectionCard>
                </div>
            </div>
        </AdminLayout>
    );
}
