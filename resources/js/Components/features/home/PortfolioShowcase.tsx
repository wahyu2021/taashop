import { Link } from '@inertiajs/react';
import { PortfolioData } from '@/types';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/Components/ui/button';
import { motion } from 'framer-motion';
import EmptyState from '@/Components/shared/EmptyState';
import { Image as ImageIcon } from 'lucide-react';

interface Props {
    portfolios: PortfolioData[];
}

export default function PortfolioShowcase({ portfolios }: Props) {
    return (
        <section className="py-24 bg-stone-950 overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center"
            >
                <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                    Hasil <span className="text-orange-600">Produksi</span>
                </h2>
                <p className="text-stone-400 max-w-2xl mx-auto text-lg">
                    Intip galeri hasil pengerjaan kami yang telah memuaskan ribuan pelanggan dari berbagai komunitas.
                </p>
            </motion.div>

            {portfolios.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-2">
                        {portfolios.map((item, index) => (
                            <motion.div 
                                key={item.id} 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="aspect-square group relative overflow-hidden bg-stone-900"
                            >
                                <img 
                                    src={item.image_url || '/images/placeholder.svg'} 
                                    alt={item.title} 
                                    loading="lazy"
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-orange-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white text-[10px] font-black uppercase tracking-widest mb-1">
                                            {item.client_name || 'Project'}
                                        </p>
                                        <h4 className="text-white text-xs font-bold leading-tight line-clamp-2">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-12 md:mt-16 text-center"
                    >
                        <Link 
                            href="/portfolio"
                            className={cn(
                                buttonVariants({ variant: 'outline' }),
                                "border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-black uppercase tracking-widest px-8 rounded-none h-12 md:h-14 inline-flex items-center text-xs md:text-sm"
                            )}
                        >
                            Lihat Semua Portfolio
                        </Link>
                    </motion.div>
                </>
            ) : (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <EmptyState 
                        title="Galeri Sedang Disusun"
                        message="Berbagai hasil produksi keren sedang kami dokumentasikan untuk ditampilkan di sini. Nantikan segera!"
                        icon={ImageIcon}
                        className="bg-stone-900 border-stone-800"
                    />
                </div>
            )}
        </section>
    );
}
