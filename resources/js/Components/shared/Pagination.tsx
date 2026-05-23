import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/Components/ui/button';

interface Props {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    className?: string;
}

/**
 * Pagination component for Inertia.js paginated data.
 * It renders a clean, accessible navigation bar with active states.
 */
export default function Pagination({ links, className }: Props) {
    if (links.length <= 3) return null;

    return (
        <nav
            role="navigation"
            aria-label="pagination"
            className={cn("mx-auto flex w-full justify-center gap-1 mt-8", className)}
        >
            {links.map((link, key) => {
                if (link.url === null) {
                    return (
                        <Button
                            key={key}
                            variant="ghost"
                            size="icon"
                            disabled
                            className="disabled:opacity-30"
                        >
                            {link.label.includes('Previous') ? (
                                <ChevronLeft className="h-4 w-4" />
                            ) : link.label.includes('Next') ? (
                                <ChevronRight className="h-4 w-4" />
                            ) : (
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            )}
                        </Button>
                    );
                }

                const isActive = link.active;
                const isNextPrev = link.label.includes('Previous') || link.label.includes('Next');

                return (
                    <Link
                        key={key}
                        href={link.url}
                        preserveScroll
                        className={cn(
                            "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10",
                            isActive 
                                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" 
                                : "hover:bg-accent hover:text-accent-foreground border border-transparent",
                            isNextPrev && "w-auto px-4 gap-1"
                        )}
                    >
                        {link.label.includes('Previous') ? (
                            <>
                                <ChevronLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">Sebelumnya</span>
                            </>
                        ) : link.label.includes('Next') ? (
                            <>
                                <span className="hidden sm:inline">Berikutnya</span>
                                <ChevronRight className="h-4 w-4" />
                            </>
                        ) : (
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
