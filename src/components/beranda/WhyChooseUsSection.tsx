"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Gem, Sparkles, Rocket, ShieldCheck, Users, PackageCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function WhyChooseUsSection() {
  const features = [
    {
      icon: <Gem className="h-10 w-10 text-primary" />,
      title: "Kualitas Butik, Harga Pabrik",
      description: "Kami terobsesi dengan kualitas. Dari pemilihan benang premium hingga jahitan presisi, kami memastikan setiap produk memiliki standar butik dengan harga yang tetap kompetitif.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Desain Tanpa Batas, Gratis",
      description: "Punya ide brilian? Tim desainer ahli kami siap mengubah visi Anda menjadi kenyataan. Dapatkan layanan konsultasi dan pembuatan desain custom, sepenuhnya gratis.",
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: "Produksi Cepat, Anti Molor",
      description: "Dengan alur kerja yang dioptimalkan dan teknologi modern, kami menjamin pesanan Anda selesai tepat waktu, bahkan untuk proyek dengan deadline ketat sekalipun.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Garansi 100% Uang Kembali",
      description: "Kepuasan Anda adalah segalanya. Jika hasil produksi tidak sesuai dengan kesepakatan, kami siap memberikan garansi penuh atau uang Anda kembali 100%.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Layanan Personal & Ramah",
      description: "Kami percaya pada hubungan jangka panjang. Nikmati pengalaman pemesanan yang mudah, transparan, dan didukung oleh tim yang selalu siap membantu Anda.",
    },
    {
      icon: <PackageCheck className="h-10 w-10 text-primary" />,
      title: "Harga Jujur, Tanpa Jebakan",
      description: "Dapatkan rincian biaya yang transparan sejak awal. Tidak ada biaya tersembunyi atau tambahan tak terduga di akhir. Harga kami jujur dan bersaing.",
    },
  ];

  function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
      <Card className="transition-shadow duration-300 border shadow-sm hover:shadow-lg h-full flex flex-col bg-card">
        <CardHeader className="flex flex-row items-center gap-4">
          {icon}
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section id="keunggulan" className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-muted/40">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Lebih dari Sekadar Konveksi, Kami Adalah Mitra Kreatif Anda</h2>
              <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Temukan alasan mengapa ratusan klien mulai dari brand lokal, perusahaan, hingga komunitas memercayakan produksi mereka kepada kami.
              </p>
            </div>
          </div>
        </AnimatedSection>
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {features.map((feature, index) => (
            <AnimatedSection delay={(index + 1) * 100} key={feature.title}>
              <FeatureCard {...feature} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
