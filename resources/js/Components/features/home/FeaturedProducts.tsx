import { Link } from '@inertiajs/react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { ProductData } from '@/types';
import { motion } from 'framer-motion';
import EmptyState from '@/Components/shared/EmptyState';

interface Props {
    products: ProductData[];
}

export default function FeaturedProducts({ products }: Props) {
    return (
        <section className="py-24 bg-stone-50 overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end"
            >
                <div>
                    <h2 className="text-4xl sm:text-5xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                        Produk <span className="text-orange-600">Terbaik</span>
                    </h2>
                    <p className="text-stone-500 max-w-xl text-lg">
                        Pilih berbagai kategori produk kustom yang kami sediakan untuk kebutuhan tim Anda.
                    </p>
                </div>
                {products.length > 0 && (
                    <Link href="/catalog" className="hidden sm:flex items-center gap-2 text-sm font-black uppercase tracking-widest text-orange-600 hover:text-stone-900 transition-colors">
                        Semua Produk
                        <ArrowRight size={18} />
                    </Link>
                )}
            </motion.div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {products.length > 0 ? (
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 lg:gap-8 sm:overflow-visible sm:pb-0 scrollbar-none [&::-webkit-scrollbar]:hidden">
                        {products.map((product, index) => (
                            <motion.div 
                                key={product.id} 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="shrink-0 w-[85vw] sm:w-auto snap-center group bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <div className="aspect-4/5 overflow-hidden relative">
                                    <img 
                                        src={product.image_url || '/images/placeholder.svg'} 
                                        alt={product.title} 
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {product.category && (
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                                                {product.category.name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 md:p-6">
                                    <h3 className="text-base md:text-lg font-black uppercase tracking-tight mb-2 text-stone-900 truncate">
                                        {product.title}
                                    </h3>
                                    <Link 
                                        href={`/catalog/${product.slug}`}
                                        className="text-orange-600 text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
                                    >
                                        Lihat Detail <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <EmptyState 
                        title="Katalog Sedang Diperbarui"
                        message="Kami sedang memperbarui daftar produk unggulan untuk Anda. Silakan cek kembali dalam waktu dekat."
                        icon={ShoppingBag}
                        className="bg-white border-stone-100"
                    />
                )}
            </div>
        </section>
    );
}
