"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";

export interface ImageGridItem {
  src: string;
  alt: string;
}

export interface ImageGridProps {
  /** Array of images to display */
  images: ImageGridItem[];
  /** Number of columns */
  columns?: 2 | 3 | 4 | 6;
  /** Image aspect ratio */
  aspectRatio?: "square" | "video";
  /** Whether to show hover overlay */
  showOverlay?: boolean;
  /** Whether to animate items on scroll */
  animated?: boolean;
  /** Additional CSS classes for the grid container */
  className?: string;
  /** Additional CSS classes for each image container */
  imageClassName?: string;
}

const columnClasses = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
};

export function ImageGrid({
  images,
  columns = 3,
  aspectRatio = "square",
  showOverlay = true,
  animated = true,
  className,
  imageClassName,
}: ImageGridProps) {
  const renderImage = (image: ImageGridItem, index: number) => {
    const imageContent = (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg group",
          aspectClasses[aspectRatio],
          imageClassName
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        {showOverlay && (
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
        )}
      </div>
    );

    if (animated) {
      return (
        <AnimatedSection delay={(index + 1) * 100} key={image.src}>
          {imageContent}
        </AnimatedSection>
      );
    }

    return <div key={image.src}>{imageContent}</div>;
  };

  return (
    <div className={cn("grid gap-4", columnClasses[columns], className)}>
      {images.map((image, index) => renderImage(image, index))}
    </div>
  );
}

export default ImageGrid;
