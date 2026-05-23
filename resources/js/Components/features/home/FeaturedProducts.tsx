import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { ProductData } from '@/types';

interface Props {
    products: ProductData[];
}

export default function FeaturedProducts({ products }: Props) {
    if (products.length === 0) return null;

    return (
        <section className="py-24 bg-stone-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
                <div>
                    <h2 className="text-4xl sm:text-5xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                        Produk <span className="text-orange-600">Terbaik</span>
                    </h2>
                    <p className="text-stone-500 max-w-xl text-lg">
                        Pilih berbagai kategori produk kustom yang kami sediakan untuk kebutuhan tim Anda.
                    </p>
                </div>
                <Link href="/catalog" className="hidden sm:flex items-center gap-2 text-sm font-black uppercase tracking-widest text-orange-600 hover:text-stone-900 transition-colors">
                    Semua Produk
                    <ArrowRight size={18} />
                </Link>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img 
                                    src={product.image_url || '/images/placeholder.svg'} 
                                    alt={product.title} 
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
                            <div className="p-6">
                                <h3 className="text-lg font-black uppercase tracking-tight mb-2 text-stone-900 truncate">
                                    {product.title}
                                </h3>
                                <Link 
                                    href={`/catalog/${product.slug}`}
                                    className="text-orange-600 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
                                >
                                    Lihat Detail <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
