import { buttonVariants } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
    whatsappUrl: string;
}

export default function CTA({ whatsappUrl }: Props) {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-orange-600" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-950 transform skew-x-12 translate-x-1/4 hidden lg:block" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-xl text-white">
                    <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
                        Siap Memulai <br /> Tim Hebatmu?
                    </h2>
                    <p className="text-orange-100 text-lg mb-10 leading-relaxed">
                        Jangan ragu untuk berkonsultasi tentang desain, bahan, dan paket harga yang paling sesuai untuk Anda.
                    </p>
                    <a 
                        href={whatsappUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={cn(
                            buttonVariants({ variant: 'default' }),
                            "bg-stone-950 hover:bg-black text-white font-black uppercase tracking-widest px-10 py-8 rounded-none text-lg h-auto shadow-2xl flex items-center justify-center max-w-max border-none"
                        )}
                    >
                        Hubungi via WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}
