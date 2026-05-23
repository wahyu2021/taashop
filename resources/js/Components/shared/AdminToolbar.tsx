import { ReactNode } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';

interface Props {
    /** Current search query value */
    searchQuery: string;
    /** Callback when the search query changes */
    onSearchChange: (value: string) => void;
    /** Placeholder text for the search input */
    placeholder?: string;
    /** Optional additional action elements (e.g., filter buttons) rendered after the search */
    action?: ReactNode;
    /** Optional per page value */
    perPage?: string;
    /** Optional callback for per page change */
    onPerPageChange?: (value: string) => void;
}

/**
 * AdminToolbar provides a standardized search and filter bar for admin index pages.
 * It wraps a search input in a glassmorphism card with optional action slots.
 */
export default function AdminToolbar({ 
    searchQuery, 
    onSearchChange, 
    placeholder = "Cari...", 
    action,
    perPage,
    onPerPageChange
}: Props) {
    return (
        <Card className="mb-6 border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 z-10" />
                    <Input 
                        type="text" 
                        placeholder={placeholder}
                        className="pl-10 bg-stone-100 border-none focus-visible:ring-primary/20"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {onPerPageChange && (
                        <div className="flex items-center gap-2 mr-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 hidden lg:inline">Show</span>
                            <select 
                                value={perPage || '10'} 
                                onChange={(e) => onPerPageChange(e.target.value)}
                                className="h-9 rounded-lg border-stone-200 bg-white text-xs font-bold focus:ring-primary/20 transition-all"
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                    )}
                    {action}
                </div>
            </CardContent>
        </Card>
    );
}
