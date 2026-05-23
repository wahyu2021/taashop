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
    ArrowRight
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

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
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
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-6 h-10 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 uppercase tracking-wider text-xs"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {processing ? 'Sedang Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue={Object.keys(groupedSettings)[0]} className="flex flex-col space-y-10">
                    {/* Navigation Bar - Column Flow ensures this stays on top */}
                    <div className="w-full">
                        <TabsList className="bg-stone-100/50 p-1.5 rounded-2xl border border-stone-200/40 w-fit">
                            {Object.keys(groupedSettings).map((group) => (
                                <TabsTrigger 
                                    key={group} 
                                    value={group}
                                    className="rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest data-active:bg-white data-active:text-primary data-active:shadow-lg transition-all"
                                >
                                    <span className="flex items-center gap-2">
                                        {getGroupIcon(group)}
                                        {getGroupLabel(group)}
                                    </span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* Content Section - Renders below navigation due to flex-col */}
                    <div className="w-full">
                        {Object.entries(groupedSettings).map(([group, settings]) => (
                            <TabsContent key={group} value={group} className="mt-0 focus-visible:ring-0 animate-in fade-in duration-500">
                                <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                                    {/* Form Section */}
                                    <div className="xl:col-span-3 space-y-6">
                                        {settings.map((setting) => (
                                            <div key={setting.id} className="group relative">
                                                <Card className="border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white border border-stone-100">
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-stone-100 group-focus-within:bg-primary transition-colors" />
                                                    <CardContent className="p-0">
                                                        <div className="grid grid-cols-1 md:grid-cols-4 items-stretch">
                                                            {/* Label Column */}
                                                            <div className="md:col-span-1 p-6 bg-stone-50/50 border-r border-stone-100 flex flex-col justify-center">
                                                                <Label htmlFor={setting.key} className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-1">
                                                                    {setting.label}
                                                                </Label>
                                                                <code className="text-[9px] text-stone-300 font-bold uppercase truncate">
                                                                    KEY: {setting.key}
                                                                </code>
                                                            </div>
                                                            
                                                            {/* Input Column */}
                                                            <div className="md:col-span-3 p-6">
                                                                {setting.type === 'textarea' ? (
                                                                    <textarea 
                                                                        id={setting.key}
                                                                        value={data.settings[setting.key]}
                                                                        onChange={(e) => handleInputChange(setting.key, e.target.value)}
                                                                        rows={4}
                                                                        className="flex w-full rounded-xl border-2 border-stone-100 bg-white px-4 py-3 text-sm font-medium ring-offset-background placeholder:text-stone-300 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all leading-relaxed"
                                                                        placeholder={`Enter ${setting.label}...`}
                                                                    />
                                                                ) : (
                                                                    <div className="relative">
                                                                        <Input 
                                                                            id={setting.key}
                                                                            type={setting.type}
                                                                            value={data.settings[setting.key]}
                                                                            onChange={(e) => handleInputChange(setting.key, e.target.value)}
                                                                            className="h-14 rounded-xl border-2 border-stone-100 bg-white px-4 text-sm font-bold focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 transition-all"
                                                                            placeholder={`Enter ${setting.label}...`}
                                                                        />
                                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-200">
                                                                            <ArrowRight className="w-4 h-4" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Guidance Section */}
                                    <div className="xl:col-span-1">
                                        <div className="sticky top-24 space-y-6">
                                            <Card className="border-2 border-primary/10 bg-primary/2 shadow-none overflow-hidden rounded-2xl">
                                                <CardHeader className="bg-primary/5 border-b border-primary/10 py-4">
                                                    <CardTitle className="text-xs font-black flex items-center gap-2 text-primary uppercase tracking-widest">
                                                        <Info className="w-4 h-4 text-primary" />
                                                        Guide: {getGroupLabel(group)}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-6">
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
                                                </CardContent>
                                            </Card>

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
