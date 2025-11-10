"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";

function PortfolioImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-square overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10">
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

export function PortfolioSection() {
  return (
    <section id="portofolio" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 flex justify-center">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Galeri Portofolio</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Lihat beberapa hasil produksi yang telah kami kerjakan untuk berbagai klien.
              </p>
            </div>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-12">
          <AnimatedSection delay={100}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_1/500/500" alt="Portfolio 1" /></AnimatedSection>
          <AnimatedSection delay={200}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_2/500/500" alt="Portfolio 2" /></AnimatedSection>
          <AnimatedSection delay={300}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_3/500/500" alt="Portfolio 3" /></AnimatedSection>
          <AnimatedSection delay={400}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_4/500/500" alt="Portfolio 4" /></AnimatedSection>
          <AnimatedSection delay={500}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_5/500/500" alt="Portfolio 5" /></AnimatedSection>
          <AnimatedSection delay={600}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_6/500/500" alt="Portfolio 6" /></AnimatedSection>
        </div>
        <div className="flex justify-center">
          <AnimatedSection delay={700}>
            <Button asChild size="lg" className="transition-transform hover:scale-105">
              <Link href="/portofolio">Lihat Lebih Banyak</Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
