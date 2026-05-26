import { PartnerData } from '@/types';
import { motion } from 'framer-motion';

interface Props {
    partners: PartnerData[];
}

export default function PartnerLogos({ partners }: Props) {
    if (!partners || partners.length === 0) return null;

    // Duplicate enough times for seamless infinite scroll
    const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

    return (
        <section className="py-10 md:py-14 bg-white border-b border-stone-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-stone-400">
                        Official Partner &amp; Trusted By
                    </p>
                </div>
                
                <div className="relative overflow-hidden">
                    {/* Gradient Overlays for smooth fade effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-white to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-white to-transparent pointer-events-none" />

                    <motion.div 
                        className="flex items-center gap-x-10 md:gap-x-16 whitespace-nowrap"
                        style={{ width: 'max-content' }}
                        animate={{ x: [0, "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    >
                        {duplicatedPartners.map((partner, index) => (
                            <div 
                                key={`${partner.id}-${index}`} 
                                className="shrink-0 h-10 md:h-14 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            >
                                {partner.logo_url ? (
                                    <img 
                                        src={partner.logo_url} 
                                        alt={partner.name} 
                                        loading="lazy"
                                        className="max-h-full w-auto object-contain" 
                                        title={partner.name}
                                    />
                                ) : (
                                    <span className="text-xs md:text-sm font-black text-stone-300 tracking-widest uppercase px-5 py-2 border border-stone-200/60 rounded-full select-none">
                                        {partner.name}
                                    </span>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
