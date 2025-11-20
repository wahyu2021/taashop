"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowLeft, X, Search, ChevronLeft, ChevronRight, PackageOpen } from "lucide-react";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useSearchParams } from 'next/navigation';

const categories = ["Semua", ...Array.from(new Set(products.map(p => p.category)))];

function PortfolioImage({ product, onClick }: { product: typeof products[0]; onClick: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group relative cursor-pointer"
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
          <div className="animate-pulse rounded-full bg-muted-foreground/20 h-12 w-12"></div>
        </div>
      )}
      <Image
        src={`/produk/${product.src}`}
        alt={product.title}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className={cn(
          "object-cover w-full h-full transition-transform duration-300 group-hover:scale-110",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{product.title}</h3>
        <p className="text-white/80 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{product.category}</p>
      </div>
      <div className="absolute top-2 right-2 p-2 bg-black/30 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
        <Search className="h-5 w-5 text-white" />
      </div>
    </div>
  );
}


// ... other imports

function Lightbox({ product, onClose }: { product: typeof products[0] | null; onClose: () => void }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-card text-card-foreground max-w-4xl w-full rounded-lg shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src={`/produk/${product.src}`}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">{product.title}</h2>
            <div className="text-sm text-primary font-semibold mt-1">{product.category}</div>
            <p className="text-muted-foreground mt-4 flex-1">{product.description}</p>
            <Button asChild className="mt-6 w-full">
              <Link href="/kontak">Hubungi untuk Pesan</Link>
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 h-10 w-10 text-white rounded-full bg-black/50 hover:bg-black/75"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>
    </div>
  );
}



function PaginationControls({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) {
  const pageNumbers = [];
  const maxPagesToShow = 5;

  let startPageCandidate = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPageCandidate = Math.min(totalPages, startPageCandidate + maxPagesToShow - 1);

  if (endPageCandidate - startPageCandidate + 1 < maxPagesToShow) {
    startPageCandidate = Math.max(1, totalPages - maxPagesToShow + 1);
    endPageCandidate = Math.min(totalPages, startPageCandidate + maxPagesToShow - 1);
  }

  const startPage = Math.max(1, startPageCandidate);
  const endPage = endPageCandidate;

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <Button 
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="rounded-full"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-1">
        {startPage > 1 && (
          <>
            <Button variant="outline" size="icon" onClick={() => onPageChange(1)} className="rounded-full">1</Button>
            {startPage > 2 && <span className="text-muted-foreground">...</span>}
          </>
        )}
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant={currentPage === number ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(number)}
            className="rounded-full"
          >
            {number}
          </Button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-muted-foreground">...</span>}
            <Button variant="outline" size="icon" onClick={() => onPageChange(totalPages)} className="rounded-full">{totalPages}</Button>
          </>
        )}
      </div>
      <Button 
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="rounded-full"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function Gallery() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(category || "Semua");
  const itemsPerPage = 8;
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCategory(category || "Semua");
  }, [category]);

  const filteredProducts = selectedCategory === "Semua" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const openLightbox = (product: typeof products[0]) => {
    setSelectedProduct(product);
  };

  const closeLightbox = () => {
    setSelectedProduct(null);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="flex-1 bg-background">
      <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <Image
          src="/banner2.jpg"
          alt="Galeri Produk TaaShop"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Jelajahi Karya Terbaik Kami</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              Temukan inspirasi dari berbagai produk konveksi berkualitas tinggi yang telah kami hasilkan.
            </p>
          </div>
        </div>
      </section>

      <section ref={galleryRef} className="w-full py-12 md:py-24 lg:py-32 scroll-mt-20">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Galeri Produk</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Filter berdasarkan kategori untuk menemukan produk yang Anda cari.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="flex justify-center flex-wrap gap-3 my-8 md:my-12">
            {categories.map(category => (
              <Button 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className="rounded-full px-6 py-2 transition-all duration-200 hover:shadow-md hover:scale-105"
              >
                {category}
              </Button>
            ))}
          </div>

          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {currentProducts.map((product, index) => (
                <AnimatedSection key={product.id} delay={(index % itemsPerPage) * 100}>
                  <PortfolioImage
                    product={product}
                    onClick={() => openLightbox(product)}
                  />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <div className="text-center py-16">
                <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold">Tidak Ada Produk</h3>
                <p className="mt-2 text-muted-foreground">
                  Tidak ada produk yang ditemukan dalam kategori ini.
                </p>
              </div>
            </AnimatedSection>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12 md:mt-16">
              <PaginationControls 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            </div>
          )}

          <div className="flex justify-center mt-12 md:mt-16">
            <AnimatedSection delay={300}>
              <Button asChild size="lg" className="transition-transform hover:scale-105 rounded-full">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Kembali ke Halaman Utama
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
      <Lightbox
        product={selectedProduct}
        onClose={closeLightbox}
      />
    </main>
  );
}
