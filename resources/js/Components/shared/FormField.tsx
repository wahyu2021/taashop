import { Label } from '@/Components/ui/label';

interface FormFieldProps {
    label: string;
    htmlFor?: string;
    error?: string;
    children: React.ReactNode;
    colSpan?: 1 | 2;
    hint?: string;
}

export default function FormField({ label, htmlFor, error, children, colSpan, hint }: FormFieldProps) {
    return (
        <div className={`space-y-2 ${colSpan === 2 ? 'md:col-span-2' : ''}`}>
            <Label htmlFor={htmlFor} className="text-xs font-bold uppercase tracking-widest text-stone-500">
                {label}
            </Label>
            {children}
            {hint && <p className="text-[10px] text-stone-400 font-medium italic">{hint}</p>}
            {error && <p className="text-xs font-bold text-destructive italic">{error}</p>}
        </div>
    );
}
