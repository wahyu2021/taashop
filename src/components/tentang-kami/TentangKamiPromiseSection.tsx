'use client'

import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionHeader, FeatureCard } from '@/components/common'
import { Check, MessageCircle, Palette, Users } from 'lucide-react'

const promises = [
  {
    icon: <Check className="w-6 h-6 text-green-500" />,
    title: 'Kualitas Terjamin',
    description:
      'Kami memilih bahan terbaik dan mengawasi setiap jahitan untuk memastikan produk yang Anda terima awet dan nyaman.',
  },
  {
    icon: <Palette className="w-6 h-6 text-blue-500" />,
    title: 'Desain Kolaboratif',
    description:
      'Desain Anda, visi kami. Kami bekerja bersama Anda, memberikan saran, dan melakukan revisi hingga Anda 100% puas.',
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-orange-500" />,
    title: 'Komunikasi Transparan',
    description:
      'Tidak ada kejutan. Kami akan selalu memberi Anda informasi terbaru tentang proses produksi pesanan Anda.',
  },
  {
    icon: <Users className="w-6 h-6 text-purple-500" />,
    title: 'Dukungan Penuh',
    description:
      'Dari pertanyaan pertama hingga produk di tangan Anda, tim kami siap membantu dengan ramah dan responsif.',
  },
]

export function TentangKamiPromiseSection() {
  return (
    <section className="dark:bg-gray-900 py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          badge="Janji Kami"
          title="Empat komitmen yang menjaga kualitas, komunikasi, dan kenyamanan Anda"
          subtitle="Kami berdiri di sisi Anda selama proses produksi berlangsung—menjaga standar bahan, desain, progres, hingga layanan purna jual."
          className="mb-16"
        />

        <AnimatedSection delay={200}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((promise, index) => (
              <FeatureCard
                key={`${promise.title}-${index}`}
                icon={promise.icon}
                title={promise.title}
                description={promise.description}
                variant="compact"
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

