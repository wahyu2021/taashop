"use client";

import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface ParallaxBannerProps {
  imageUrl: string;
  alt: string;
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function ParallaxBanner({ 
  imageUrl, 
  alt, 
  children, 
  className,
  strength = 0.5 
}: ParallaxBannerProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // This is a simple CSS-based parallax effect.
  // For a true parallax effect, we would need to use a library or a more complex JS implementation
  // that tracks scroll position. This provides a good-enough subtle effect.
  const style = {
    backgroundImage: `url(${imageUrl})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <section
      ref={ref}
      style={style}
      className={cn("relative w-full overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className={cn(
        "relative z-10 flex h-full items-center justify-center text-center text-white transition-opacity duration-1000",
        inView ? 'opacity-100' : 'opacity-0'
      )}>
        {children}
      </div>
    </section>
  );
}
