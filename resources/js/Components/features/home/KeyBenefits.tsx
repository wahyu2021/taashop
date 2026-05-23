import { Star, Shield, Zap, Clock } from 'lucide-react';

export default function KeyBenefits() {
    const benefits = [
        { icon: <Star />, title: 'Kualitas Premium', desc: 'Menggunakan bahan terbaik yang nyaman dan tahan lama.' },
        { icon: <Shield />, title: 'Garansi Hasil', desc: 'Kami menjamin setiap detail sesuai dengan pesanan Anda.' },
        { icon: <Zap />, title: 'Proses Cepat', desc: 'Produksi efisien tanpa mengurangi kualitas akhir.' },
        { icon: <Clock />, title: 'Tepat Waktu', desc: 'Komitmen pengiriman sesuai jadwal yang disepakati.' },
    ];

    return (
        <section className="py-24 bg-stone-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="group">
                            <div className="w-16 h-16 bg-white border border-stone-200 flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-3 text-stone-900">{benefit.title}</h3>
                            <p className="text-stone-500 text-sm leading-relaxed">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
