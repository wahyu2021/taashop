import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps, FAQData } from '@/types';
import HowToOrder from '@/Components/features/home/HowToOrder';
import FAQSection from '@/Components/features/home/FAQSection';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/Components/ui/button';

interface Props {
    faqs: FAQData[];
}

export default function FAQ({ faqs }: Props) {
    const { site_settings } = usePage<PageProps>().props;
    const whatsappUrl = `https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '')}?text=Halo Taaashop, saya ada pertanyaan sebelum membuat pesanan.`;

    return (
        <PublicLayout>
            <Head title="Bantuan & Cara Pemesanan - Taaashop" />

            {/* Page Header */}
            <section className="bg-stone-950 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 mb-4">
                            Pusat Bantuan
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                            FAQ & <span className="text-orange-600">Cara Order</span>
                        </h1>
                        <p className="text-stone-400 text-lg">
                            Panduan lengkap langkah pemesanan serta jawaban dari pertanyaan yang sering ditanyakan oleh pelanggan kami.
                        </p>
                    </div>
                </div>
            </section>

            {/* How to Order Component */}
            <HowToOrder />

            {/* FAQ Component */}
            <div className="bg-stone-50 border-t border-stone-200">
                <FAQSection faqs={faqs} />
            </div>

            {/* Still Need Help CTA */}
            <section className="py-20 bg-orange-600 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
                        Masih Punya Pertanyaan?
                    </h2>
                    <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
                        Jangan ragu untuk bertanya langsung kepada tim Customer Service kami. Kami siap memandu Anda dari awal hingga produk selesai.
                    </p>
                    <a 
                        href={whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({ size: 'lg' }),
                            "bg-white hover:bg-stone-100 text-orange-600 font-black uppercase tracking-widest px-8 py-6 rounded-none text-lg border-none shadow-xl"
                        )}
                    >
                        Hubungi Admin Sekarang
                    </a>
                </div>
            </section>
        </PublicLayout>
    );
}
