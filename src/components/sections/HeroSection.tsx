"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";

export function HeroSection() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center text-white">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/banner.jpg"
          alt="TaaShop Konveksi"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-6">
        <AnimatedSection>
          <div className="flex flex-col items-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl/none text-shadow-lg">
                Kualitas Terbaik, Harga Terjangkau
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 text-shadow">
                TaaShop adalah partner konveksi Anda untuk mewujudkan pakaian custom berkualitas tinggi.
              </p>
            </div>
            <AnimatedSection delay={200}>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
                <Button asChild size="lg" className="transition-transform hover:scale-105 shadow-2xl">
                  <Link href="/kontak">Konsultasi Gratis</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="transition-transform hover:scale-105 shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white">
                  <Link href="/layanan">Lihat Produk</Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
