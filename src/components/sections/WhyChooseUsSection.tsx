"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, DollarSign, Palette } from "lucide-react";

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function WhyChooseUsSection() {
  return (
    <section id="keunggulan" className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Mengapa Memilih TaaShop Konveksi?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Komitmen kami adalah memberikan hasil terbaik untuk setiap pesanan Anda.
              </p>
            </div>
          </div>
        </AnimatedSection>
        <div className="mx-auto w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-8 py-12">
          <AnimatedSection delay={100}>
            <FeatureCard icon={<Star className="h-8 w-8 text-primary" />} title="Kualitas Premium" description="Kami hanya menggunakan bahan baku terbaik dan proses produksi yang teliti untuk hasil yang tahan lama." />
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <FeatureCard icon={<DollarSign className="h-8 w-8 text-primary" />} title="Harga Kompetitif" description="Dapatkan penawaran harga terbaik untuk pesanan satuan maupun dalam jumlah besar (grosir)." />
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <FeatureCard icon={<Palette className="h-8 w-8 text-primary" />} title="Desain Fleksibel" description="Tim kami siap membantu Anda mewujudkan desain impian, dari konsep hingga menjadi produk jadi." />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
