"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader } from "@/components/common";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

export function CustomerComplimentsSection() {
  return (
    <section id="testimoni" className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-muted/40">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          title="Apa Kata Pelanggan Kami?"
          subtitle="Kepuasan Anda adalah prioritas kami. Berikut adalah beberapa testimoni dari pelanggan setia TaaShop Konveksi."
        />
        <div className="py-12 flex justify-center">
          <AnimatedSection delay={200} className="w-full">
            <TestimonialCarousel />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

