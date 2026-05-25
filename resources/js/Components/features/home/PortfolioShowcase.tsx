import { Link } from '@inertiajs/react';
import { PortfolioData } from '@/types';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/Components/ui/button';

interface Props {
    portfolios: PortfolioData[];
}

export default function PortfolioShowcase({ portfolios }: Props) {
    if (portfolios.length === 0) return null;

    return (
        <section className="py-24 bg-stone-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                    Hasil <span className="text-orange-600">Produksi</span>
                </h2>
                <p className="text-stone-400 max-w-2xl mx-auto text-lg">
                    Intip galeri hasil pengerjaan kami yang telah memuaskan ribuan pelanggan dari berbagai komunitas.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-2">
                {portfolios.map((item) => (
                    <div key={item.id} className="aspect-square group relative overflow-hidden bg-stone-900">
                        <img 
                            src={item.image_url || '/images/placeholder.svg'} 
                            alt={item.title} 
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
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <Link 
                    href="/portfolio"
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        "border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-black uppercase tracking-widest px-8 rounded-none h-14 inline-flex items-center"
                    )}
                >
                    Lihat Semua Portfolio
                </Link>
            </div>
        </section>
    );
}
