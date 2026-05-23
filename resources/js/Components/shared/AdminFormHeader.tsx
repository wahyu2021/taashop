import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
    /** The URL for the back link button */
    backHref: string;
    /** Text for the back link button (e.g., "Kembali ke Daftar") */
    backText: string;
    /** The main title of the form page */
    title: string;
    /** Optional additional actions rendered on the right side (e.g., a delete button) */
    action?: ReactNode;
}

/**
 * AdminFormHeader component provides a standardized header for admin create/edit pages.
 * It features a back button with a breadcrumb-style link, a page title, and an optional action slot.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered form header component.
 */
export default function AdminFormHeader({ backHref, backText, title, action }: Props) {
    return (
        <div className="mb-8">
            <Link 
                href={backHref}
                className="flex items-center text-xs font-bold text-stone-400 uppercase tracking-widest hover:text-primary transition-colors group w-fit"
            >
                <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                {backText}
            </Link>
            <div className="flex items-center justify-between mt-4">
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                    {title}
                </h1>
                {action && (
                    <div className="flex items-center gap-2">
                        {action}
                    </div>
                )}
            </div>
        </div>
    );
}
