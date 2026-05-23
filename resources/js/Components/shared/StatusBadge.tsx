import { Badge } from '@/Components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
    /** The status string (e.g., 'published', 'draft', 'new', 'contacted', 'closed') */
    status: string;
    /** Optional additional class names */
    className?: string;
}

/**
 * StatusBadge component provides consistent styling for various entity statuses across the admin panel.
 * It automatically maps status keys to their respective brand-aligned colors and labels.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered badge component.
 */
export default function StatusBadge({ status, className }: Props) {
    const s = status.toLowerCase();
    
    let config = {
        label: status,
        color: 'bg-stone-100 text-stone-500'
    };

    switch (s) {
        case 'published':
            config = { label: 'Aktif', color: 'bg-green-100 text-green-600' };
            break;
        case 'draft':
            config = { label: 'Draft', color: 'bg-stone-100 text-stone-500' };
            break;
        case 'new':
            config = { label: 'Baru', color: 'bg-blue-100 text-blue-600' };
            break;
        case 'contacted':
            config = { label: 'Dihubungi', color: 'bg-orange-100 text-orange-600' };
            break;
        case 'closed':
            config = { label: 'Selesai', color: 'bg-stone-100 text-stone-500' };
            break;
    }

    return (
        <Badge 
            className={cn(
                "text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 border-none shadow-none", 
                config.color, 
                className
            )}
        >
            {config.label}
        </Badge>
    );
}
