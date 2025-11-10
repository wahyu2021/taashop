import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { AnimatedSection } from "@/components/AnimatedSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Building, ClipboardCheck, DollarSign, Package, Paintbrush, Palette, Send, Shirt, Star, Trophy, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full h-[100vh] flex flex-col items-center justify-center text-center text-white">
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
                    <Link href="/kontak">Mulai Proyek Anda</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg" className="transition-transform hover:scale-105 shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white">
                    <Link href="/layanan">Lihat Layanan</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
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

      {/* Ordering Process Section */}
      <section id="proses" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 flex justify-center">
        <div className="w-full max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Proses Pemesanan Mudah</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hanya dalam 4 langkah mudah, pakaian custom impian Anda siap kami produksi.
                </p>
              </div>
            </div>
          </AnimatedSection>
          <div className="relative py-12">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/50 transform -translate-x-1/2 hidden md:block"></div>
            <div className="grid gap-12 md:grid-cols-2">
              {/* Step 1 */}
              <AnimatedSection delay={100}>
                <ProcessStep
                  icon={<ClipboardCheck />}
                  step="1"
                  title="Konsultasi & Desain"
                  description="Hubungi kami untuk konsultasi gratis. Tim kami akan membantu Anda merancang desain yang sempurna, memilih bahan terbaik, dan memberikan penawaran harga yang transparan."
                  align="right"
                />
              </AnimatedSection>
              <div className="hidden md:block"></div>

              {/* Step 2 */}
              <div className="hidden md:block"></div>
              <AnimatedSection delay={200}>
                <ProcessStep
                  icon={<Paintbrush />}
                  step="2"
                  title="Approval & DP"
                  description="Setelah desain disetujui, Anda akan menerima mockup digital. Lakukan pembayaran uang muka (DP) untuk memulai proses produksi."
                  align="left"
                />
              </AnimatedSection>

              {/* Step 3 */}
              <AnimatedSection delay={300}>
                <ProcessStep
                  icon={<Package />}
                  step="3"
                  title="Produksi Presisi"
                  description="Pesanan Anda masuk ke tahap produksi. Kami menggunakan teknologi canggih dan quality control yang ketat untuk memastikan setiap detail sempurna."
                  align="right"
                />
              </AnimatedSection>
              <div className="hidden md:block"></div>

              {/* Step 4 */}
              <div className="hidden md:block"></div>
              <AnimatedSection delay={400}>
                <ProcessStep
                  icon={<Send />}
                  step="4"
                  title="Pelunasan & Pengiriman"
                  description="Setelah produksi selesai, lakukan pelunasan. Pesanan Anda akan segera kami kemas dengan aman dan kirimkan ke alamat Anda di seluruh Indonesia."
                  align="left"
                />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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

      {/* Portfolio Section */}
      <section id="portofolio" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 flex justify-center">
        <div className="w-full max-w-7xl px-4 md:px-6">
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Galeri Portofolio</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Lihat beberapa hasil produksi yang telah kami kerjakan untuk berbagai klien.
                </p>
              </div>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-12">
            <AnimatedSection delay={100}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_1/500/500" alt="Portfolio 1" /></AnimatedSection>
            <AnimatedSection delay={200}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_2/500/500" alt="Portfolio 2" /></AnimatedSection>
            <AnimatedSection delay={300}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_3/500/500" alt="Portfolio 3" /></AnimatedSection>
            <AnimatedSection delay={400}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_4/500/500" alt="Portfolio 4" /></AnimatedSection>
            <AnimatedSection delay={500}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_5/500/500" alt="Portfolio 5" /></AnimatedSection>
            <AnimatedSection delay={600}><PortfolioImage src="https://picsum.photos/seed/taashop_portfolio_6/500/500" alt="Portfolio 6" /></AnimatedSection>
          </div>
          <div className="flex justify-center">
            <AnimatedSection delay={700}>
              <Button asChild size="lg" className="transition-transform hover:scale-105">
                <Link href="/portofolio">Lihat Lebih Banyak</Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Customer Compliments Section */}
      <section id="testimoni" className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
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

      {/* CTA Section */}
      <section id="kontak" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 border-t flex justify-center">
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
    </main>
  );
}

// Helper components for sections
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

function ProcessStep({ icon, step, title, description, align }: { icon: React.ReactNode; step: string; title: string; description: string; align: 'left' | 'right' }) {
  const alignmentClasses = align === 'left' ? 'md:text-left' : 'md:text-right';
  const contentOrder = align === 'left' ? 'md:flex-row' : 'md:flex-row-reverse';
  const timelineDotAlign = align === 'left' ? 'md:left-0 md:-translate-x-1/2' : 'md:right-0 md:translate-x-1/2';

  return (
    <div className={`relative flex flex-col items-center md:items-stretch ${alignmentClasses}`}>
      <div className={`flex items-center gap-6 ${contentOrder}`}>
        <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground border-4 border-background shadow-lg">
          {icon}
        </div>
        <div className="flex-1">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">{icon}</span>
                {step}. {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className={`absolute top-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-y-1/2 hidden md:block ${timelineDotAlign}`}></div>
    </div>
  );
}

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

function PortfolioImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-square overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10">
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        className="object-cover w-full h-full"
      />
    </div>
  );
}