"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, DollarSign, Palette, Clock, ShieldCheck, MessageSquare } from "lucide-react";

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
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Partner Konveksi Terpercaya Pilihan Anda</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Kami bukan hanya sekadar vendor, kami adalah partner Anda dalam menciptakan produk fashion yang berkualitas dan berkesan.
              </p>
            </div>
          </div>
        </AnimatedSection>
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          <AnimatedSection delay={100}>
            <FeatureCard 
              icon={<Star className="h-8 w-8 text-primary" />} 
              title="Kualitas Premium & Terjamin" 
              description="Kami hanya menggunakan bahan baku terbaik dan proses produksi yang teliti untuk hasil yang tahan lama dan nyaman dipakai." 
            />
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <FeatureCard 
              icon={<DollarSign className="h-8 w-8 text-primary" />} 
              title="Harga Kompetitif & Transparan" 
              description="Dapatkan penawaran harga terbaik untuk pesanan satuan maupun dalam jumlah besar (grosir), tanpa biaya tersembunyi." 
            />
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <FeatureCard 
              icon={<Palette className="h-8 w-8 text-primary" />} 
              title="Desain Fleksibel & Custom" 
              description="Tim desainer kami siap membantu Anda mewujudkan desain impian, dari konsep hingga menjadi produk jadi yang unik." 
            />
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-primary" />} 
              title="Pengerjaan Tepat Waktu" 
              description="Kami menghargai waktu Anda. Proses produksi kami efisien dan terstruktur untuk memastikan pesanan selesai sesuai jadwal." 
            />
          </AnimatedSection>
          <AnimatedSection delay={500}>
            <FeatureCard 
              icon={<ShieldCheck className="h-8 w-8 text-primary" />} 
              title="Garansi Kualitas Produk" 
              description="Kami memberikan garansi untuk setiap produk yang kami hasilkan. Kepuasan Anda adalah prioritas utama kami." 
            />
          </AnimatedSection>
          <AnimatedSection delay={600}>
            <FeatureCard 
              icon={<MessageSquare className="h-8 w-8 text-primary" />} 
              title="Konsultasi Gratis & Ramah" 
              description="Jangan ragu untuk bertanya. Tim kami siap memberikan konsultasi gratis dan pelayanan yang ramah untuk setiap kebutuhan Anda." 
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
