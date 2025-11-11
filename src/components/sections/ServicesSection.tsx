"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import Image from "next/image";

export function ServicesSection() {
  const services = [
    {
      imgSrc: "/produk/T-Shirt Kampung SI.png",
      title: "Kaos & Poloshirt Custom",
      description: "Ideal untuk acara, merchandise, atau pakaian sehari-hari. Pilih dari berbagai bahan premium seperti cotton combed 24s/30s dengan opsi sablon plastisol, DTF, atau bordir komputer.",
    },
    {
      imgSrc: "/produk/Kemeja BPN Kab. Lahat.png",
      title: "Kemeja & Seragam Kerja",
      description: "Tampil profesional dengan kemeja PDL/PDH, seragam kantor, atau almamater. Bahan berkualitas seperti American Drill atau Japan Drill yang nyaman dan awet.",
    },
    {
      imgSrc: "/produk/Jersey Basket Home DBASCOM.png",
      title: "Jersey & Pakaian Olahraga",
      description: "Buat tim Anda menonjol dengan jersey custom full printing. Menggunakan bahan dry-fit premium yang menyerap keringat dan nyaman untuk aktivitas fisik.",
    },
    {
      imgSrc: "/produk/jaket-bomber-bank-mandiri.png",
      title: "Jaket, Hoodie & Outerwear",
      description: "Dari jaket bomber korporat hingga hoodie komunitas yang trendi. Pilihan bahan beragam dengan finishing bordir presisi atau sablon berkualitas tinggi.",
    },
  ];

  function ProductCard({
    imgSrc,
    title,
    description,
  }: {
    imgSrc: string;
    title: string;
    description: string;
  }) {
    return (
      <div className="relative group overflow-hidden rounded-xl shadow-lg h-96">
        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
          style={{ objectFit: "cover" }}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-sm text-white/80 mt-1">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <section id="layanan" className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-muted/40">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold">Layanan Kami</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Produk Konveksi Unggulan</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Dari kaos kasual hingga seragam profesional, kami mengubah ide Anda menjadi produk garmen berkualitas tinggi. Jelajahi pilihan produk unggulan kami.
              </p>
            </div>
          </div>
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-2">
          {services.map((service, index) => (
            <AnimatedSection delay={(index + 1) * 100} key={service.title}>
              <ProductCard {...service} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
