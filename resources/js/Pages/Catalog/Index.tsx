import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, ProductData, CategoryData, PaginatedData } from '@/types';
import { Input } from '@/Components/ui/input';
import { Button, buttonVariants } from '@/Components/ui/button';
import { Search, Filter, ArrowRight, Grid, List as ListIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

interface Props {
    products: PaginatedData<ProductData>;
    categories: CategoryData[];
    filters: {
        search?: string;
        category_id?: string;
    };
}

export default function CatalogIndex({ products, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category_id || '');
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        handleFilter();
    }, [debouncedSearch, selectedCategory]);

    const handleFilter = () => {
        router.get(
            route('catalog.index'),
            { search: debouncedSearch, category_id: selectedCategory },
            { preserveState: true, replace: true }
        );
    };

    return (
        <PublicLayout>
            <Head title="Katalog Produk - Taaashop" />

            {/* Page Header */}
            <section className="bg-stone-950 py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                            Katalog <span className="text-orange-600">Produk</span>
                        </h1>
                        <p className="text-stone-400 text-lg">
                            Temukan berbagai pilihan jersey dan sablon kustom berkualitas untuk tim Anda.
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
                                placeholder="Cari produk..."
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

            {/* Product Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {products.data.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                            {products.data.map((product) => (
                                <div key={product.id} className="group flex flex-col h-full bg-white border border-stone-100 hover:border-orange-200 transition-all duration-300">
                                    <Link href={route('catalog.show', product.slug)} className="aspect-[4/5] overflow-hidden bg-stone-100 relative">
                                        <img 
                                            src={product.image_url || '/images/placeholder.svg'} 
                                            alt={product.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-white text-stone-900 text-[10px] font-black uppercase tracking-widest px-4 py-2 translate-y-4 group-hover:translate-y-0 transition-transform">
                                                Lihat Produk
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="p-6 flex flex-col grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-orange-600 text-[10px] font-black uppercase tracking-widest">
                                                {product.category?.name || 'Uncategorized'}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-black uppercase tracking-tight text-stone-900 mb-4 line-clamp-2 leading-tight grow">
                                            <Link href={route('catalog.show', product.slug)} className="hover:text-orange-600 transition-colors">
                                                {product.title}
                                            </Link>
                                        </h3>
                                        <Link 
                                            href={route('catalog.show', product.slug)}
                                            className={cn(
                                                buttonVariants({ variant: 'outline' }),
                                                "w-full rounded-none border-stone-200 text-stone-900 font-black uppercase tracking-widest text-[10px] hover:bg-stone-900 hover:text-white"
                                            )}
                                        >
                                            Detail Produk
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-stone-100 text-stone-400 rounded-full mb-6">
                                <Search size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight mb-2">Produk Tidak Ditemukan</h3>
                            <p className="text-stone-500">Coba gunakan kata kunci pencarian atau filter yang berbeda.</p>
                        </div>
                    )}

                    {/* Simple Pagination */}
                    {products.meta && products.meta.last_page > 1 && (
                        <div className="mt-20 flex justify-center gap-2">
                            {products.links.map((link, i) => (
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