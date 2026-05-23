import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import ImageUploader from '@/Components/shared/ImageUploader';
import { SettingData } from '@/types';

interface Props {
    /** The setting data object to render */
    setting: SettingData;
    /** Current value from the form state */
    value: string;
    /** Callback when a text/textarea value changes */
    onInputChange: (key: string, value: string) => void;
    /** Callback when a file is selected or cleared */
    onFileChange: (key: string, file: File | null) => void;
}

/**
 * SettingField renders a single setting row in the settings form.
 * It adapts its input type based on `setting.type` (text, textarea, image, url, etc.).
 * 
 * Layout: label column (1/4) + input column (3/4) on desktop, stacked on mobile.
 */
export default function SettingField({ setting, value, onInputChange, onFileChange }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start group">
            {/* Label Column */}
            <div className="md:col-span-1 pt-2">
                <Label 
                    htmlFor={setting.key} 
                    className="text-[10px] font-black uppercase tracking-widest text-stone-400 block mb-1 group-focus-within:text-primary transition-colors"
                >
                    {setting.label}
                </Label>
                <code className="text-[9px] text-stone-300 font-bold uppercase truncate block">
                    KEY: {setting.key}
                </code>
            </div>
            
            {/* Input Column */}
            <div className="md:col-span-3">
                {setting.type === 'textarea' ? (
                    <textarea 
                        id={setting.key}
                        value={value}
                        onChange={(e) => onInputChange(setting.key, e.target.value)}
                        rows={4}
                        className="flex w-full rounded-xl border-2 border-stone-100 bg-stone-50/30 px-4 py-3 text-sm font-medium ring-offset-background placeholder:text-stone-300 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 transition-all leading-relaxed resize-none"
                        placeholder={`Masukkan ${setting.label.toLowerCase()}...`}
                    />
                ) : setting.type === 'image' ? (
                    <ImageUploader 
                        value={setting.image_url}
                        onChange={(file) => onFileChange(setting.key, file)}
                        aspectRatio="aspect-[3/2]"
                        className="max-w-xs"
                    />
                ) : (
                    <Input 
                        id={setting.key}
                        type={setting.type}
                        value={value}
                        onChange={(e) => onInputChange(setting.key, e.target.value)}
                        className="h-14 rounded-xl border-2 border-stone-100 bg-stone-50/30 px-4 text-sm font-bold focus-visible:ring-4 focus-visible:ring-primary/5 focus-visible:border-primary/40 transition-all"
                        placeholder={`Masukkan ${setting.label.toLowerCase()}...`}
                    />
                )}
            </div>
        </div>
    );
}
