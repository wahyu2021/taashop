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
}

/**
 * AdminToolbar provides a standardized search and filter bar for admin index pages.
 * It wraps a search input in a glassmorphism card with optional action slots.
 */
export default function AdminToolbar({ searchQuery, onSearchChange, placeholder = "Cari...", action }: Props) {
    return (
        <Card className="mb-6 border-none shadow-sm bg-white/50 backdrop-blur-sm">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 z-10" />
                    <Input 
                        type="text" 
                        placeholder={placeholder}
                        className="pl-10 bg-stone-100 border-none focus-visible:ring-primary/20"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                {action}
            </CardContent>
        </Card>
    );
}
