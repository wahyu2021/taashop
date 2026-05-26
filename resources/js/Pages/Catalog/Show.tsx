import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps, ProductData } from '@/types';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ArrowLeft, ShoppingCart, Share2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    product: ProductData;
    related_products: ProductData[];
}

export default function CatalogShow({ product, related_products }: Props) {
    const { site_settings } = usePage<PageProps>().props;

    const whatsappUrl = `https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '')}?text=Halo Taaashop, saya tertarik dengan produk: ${product.title}. Bisa minta info lebih lanjut?`;

    const metaTitle = `${product.title} | Katalog Taaashop`;
    const metaDescription = product.description ? product.description.replace(/<[^>]*>?/gm, '').substring(0, 160) : 'Detail produk Taaashop.';
    const metaImage = product.image_url || site_settings?.hero_image || `${window.location.origin}/images/hero-jersey.webp`;

    return (
        <PublicLayout>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={metaImage} />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={window.location.href} />
                <meta property="twitter:title" content={metaTitle} />
                <meta property="twitter:description" content={metaDescription} />
                <meta property="twitter:image" content={metaImage} />
            </Head>

            {/* Breadcrumb / Back */}
            <div className="bg-stone-50 border-b border-stone-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link 
                        href={route('catalog.index')} 
                        className="inline-flex items-center gap-2 text-stone-500 hover:text-orange-600 transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} />
                        Kembali ke Katalog
                    </Link>
                </div>
            </div>

            <section className="py-12 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Product Image */}
                        <div className="lg:col-span-5">
                            <div className="bg-stone-100 border border-stone-200 sticky top-32">
                                <img 
                                    src={product.image_url || '/images/placeholder.svg'} 
                                    alt={product.title} 
                                    loading="lazy"
                                    className="w-full h-auto object-cover aspect-square"
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="lg:col-span-7 space-y-8 sm:space-y-10">
                            <div>
                                <span className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 mb-6">
                                    {product.category?.name || 'Katalog Taaashop'}
                                </span>
                                <h1 className="text-3xl sm:text-5xl font-black text-stone-900 uppercase tracking-tighter leading-tight mb-6">
                                    {product.title}
                                </h1>
                                <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-stone-500">
                                    <div className="flex items-center gap-1">
                                        <CheckCircle2 size={14} className="text-green-500" />
                                        Bahan Premium
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CheckCircle2 size={14} className="text-green-500" />
                                        Custom Desain
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CheckCircle2 size={14} className="text-green-500" />
                                        High-Quality Print
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-stone max-w-none">
                                <h3 className="text-stone-900 font-black uppercase tracking-tight text-xl mb-4">Deskripsi Produk</h3>
                                <div 
                                    className="text-stone-600 leading-relaxed text-base"
                                    dangerouslySetInnerHTML={{ __html: product.description || 'Tidak ada deskripsi untuk produk ini.' }} 
                                />
                            </div>

                            <div className="pt-8 border-t border-stone-200">
                                <a 
                                    href={whatsappUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className={cn(
                                        buttonVariants({ variant: 'default' }),
                                        "w-full bg-stone-900 hover:bg-black text-white font-black uppercase tracking-widest py-6 rounded-none text-base h-auto shadow-xl flex items-center justify-center"
                                    )}
                                >
                                    <ShoppingCart className="w-6 h-6 mr-3" />
                                    Pesan via WhatsApp
                                </a>
                                <p className="mt-4 text-center text-stone-400 text-[10px] uppercase font-bold tracking-widest">
                                    Dapatkan harga spesial untuk pesanan jumlah banyak
                                </p>
                            </div>

                            {/* Features list */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-stone-50 border border-stone-100">
                                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Estimasi Produksi</p>
                                    <p className="text-sm font-bold text-stone-900">7 - 14 Hari Kerja</p>
                                </div>
                                <div className="p-4 bg-stone-50 border border-stone-100">
                                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Minimal Order</p>
                                    <p className="text-sm font-bold text-stone-900">12 Pcs / Tim</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            <section className="py-24 bg-stone-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tighter mb-12">
                        Produk <span className="text-orange-600">Lainnya</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {related_products.map((item) => (
                            <Link 
                                key={item.id} 
                                href={route('catalog.show', item.slug)}
                                className="group bg-white border border-stone-200 overflow-hidden"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img 
                                        src={item.image_url || '/images/placeholder.svg'} 
                                        alt={item.title} 
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-stone-900 uppercase text-sm truncate">{item.title}</h4>
                                    <p className="text-orange-600 text-[10px] font-black uppercase tracking-widest mt-1">Detail Produk</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}