"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CTASectionProps {
  /** Main heading text */
  title: string;
  /** Supporting description text */
  description: string;
  /** Button label */
  buttonText: string;
  /** Button destination URL */
  buttonHref?: string;
  /** Visual style variant */
  variant?: "default" | "orange" | "gray";
  /** Optional icon to display above the title */
  icon?: React.ReactNode;
  /** Whether to show arrow icon on button */
  showArrow?: boolean;
  /** Additional CSS classes for the section */
  className?: string;
}

const variantStyles = {
  default: {
    section: "bg-muted/40",
    title: "",
    description: "text-muted-foreground",
    button: "",
  },
  orange: {
    section: "bg-orange-600 text-white",
    title: "text-white",
    description: "text-orange-100",
    button: "bg-white text-orange-600 font-bold hover:bg-gray-100",
  },
  gray: {
    section: "bg-white dark:bg-gray-900",
    title: "",
    description: "text-muted-foreground",
    button: "bg-orange-600 hover:bg-orange-700 text-white",
  },
};

export function CTASection({
  title,
  description,
  buttonText,
  buttonHref = "/kontak",
  variant = "default",
  icon,
  showArrow = false,
  className,
}: CTASectionProps) {
  const styles = variantStyles[variant];

  return (
    <section
      className={cn(
        "w-full py-12 md:py-24 lg:py-32 flex justify-center",
        styles.section,
        className
      )}
    >
      <div className="w-full max-w-4xl px-4 md:px-6">
        <div className="grid items-center justify-center gap-4 text-center">
          <AnimatedSection>
            {icon && (
              <div className="flex justify-center mb-4">
                {icon}
              </div>
            )}
            <div className="space-y-3">
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tighter md:text-4xl/tight",
                  styles.title
                )}
              >
                {title}
              </h2>
              <p
                className={cn(
                  "mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed",
                  styles.description
                )}
              >
                {description}
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2 mt-6">
              <Button
                asChild
                size="lg"
                className={cn(
                  "w-full transition-transform hover:scale-105",
                  styles.button
                )}
              >
                <Link href={buttonHref}>
                  {buttonText}
                  {showArrow && <ArrowRight className="ml-2 h-5 w-5" />}
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
