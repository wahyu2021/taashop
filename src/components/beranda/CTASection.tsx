"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";

export function CTASection() {
  return (
    <section id="kontak" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 flex justify-center">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <div className="grid items-center justify-center gap-4 text-center">
          <AnimatedSection>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Siap Membuat Pakaian Custom Anda?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hubungi kami sekarang untuk mendapatkan penawaran dan konsultasi gratis mengenai kebutuhan konveksi Anda.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2 mt-6">
              <Button asChild size="lg" className="w-full transition-transform hover:scale-105">
                <Link href="/kontak">Hubungi via WhatsApp</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
