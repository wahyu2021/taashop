import { Link } from '@inertiajs/react';
import { ChevronRight, Users, Award, Truck } from 'lucide-react';
import { buttonVariants } from '@/Components/ui/button';
import { cn } from '@/lib/utils';
import HeroImageSlider from './HeroImageSlider';

interface HeroProps {
    title?: string;
    description?: string;
    whatsappUrl: string;
    heroImageUrl?: string;
}

export default function Hero({ title, description, whatsappUrl, heroImageUrl }: HeroProps) {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-stone-950">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
            }} />

            {/* Background Glows */}
            <div className="absolute inset-0">
                <div className="absolute top-0 -left-20 w-125 h-125 bg-orange-600/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-0 w-100 h-100 bg-orange-800/10 rounded-full blur-[120px]" />
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Text Content */}
                    <div>
                        <span className="inline-block bg-orange-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] px-3 py-1 mb-6">
                            Premium Custom Sportswear
                        </span>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4">
                            {title || 'Bikin Jersey Impianmu Jadi Nyata'}
                        </h1>
                        <p className="text-stone-400 text-md sm:text-lg max-w-xl mb-6 leading-relaxed">
                            {description || 'Taaashop hadir sebagai partner terpercaya untuk pembuatan jersey kustom dan sablon berkualitas tinggi dengan desain eksklusif dan bahan premium.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-12 lg:mb-0">
                            <Link 
                                href="/catalog"
                                className={cn(
                                    buttonVariants({ variant: 'default' }),
                                    "bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest px-6 py-4 rounded-none text-lg h-auto flex items-center justify-center border-none"
                                )}
                            >
                                Lihat Katalog
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </Link>
                            <button 
                                type="button"
                                onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
                                className="inline-flex items-center justify-center bg-transparent border border-stone-700 text-white hover:bg-stone-900 hover:text-white font-black uppercase tracking-widest px-6 py-4 rounded-none text-lg h-auto transition-colors cursor-pointer"
                            >
                                Konsultasi Gratis
                            </button>
                        </div>
                    </div>

                    {/* Right: Visual Area (Auto Slider) */}
                    <div className="relative hidden lg:flex items-center justify-center">
                        <HeroImageSlider heroImageUrl={heroImageUrl} />
                    </div>  
                </div>
            </div>

            {/* Vertical Text Decor */}
            <div className="absolute right-0 bottom-0 hidden xl:block select-none opacity-[0.03] pointer-events-none transform translate-x-1/4">
                <span className="text-[25rem] font-black text-white uppercase tracking-tighter leading-none italic">
                    TAAASHOP
                </span>
            </div>
        </section>
    );
}
