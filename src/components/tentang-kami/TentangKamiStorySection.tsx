'use client'

import { AnimatedSection } from '@/components/AnimatedSection'
import Image from 'next/image'

const storyHighlights = [
  { metric: '200+', label: 'Tim & komunitas mempercayai kami' },
  { metric: '7 thn', label: 'Pengalaman meramu apparel custom' },
  { metric: '98%', label: 'Tingkat kepuasan dan pesanan repeat' },
]

const storyMilestones = [
  {
    year: '2016',
    title: 'Langkah pertama',
    description:
      'Workshop rumahan di Palembang menjadi tempat kami belajar memahami kebutuhan pelanggan satu per satu.',
  },
  {
    year: '2019',
    title: 'Tumbuh bersama komunitas',
    description:
      'Mulai dipercaya sekolah, kampus, dan perusahaan untuk memproduksi apparel dengan standar kualitas yang konsisten.',
  },
  {
    year: '2023',
    title: 'Skala produksi modern',
    description:
      'Investasi pada mesin printing & bordir terkini agar detail desain lebih presisi dan produksi lebih cepat tanpa kompromi.',
  },
]

const storyStageLabels = ['Fondasi', 'Ekspansi', 'Modernisasi']

export function TentangKamiStorySection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative container mx-auto max-w-6xl px-4">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <AnimatedSection className="lg:col-span-5">
            <div className="relative h-full min-h-[26rem] overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl shadow-orange-100/60 dark:border-gray-700/60 dark:bg-gray-900/80 dark:shadow-none">
              <Image
                src="/banner.jpg"
                alt="Tim Taaashop sedang bekerja"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/85 p-5 shadow-lg dark:bg-gray-900/80">
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                  Cerita TaaaShop
                </p>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  Dari workshop kecil hingga dipercaya banyak komunitas dalam waktu kurang dari satu dekade.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200} className="lg:col-span-7">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600 dark:bg-orange-500/15 dark:text-orange-300">
                  Cerita Kami
                </span>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Kami ada untuk menjahit identitas dan cerita Anda.
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  TaaaShop tumbuh dari kebutuhan akan konveksi yang memahami detail dan makna di balik setiap pakaian.
                  Kami percaya apparel bukan sekadar seragam; ia adalah simbol kebanggaan dan kebersamaan.
                </p>
                <p className="text-muted-foreground">
                  Dengan tim kreatif dan produksi yang solid, kami menggabungkan teknologi modern dan sentuhan personal agar setiap
                  produk yang Anda terima menggambarkan jati diri komunitas Anda seutuhnya.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {storyHighlights.map((highlight) => (
                  <div
                    key={highlight.metric}
                    className="rounded-2xl border border-orange-100/70 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-orange-500/15 dark:bg-gray-900/60"
                  >
                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{highlight.metric}</div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{highlight.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-10">
          <div className="rounded-3xl border border-orange-100/60 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-orange-500/10 dark:bg-gray-900/60">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Perjalanan Kami</h3>
                <p className="max-w-xl text-sm text-gray-600 dark:text-gray-300">
                  Jejak langkah yang kami tempuh bersama pelanggan: dari cikal bakal workshop hingga skala produksi modern yang tetap
                  menjaga sentuhan personal.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange-600 shadow-sm dark:border-orange-500/25 dark:bg-orange-500/10 dark:text-orange-300">
                Sejak 2016
              </div>
            </div>

            <div className="relative mt-10">
              <ol className="relative flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-6">
                {storyMilestones.map((milestone, index) => (
                  <li
                    key={milestone.year}
                    className="group relative overflow-hidden rounded-3xl border border-orange-100/70 bg-white/85 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-orange-500/20 dark:bg-gray-900/70"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute -right-12 -top-10 h-28 w-28 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-500/20" />
                    <div className="pointer-events-none absolute -left-16 bottom-[-3rem] h-36 w-36 rounded-full bg-orange-100/60 blur-2xl dark:bg-orange-500/15" />

                    <div className="relative flex flex-col gap-5">
                      <div className="flex items-center gap-4">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-lg font-bold text-white shadow-lg shadow-orange-200/60">
                          {milestone.year}
                        </span>
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-orange-600 dark:bg-orange-500/20 dark:text-orange-200">
                            Fase {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {storyStageLabels[index] ?? 'Pencapaian'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{milestone.title}</h4>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{milestone.description}</p>
                      </div>

                      <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-orange-100/70 dark:bg-orange-500/20">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300"
                          style={{ width: `${((index + 1) / storyMilestones.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
