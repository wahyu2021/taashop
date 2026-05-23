import { Link, usePage } from '@inertiajs/react';
import { PageProps, ProductData, PortfolioData, NewsData } from '@/types';
import { Button } from '@/Components/ui/button';
import { ChevronRight, ArrowRight, Star, Shield, Zap, Clock, Package, Send, Shirt, Truck } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

interface Props {
    featured_products: ProductData[];
    latest_portfolios: PortfolioData[];
    latest_news: NewsData[];
}

export default function Home({ featured_products, latest_portfolios, latest_news }: Props) {
    const { site_settings } = usePage<PageProps>().props;

    const whatsappUrl = `https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '')}`;

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
        <PublicLayout>
            <Head title="Home - Premium Jersey & Sablon" />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-stone-950">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 -left-20 w-96 h-96 bg-orange-600 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 -right-20 w-96 h-96 bg-orange-800 rounded-full blur-[120px]" />
                </div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl">
                        <span className="inline-block bg-orange-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] px-3 py-1 mb-6">
                            Premium Custom Sportswear
                        </span>
                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                            {site_settings?.hero_title || 'Bikin Jersey Impianmu Jadi Nyata'}
                        </h1>
                        <p className="text-stone-400 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
                            {site_settings?.hero_description || 'Taashop hadir sebagai partner terpercaya untuk pembuatan jersey kustom dan sablon berkualitas tinggi dengan desain eksklusif dan bahan premium.'}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link 
                                href="/catalog"
                                className={cn(
                                    buttonVariants({ variant: 'default' }),
                                    "bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest px-10 py-8 rounded-none text-lg h-auto flex items-center justify-center"
                                )}
                            >
                                Lihat Katalog
                                <ChevronRight className="ml-2 w-5 h-5" />
                            </Link>
                            <a 
                                href={whatsappUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={cn(
                                    buttonVariants({ variant: 'outline' }),
                                    "border-stone-700 text-white hover:bg-stone-900 font-black uppercase tracking-widest px-10 py-8 rounded-none text-lg h-auto flex items-center justify-center"
                                )}
                            >
                                Konsultasi Gratis
                            </a>
                        </div>
                    </div>
                </div>

                <div className="absolute right-0 bottom-0 hidden lg:block select-none opacity-5 pointer-events-none transform translate-x-1/4">
                    <span className="text-[25rem] font-black text-white uppercase tracking-tighter leading-none italic">
                        TAASHOP
                    </span>
                </div>
            </section>

            {/* How to Order (Legacy Integration) */}
            <section className="py-24 bg-white border-b border-stone-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl sm:text-5xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                            Cara <span className="text-orange-600">Pemesanan</span>
                        </h2>
                        <p className="text-stone-500 text-lg">
                            Hanya dengan 4 langkah mudah, Anda bisa mendapatkan produk custom impian untuk tim Anda.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-stone-100 -translate-y-12 z-0" />
                        
                        {orderSteps.map((step, i) => (
                            <div key={i} className="relative z-10 group bg-white border border-stone-100 p-8 hover:border-orange-200 transition-all duration-300 shadow-sm hover:shadow-xl">
                                <div className="w-20 h-20 bg-stone-50 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                                    {step.icon}
                                </div>
                                <div className="absolute top-8 right-8 text-4xl font-black text-stone-100 group-hover:text-orange-100 transition-colors">
                                    0{i + 1}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-stone-900">{step.title}</h3>
                                <p className="text-stone-500 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Benefits */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: <Star />, title: 'Kualitas Premium', desc: 'Menggunakan bahan terbaik yang nyaman dan tahan lama.' },
                            { icon: <Shield />, title: 'Garansi Hasil', desc: 'Kami menjamin setiap detail sesuai dengan pesanan Anda.' },
                            { icon: <Zap />, title: 'Proses Cepat', desc: 'Produksi efisien tanpa mengurangi kualitas akhir.' },
                            { icon: <Clock />, title: 'Tepat Waktu', desc: 'Komitmen pengiriman sesuai jadwal yang disepakati.' },
                        ].map((benefit, i) => (
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

            {/* Featured Products */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl sm:text-5xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                            Produk <span className="text-orange-600">Terbaik</span>
                        </h2>
                        <p className="text-stone-500 max-w-xl">
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
                        {featured_products.map((product) => (
                            <div key={product.id} className="group bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                                <div className="aspect-[4/5] overflow-hidden relative">
                                    <img 
                                        src={product.image_url || '/images/placeholder-product.jpg'} 
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

            {/* Portfolio Highlights */}
            <section className="py-24 bg-stone-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                    <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                        Hasil <span className="text-orange-600">Produksi</span>
                    </h2>
                    <p className="text-stone-400 max-w-2xl mx-auto">
                        Intip galeri hasil pengerjaan kami yang telah memuaskan ribuan pelanggan.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-2">
                    {latest_portfolios.map((item) => (
                        <div key={item.id} className="aspect-square group relative overflow-hidden bg-stone-900">
                            <img 
                                src={item.image_url || '/images/placeholder-portfolio.jpg'} 
                                alt={item.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
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

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-600" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-950 transform skew-x-12 translate-x-1/4 hidden lg:block" />
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-xl text-white">
                        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
                            Siap Memulai <br /> Tim Hebatmu?
                        </h2>
                        <p className="text-orange-100 text-lg mb-10 leading-relaxed">
                            Jangan ragu untuk berkonsultasi tentang desain, bahan, dan paket harga yang paling sesuai untuk Anda.
                        </p>
                        <a 
                            href={whatsappUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={cn(
                                buttonVariants({ variant: 'default' }),
                                "bg-stone-950 hover:bg-black text-white font-black uppercase tracking-widest px-10 py-8 rounded-none text-lg h-auto shadow-2xl flex items-center justify-center max-w-max"
                            )}
                        >
                            Hubungi via WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
