import { ExternalLink } from 'lucide-react';

interface Props {
    /** The total count to display */
    count?: number;
    /** The label for the entity (e.g., "Produk", "Material") */
    label: string;
}

/**
 * AdminTableFooter displays a standardized "Total X [Label] Terdaftar" summary
 * below admin data tables.
 */
export default function AdminTableFooter({ count = 0, label }: Props) {
    return (
        <div className="mt-6 flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-widest bg-stone-50/50 w-fit px-3 py-1.5 rounded-lg border border-stone-100">
            <ExternalLink className="w-3.5 h-3.5 text-primary" />
            <span>Total <span className="text-foreground font-black">{count}</span> {label} Terdaftar</span>
        </div>
    );
}
