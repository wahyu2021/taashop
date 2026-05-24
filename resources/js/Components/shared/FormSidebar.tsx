import { Save } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import AdminSectionCard from '@/Components/shared/AdminSectionCard';
import ImageUploader from '@/Components/shared/ImageUploader';

interface FormSidebarProps {
    /** Existing image URL (for Edit pages) */
    imageUrl?: string | null;
    /** Callback when image file changes */
    onImageChange: (file: File | null) => void;
    /** Image upload error */
    imageError?: string;
    /** Card title above image uploader */
    imageTitle?: string;
    /** Description below image uploader */
    imageDescription?: string;
    /** Image aspect ratio class */
    aspectRatio?: string;
    /** Image object fit class (e.g., "object-cover", "object-contain") */
    imageObjectFit?: string;
    /** Submit button processing state */
    processing: boolean;
    /** Submit button label */
    submitLabel: string;
    /** Cancel link href */
    cancelHref: string;
    /** Extra content above image (optional) */
    children?: React.ReactNode;
}

export default function FormSidebar({
    imageUrl,
    onImageChange,
    imageError,
    imageTitle = 'Gambar Utama',
    imageDescription,
    aspectRatio,
    imageObjectFit,
    processing,
    submitLabel,
    cancelHref,
    children,
}: FormSidebarProps) {
    return (
        <div className="space-y-6">
            {children}
            <AdminSectionCard
                title={imageTitle}
                className="sticky top-24"
                headerBg="bg-stone-50"
            >
                <ImageUploader
                    value={imageUrl}
                    onChange={onImageChange}
                    error={imageError}
                    description={imageDescription}
                    aspectRatio={aspectRatio}
                    objectFit={imageObjectFit}
                />

                <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col gap-3">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-12 shadow-lg shadow-primary/20"
                    >
                        <Save className="w-5 h-5 mr-2" />
                        {processing ? 'Menyimpan...' : submitLabel}
                    </Button>
                    <Link
                        href={cancelHref}
                        className="inline-flex items-center justify-center w-full h-8 rounded-lg text-sm font-bold text-stone-400 hover:bg-muted hover:text-foreground transition-all"
                    >
                        Batal
                    </Link>
                </div>
            </AdminSectionCard>
        </div>
    );
}
