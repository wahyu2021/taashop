"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

export function CustomerComplimentsSection() {
  return (
    <section id="testimoni" className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-muted/40">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Apa Kata Pelanggan Kami?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Kepuasan Anda adalah prioritas kami. Berikut adalah beberapa testimoni dari pelanggan setia TaaShop Konveksi.
              </p>
            </div>
          </div>
        </AnimatedSection>
        <div className="py-12 flex justify-center">
          <AnimatedSection delay={200} className="w-full">
            <TestimonialCarousel />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
