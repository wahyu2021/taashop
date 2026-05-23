import { PartnerData } from '@/types';

interface Props {
    partners: PartnerData[];
}

export default function PartnerLogos({ partners }: Props) {
    if (!partners || partners.length === 0) return null;

    return (
        <section className="py-10 md:py-14 bg-white border-b border-stone-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-stone-400">
                        Official Partner & Trusted By
                    </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-10 md:gap-x-20">
                    {partners.map((partner) => (
                        <div 
                            key={partner.id} 
                            className="h-8 md:h-12 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-105"
                        >
                            {partner.logo_url ? (
                                <img 
                                    src={partner.logo_url} 
                                    alt={partner.name} 
                                    className="max-h-full w-auto object-contain" 
                                    title={partner.name}
                                />
                            ) : (
                                <span className="text-sm font-black text-stone-400 tracking-tighter uppercase italic">{partner.name}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
