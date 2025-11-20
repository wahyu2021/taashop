import Image from "next/image";
import type { ReactNode } from "react";

import { CheckCircle2, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type MaterialFeature = string | { label: string; description?: string; icon?: ReactNode };

export interface MaterialItem {
  name: string;
  summary?: string;
  description?: string;
  badge?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageAspectRatio?: string;
  features?: MaterialFeature[];
  footnote?: string;
}

interface ProductMaterialShowcaseProps {
  heading: string;
  intro?: string;
  items: MaterialItem[];
  accentColorClass?: string;
  className?: string;
  cardClassName?: string;
}

export function ProductMaterialShowcase({
  heading,
  intro,
  items,
  accentColorClass = "text-orange-600 dark:text-orange-400",
  cardClassName,
  className,
}: ProductMaterialShowcaseProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {heading}
          </h2>
          {intro && (
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {intro}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 mt-12">
          {items.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className={cn(
                "relative group flex flex-col overflow-hidden rounded-2xl border border-orange-100/40 dark:border-orange-900/30 bg-white/90 dark:bg-gray-900/70 shadow-lg backdrop-blur transition-all duration-300",
                "hover:-translate-y-3 hover:shadow-2xl hover:ring-1 hover:ring-orange-200/70 dark:hover:ring-orange-500/40",
                cardClassName,
              )}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-orange-200/50 blur-3xl dark:bg-orange-500/10" />
                <div className="absolute -bottom-14 -left-12 h-48 w-48 rounded-full bg-orange-300/40 blur-3xl dark:bg-orange-500/20" />
              </div>

              {item.badge && (
                <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-orange-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
                  {item.badge}
                </div>
              )}

              {item.imageUrl && (
                <div
                  className="relative w-full"
                  style={{ paddingTop: item.imageAspectRatio ?? "65%" }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt ?? item.name}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1280px) 40vw, 260px"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="relative flex flex-col gap-5 p-6">
                <header className="space-y-4">
                  <div className="flex flex-col items-center sm:items-start gap-3 text-center sm:text-left">
                    {item.summary && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full bg-orange-50/80 px-4 py-1 text-xs font-semibold uppercase tracking-wide shadow-sm dark:bg-orange-900/30",
                          accentColorClass,
                        )}
                      >
                        <Sparkles className={cn("h-3.5 w-3.5", accentColorClass)} />
                        {item.summary}
                      </span>
                    )}
                    <h3 className="text-2xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-orange-700 dark:text-white dark:group-hover:text-orange-200">
                      {item.name}
                    </h3>
                  </div>
                </header>

                {item.description && (
                  <p className="rounded-2xl border border-orange-100/50 bg-white/70 px-4 py-3 text-sm leading-relaxed text-gray-600 shadow-sm transition-colors duration-300 dark:border-orange-900/30 dark:bg-gray-950/30 dark:text-gray-200">
                    {item.description}
                  </p>
                )}

                {item.features && item.features.length > 0 && (
                  <ul className="grid gap-2 text-sm text-gray-700 dark:text-gray-200">
                    {item.features.map((feature, featureIndex) => {
                      if (typeof feature === "string") {
                        return (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3 rounded-2xl border border-orange-100/60 bg-orange-50/60 px-4 py-3 shadow-sm transition-all duration-300 group-hover:border-orange-300 group-hover:bg-orange-50/90 dark:border-orange-900/40 dark:bg-orange-900/20 dark:group-hover:border-orange-500/50"
                          >
                            <span
                              className={cn(
                                "mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-inner dark:bg-gray-950",
                                accentColorClass,
                              )}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </span>
                            <span>{feature}</span>
                          </li>
                        );
                      }

                      return (
                        <li
                          key={featureIndex}
                          className="rounded-2xl border border-orange-100/60 bg-orange-50/60 px-4 py-3 shadow-sm transition-all duration-300 group-hover:border-orange-300 group-hover:bg-orange-50/90 dark:border-orange-900/40 dark:bg-orange-900/20 dark:group-hover:border-orange-500/50"
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={cn(
                                "mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-inner dark:bg-gray-950",
                                accentColorClass,
                              )}
                            >
                              {feature.icon ? (
                                <span className="h-4 w-4">
                                  {feature.icon}
                                </span>
                              ) : (
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              )}
                            </span>
                            <div className="flex flex-col gap-1">
                              <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                {feature.label}
                              </div>
                              {feature.description && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {feature.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {item.footnote && (
                  <p className="mt-auto rounded-full border border-dashed border-orange-200/60 bg-orange-50/40 px-4 py-2 text-xs text-gray-500/90 dark:border-orange-900/40 dark:bg-orange-900/10 dark:text-gray-400/90">
                    {item.footnote}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductMaterialShowcase;
