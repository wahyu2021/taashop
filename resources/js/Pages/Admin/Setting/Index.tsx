import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Settings, 
    Save, 
    Smartphone, 
    Globe, 
    Layout, 
    Info,
    CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { SettingData } from '@/types';

interface Props {
    groupedSettings: Record<string, SettingData[]>;
}

export default function Index({ groupedSettings }: Props) {
    // Flatten settings for form initialization
    const initialSettings: Record<string, string> = {};
    Object.values(groupedSettings).forEach(group => {
        group.forEach(setting => {
            initialSettings[setting.key] = setting.value || '';
        });
    });

    const { data, setData, patch, processing, recentlySuccessful } = useForm({
        settings: initialSettings,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.settings.update'));
    };

    const handleInputChange = (key: string, value: string) => {
        setData('settings', {
            ...data.settings,
            [key]: value,
        });
    };

    const getGroupIcon = (group: string) => {
        switch (group) {
            case 'hero': return <Layout className="w-4 h-4" />;
            case 'contact': return <Smartphone className="w-4 h-4" />;
            case 'social': return <Globe className="w-4 h-4" />;
            default: return <Settings className="w-4 h-4" />;
        }
    };

    const getGroupLabel = (group: string) => {
        switch (group) {
            case 'hero': return 'Hero Section';
            case 'contact': return 'Kontak & Alamat';
            case 'social': return 'Media Sosial';
            default: return group.toUpperCase();
        }
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan Web" />

            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                    Pengaturan Web
                </h1>
                <p className="text-stone-500 mt-1 font-medium">
                    Kelola konfigurasi global website Taashop mulai dari kontak hingga teks promo.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="pb-20">
                <Tabs defaultValue={Object.keys(groupedSettings)[0]} className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <TabsList className="bg-stone-100 p-1 rounded-xl h-auto self-start">
                            {Object.keys(groupedSettings).map((group) => (
                                <TabsTrigger 
                                    key={group} 
                                    value={group}
                                    className="rounded-lg px-6 py-2.5 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all"
                                >
                                    <span className="flex items-center gap-2">
                                        {getGroupIcon(group)}
                                        {getGroupLabel(group)}
                                    </span>
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <div className="flex items-center gap-3">
                            {recentlySuccessful && (
                                <div className="flex items-center gap-1.5 text-green-600 font-bold text-xs animate-in fade-in slide-in-from-right-4">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Tersimpan!
                                </div>
                            )}
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 shadow-lg shadow-primary/20 transition-all active:scale-95"
                            >
                                <Save className="w-5 h-5 mr-2" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </div>

                    {Object.entries(groupedSettings).map(([group, settings]) => (
                        <TabsContent key={group} value={group} className="mt-0 focus-visible:ring-0">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <Card className="border-none shadow-sm overflow-hidden">
                                        <CardHeader className="bg-stone-50 border-b border-stone-100">
                                            <CardTitle className="text-lg font-bold text-stone-700">
                                                Konfigurasi {getGroupLabel(group)}
                                            </CardTitle>
                                            <CardDescription>
                                                Ubah nilai pengaturan di bawah ini untuk memperbarui tampilan web publik.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-6 space-y-6">
                                            {settings.map((setting) => (
                                                <div key={setting.id} className="space-y-2">
                                                    <Label htmlFor={setting.key} className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                                                        {setting.label}
                                                    </Label>
                                                    
                                                    {setting.type === 'textarea' ? (
                                                        <textarea 
                                                            id={setting.key}
                                                            value={data.settings[setting.key]}
                                                            onChange={(e) => handleInputChange(setting.key, e.target.value)}
                                                            rows={4}
                                                            className="flex w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                                        />
                                                    ) : (
                                                        <Input 
                                                            id={setting.key}
                                                            type={setting.type}
                                                            value={data.settings[setting.key]}
                                                            onChange={(e) => handleInputChange(setting.key, e.target.value)}
                                                            className="bg-stone-50 border-stone-200 focus-visible:ring-primary/20 h-11"
                                                            placeholder={`Masukkan ${setting.label}...`}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="space-y-6">
                                    <Card className="border-none shadow-sm bg-stone-900 text-white overflow-hidden">
                                        <CardHeader>
                                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                                <Info className="w-4 h-4 text-primary" />
                                                Petunjuk
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <p className="text-xs font-medium text-stone-400 leading-relaxed">
                                                Pengaturan ini bersifat global. Perubahan yang Anda simpan akan langsung berdampak pada halaman utama website.
                                            </p>
                                            <div className="pt-4 border-t border-white/10 space-y-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                                                    <p className="text-[10px] font-bold text-stone-300 uppercase leading-tight">Gunakan kode negara (misal 62) untuk nomor WA.</p>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                                                    <p className="text-[10px] font-bold text-stone-300 uppercase leading-tight">Pastikan URL sosial media diawali dengan https://</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </form>
        </AdminLayout>
    );
}
