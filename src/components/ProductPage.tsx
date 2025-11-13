"use client";

import { useState, useRef, MouseEvent } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ParallaxBanner } from "@/components/ParallaxBanner";

interface Product {
  imgSrc: string;
  title: string;
  description: string;
}

interface ProductPageProps {
  title: string;
  description: string;
  products: Product[];
  bannerImageUrl?: string;
}

const PRODUCTS_PER_PAGE = 3;

export function ProductPage({ title, description, products, bannerImageUrl = "/banner.jpg" }: ProductPageProps) {
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_PAGE);

  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + PRODUCTS_PER_PAGE);
  };

  return (
    <>
      <ParallaxBanner
        imageUrl={bannerImageUrl}
        alt={`Banner for ${title}`}
        className="h-[50vh] md:h-[60vh]"
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-center h-full">
          <AnimatedSection className="max-w-3xl text-center mx-auto">
            <h1 
              className="text-5xl md:text-7xl font-extrabold tracking-tighter !leading-tight bg-gradient-to-br from-slate-50 via-slate-200 to-white bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              {title}
            </h1>
            <div className="w-24 h-1.5 bg-primary my-6 rounded-full mx-auto shadow-[0_0_15px_2px] shadow-primary/50" />
            <p className="mt-4 text-lg md:text-xl text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-w-2xl mx-auto">
              {description}
            </p>
          </AnimatedSection>
        </div>
      </ParallaxBanner>
      
      <section 
        id={title.toLowerCase().replace(" & ", "-")} 
        className="w-full py-16 md:py-24 lg:py-32 bg-background text-foreground overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 h-full w-full dark:bg-slate-900 bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
          <div className="absolute left-0 top-0 h-1/3 w-1/3 bg-gradient-to-br from-primary to-transparent blur-3xl"></div>
          <div className="absolute right-0 bottom-0 h-1/2 w-1/2 bg-gradient-to-tl from-primary/50 to-transparent blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid gap-24 md:gap-32">
            {products.slice(0, visibleProducts).map((product, index) => (
              <AnimatedSection delay={(index % PRODUCTS_PER_PAGE) * 150} key={product.title}>
                <ProductCard {...product} isReversed={index % 2 !== 0} />
              </AnimatedSection>
            ))}
          </div>

          {visibleProducts < products.length && (
            <AnimatedSection delay={100}>
              <div className="flex justify-center mt-16 md:mt-24">
                <Button 
                  onClick={loadMoreProducts} 
                  variant="outline" 
                  className="group text-lg font-semibold py-6 px-8 rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
                >
                  Lihat Lebih Banyak
                  <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
                </Button>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}

function ProductCard({
  imgSrc,
  title,
  description,
  isReversed,
}: {
  imgSrc: string;
  title: string;
  description: string;
  isReversed: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);

    const rotateX = y * -8; // Reduced rotation for subtlety
    const rotateY = x * 8;

    card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1500px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative grid grid-cols-1 md:grid-cols-5 items-center gap-6 transition-transform duration-300 ease-out",
        "group"
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Image Container */}
      <div className={cn(
        "relative h-80 md:h-[450px] shadow-2xl rounded-2xl overflow-hidden",
        "md:col-span-3",
        isReversed ? "md:order-2" : ""
      )} style={{ transform: "translateZ(40px)" }}>
        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
        />
      </div>

      {/* Text Content Container */}
      <div className={cn(
        "md:col-span-2 z-10",
        isReversed ? "md:order-1 md:-mr-12" : "md:-ml-12"
      )} style={{ transform: "translateZ(60px)" }}>
        <div className="p-8 rounded-2xl bg-white/50 dark:bg-black/30 backdrop-blur-lg border border-black/10 dark:border-white/10 shadow-lg">
          <h3 className="text-3xl font-bold tracking-tight text-foreground">{title}</h3>
          <p className="text-muted-foreground mt-4 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500">
            {description}
          </p>
          <div className="h-0 opacity-0 transform translate-y-4 group-hover:h-auto group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 mt-4">
            <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
              <Link href="/kontak">
                Pesan Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
