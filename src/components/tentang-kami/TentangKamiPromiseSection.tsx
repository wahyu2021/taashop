'use client'

import { AnimatedSection } from '@/components/AnimatedSection'
import { Card, CardContent } from '@/components/ui/card'
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
        <AnimatedSection>
          <div className="mb-16 space-y-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-orange-600 shadow-sm dark:bg-orange-500/20 dark:text-orange-200">
              Janji Kami
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Empat komitmen yang menjaga kualitas, komunikasi, dan kenyamanan Anda
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-gray-600 dark:text-slate-300">
              Kami berdiri di sisi Anda selama proses produksi berlangsung—menjaga standar bahan, desain, progres, hingga layanan
              purna jual.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((promise, index) => (
              <Card
                key={`${promise.title}-${index}`}
                className="group relative h-full overflow-hidden border border-orange-100/80 bg-white/95 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_55px_-25px_rgba(251,146,60,0.35)] dark:border-orange-500/25 dark:bg-gray-900/85"
              >
                <CardContent className="relative flex h-full justify-center items-center flex-col gap-4 p-7">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-600 dark:text-orange-200">
                    {promise.icon}
                  </div>
                  <div className="relative space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{promise.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-200/80">{promise.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
