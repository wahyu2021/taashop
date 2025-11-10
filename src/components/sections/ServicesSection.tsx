"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Shirt, Building, Trophy, Wind } from "lucide-react";

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="grid gap-2 text-center p-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-card">
      <div className="flex justify-center items-center text-primary mb-2">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="layanan" className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold">Layanan Kami</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Produk Konveksi Unggulan</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Kami ahli dalam memproduksi berbagai jenis pakaian custom untuk kebutuhan personal, komunitas, hingga perusahaan dengan standar kualitas tinggi.
              </p>
            </div>
          </div>
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <AnimatedSection delay={100}><ServiceCard icon={<Shirt className="h-10 w-10" />} title="Kaos & T-Shirt" description="Kaos custom untuk event, komunitas, atau merchandise brand Anda." /></AnimatedSection>
          <AnimatedSection delay={200}><ServiceCard icon={<Building className="h-10 w-10" />} title="Seragam" description="Seragam kantor, sekolah, atau organisasi dengan bahan berkualitas." /></AnimatedSection>
          <AnimatedSection delay={300}><ServiceCard icon={<Trophy className="h-10 w-10" />} title="Jersey & Sportswear" description="Jersey olahraga untuk tim Anda dengan desain full printing." /></AnimatedSection>
          <AnimatedSection delay={400}><ServiceCard icon={<Wind className="h-10 w-10" />} title="Jaket & Hoodie" description="Jaket bomber, hoodie, dan outerwear lainnya dengan custom bordir atau sablon." /></AnimatedSection>
        </div>
      </div>
    </section>
  );
}
