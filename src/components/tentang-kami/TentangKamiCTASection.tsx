'use client'

import { AnimatedSection } from '@/components/AnimatedSection'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function TentangKamiCTASection() {
  return (
    <section className="py-24 bg-orange-600 text-white">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Mari Mulai Cerita Anda</h2>
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
  )
}
