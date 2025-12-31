import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeader, FeatureCard } from "@/components/common";
import { Gem, Sparkles, Rocket, ShieldCheck, Users, PackageCheck, Award, Heart, Star, Zap } from "lucide-react";
import { client } from "@/sanity/client";

interface Feature {
  _id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gem, Sparkles, Rocket, ShieldCheck, Users, PackageCheck, Award, Heart, Star, Zap,
};

// Fallback data
const fallbackFeatures: Feature[] = [
  { _id: "1", title: "Kualitas Butik, Harga Pabrik", description: "Kami terobsesi dengan kualitas. Dari pemilihan benang premium hingga jahitan presisi, kami memastikan setiap produk memiliki standar butik dengan harga yang tetap kompetitif.", iconName: "Gem", order: 1 },
  { _id: "2", title: "Desain Tanpa Batas, Gratis", description: "Punya ide brilian? Tim desainer ahli kami siap mengubah visi Anda menjadi kenyataan. Dapatkan layanan konsultasi dan pembuatan desain custom, sepenuhnya gratis.", iconName: "Sparkles", order: 2 },
  { _id: "3", title: "Produksi Cepat, Anti Molor", description: "Dengan alur kerja yang dioptimalkan dan teknologi modern, kami menjamin pesanan Anda selesai tepat waktu, bahkan untuk proyek dengan deadline ketat sekalipun.", iconName: "Rocket", order: 3 },
  { _id: "4", title: "Garansi 100% Uang Kembali", description: "Kepuasan Anda adalah segalanya. Jika hasil produksi tidak sesuai dengan kesepakatan, kami siap memberikan garansi penuh atau uang Anda kembali 100%.", iconName: "ShieldCheck", order: 4 },
  { _id: "5", title: "Layanan Personal & Ramah", description: "Kami percaya pada hubungan jangka panjang. Nikmati pengalaman pemesanan yang mudah, transparan, dan didukung oleh tim yang selalu siap membantu Anda.", iconName: "Users", order: 5 },
  { _id: "6", title: "Harga Jujur, Tanpa Jebakan", description: "Dapatkan rincian biaya yang transparan sejak awal. Tidak ada biaya tersembunyi atau tambahan tak terduga di akhir. Harga kami jujur dan bersaing.", iconName: "PackageCheck", order: 6 },
];

async function getFeatures(): Promise<Feature[]> {
  try {
    const features = await client.fetch<Feature[]>(
      `*[_type == "feature"] | order(order asc) {
        _id, title, description, iconName, order
      }`,
      {},
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    return features.length > 0 ? features : fallbackFeatures;
  } catch {
    return fallbackFeatures;
  }
}

export async function WhyChooseUsSection() {
  const features = await getFeatures();

  return (
    <section id="keunggulan" className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-muted/40">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <SectionHeader
          title="Lebih dari Sekadar Konveksi, Kami Adalah Mitra Kreatif Anda"
          subtitle="Temukan alasan mengapa ratusan klien mulai dari brand lokal, perusahaan, hingga komunitas memercayakan produksi mereka kepada kami."
        />
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.iconName] || Gem;
            return (
              <AnimatedSection delay={(index + 1) * 100} key={feature._id}>
                <FeatureCard
                  icon={<IconComponent className="h-10 w-10 text-primary" />}
                  title={feature.title}
                  description={feature.description}
                  variant="default"
                />
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

