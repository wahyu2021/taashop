"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  /** Optional badge/label displayed above the title */
  badge?: string;
  /** Main section heading */
  title: string;
  /** Supporting description text */
  subtitle?: string;
  /** Text alignment */
  align?: "center" | "left";
  /** Additional CSS classes */
  className?: string;
  /** Whether to wrap with AnimatedSection */
  animated?: boolean;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
  animated = true,
}: SectionHeaderProps) {
  const alignmentClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  const content = (
    <div className={cn("flex flex-col justify-center space-y-4", alignmentClasses, className)}>
      {badge && (
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-orange-600 shadow-sm dark:bg-orange-500/20 dark:text-orange-200 w-fit">
          {badge}
        </span>
      )}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (animated) {
    return <AnimatedSection>{content}</AnimatedSection>;
  }

  return content;
}

export default SectionHeader;
