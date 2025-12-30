"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  /** Icon element to display */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Layout variant */
  variant?: "default" | "compact" | "centered";
  /** Additional CSS classes */
  className?: string;
}

const variantStyles = {
  default: {
    card: "transition-shadow duration-300 border shadow-sm hover:shadow-lg h-full flex flex-col bg-card",
    header: "flex flex-row items-center gap-4",
    content: "",
  },
  compact: {
    card: "group relative h-full overflow-hidden border border-orange-100/80 bg-white/95 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_55px_-25px_rgba(251,146,60,0.35)] dark:border-orange-500/25 dark:bg-gray-900/85",
    header: "hidden",
    content: "relative flex h-full justify-center items-center flex-col gap-4 p-7",
  },
  centered: {
    card: "text-center p-6 rounded-xl border border-orange-100/40 dark:border-orange-900/40 shadow-lg bg-white/90 dark:bg-gray-800/80 backdrop-blur transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl",
    header: "hidden",
    content: "flex flex-col items-center gap-4",
  },
};

export function FeatureCard({
  icon,
  title,
  description,
  variant = "default",
  className,
}: FeatureCardProps) {
  const styles = variantStyles[variant];

  if (variant === "default") {
    return (
      <Card className={cn(styles.card, className)}>
        <CardHeader className={styles.header}>
          {icon}
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className={cn(styles.card, className)}>
        <CardContent className={styles.content}>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-600 dark:text-orange-200">
            {icon}
          </div>
          <div className="relative space-y-3 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-200/80">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // centered variant
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.content}>
        <div className="flex items-center justify-center bg-orange-100 dark:bg-orange-900/50 rounded-full p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-600/90 dark:group-hover:bg-orange-500/80 group-hover:shadow-lg">
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default FeatureCard;
