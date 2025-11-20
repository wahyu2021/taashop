"use client";

import { AnimationWrapper } from './AnimationWrapper';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, delay }) => {
  return (
    <AnimationWrapper
      className={className}
      animation="fadeInUp"
      delay={delay}
    >
      {children}
    </AnimationWrapper>
  );
};
