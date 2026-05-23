import { CheckCircle2, Info } from 'lucide-react';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import { getGroupConfig } from './settingGroupConfig';

interface Props {
    /** The group key (e.g., 'hero', 'contact', 'branding') */
    group: string;
}

/**
 * SettingGuide renders the contextual sidebar guide for a settings group.
 * It displays a description and relevant tips based on the active group.
 */
export default function SettingGuide({ group }: Props) {
    const config = getGroupConfig(group);

    return (
        <div className="sticky top-24 space-y-5">
            <AdminSectionCard icon={Info} title="Panduan" headerBg="bg-primary/5">
                <p className="text-xs font-medium text-stone-600 leading-relaxed">
                    {config.description}
                </p>
                
                <div className="mt-5 pt-5 border-t border-stone-200/60 space-y-3">
                    {config.tips.map((tip, i) => (
                        <div key={i} className="flex gap-3 items-start">
                            <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <CheckCircle2 className="w-3 h-3 text-primary" />
                            </div>
                            <p className="text-[11px] font-medium text-stone-500 leading-relaxed">
                                {tip}
                            </p>
                        </div>
                    ))}
                </div>
            </AdminSectionCard>
        </div>
    );
}
