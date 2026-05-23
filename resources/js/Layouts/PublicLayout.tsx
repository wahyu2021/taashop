import { PropsWithChildren, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import Navbar from '@/Components/shared/Navbar';
import Footer from '@/Components/shared/Footer';
import { Toaster } from '@/Components/ui/sonner';
import { toast } from 'sonner';
import { Phone } from 'lucide-react';

export default function PublicLayout({ children }: PropsWithChildren) {
    const { flash, site_settings } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const whatsappUrl = `https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '')}`;

    return (
        <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-orange-600 selection:text-white">
            <Head>
                <title>{site_settings?.site_name || 'Taashop'}</title>
                <meta name="description" content={site_settings?.site_description || 'Taashop - Premium Jersey & Sablon'} />
            </Head>

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="pt-20">
                {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating WhatsApp for Mobile */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-40 md:hidden bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 active:scale-90 transition-transform"
            >
                <Phone size={28} />
            </a>

            {/* Toast Notifications */}
            <Toaster position="top-center" expand={true} richColors />
        </div>
    );
}
