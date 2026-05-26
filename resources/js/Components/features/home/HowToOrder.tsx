import { Package, Send, Shirt, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowToOrder() {
    const orderSteps = [
        {
            title: "Pilih Paket",
            description: "Pilih paket yang paling sesuai dengan kebutuhan dari pilihan yang tersedia.",
            icon: <Shirt className="w-10 h-10" />,
        },
        {
            title: "Kirim Desain",
            description: "Hubungi kami dan kirimkan desain atau konsep yang Anda inginkan.",
            icon: <Send className="w-10 h-10" />,
        },
        {
            title: "Produksi",
            description: "Pesanan Anda akan kami proses dengan cepat dan teliti.",
            icon: <Package className="w-10 h-10" />,
        },
        {
            title: "Pengiriman",
            description: "Hasil akhir siap dikirim ke alamat Anda dengan aman dan tepat waktu.",
            icon: <Truck className="w-10 h-10" />,
        },
    ];

    return (
        <section className="py-24 bg-white border-b border-stone-100 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                        Cara <span className="text-orange-600">Pemesanan</span>
                    </h2>
                    <p className="text-stone-500 text-lg">
                        Hanya dengan 4 langkah mudah, Anda bisa mendapatkan produk custom impian untuk tim Anda.
                    </p>
                </motion.div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-visible md:pb-0 relative [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-stone-100 -translate-y-12 z-0" />

                    {orderSteps.map((step, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="shrink-0 w-[85vw] md:w-auto snap-center relative z-10 group bg-white border border-stone-100 p-8 hover:border-orange-200 transition-all duration-300 shadow-sm hover:shadow-xl"
                        >
                            <div className="w-20 h-20 bg-stone-50 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                                {step.icon}
                            </div>
                            <div className="absolute top-8 right-8 text-4xl font-black text-stone-100 group-hover:text-orange-100 transition-colors">
                                0{i + 1}
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-stone-900">{step.title}</h3>
                            <p className="text-stone-500 text-sm leading-relaxed">{step.description}</p>        
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
