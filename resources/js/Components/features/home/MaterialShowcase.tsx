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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {materials.map((material) => (
                        <div key={material.id} className="group relative bg-stone-50 border border-stone-100 p-8 hover:bg-stone-900 transition-all duration-500 overflow-hidden">
                            {/* Decorative Background Icon/Text */}
                            <div className="absolute -right-4 -bottom-4 text-8xl font-black text-stone-200/50 group-hover:text-orange-600/10 transition-colors pointer-events-none uppercase italic">
                                {material.name.substring(0, 2)}
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-black text-stone-900 group-hover:text-white uppercase tracking-tight mb-4 transition-colors">
                                    {material.name}
                                </h3>
                                <p className="text-stone-500 group-hover:text-stone-400 text-sm leading-relaxed mb-6 transition-colors">
                                    {material.summary}
                                </p>
                                
                                {material.features && material.features.length > 0 && (
                                    <ul className="space-y-3">
                                        {material.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-stone-600 group-hover:text-stone-300 transition-colors">
                                                <CheckCircle2 size={16} className="text-orange-600" />
                                                {feature}
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
