"use client";

import { NextPage } from "next";
import { BannerSection } from "@/components/BannerSection";
import { AnimatedSection } from "@/components/AnimatedSection";

const ShootingShirtPage: NextPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <BannerSection
        title="Ukuran & Harga Shooting Shirt"
        subtitle="Temukan panduan lengkap ukuran dan daftar harga terbaru untuk semua jenis shooting shirt custom Anda. Desain sesuai keinginan, kualitas terbaik!"
      />

      <main className="container mx-auto px-4 py-16">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Segera Hadir</h2>
            <p className="text-muted-foreground text-lg">
              Halaman ini sedang dalam pengembangan. Hubungi kami untuk informasi lebih lanjut mengenai ukuran dan harga shooting shirt.
            </p>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
};

export default ShootingShirtPage;
