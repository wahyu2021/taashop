'use client'

import { SectionHeader, ImageGrid } from '@/components/common'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const galleryImages = [
  { src: '/produk/Jersey Basket Home DBASCOM.png', alt: 'Karya Taaashop 1' },
  { src: '/produk/Kemeja BPN Kab. Lahat.png', alt: 'Karya Taaashop 2' },
  { src: '/produk/jaket-bomber-bank-mandiri.png', alt: 'Karya Taaashop 3' },
  { src: '/produk/T-Shirt Kampung SI.png', alt: 'Karya Taaashop 4' },
]

export function TentangKamiGallerySection() {
  return (
    <section className="py-24 dark:bg-gray-800/50">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeader
          badge="Galeri Kami"
          title="Dari Workshop Kami, untuk Anda"
          subtitle="Setiap produk adalah bukti komitmen kami pada kualitas. Lihat beberapa karya yang telah kami kirimkan ke pelanggan kami."
          className="mb-16"
        />
        
        <ImageGrid
          images={galleryImages}
          columns={4}
          aspectRatio="square"
          showOverlay
          animated
        />
        
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

