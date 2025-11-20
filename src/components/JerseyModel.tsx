"use client";

import Image from "next/image";
import { Tag } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type DetailItem = {
  label: string;
  value: string;
};

interface JerseyModelProps {
  title: string;
  imageUrl: string;
  subtitle?: string;
  includes?: string | string[];
  includesLabel?: string;
  printType?: string;
  printTypeLabel?: string;
  detailItems?: DetailItem[];
  minPrice?: number;
  maxPrice?: number;
  priceLabel?: string;
  pricePrefix?: string;
  priceSuffix?: string;
  priceFormatter?: (price: number) => string;
  priceIcon?: ReactNode;
  accentColorClass?: string;
  cardClassName?: string;
  className?: string;
  frontContent?: ReactNode;
  backContent?: ReactNode;
  imageWrapperClassName?: string;
  imageClassName?: string;
  imageAspectRatio?: string;
  imageSizes?: string;
}

const defaultFormatPrice = (price: number) => `Rp${(price / 1000).toFixed(0)}k`;

const JerseyModel = ({
  title,
  imageUrl,
  subtitle,
  includes,
  includesLabel = "Termasuk",
  printType,
  printTypeLabel = "Jenis",
  detailItems,
  minPrice,
  maxPrice,
  priceLabel,
  pricePrefix,
  priceSuffix,
  priceFormatter,
  priceIcon,
  accentColorClass,
  cardClassName,
  className,
  frontContent,
  backContent,
  imageWrapperClassName,
  imageClassName,
  imageAspectRatio = "75%",
  imageSizes = "(max-width: 768px) 80vw, (max-width: 1280px) 33vw, 280px",
}: JerseyModelProps) => {
  const formatPrice = priceFormatter ?? defaultFormatPrice;
  const combinedDetails: DetailItem[] = [];

  if (includes) {
    combinedDetails.push({
      label: includesLabel,
      value: Array.isArray(includes) ? includes.join(", ") : includes,
    });
  }

  if (printType) {
    combinedDetails.push({ label: printTypeLabel, value: printType });
  }

  if (detailItems?.length) {
    combinedDetails.push(...detailItems);
  }

  let priceDisplay: string | null = priceLabel ?? null;

  const hasMin = typeof minPrice === "number";
  const hasMax = typeof maxPrice === "number";

  if (!priceDisplay && (hasMin || hasMax)) {
    if (hasMin && hasMax) {
      priceDisplay = minPrice === maxPrice
        ? formatPrice(minPrice!)
        : `${formatPrice(minPrice!)} - ${formatPrice(maxPrice!)}`;
    } else if (hasMin) {
      priceDisplay = formatPrice(minPrice!);
    } else if (hasMax) {
      priceDisplay = formatPrice(maxPrice!);
    }
  }

  if (priceDisplay) {
    const prefix = pricePrefix ? `${pricePrefix.trim()} ` : "";
    const suffix = priceSuffix ? ` ${priceSuffix.trim()}` : "";
    priceDisplay = `${prefix}${priceDisplay}${suffix}`.trim();
  }

  const accentClass = accentColorClass ?? "text-orange-600 dark:text-orange-500";
  const priceIconNode = priceIcon ? (
    <span className="mr-2 flex items-center">{priceIcon}</span>
  ) : (
    <Tag className={cn("w-5 h-5 mr-2", accentClass)} />
  );

  return (
    <div
      className={cn("w-full group", className)}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full transition-transform duration-700 ease-in-out lg:group-hover:transform-[rotateY(180deg)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="w-full" style={{ backfaceVisibility: "hidden" }}>
          <div
            className={cn(
              "border rounded-xl overflow-hidden shadow-lg flex flex-col bg-white/95 dark:bg-gray-900/70 backdrop-blur",
              cardClassName
            )}
          >
            <div
              className={cn("relative w-full", imageWrapperClassName)}
              style={{ paddingTop: imageAspectRatio }}
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes={imageSizes}
                className={cn("object-contain p-4", imageClassName)}
              />
            </div>
            <div className="p-6 flex flex-col justify-between grow">
              <div className="space-y-2">
                <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {subtitle}
                  </p>
                )}
                {frontContent}
                {combinedDetails.length > 0 && (
                  <dl className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300 lg:hidden">
                    {combinedDetails.map((detail, index) => (
                      <div
                        key={`${detail.label}-${index}`}
                        className="rounded-xl border border-orange-100/60 bg-orange-50/70 px-4 py-3 text-left dark:border-orange-900/40 dark:bg-orange-900/10"
                      >
                        <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300">
                          {detail.label}
                        </dt>
                        <dd className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-100">
                          {detail.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              {priceDisplay && (
                <div className={cn("flex items-center justify-end text-xl font-semibold mt-4", accentClass)}>
                  {priceIconNode}
                  <span>{priceDisplay}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="absolute top-0 left-0 hidden h-full w-full lg:block"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="border rounded-xl overflow-hidden shadow-lg h-full p-6 flex flex-col justify-center items-center bg-gray-100/90 dark:bg-gray-800/80 backdrop-blur">
            {backContent ? (
              backContent
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {subtitle}
                  </p>
                )}
                {combinedDetails.length > 0 && (
                  <dl className="w-full space-y-3 text-center text-sm md:text-base text-gray-800 dark:text-gray-200">
                    {combinedDetails.map((detail, index) => (
                      <div key={`${detail.label}-${index}`} className="space-y-1">
                        <dt className="font-bold text-gray-700 dark:text-gray-100">
                          {detail.label}:
                        </dt>
                        <dd>{detail.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {priceDisplay && (
                  <div className={cn("flex items-center justify-center text-2xl font-semibold mt-6", accentClass)}>
                    {priceIcon ? (
                      <span className="mr-2 flex items-center">{priceIcon}</span>
                    ) : (
                      <Tag className={cn("w-6 h-6 mr-2", accentClass)} />
                    )}
                    <span>{priceDisplay}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JerseyModel;
