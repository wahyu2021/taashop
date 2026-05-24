import React, { useRef, useState, useEffect } from 'react';
import { Upload, X, ImageIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { cn } from '@/lib/utils';

interface Props {
    /** The current image URL (from database or previous upload) */
    value?: string | null;
    /** Callback triggered when a new file is selected or cleared */
    onChange: (file: File | null) => void;
    /** Label for the uploader (e.g., "Gambar Utama", "Logo Website") */
    label?: string;
    /** Description or hint text displayed below the uploader */
    description?: string;
    /** Tailwind aspect ratio class (e.g., "aspect-square", "aspect-video") */
    aspectRatio?: string;
    /** Image object fit class (e.g., "object-cover", "object-contain") */
    objectFit?: string;
    /** Validation error message, if any */
    error?: string;
    /** Optional additional class names for the container */
    className?: string;
}

/**
 * ImageUploader component provides a robust interface for uploading and previewing images.
 * It handles local previews via FileReader, allows clearing the selection, and maintains
 * a consistent design language for the admin panel.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} The rendered image uploader component.
 */
export default function ImageUploader({ 
    value, 
    onChange, 
    label, 
    description, 
    aspectRatio = "aspect-square",
    objectFit = "object-cover",
    error,
    className
}: Props) {
    const [preview, setPreview] = useState<string | null>(value || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Sync preview with value prop (initial load or external reset)
    useEffect(() => {
        if (value) setPreview(value);
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={cn("space-y-4", className)}>
            {label && (
                <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-600">
                        {label}
                    </p>
                </div>
            )}
            
            <div 
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                    "relative w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden group",
                    aspectRatio,
                    preview 
                        ? "border-primary/20 bg-stone-50" 
                        : "border-stone-200 hover:border-primary/40 hover:bg-primary/5 shadow-inner"
                )}
            >
                {preview ? (
                    <>
                        <img 
                            src={preview} 
                            className={cn("w-full h-full animate-in fade-in zoom-in-95 duration-300", objectFit)} 
                            alt="Upload preview" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                            <div className="flex flex-col items-center gap-2 text-white">
                                <RefreshCw className="w-6 h-6 animate-spin-slow" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Ganti Gambar</p>
                            </div>
                        </div>
                        <button 
                            type="button"
                            onClick={handleClear}
                            className="absolute top-3 right-3 p-2 bg-destructive text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all z-10"
                            title="Hapus gambar"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <div className="text-center p-6 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto group-hover:scale-110 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300">
                            <Upload className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Klik untuk Upload</p>
                            <p className="text-[10px] text-stone-400 font-medium mt-1">PNG, JPG, WEBP (Maks. 2MB)</p>
                        </div>
                    </div>
                )}
                
                <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            
            {description && (
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-relaxed px-1">
                    {description}
                </p>
            )}
            
            {error && (
                <p className="text-xs font-bold text-destructive italic animate-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
}
