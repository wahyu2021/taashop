"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowLeft, X, Search, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  { id: 1, src: "jaket-bomber-bank-mandiri.png", title: "Jaket Bomber Bank Mandiri", category: "Jaket & Outerwear", description: "Jaket bomber eksklusif untuk Bank Mandiri dengan bahan taslan premium dan bordir komputer presisi. Nyaman dan stylish untuk kegiatan korporat." },
  { id: 2, src: "Jersey Basket Agriculture UNSRI.png", title: "Jersey Basket Agriculture UNSRI", category: "Jersey & Sportswear", description: "Jersey basket untuk tim Agriculture UNSRI. Dibuat dengan bahan dry-fit berkualitas tinggi yang menyerap keringat, dengan desain full printing yang tajam." },
  { id: 3, src: "Jersey Basket Away DBASCOM.png", title: "Jersey Basket Away DBASCOM", category: "Jersey & Sportswear", description: "Jersey tandang untuk tim basket DBASCOM. Desain modern dengan bahan premium yang ringan dan nyaman untuk performa maksimal di lapangan." },
  { id: 4, src: "Jersey Basket Home Dan Away Universitas Aisyah Pringsewu.png", title: "Jersey Universitas Aisyah Pringsewu", category: "Jersey & Sportswear", description: "Satu set jersey kandang dan tandang untuk tim basket Universitas Aisyah Pringsewu. Desain custom yang merepresentasikan identitas universitas." },
  { id: 5, src: "Jersey Basket Home DBASCOM.png", title: "Jersey Basket Home DBASCOM", category: "Jersey & Sportswear", description: "Jersey kandang untuk tim basket DBASCOM. Warna cerah dengan bahan berkualitas yang memberikan kenyamanan saat bermain." },
  { id: 6, src: "Kemeja BPN Kab. Lahat.png", title: "Kemeja BPN Kab. Lahat", category: "Kemeja & Seragam", description: "Kemeja seragam untuk Badan Pertanahan Nasional (BPN) Kabupaten Lahat. Menggunakan bahan American Drill yang awet dan nyaman untuk dipakai sehari-hari." },
  { id: 7, src: "T-Shirt Kampung SI.png", title: "T-Shirt Kampung SI", category: "Kaos & Poloshirt", description: "Kaos event untuk acara 'Kampung SI'. Bahan cotton combed 30s yang adem dengan sablon plastisol berkualitas tinggi yang tidak mudah pecah." },
  { id: 8, src: "Poloshirt PT BSL Sumatera Selatan.png", title: "Poloshirt PT BSL", category: "Kaos & Poloshirt", description: "Poloshirt untuk PT BSL Sumatera Selatan. Desain elegan dengan bahan lacoste pique dan bordir komputer yang rapi." },
  { id: 9, src: "Jersey Basket Home FIF Cab. Bekasi.png", title: "Jersey Basket FIF Bekasi", category: "Jersey & Sportswear", description: "Jersey basket untuk FIF Cabang Bekasi. Dibuat dengan bahan berkualitas untuk kenyamanan dan performa." },
  { id: 10, src: "Jersey Basket IGS Sumatera Selatan.png", title: "Jersey Basket IGS Sumsel", category: "Jersey & Sportswear", description: "Jersey basket untuk IGS Sumatera Selatan. Desain modern dan bahan yang nyaman." },
  { id: 11, src: "Jersey Basketball Away UNSRI.png", title: "Jersey Basket Away UNSRI", category: "Jersey & Sportswear", description: "Jersey tandang untuk tim basket UNSRI. Kualitas premium untuk kompetisi." },
  { id: 12, src: "Jersey Basketball Home UNSRI Lima.png", title: "Jersey Basket Home UNSRI", category: "Jersey & Sportswear", description: "Jersey kandang untuk tim basket UNSRI. Desain eksklusif dan bahan nyaman." },
  { id: 13, src: "jersey-away-sempatu-basketball.png", title: "Jersey Away Sempatu", category: "Jersey & Sportswear", description: "Jersey tandang untuk tim basket Sempatu. Desain keren dan bahan berkualitas." },
  { id: 14, src: "Kemeja Duta SMANDAWA Sumatera Selatan.png", title: "Kemeja Duta SMANDAWA", category: "Kemeja & Seragam", description: "Kemeja untuk Duta SMANDAWA Sumatera Selatan. Bahan premium dan desain formal." },
  { id: 15, src: "Kemeja Duta SMANDUPA SUMATERA SELATAN.png", title: "Kemeja Duta SMANDUPA", category: "Kemeja & Seragam", description: "Kemeja untuk Duta SMANDUPA Sumatera Selatan. Desain elegan dan bahan nyaman." },
  { id: 16, src: "Kemeja Manajemen Agribisnis POLSRI.png", title: "Kemeja Agribisnis POLSRI", category: "Kemeja & Seragam", description: "Kemeja untuk jurusan Manajemen Agribisnis POLSRI. Desain profesional." },
  { id: 17, src: "Kemeja Osis SMAN 2 MUBA.png", title: "Kemeja OSIS SMAN 2 MUBA", category: "Kemeja & Seragam", description: "Kemeja untuk OSIS SMAN 2 MUBA. Bahan berkualitas dan desain modern." },
  { id: 18, src: "Polo-Shirt Away Unsri Basketball.png", title: "Polo Shirt Away UNSRI", category: "Kaos & Poloshirt", description: "Polo shirt tandang untuk tim basket UNSRI. Bahan nyaman dan desain sporty." },
  { id: 19, src: "Polo-Shirt Home The Tamvans Basketball.png", title: "Polo Shirt The Tamvans", category: "Kaos & Poloshirt", description: "Polo shirt untuk tim basket The Tamvans. Desain eksklusif dan bahan premium." },
  { id: 20, src: "Polo-Shirt Home Unsri Basketball.png", title: "Polo Shirt Home UNSRI", category: "Kaos & Poloshirt", description: "Polo shirt kandang untuk tim basket UNSRI. Bahan berkualitas dan desain elegan." },
  { id: 21, src: "T-Shirt Petani RI Sumatera Selatan.png", title: "T-Shirt Petani RI", category: "Kaos & Poloshirt", description: "T-shirt untuk Petani RI Sumatera Selatan. Bahan adem dan sablon berkualitas." },
];

function PortfolioImage({ product, onClick }: { product: typeof products[0]; onClick: () => void }) {
  return (
    <div 
      className="aspect-square overflow-hidden rounded-lg shadow-md transition-all duration-300 group relative cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={`/produk/${product.src}`}
        alt={product.title}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <Search className="h-10 w-10 mx-auto transform scale-0 group-hover:scale-100 transition-transform duration-300" />
          <p className="font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{product.title}</p>
        </div>
      </div>
    </div>
  );
}

function Lightbox({ product, onClose }: { product: typeof products[0] | null; onClose: () => void }) {
  if (!product) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in-0"
      onClick={onClose}
    >
      <div 
        className="relative bg-card text-card-foreground max-w-4xl w-full rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95"
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
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <Button 
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-1">
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant={currentPage === number ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(number)}
          >
            {number}
          </Button>
        ))}
      </div>
      <Button 
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function PortfolioPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

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

  return (
    <main className="flex-1 bg-muted/40">
      {/* Banner Section */}
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

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Semua Produk</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Berikut adalah beberapa contoh produk yang telah kami hasilkan. Setiap produk dibuat dengan bahan berkualitas tinggi dan perhatian terhadap detail.
                </p>
              </div>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 py-12">
            {currentProducts.map((product, index) => (
              <AnimatedSection key={product.id} delay={(index % 8) * 100}>
                <PortfolioImage
                  product={product}
                  onClick={() => openLightbox(product)}
                />
              </AnimatedSection>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4">
            <PaginationControls 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </div>
          <div className="flex justify-center mt-8">
            <AnimatedSection delay={500}>
              <Button asChild size="lg" className="transition-transform hover:scale-105">
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
