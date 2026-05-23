import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { buttonVariants } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps {
    title?: string;
    description?: string;
    whatsappUrl: string;
}

export default function Hero({ title, description, whatsappUrl }: HeroProps) {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-stone-950">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 -left-20 w-96 h-96 bg-orange-600 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-orange-800 rounded-full blur-[120px]" />
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl">
                    <span className="inline-block bg-orange-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] px-3 py-1 mb-6">
                        Premium Custom Sportswear
                    </span>
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                        {title || 'Bikin Jersey Impianmu Jadi Nyata'}
                    </h1>
                    <p className="text-stone-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
                        {description || 'Taashop hadir sebagai partner terpercaya untuk pembuatan jersey kustom dan sablon berkualitas tinggi dengan desain eksklusif dan bahan premium.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            href="/catalog"
                            className={cn(
                                buttonVariants({ variant: 'default' }),
                                "bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest px-10 py-8 rounded-none text-lg h-auto flex items-center justify-center border-none"
                            )}
                        >
                            Lihat Katalog
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </Link>
                        <a 
                            href={whatsappUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({ variant: 'outline' }),
                                "border-stone-700 text-white hover:bg-stone-900 font-black uppercase tracking-widest px-10 py-8 rounded-none text-lg h-auto flex items-center justify-center"
                            )}
                        >
                            Konsultasi Gratis
                        </a>
                    </div>
                </div>
            </div>

            {/* Vertical Text Decor */}
            <div className="absolute right-0 bottom-0 hidden lg:block select-none opacity-5 pointer-events-none transform translate-x-1/4">
                <span className="text-[25rem] font-black text-white uppercase tracking-tighter leading-none italic">
                    TAASHOP
                </span>
            </div>
        </section>
    );
}
