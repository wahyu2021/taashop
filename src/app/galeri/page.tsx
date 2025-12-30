import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamic import for Gallery to reduce initial bundle size
const Gallery = dynamic(() => import("@/components/Gallery"), {
  loading: () => (
    <main className="flex min-h-[50vh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <p className="text-sm text-muted-foreground">Memuat galeri...</p>
      </div>
    </main>
  ),
});

function GalleryFallback() {
  return (
    <main className="flex min-h-[50vh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <p className="text-sm text-muted-foreground">Memuat galeri...</p>
      </div>
    </main>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<GalleryFallback />}>
      <Gallery />
    </Suspense>
  );
}