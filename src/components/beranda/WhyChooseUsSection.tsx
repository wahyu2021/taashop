"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader, FeatureCard } from "@/components/common";
import { Gem, Sparkles, Rocket, ShieldCheck, Users, PackageCheck } from "lucide-react";

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

  return (
    <section id="keunggulan" className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-muted/40">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          title="Lebih dari Sekadar Konveksi, Kami Adalah Mitra Kreatif Anda"
          subtitle="Temukan alasan mengapa ratusan klien mulai dari brand lokal, perusahaan, hingga komunitas memercayakan produksi mereka kepada kami."
        />
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {features.map((feature, index) => (
            <AnimatedSection delay={(index + 1) * 100} key={feature.title}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                variant="default"
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

