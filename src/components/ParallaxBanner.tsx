"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { AnimationWrapper } from './AnimationWrapper';

interface ParallaxBannerProps {
  imageUrl: string;
  children: ReactNode;
  className?: string;
}

export function ParallaxBanner({ 
  imageUrl, 
  children, 
  className,
}: ParallaxBannerProps) {
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
      style={style}
      className={cn("relative w-full overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-black/60" />
      <AnimationWrapper
        animation="fadeIn"
        className="relative z-10 flex h-full items-center justify-center text-center text-white"
      >
        {children}
      </AnimationWrapper>
    </section>
  );
}
