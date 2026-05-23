import { ReactNode } from 'react';

interface Props {
    /** The main title of the page */
    title: string;
    /** Optional description text displayed below the title */
    description?: string;
    /** Optional action elements (like buttons) rendered on the right side */
    action?: ReactNode;
}

/**
 * AdminPageHeader component provides a standardized header layout for admin index pages.
 * It includes a title, an optional description, and an optional action slot for buttons.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered header component.
 */
export default function AdminPageHeader({ title, description, action }: Props) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                    {title}
                </h1>
                {description && (
                    <p className="text-stone-500 mt-1 font-medium italic">
                        {description}
                    </p>
                )}
            </div>
            {action && (
                <div className="flex items-center gap-3">
                    {action}
                </div>
            )}
        </div>
    );
}
