import { TestimonialData } from '@/types';
import { Star, Quote } from 'lucide-react';

interface Props {
    testimonials: TestimonialData[];
}

export default function Testimonials({ testimonials }: Props) {
    if (testimonials.length === 0) return null;

    return (
        <section className="py-24 bg-stone-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl sm:text-5xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                        Suara <span className="text-orange-600">Pelanggan</span>
                    </h2>
                    <p className="text-stone-500 text-lg">
                        Kepuasan Anda adalah prioritas kami. Lihat apa yang mereka katakan tentang layanan Taashop.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-white p-10 border border-stone-100 shadow-sm relative group hover:border-orange-200 transition-all duration-300">
                            <Quote className="absolute top-6 right-6 text-stone-100 group-hover:text-orange-100 transition-colors w-12 h-12" />
                            
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={14} 
                                        className={i < item.rating ? "fill-orange-500 text-orange-500" : "text-stone-200"} 
                                    />
                                ))}
                            </div>

                            <p className="text-stone-600 leading-relaxed italic mb-8 relative z-10">
                                "{item.content}"
                            </p>

                            {item.proof_url && (
                                <div className="mb-8 p-1 bg-stone-50 border border-stone-100 rounded-lg overflow-hidden">
                                    <img 
                                        src={item.proof_url} 
                                        alt="Bukti Testimoni" 
                                        className="w-full h-auto aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                                    />
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-stone-100 overflow-hidden border-2 border-white shadow-md">
                                    <img 
                                        src={item.avatar_url || '/images/placeholder-avatar.jpg'} 
                                        alt={item.customer_name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-tight text-stone-900">{item.customer_name}</h4>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{item.customer_title || 'Customer'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
