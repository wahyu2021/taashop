"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src="/banner.jpg"
        alt="TaaShop Konveksi"
        fill
        className="object-cover object-center"
        priority
      />
      
      {/* Dark Overlay with Orange Tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6">
        <AnimatedSection>
          <div className="flex flex-col items-center space-y-8">
            {/* Subtle top accent line */}
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
            
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl xl:text-7xl drop-shadow-lg">
                Kualitas Terbaik,<br />Harga Terjangkau
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 drop-shadow">
                TaaShop adalah partner konveksi Anda untuk mewujudkan pakaian custom berkualitas tinggi.
              </p>
            </div>
            
            <AnimatedSection delay={200}>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center pt-4">
                <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white transition-all duration-300 rounded-full px-8 font-semibold shadow-lg hover:shadow-xl">
                  <Link href="/kontak">Konsultasi Gratis</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white rounded-full px-8 font-semibold transition-all duration-300">
                  <Link href="/galeri">Lihat Produk</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

