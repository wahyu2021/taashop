interface SelectOption {
    label: string;
    value: string;
}

interface FormSelectProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
}

export default function FormSelect({ id, value, onChange, options, placeholder }: FormSelectProps) {
    return (
        <select
            id={id}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="flex h-10 w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
}
