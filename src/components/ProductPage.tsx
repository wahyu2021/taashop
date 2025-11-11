
"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import Image from "next/image";

interface Product {
  imgSrc: string;
  title: string;
  description: string;
}

interface ProductPageProps {
  title: string;
  description: string;
  products: Product[];
}

export function ProductPage({ title, description, products }: ProductPageProps) {
  return (
    <section id={title.toLowerCase().replace(" & ", "-")} className="w-full py-12 md:py-24 lg:py-32 flex justify-center bg-muted/40">
      <div className="w-full max-w-7xl px-4 md:px-6">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{title}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {description}
              </p>
            </div>
          </div>
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-2">
          {products.map((product, index) => (
            <AnimatedSection delay={(index + 1) * 100} key={product.title}>
              <ProductCard {...product} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  imgSrc,
  title,
  description,
}: {
  imgSrc: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg h-96">
      <Image
        src={imgSrc}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
        style={{ objectFit: "cover" }}
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-white/80 mt-1">{description}</p>
      </div>
    </div>
  );
}
