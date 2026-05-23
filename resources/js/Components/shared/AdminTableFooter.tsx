import { ExternalLink } from 'lucide-react';

interface Props {
    /** The total count to display */
    count: number;
    /** The label for the entity (e.g., "Produk", "Material") */
    label: string;
}

/**
 * AdminTableFooter displays a standardized "Total X [Label] Terdaftar" summary
 * below admin data tables.
 */
export default function AdminTableFooter({ count, label }: Props) {
    return (
        <div className="mt-6 flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
            <ExternalLink className="w-3 h-3" />
            <span>Total {count} {label} Terdaftar</span>
        </div>
    );
}
