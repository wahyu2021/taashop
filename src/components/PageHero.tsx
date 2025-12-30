"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";

interface CTAButton {
  text: string;
  href: string;
}

interface PageHeroProps {
  /** Main heading text */
  title: string;
  /** Supporting description text */
  subtitle?: string;
  /** Icon to display - can be a ReactNode or LucideIcon component */
  icon?: React.ReactNode | LucideIcon;
  /** Additional CSS classes */
  className?: string;
  /** Background image URL */
  backgroundImage?: string;
  /** Primary CTA button configuration */
  ctaButton?: CTAButton;
  /** Secondary CTA button configuration */
  secondaryButton?: CTAButton;
}

export function PageHero({ 
  title, 
  subtitle, 
  icon, 
  className,
  backgroundImage = "/banner.jpg",
  ctaButton,
  secondaryButton,
}: PageHeroProps) {
  // Check if icon is a LucideIcon component (function) or ReactNode
  const renderIcon = () => {
    if (!icon) return null;
    
    // If it's a function (LucideIcon), instantiate it
    if (typeof icon === "function") {
      const IconComponent = icon as LucideIcon;
      return <IconComponent className="w-8 h-8 text-white" />;
    }
    
    // Otherwise render as ReactNode
    return icon;
  };

  return (
    <section
      className={cn(
        "relative w-full pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden",
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
      
      {/* Dark Overlay with Orange Tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-black/70 to-black/80 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-950/90" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center text-white space-y-6 max-w-5xl mx-auto">
        <AnimatedSection>
          {icon && (
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 rounded-2xl bg-orange-500/20 backdrop-blur-sm border border-orange-400/30">
                {renderIcon()}
              </div>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-white/90 drop-shadow">
              {subtitle}
            </p>
          )}
          
          {/* CTA Buttons - only render if at least one is provided */}
          {(ctaButton || secondaryButton) && (
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              {ctaButton && (
                <Link
                  href={ctaButton.href}
                  className="group flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition shadow-lg hover:shadow-xl"
                >
                  {ctaButton.text}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {secondaryButton && (
                <Link
                  href={secondaryButton.href}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur px-6 sm:px-7 py-3 rounded-full border border-white/30 text-base sm:text-lg font-semibold transition"
                >
                  {secondaryButton.text}
                </Link>
              )}
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
