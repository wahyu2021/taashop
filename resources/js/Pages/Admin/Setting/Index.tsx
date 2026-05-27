import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Save, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { SettingData } from '@/types';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import { getGroupConfig } from '@/Components/features/settings/settingGroupConfig';
import SettingField from '@/Components/features/settings/SettingField';
import SettingGuide from '@/Components/features/settings/SettingGuide';

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

    return (
        <AdminLayout>
            <Head title="Pengaturan Web | Admin Taaashop" />

            <div className="space-y-8 pb-20">
                {/* Header & Global Actions */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-8 border-b border-stone-100">
                    <div>
                        <h1 className="text-3xl font-black text-foreground tracking-tight uppercase">
                            Pengaturan
                        </h1>
                        <p className="text-stone-500 mt-1 font-medium text-sm">
                            Konfigurasi global untuk konten <span className="text-primary font-bold">Taaashop Web</span>.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {recentlySuccessful && (
                            <div className="flex items-center gap-2 text-green-600 font-bold text-xs animate-in fade-in slide-in-from-right-4 bg-green-50 px-4 py-2.5 rounded-xl border border-green-200">
                                <CheckCircle2 className="w-4 h-4" />
                                Berhasil Disimpan
                            </div>
                        )}
                        <Button 
                            onClick={() => handleSubmit()}
                            disabled={processing}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-6 h-10 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95 uppercase tracking-wider text-xs"
                        >
                            {processing ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue={Object.keys(groupedSettings)[0]} className="flex flex-col space-y-10">
                    <div className="w-full">
                        <TabsList className="bg-stone-100/50 p-1.5 rounded-2xl border border-stone-200/40 w-fit">
                            {Object.keys(groupedSettings).map((group) => {
                                const { icon: Icon, label } = getGroupConfig(group);
                                return (
                                    <TabsTrigger 
                                        key={group} 
                                        value={group}
                                        className="rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest data-active:bg-white data-active:text-primary data-active:shadow-lg transition-all"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Icon className="w-4 h-4" />
                                            <span className="hidden sm:inline">{label}</span>
                                        </span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>

                    <div className="w-full">
                        {Object.entries(groupedSettings).map(([group, settings]) => {
                            const groupConfig = getGroupConfig(group);
                            return (
                                <TabsContent key={group} value={group} className="mt-0 focus-visible:ring-0 animate-in fade-in duration-500">
                                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                                        {/* Form Section */}
                                        <div className="xl:col-span-3 space-y-6">
                                            <AdminSectionCard 
                                                icon={groupConfig.icon}
                                                title={`Konfigurasi ${groupConfig.label}`}
                                                description="Input data dengan teliti, perubahan akan langsung aktif di halaman publik."
                                            >
                                                <div className="space-y-8">
                                                    {settings.map((setting) => (
                                                        <SettingField
                                                            key={setting.id}
                                                            setting={setting}
                                                            value={data.settings[setting.key]}
                                                            onInputChange={handleInputChange}
                                                            onFileChange={handleFileChange}
                                                        />
                                                    ))}
                                                </div>
                                            </AdminSectionCard>
                                        </div>

                                        {/* Guidance Sidebar */}
                                        <div className="xl:col-span-1">
                                            <SettingGuide group={group} />
                                        </div>
                                    </div>
                                </TabsContent>
                            );
                        })}
                    </div>
                </Tabs>
            </div>
        </AdminLayout>
    );
}
