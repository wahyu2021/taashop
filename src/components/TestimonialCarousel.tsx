"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Kualitas sablonnya sangat bagus dan tahan lama. Proses pengerjaan juga cepat dan sesuai jadwal. Sangat direkomendasikan!",
    name: "Andi P.",
    title: "Owner Kedai Kopi 'Kopi Kita'",
  },
  {
    quote: "Seragam kantor kami terlihat sangat profesional dan nyaman dipakai. Desainnya persis seperti yang kami inginkan. Terima kasih TaaShop!",
    name: "Budi S.",
    title: "Manajer HRD PT. Maju Jaya",
  },
  {
    quote: "Jersey tim futsal kami keren banget! Bahan adem dan desain full printingnya detail. Tim jadi makin semangat bertanding.",
    name: "Citra D.",
    title: "Kapten Tim Futsal 'Garuda Muda'",
  },
  {
    quote: "Pesan hoodie untuk komunitas di sini, hasilnya memuaskan. Bahannya tebal tapi tidak panas, bordirannya juga rapi.",
    name: "Rian H.",
    title: "Ketua Komunitas 'Motor Klasik'",
  },
  {
    quote: "Pelayanannya ramah dan sangat membantu dalam proses pemilihan bahan dan desain. Hasilnya di luar ekspektasi, bagus banget!",
    name: "Sari W.",
    title: "Panitia Acara Kampus",
  },
];

export function TestimonialCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 15    00, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] p-4">
              <Card className="flex flex-col justify-between h-full min-h-[280px] transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="pt-6">
                  <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                  <p className="text-lg italic leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start pt-0">
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}