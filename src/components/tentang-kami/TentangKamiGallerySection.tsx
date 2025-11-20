'use client'

import { AnimatedSection } from '@/components/AnimatedSection'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const galleryImages = [
  '/produk/Jersey Basket Home DBASCOM.png',
  '/produk/Kemeja BPN Kab. Lahat.png',
  '/produk/jaket-bomber-bank-mandiri.png',
  '/produk/T-Shirt Kampung SI.png',
]

export function TentangKamiGallerySection() {
  return (
    <section className="py-24 dark:bg-gray-800/50">
      <div className="container mx-auto max-w-6xl px-4">
        
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-orange-600 shadow-sm dark:bg-orange-500/20 dark:text-orange-200 mb-4">
              Galeri Kami
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Dari Workshop Kami, untuk Anda</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Setiap produk adalah bukti komitmen kami pada kualitas. Lihat beberapa karya yang telah kami kirimkan ke pelanggan kami.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((src, index) => (
            <AnimatedSection delay={(index + 1) * 100} key={src}>
              <div className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={src}
                  alt={`Karya Taaashop ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-orange-500 text-orange-600 hover:bg-orange-50 dark:border-orange-400/80 dark:text-orange-200 dark:hover:bg-orange-500/20"
          >
            <Link href="/galeri">Lihat Lebih Banyak Karya</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
