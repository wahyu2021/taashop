'use client'

import { AnimatedSection } from '@/components/AnimatedSection'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function TentangKamiHero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center text-center text-white overflow-hidden">
      <Image
        src="/banner2.jpg"
        alt="Tentang Kami Banner"
        fill
        sizes="100vw"
        className="object-cover object-center"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        priority
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 max-w-4xl px-4">
        <AnimatedSection>
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}
          >
            Visi Anda, Dijahit dengan Penuh Gairah.
          </h1>
          <p
            className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-100"
            style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.7)' }}
          >
            Lebih dari sekadar konveksi, kami adalah partner Anda dalam menciptakan identitas.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
