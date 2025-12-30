"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader, ImageGrid } from "@/components/common";

const portfolioImages = [
  { src: "/produk/jaket-bomber-bank-mandiri.png", alt: "Jaket Bomber Bank Mandiri" },
  { src: "/produk/Jersey Basket Agriculture UNSRI.png", alt: "Jersey Basket Agriculture UNSRI" },
  { src: "/produk/Jersey Basket Away DBASCOM.png", alt: "Jersey Basket Away DBASCOM" },
  { src: "/produk/Jersey Basket Home Dan Away Universitas Aisyah Pringsewu.png", alt: "Jersey Basket Home Dan Away Universitas Aisyah Pringsewu" },
  { src: "/produk/Jersey Basket Home DBASCOM.png", alt: "Jersey Basket Home DBASCOM" },
  { src: "/produk/Kemeja BPN Kab. Lahat.png", alt: "Kemeja BPN Kab. Lahat" },
];

export function PortfolioSection() {
  return (
    <section id="portofolio" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 flex justify-center">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          title="Galeri Portofolio"
          subtitle="Lihat beberapa hasil produksi yang telah kami kerjakan untuk berbagai klien."
        />
        <div className="py-12">
          <ImageGrid
            images={portfolioImages}
            columns={3}
            aspectRatio="square"
            showOverlay={false}
            animated
          />
        </div>
        <div className="flex justify-center">
          <AnimatedSection delay={700}>
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href="/galeri">Lihat Lebih Banyak</Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

