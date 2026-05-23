import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { cn } from '@/lib/utils';

interface Props {
    /** Lucide icon component to display next to the title */
    icon?: LucideIcon;
    /** The title of the card section */
    title: string;
    /** Optional description text displayed below the title */
    description?: string;
    /** The main content to be rendered inside the card body */
    children: ReactNode;
    /** Optional additional class names for the card container */
    className?: string;
    /** Optional additional content rendered in the card header (e.g., a badge or small button) */
    headerAction?: ReactNode;
    /** Optional background color class for the header (defaults to stone-50/50) */
    headerBg?: string;
}

/**
 * AdminSectionCard component standardizes the appearance of form sections in the admin panel.
 * It wraps shadcn/ui Card components with common styling for consistency across different CRUDs.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered section card component.
 */
export default function AdminSectionCard({ 
    icon: Icon, 
    title, 
    description, 
    children, 
    className, 
    headerAction,
    headerBg = "bg-stone-50/50"
}: Props) {
    return (
        <Card className={cn("border-none shadow-sm overflow-hidden", className)}>
            <CardHeader className={cn("border-b border-stone-100", headerBg)}>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        {Icon && <Icon className="w-5 h-5 text-primary" />}
                        <div>
                            <CardTitle className="text-lg font-bold text-stone-700">
                                {title}
                            </CardTitle>
                            {description && (
                                <CardDescription className="text-xs font-medium mt-0.5">
                                    {description}
                                </CardDescription>
                            )}
                        </div>
                    </div>
                    {headerAction}
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {children}
            </CardContent>
        </Card>
    );
}
