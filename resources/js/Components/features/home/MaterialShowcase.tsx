import { MaterialData } from '@/types';
import { CheckCircle2 } from 'lucide-react';

interface Props {
    materials: MaterialData[];
}

export default function MaterialShowcase({ materials }: Props) {
    if (materials.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl sm:text-5xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                            Pilihan <span className="text-orange-600">Material</span> Premium
                        </h2>
                        <p className="text-stone-500 text-lg">
                            Kami hanya menggunakan bahan kain kualitas terbaik yang telah teruji kenyamanannya untuk performa olahraga maksimal.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {materials.map((material) => (
                        <div key={material.id} className="group relative bg-stone-50 border border-stone-100 hover:bg-stone-900 transition-all duration-500 overflow-hidden flex flex-col">
                            {/* Decorative Background Icon/Text */}
                            <div className="absolute -right-4 -bottom-4 text-6xl font-black text-stone-200/50 group-hover:text-orange-600/10 transition-colors pointer-events-none uppercase italic z-0">
                                {material.name.substring(0, 2)}
                            </div>

                            {/* Material Image */}
                            <div className="relative w-full aspect-square overflow-hidden bg-stone-200">
                                <img 
                                    src={material.image_url || '/images/placeholder.svg'} 
                                    alt={material.name} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Material Info */}
                            <div className="relative z-10 p-6 flex flex-col grow">
                                <h3 className="text-xl font-black text-stone-900 group-hover:text-white uppercase tracking-tight mb-3 transition-colors">
                                    {material.name}
                                </h3>
                                <p className="text-stone-500 group-hover:text-stone-400 text-xs leading-relaxed mb-6 transition-colors line-clamp-3">
                                    {material.summary}
                                </p>
                                
                                {material.features && material.features.length > 0 && (
                                    <ul className="space-y-2 mt-auto">
                                        {material.features.slice(0, 3).map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-600 group-hover:text-stone-300 transition-colors">
                                                <CheckCircle2 size={14} className="text-orange-600 shrink-0 mt-0.5" />
                                                <span className="leading-tight">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
