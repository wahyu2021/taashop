"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Paintbrush, Package, Send } from "lucide-react";

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
              <CardTitle className="flex items-center gap-3 -mb-6">
                <span className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">{icon}</span>
                {step}. {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-left">{description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className={`absolute top-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-y-1/2 hidden md:block ${timelineDotAlign}`}></div>
    </div>
  );
}

export function OrderingProcessSection() {
  return (
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
  );
}
