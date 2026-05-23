import { Link } from '@inertiajs/react';
import { ChevronRight, Users, Award, Truck } from 'lucide-react';
import { buttonVariants } from '@/Components/ui/button';
import { cn } from '@/lib/utils';

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
                            {description || 'Taashop hadir sebagai partner terpercaya untuk pembuatan jersey kustom dan sablon berkualitas tinggi dengan desain eksklusif dan bahan premium.'}
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
                            <a 
                                href={whatsappUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={cn(
                                    buttonVariants({ variant: 'outline' }),
                                    "border-stone-700 text-white hover:bg-stone-900 font-black uppercase tracking-widest px-6 py-4 rounded-none text-lg h-auto flex items-center justify-center"
                                )}
                            >
                                Konsultasi Gratis
                            </a>
                        </div>
                    </div>

                    {/* Right: Visual Area */}
                    <div className="relative hidden lg:flex items-center justify-center">
                        {heroImageUrl ? (
                            /* Real Hero Image */
                            <div className="relative w-full">
                                <div className="absolute -inset-4 bg-orange-600/20 blur-3xl rounded-full" />
                                <img 
                                    src={heroImageUrl} 
                                    alt="Taashop Jersey" 
                                    className="relative w-full h-auto max-h-150 object-contain drop-shadow-2xl"
                                />
                            </div>
                        ) : (
                            /* Decorative Mockup — shown when no hero image is set */
                            <div className="relative w-full aspect-square max-w-lg mx-auto">
                                {/* Outer Ring */}
                                <div className="absolute inset-0 border-2 border-stone-800 rounded-full animate-[spin_30s_linear_infinite]" />
                                <div className="absolute inset-6 border border-stone-800/50 rounded-full" />

                                {/* Center Badge */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="absolute -inset-8 bg-orange-600/10 blur-2xl rounded-full" />
                                        <div className="relative w-40 h-40 bg-stone-900 border-2 border-stone-800 rounded-full flex flex-col items-center justify-center">
                                            <span className="text-4xl font-black text-orange-600 tracking-tighter">TAA</span>
                                            <span className="text-[10px] font-black text-stone-500 uppercase tracking-[0.4em]">Custom Jersey</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Stat Cards */}
                                <div className="absolute top-8 right-0 bg-stone-900/80 backdrop-blur-lg border border-stone-800 p-4 animate-[float_6s_ease-in-out_infinite]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-600/20 flex items-center justify-center">
                                            <Users size={18} className="text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-white leading-none">500+</p>
                                            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Tim Puas</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-16 -left-4 bg-stone-900/80 backdrop-blur-lg border border-stone-800 p-4 animate-[float_6s_ease-in-out_infinite_2s]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-600/20 flex items-center justify-center">
                                            <Award size={18} className="text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-white leading-none">100%</p>
                                            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Garansi</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-0 right-8 bg-stone-900/80 backdrop-blur-lg border border-stone-800 p-4 animate-[float_6s_ease-in-out_infinite_4s]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-orange-600/20 flex items-center justify-center">
                                            <Truck size={18} className="text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-white leading-none">7-14</p>
                                            <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Hari Kerja</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Dots */}
                                <div className="absolute top-1/4 left-8 w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                                <div className="absolute bottom-1/3 right-12 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse delay-700" />
                                <div className="absolute top-12 left-1/3 w-1 h-1 bg-stone-600 rounded-full animate-pulse delay-1000" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Vertical Text Decor */}
            <div className="absolute right-0 bottom-0 hidden xl:block select-none opacity-[0.03] pointer-events-none transform translate-x-1/4">
                <span className="text-[25rem] font-black text-white uppercase tracking-tighter leading-none italic">
                    TAASHOP
                </span>
            </div>
        </section>
    );
}
