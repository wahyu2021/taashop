import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps, PortfolioData } from '@/types';
import { Button, buttonVariants } from '@/Components/ui/button';
import { ArrowLeft, Share2, CheckCircle2, User, Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Props {
    portfolio: PortfolioData;
    related_portfolios: PortfolioData[];
}

export default function PortfolioShow({ portfolio, related_portfolios }: Props) {
    const { site_settings } = usePage<PageProps>().props;

    const whatsappUrl = `https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '')}?text=Halo Taaashop, saya melihat portofolio ${portfolio.title} dan tertarik untuk membuat proyek serupa. Bisa konsultasi?`;

    return (
        <PublicLayout>
            <Head title={`${portfolio.title} - Portofolio Taaashop`} />

            {/* Breadcrumb / Back */}
            <div className="bg-stone-50 border-b border-stone-200">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link 
                        href={route('portfolio.index')} 
                        className="inline-flex items-center gap-2 text-stone-500 hover:text-orange-600 transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} />
                        Kembali ke Galeri
                    </Link>
                </div>
            </div>

            <section className="py-12 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Project Info & Description */}
                        <div className="lg:col-span-4 order-2 lg:order-1">
                            <div className="sticky top-32 space-y-8">
                                <div>
                                    <span className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 mb-6">
                                        {portfolio.category?.name || 'Proyek Taaashop'}
                                    </span>
                                    <h1 className="text-3xl sm:text-4xl font-black text-stone-900 uppercase tracking-tighter leading-tight mb-6">
                                        {portfolio.title}
                                    </h1>
                                </div>

                                <div className="space-y-4 bg-stone-50 p-6 border border-stone-100">
                                    <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-stone-200 shrink-0 text-stone-500">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Klien</div>
                                            <div className="text-sm font-bold text-stone-900">{portfolio.client_name || 'Taaashop'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 pt-2">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-stone-200 shrink-0 text-stone-500">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Tanggal Proyek</div>
                                            <div className="text-sm font-bold text-stone-900">
                                                {portfolio.project_date ? format(new Date(portfolio.project_date), 'dd MMMM yyyy', { locale: id }) : '-'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-stone prose-sm max-w-none">
                                    <h3 className="text-stone-900 font-black uppercase tracking-tight text-lg mb-4 border-b border-stone-200 pb-2">Detail Proyek</h3>
                                    <div 
                                        className="text-stone-600 leading-relaxed text-sm"
                                        dangerouslySetInnerHTML={{ __html: portfolio.description || 'Tidak ada deskripsi detail untuk proyek ini.' }} 
                                    />
                                </div>

                                <div className="pt-4">
                                    <a 
                                        href={whatsappUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={cn(
                                            buttonVariants({ variant: 'outline' }),
                                            "w-full bg-transparent border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white font-black uppercase tracking-widest py-6 rounded-none text-sm h-auto flex items-center justify-center transition-all"
                                        )}
                                    >
                                        Mulai Proyek Serupa
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Project Image */}
                        <div className="lg:col-span-8 order-1 lg:order-2">
                            <div className="bg-stone-100 border border-stone-200 w-full overflow-hidden">
                                <img 
                                    src={portfolio.image_url || '/images/placeholder.svg'} 
                                    alt={portfolio.title} 
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Portfolios */}
            {related_portfolios && related_portfolios.length > 0 && (
                <section className="py-20 bg-stone-950 text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 flex items-center justify-between">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">
                                Proyek <span className="text-orange-600">Lainnya</span>
                            </h2>
                            <Link 
                                href={route('portfolio.index')}
                                className="hidden sm:flex text-stone-400 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors items-center"
                            >
                                Lihat Semua
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {related_portfolios.map((item) => (
                                <Link 
                                    key={item.id} 
                                    href={route('portfolio.show', item.slug)}
                                    className="group block relative aspect-square overflow-hidden bg-stone-900 border border-stone-800"
                                >
                                    <img 
                                        src={item.image_url || '/images/placeholder.svg'} 
                                        alt={item.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent flex items-end p-6">
                                        <div>
                                            <p className="text-orange-600 text-[10px] font-black uppercase tracking-widest mb-1">
                                                {item.category?.name}
                                            </p>
                                            <h4 className="text-white font-black uppercase tracking-tight text-lg leading-tight">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        
                        <div className="mt-8 sm:hidden">
                            <Link 
                                href={route('portfolio.index')}
                                className={cn(
                                    buttonVariants({ variant: 'outline' }),
                                    "w-full border-stone-700 text-white hover:bg-stone-800 hover:text-white rounded-none font-bold uppercase tracking-widest"
                                )}
                            >
                                Lihat Semua Portofolio
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
