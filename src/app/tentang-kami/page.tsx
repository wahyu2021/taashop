"use client"; // This component needs to be a client component for scroll effects

import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MessageCircle, Palette, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react"; // Re-import useState and useEffect

export default function TentangKamiPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const promises = [
    {
      icon: <Check className="w-6 h-6 text-green-500" />,
      title: "Kualitas Terjamin",
      description: "Kami memilih bahan terbaik dan mengawasi setiap jahitan untuk memastikan produk yang Anda terima awet dan nyaman.",
    },
    {
      icon: <Palette className="w-6 h-6 text-blue-500" />,
      title: "Desain Kolaboratif",
      description: "Desain Anda, visi kami. Kami bekerja bersama Anda, memberikan saran, dan melakukan revisi hingga Anda 100% puas.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-orange-500" />,
      title: "Komunikasi Transparan",
      description: "Tidak ada kejutan. Kami akan selalu memberi Anda informasi terbaru tentang proses produksi pesanan Anda.",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      title: "Dukungan Penuh",
      description: "Dari pertanyaan pertama hingga produk di tangan Anda, tim kami siap membantu dengan ramah dan responsif.",
    },
  ];

  const galleryImages = [
    "/produk/Jersey Basket Home DBASCOM.png",
    "/produk/Kemeja BPN Kab. Lahat.png",
    "/produk/jaket-bomber-bank-mandiri.png",
    "/produk/T-Shirt Kampung SI.png",
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Hero Section (Banner) */}
      <section className="relative w-full h-[50vh] flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="/banner2.jpg"
          alt="Tentang Kami Banner"
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }} // Slower parallax effect
          priority
        />
        <div className="absolute inset-0 bg-black/70" /> {/* Darker overlay for text readability */}
        <div className="relative z-10 max-w-4xl px-4">
          <AnimatedSection>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
                style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}> {/* Added text shadow */}
              Visi Anda, Dijahit dengan Penuh Gairah.
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-100"
               style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.7)' }}> {/* Added text shadow */}
              Lebih dari sekadar konveksi, kami adalah partner Anda dalam menciptakan identitas.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/banner.jpg"
                  alt="Tim Taaashop sedang bekerja"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Cerita Kami Dimulai dari Anda.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  TaaaShop lahir dari sebuah ide sederhana: setiap orang, setiap tim, dan setiap komunitas berhak memiliki pakaian yang merepresentasikan cerita mereka dengan bangga. Kami melihat ada kebutuhan akan konveksi yang tidak hanya mengejar kuantitas, tetapi juga benar-benar peduli pada kualitas dan detail.
                </p>
                <p className="text-muted-foreground">
                  Berawal dari workshop kecil di Palembang, kami tumbuh bersama kepercayaan para pelanggan. Hasrat kami adalah mengubah ide Anda menjadi apparel yang nyaman, keren, dan penuh makna. Itulah mengapa kami ada di sini.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Janji Kami untuk Anda</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Ini bukan sekadar slogan. Ini adalah komitmen yang kami jalankan dalam setiap pesanan.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {promises.map((promise, index) => (
              <AnimatedSection delay={(index + 1) * 100} key={index}>
                <Card className="bg-gray-50 dark:bg-gray-800 border-transparent h-full hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">{promise.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{promise.title}</h3>
                    <p className="text-muted-foreground text-sm">{promise.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-6xl px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Dari Workshop Kami, untuk Anda</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Setiap produk adalah bukti komitmen kami pada kualitas. Lihat beberapa karya yang telah kami kirimkan ke pelanggan kami.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((src, index) => (
              <AnimatedSection delay={(index + 1) * 100} key={index}>
                <div className="relative aspect-square rounded-lg overflow-hidden group">
                  <Image
                    src={src}
                    alt={`Karya Taaashop ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
           <div className="text-center mt-12">
              <Button asChild variant="outline" className="dark:text-white border-gray-300 dark:border-gray-600">
                  <Link href="/galeri">
                      Lihat Lebih Banyak Karya
                  </Link>
              </Button>
           </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-orange-600 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Mari Mulai Cerita Anda
            </h2>
            <p className="mt-4 text-lg text-orange-100 max-w-2xl mx-auto">
              Siap mengubah ide menjadi kenyataan? Tim kami siap mendengarkan. Hubungi kami untuk konsultasi tanpa biaya.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-orange-600 font-bold hover:bg-gray-100">
                <Link href="/kontak">
                  Hubungi Kami <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}