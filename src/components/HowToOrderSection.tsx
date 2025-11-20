import { createElement, isValidElement } from "react";
import type { ElementType, ReactNode } from "react";

import { Package, Send, Shirt, Truck } from "lucide-react";

import { cn } from "@/lib/utils";

export interface HowToOrderStep {
  title: string;
  description: string;
  icon?: ElementType | ReactNode;
}

export interface HowToOrderSectionProps {
  heading?: string;
  description?: string;
  steps?: Partial<HowToOrderStep>[];
  className?: string;
}

const defaultIcons = [Shirt, Send, Package, Truck] as const;

const defaultSteps: HowToOrderStep[] = [
  {
    title: "Pilih Paket",
    description: "Pilih paket yang paling sesuai dengan kebutuhan dari pilihan yang tersedia.",
    icon: defaultIcons[0],
  },
  {
    title: "Kirim Desain",
    description: "Hubungi kami dan kirimkan desain atau konsep yang Anda inginkan.",
    icon: defaultIcons[1],
  },
  {
    title: "Produksi",
    description: "Pesanan Anda akan kami proses dengan cepat dan teliti.",
    icon: defaultIcons[2],
  },
  {
    title: "Pengiriman",
    description: "Hasil akhir siap dikirim ke alamat Anda dengan aman dan tepat waktu.",
    icon: defaultIcons[3],
  },
];

export function HowToOrderSection({
  heading = "Cara Pemesanan Mudah",
  description = "Hanya dengan 4 langkah mudah, Anda bisa mendapatkan produk custom impian untuk tim Anda.",
  steps,
  className,
}: HowToOrderSectionProps) {
  const resolvedSteps = (steps ?? defaultSteps).map((step, index) => {
    const fallback = defaultSteps[index];
    return {
      title: step.title ?? fallback?.title ?? `Langkah ${index + 1}`,
      description: step.description ?? fallback?.description ?? "",
      icon: typeof step.icon !== "undefined" ? step.icon : fallback?.icon,
    } satisfies HowToOrderStep;
  });

  return (
    <section className={cn("container mx-auto px-4", className)}>
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          {heading}
        </h2>
        {description && (
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>

      <div className="relative mt-12">
        <span className="hidden md:block absolute top-1/2 left-[8%] right-[8%] h-px bg-linear-to-r from-transparent via-orange-200 dark:via-orange-900 to-transparent" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {resolvedSteps.map((step, index) => (
            <div
              key={`${step.title}-${index}`}
              className="group relative flex flex-col items-center border border-orange-100/40 dark:border-orange-900/40 rounded-2xl p-6 sm:p-8 shadow-lg bg-white/90 dark:bg-gray-800/80 backdrop-blur transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:ring-2 hover:ring-orange-200/80 dark:hover:ring-orange-500/40 hover:bg-linear-to-br hover:from-white hover:to-orange-50/70 dark:hover:from-gray-800/90 dark:hover:to-orange-900/30"
            >
              <div className="flex items-center justify-center bg-orange-100 dark:bg-orange-900/50 rounded-full p-4 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-600/90 dark:group-hover:bg-orange-500/80 group-hover:shadow-lg">
                {renderStepIcon(step.icon, index)}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                {`${index + 1}. ${step.title}`}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderStepIcon(icon: HowToOrderStep["icon"], index: number) {
  const fallbackIcon = defaultIcons[index % defaultIcons.length] ?? Shirt;
  const iconToRender = icon ?? fallbackIcon;

  if (isValidElement(iconToRender)) {
    return iconToRender;
  }

  const IconComponent = iconToRender as ElementType;

  if (IconComponent) {
    return createElement(IconComponent, {
      className: "w-12 h-12 text-orange-600 dark:text-orange-400 transition-colors duration-300 group-hover:text-white",
    });
  }

  return createElement(Shirt, {
    className: "w-12 h-12 text-orange-600 dark:text-orange-400 transition-colors duration-300 group-hover:text-white",
  });
}

export default HowToOrderSection;
