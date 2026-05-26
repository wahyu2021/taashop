import { PropsWithChildren, useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import Navbar from '@/Components/shared/Navbar';
import Footer from '@/Components/shared/Footer';
import { Toaster } from '@/Components/ui/sonner';
import { toast } from 'sonner';
import { Phone, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublicLayout({ children }: PropsWithChildren) {
    const { flash, site_settings } = usePage<PageProps>().props;
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const whatsappUrl = `https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '')}`;

    return (
        <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-orange-600 selection:text-white relative">
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="pt-18">
                {children}
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating Action Buttons Container */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
                {/* Back to Top Button */}
                <AnimatePresence>
                    {showBackToTop && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 20 }}
                            onClick={scrollToTop}
                            className="bg-stone-900 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
                            aria-label="Kembali ke atas"
                        >
                            <ArrowUp size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* WhatsApp Global Button */}
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center bg-green-500 text-white h-14 rounded-full shadow-2xl shadow-green-500/30 hover:bg-green-600 transition-all duration-300 active:scale-95 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    aria-label="Hubungi kami via WhatsApp"
                >
                    <Phone size={24} className="group-hover:animate-pulse" />
                    {/* Expandable text on desktop hover */}
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-sm font-bold tracking-wide">
                        <span className="pl-2">Chat Kami</span>
                    </span>
                </a>
            </div>

            {/* Toast Notifications */}
            <Toaster position="top-center" expand={true} richColors />
        </div>
    );
}
