import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Settings, 
    Save, 
    Smartphone, 
    Globe, 
    Layout, 
    Info,
    CheckCircle2,
    ArrowRight,
    Fingerprint
} from 'lucide-react';
import { CardContent, CardTitle, CardDescription } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { SettingData } from '@/types';
import { useState } from 'react';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import ImageUploader from '@/Components/shared/ImageUploader';

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

    const { data, setData, post, processing, recentlySuccessful } = useForm({
        settings: initialSettings,
        files: {} as Record<string, File | null>,
        _method: 'patch',
    });

    const [previews, setPreviews] = useState<Record<string, string>>({});

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        post(route('admin.settings.update'));
    };

    const handleInputChange = (key: string, value: string) => {
        setData('settings', {
            ...data.settings,
            [key]: value,
        });
    };

    const handleFileChange = (key: string, file: File | null) => {
        setData('files', {
            ...data.files,
            [key]: file,
        });
    };

    const getGroupIcon = (group: string) => {
        switch (group) {
            case 'hero': return Layout;
            case 'contact': return Smartphone;
            case 'social': return Globe;
            case 'branding': return Fingerprint;
            default: return Settings;
        }
    };

    const getGroupLabel = (group: string) => {
        switch (group) {
            case 'hero': return 'Hero Section';
            case 'contact': return 'Kontak & Alamat';
            case 'social': return 'Media Sosial';
            case 'branding': return 'Branding & Identitas';
            default: return group.toUpperCase();
        }
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan Web" />

            <div className="space-y-8 pb-20">
                {/* Header & Global Actions */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-8 border-b border-stone-100">
                    <div>
                        <h1 className="text-3xl font-black text-foreground tracking-tight uppercase">
                            Settings
                        </h1>
                        <p className="text-stone-500 mt-1 font-medium text-sm">
                            Konfigurasi global untuk konten <span className="text-primary font-bold">Taashop Web</span>.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {recentlySuccessful && (
                            <div className="flex items-center gap-2 text-green-600 font-bold text-xs animate-in fade-in slide-in-from-right-4 bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                                <CheckCircle2 className="w-4 h-4" />
                                Updated
                            </div>
                        )}
                        <Button 
                            onClick={() => handleSubmit()}
                            disabled={processing}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-10 h-12 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 uppercase tracking-wider text-xs"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue={Object.keys(groupedSettings)[0]} className="flex flex-col space-y-10">
                    <div className="w-full">
                        <TabsList className="bg-stone-100/50 p-1.5 rounded-2xl border border-stone-200/40 w-fit">
                            {Object.keys(groupedSettings).map((group) => {
                                const Icon = getGroupIcon(group);
                                return (
                                    <TabsTrigger 
                                        key={group} 
                                        value={group}
                                        className="rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-[0.1em] data-active:bg-white data-active:text-primary data-active:shadow-lg transition-all"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Icon className="w-4 h-4" />
                                            {getGroupLabel(group)}
                                        </span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>

                    <div className="w-full">
                        {Object.entries(groupedSettings).map(([group, settings]) => (
                            <TabsContent key={group} value={group} className="mt-0 focus-visible:ring-0 animate-in fade-in duration-500">
                                <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                                    <div className="xl:col-span-3 space-y-6">
                                        <AdminSectionCard 
                                            icon={getGroupIcon(group)}
                                            title={`Konfigurasi ${getGroupLabel(group)}`}
                                            description="Input data dengan teliti, perubahan akan langsung aktif di halaman publik."
                                        >
                                            <div className="space-y-8">
                                                {settings.map((setting) => (
                                                    <div key={setting.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start group">
                                                        <div className="md:col-span-1 pt-2">
                                                            <Label htmlFor={setting.key} className="text-[10px] font-black uppercase tracking-widest text-stone-400 block mb-1 group-focus-within:text-primary transition-colors">
                                                                {setting.label}
                                                            </Label>
                                                            <code className="text-[9px] text-stone-300 font-bold uppercase truncate">
                                                                KEY: {setting.key}
                                                            </code>
                                                        </div>
                                                        
                                                        <div className="md:col-span-3">
                                                            {setting.type === 'textarea' ? (
                                                                <textarea 
                                                                    id={setting.key}
                                                                    value={data.settings[setting.key]}
                                                                    onChange={(e) => handleInputChange(setting.key, e.target.value)}
                                                                    rows={4}
                                                                    className="flex w-full rounded-xl border-2 border-stone-100 bg-stone-50/30 px-4 py-3 text-sm font-medium ring-offset-background placeholder:text-stone-300 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all leading-relaxed"
                                                                    placeholder={`Enter ${setting.label}...`}
                                                                />
                                                            ) : setting.type === 'image' ? (
                                                                <ImageUploader 
                                                                    value={setting.image_url}
                                                                    onChange={(file) => handleFileChange(setting.key, file)}
                                                                    className="max-w-md"
                                                                />
                                                            ) : (
                                                                <div className="relative">
                                                                    <Input 
                                                                        id={setting.key}
                                                                        type={setting.type}
                                                                        value={data.settings[setting.key]}
                                                                        onChange={(e) => handleInputChange(setting.key, e.target.value)}
                                                                        className="h-14 rounded-xl border-2 border-stone-100 bg-stone-50/30 px-4 text-sm font-bold focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 transition-all"
                                                                        placeholder={`Enter ${setting.label}...`}
                                                                    />
                                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-200">
                                                                        <ArrowRight className="w-4 h-4" />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </AdminSectionCard>
                                    </div>

                                    <div className="xl:col-span-1">
                                        <div className="sticky top-24 space-y-6">
                                            <AdminSectionCard icon={Info} title="Guide" headerBg="bg-primary/5">
                                                <p className="text-xs font-bold text-stone-600 leading-relaxed">
                                                    Pengaturan <span className="underline decoration-primary/30 underline-offset-4">{getGroupLabel(group)}</span> akan berdampak pada SEO & Landing Page.
                                                </p>
                                                <div className="mt-6 pt-6 border-t border-stone-200/60 space-y-5">
                                                    <div className="flex gap-4">
                                                        <div className="w-8 h-8 rounded-lg bg-white border border-stone-100 shadow-sm flex items-center justify-center shrink-0">
                                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                        </div>
                                                        <p className="text-[10px] font-bold text-stone-400 uppercase leading-tight">Data disanitasi secara otomatis.</p>
                                                    </div>
                                                </div>
                                            </AdminSectionCard>

                                            <div className="p-6 rounded-2xl bg-stone-900 text-white shadow-xl shadow-stone-200">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3 text-center">System Secure</h4>
                                                <div className="h-1 w-full bg-stone-800 rounded-full overflow-hidden">
                                                    <div className="h-full w-full bg-primary animate-pulse" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
