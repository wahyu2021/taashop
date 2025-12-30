"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Clean Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Animated Orange Accent Glows */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/15 blur-3xl rounded-full"
        style={{ animation: 'float 8s ease-in-out infinite' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/10 blur-3xl rounded-full"
        style={{ animation: 'float 10s ease-in-out infinite reverse' }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/5 blur-3xl rounded-full"
        style={{ animation: 'pulse-slow 6s ease-in-out infinite' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="text-white space-y-8">
            <AnimatedSection>
              {/* Tagline with shimmer effect */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6"
                style={{ animation: 'shimmer 3s ease-in-out infinite' }}
              >
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                Konveksi Terpercaya Sejak 2018
              </div>
              
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Wujudkan
                <span 
                  className="text-orange-500 inline-block"
                  style={{ animation: 'text-glow 2s ease-in-out infinite alternate' }}
                > Pakaian Impian </span>
                Anda Bersama Kami
              </h1>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl">
                Jersey, kaos, seragam, dan pakaian custom berkualitas tinggi dengan harga yang bersahabat untuk UMKM, komunitas, dan perusahaan.
              </p>
            </AnimatedSection>
            
            {/* Feature List with stagger animation */}
            <AnimatedSection delay={200}>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-slate-300">
                <div className="flex items-center gap-2 group">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:text-white transition-colors duration-300">Minimum 12 pcs</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:text-white transition-colors duration-300">Pengerjaan Cepat</span>
                </div>
                <div className="flex items-center gap-2 group">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:text-white transition-colors duration-300">Gratis Desain</span>
                </div>
              </div>
            </AnimatedSection>
            
            {/* CTA Buttons with enhanced hover */}
            <AnimatedSection delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="group bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105"
                >
                  <Link href="/kontak" className="flex items-center gap-2">
                    <Phone className="w-5 h-5 group-hover:animate-bounce" />
                    Hubungi Kami
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  size="lg" 
                  className="group bg-slate-700 hover:bg-slate-600 border border-slate-500 text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Link href="/galeri" className="flex items-center gap-2">
                    Lihat Portfolio
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Right - Image Showcase */}
          <AnimatedSection delay={200}>
            <div className="relative hidden lg:block">
              {/* Main Image Container with hover effect */}
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700 transition-transform duration-500 hover:scale-[1.02]"
                style={{ animation: 'float-image 6s ease-in-out infinite' }}
              >
                <Image
                  src="/banner.jpg"
                  alt="TaaShop Konveksi - Hasil Produksi"
                  width={600}
                  height={500}
                  className="object-cover w-full h-auto"
                  priority
                />
                {/* Gradient Overlay untuk image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating Stats Card with bounce */}
              <div 
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ animation: 'bounce-subtle 3s ease-in-out infinite' }}
              >
                <div className="text-3xl font-bold text-orange-500">500+</div>
                <div className="text-sm text-slate-600">Pelanggan Puas</div>
              </div>
              
              {/* Floating Badge with pulse */}
              <div 
                className="absolute -top-4 -right-4 bg-orange-500 text-white rounded-xl px-4 py-2 shadow-lg"
                style={{ animation: 'pulse-badge 2s ease-in-out infinite' }}
              >
                <div className="text-sm font-semibold">⭐ Trusted UMKM</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        @keyframes float-image {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.05; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes text-glow {
          0% { text-shadow: 0 0 10px rgba(249, 115, 22, 0.3); }
          100% { text-shadow: 0 0 20px rgba(249, 115, 22, 0.6), 0 0 40px rgba(249, 115, 22, 0.3); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-badge {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
          50% { transform: scale(1.05); box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.3); }
        }
      `}</style>
    </section>
  );
}
