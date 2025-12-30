"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";

interface BannerSectionProps {
  /** Main heading text */
  title: string;
  /** Supporting description text */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
  /** Background image URL */
  backgroundImage?: string;
}

/**
 * BannerSection - A simpler, cleaner banner for inner pages
 * No icons, just text with elegant styling
 */
export function BannerSection({ 
  title, 
  subtitle, 
  className,
  backgroundImage = "/banner2.jpg",
}: BannerSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-[50vh] flex flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      
      {/* Dark Overlay - Matches HeroSection style */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 text-center text-white">
        <AnimatedSection>
          <div className="flex flex-col items-center space-y-6">
            {/* Accent line */}
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
              {title}
            </h1>
            
            {subtitle && (
              <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-white/90 drop-shadow">
                {subtitle}
              </p>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
