import { Star, Shield, Zap, Clock } from 'lucide-react';

export default function KeyBenefits() {
    const benefits = [
        { icon: <Star size={20} />, title: 'Kualitas Premium' },
        { icon: <Shield size={20} />, title: 'Garansi Hasil' },
        { icon: <Zap size={20} />, title: 'Proses Cepat' },
        { icon: <Clock size={20} />, title: 'Tepat Waktu' },
    ];

    return (
        <section className="bg-stone-900 border-y border-stone-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-stone-800">
                    {benefits.map((benefit, i) => (
                        <div 
                            key={i} 
                            className="flex items-center gap-3 py-5 sm:py-6 px-4 sm:px-6 group cursor-default"
                        >
                            <div className="text-orange-500 shrink-0 group-hover:scale-110 transition-transform duration-300">
                                {benefit.icon}
                            </div>
                            <span className="text-white text-xs sm:text-sm font-black uppercase tracking-wider">
                                {benefit.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
