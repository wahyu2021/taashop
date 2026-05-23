import { Link } from '@inertiajs/react';
import { NewsData } from '@/types';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Props {
    news: NewsData[];
}

export default function LatestNews({ news }: Props) {
    if (news.length === 0) return null;

    return (
        <section className="py-24 bg-stone-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl sm:text-5xl font-black text-stone-900 uppercase tracking-tighter mb-4">
                            Berita <span className="text-orange-600">& Edukasi</span>
                        </h2>
                        <p className="text-stone-500 max-w-xl text-lg">
                            Dapatkan informasi terbaru seputar dunia sablon, desain jersey, dan tips menarik lainnya.
                        </p>
                    </div>
                    <Link href="/news" className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-orange-600 hover:text-stone-900 transition-colors">
                        Lihat Semua Artikel
                        <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {news.map((item) => (
                        <div key={item.id} className="group flex flex-col h-full bg-white border border-stone-100 hover:border-stone-200 transition-all">
                            <Link href={`/news/${item.slug}`} className="aspect-video overflow-hidden bg-stone-100 relative">
                                <img 
                                    src={item.image_url || '/images/placeholder.svg'} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </Link>
                            <div className="p-8 flex flex-col grow">
                                <div className="flex items-center gap-2 text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                                    <Calendar size={12} className="text-orange-600" />
                                    {item.published_at ? format(new Date(item.published_at), 'dd MMMM yyyy', { locale: id }) : 'Coming Soon'}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-stone-900 mb-4 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                    <Link href={`/news/${item.slug}`}>
                                        {item.title}
                                    </Link>
                                </h3>
                                <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3 grow">
                                    {item.summary}
                                </p>
                                <Link 
                                    href={`/news/${item.slug}`}
                                    className="text-stone-900 text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                                >
                                    Baca Selengkapnya <ArrowRight size={14} className="text-orange-600" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
