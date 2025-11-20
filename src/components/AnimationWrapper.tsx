"use client";

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface AnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInLeft' | 'fadeInRight';
  delay?: number;
  triggerOnce?: boolean;
}

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  className,
  animation = 'fadeInUp',
  delay = 0,
  triggerOnce = true,
}) => {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold: 0.1,
  });

  const animationClasses = {
    fadeIn: `transition-opacity duration-700 ease-out ${inView ? 'opacity-100' : 'opacity-0'}`,
    fadeInUp: `transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`,
    fadeInLeft: `transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`,
    fadeInRight: `transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`,
  };

  return (
    <div
      ref={ref}
      className={cn(className, animationClasses[animation])}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
