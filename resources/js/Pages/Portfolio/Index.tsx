import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { CategoryData, PaginatedData, PortfolioData } from '@/types';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Search, ArrowRight, Grid, List as ListIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import Pagination from '@/Components/shared/Pagination';

interface Props {
    portfolios: PaginatedData<PortfolioData>;
    categories: CategoryData[];
    filters: {
        search?: string;
        category_id?: string;
    };
}

export default function PortfolioIndex({ portfolios, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category_id || '');
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        handleFilter();
    }, [debouncedSearch, selectedCategory]);

    const handleFilter = () => {
        router.get(
            route('portfolio.index'),
            { search: debouncedSearch, category_id: selectedCategory },
            { preserveState: true, replace: true }
        );
    };

    return (
        <PublicLayout>
            <Head title="Portofolio - Hasil Karya Taaashop" />

            {/* Page Header */}
            <section className="bg-stone-950 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 mb-4">
                            Karya Terbaik Kami
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
                            Galeri <span className="text-orange-600">Portofolio</span>
                        </h1>
                        <p className="text-stone-400 text-lg">
                            Lihat hasil nyata produksi jersey dan sablon kustom berkualitas premium untuk berbagai klien kami.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="sticky top-16 z-30 bg-white border-b border-stone-200 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                            <Input
                                placeholder="Cari nama klien atau proyek..."
                                className="pl-10 rounded-none border-stone-200 focus-visible:ring-orange-600"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                            <Button
                                variant={selectedCategory === '' ? 'default' : 'outline'}
                                size="sm"
                                className={cn(
                                    "rounded-none font-bold uppercase tracking-widest text-[10px]",
                                    selectedCategory === '' ? "bg-stone-900 text-white" : "border-stone-200 text-stone-600"
                                )}
                                onClick={() => setSelectedCategory('')}
                            >
                                Semua
                            </Button>
                            {categories.map((cat) => (
                                <Button
                                    key={cat.id}
                                    variant={selectedCategory === String(cat.id) ? 'default' : 'outline'}
                                    size="sm"
                                    className={cn(
                                        "rounded-none font-bold uppercase tracking-widest text-[10px] whitespace-nowrap",
                                        selectedCategory === String(cat.id) ? "bg-stone-900 text-white" : "border-stone-200 text-stone-600"
                                    )}
                                    onClick={() => setSelectedCategory(String(cat.id))}
                                >
                                    {cat.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="py-12 sm:py-20 bg-stone-50 min-h-[50vh]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {portfolios.data.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {portfolios.data.map((portfolio) => (
                                <Link 
                                    key={portfolio.id} 
                                    href={route('portfolio.show', portfolio.slug)}
                                    className="group block bg-white border border-stone-100 hover:border-orange-200 hover:shadow-xl transition-all duration-500 overflow-hidden"
                                >
                                    <div className="aspect-video overflow-hidden relative bg-stone-100">
                                        <img
                                            src={portfolio.image_url || '/images/placeholder.svg'}
                                            alt={portfolio.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        />
                                        <div className="absolute top-4 right-4 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 shadow-md">
                                            {portfolio.category?.name}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">
                                            Klien: <span className="text-stone-600">{portfolio.client_name || 'Taaashop'}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight mb-4 group-hover:text-orange-600 transition-colors">
                                            {portfolio.title}
                                        </h3>
                                        <div className="flex items-center text-sm font-bold text-stone-500 uppercase tracking-widest">
                                            <span>Lihat Detail</span>
                                            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white border border-stone-200">
                            <div className="inline-flex w-16 h-16 bg-stone-100 rounded-full items-center justify-center text-stone-400 mb-4">
                                <Grid size={24} />
                            </div>
                            <h3 className="text-xl font-black text-stone-900 uppercase tracking-tighter mb-2">Tidak Ada Data</h3>
                            <p className="text-stone-500">Belum ada portofolio yang sesuai dengan pencarian Anda.</p>
                            <Button 
                                variant="outline" 
                                className="mt-6 rounded-none font-bold uppercase tracking-widest"
                                onClick={() => {
                                    setSearch('');
                                    setSelectedCategory('');
                                }}
                            >
                                Reset Filter
                            </Button>
                        </div>
                    )}

                    {/* Simple Pagination */}
                    {portfolios.meta && portfolios.meta.last_page > 1 && (
                        <div className="mt-20 flex justify-center gap-2">
                            {portfolios.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={cn(
                                        "w-10 h-10 flex items-center justify-center text-sm font-black transition-all border",
                                        link.active 
                                            ? "bg-stone-900 border-stone-900 text-white" 
                                            : "bg-white border-stone-200 text-stone-600 hover:border-stone-900",
                                        !link.url && "opacity-50 cursor-not-allowed"
                                    )}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
