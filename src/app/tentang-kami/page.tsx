"use client";

import { TentangKamiCTASection } from "@/components/tentang-kami/TentangKamiCTASection";
import { TentangKamiGallerySection } from "@/components/tentang-kami/TentangKamiGallerySection";
import { TentangKamiHero } from "@/components/tentang-kami/TentangKamiHero";
import { TentangKamiPromiseSection } from "@/components/tentang-kami/TentangKamiPromiseSection";
import { TentangKamiStorySection } from "@/components/tentang-kami/TentangKamiStorySection";

export default function TentangKamiPage() {
    return (
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <TentangKamiHero />
            <TentangKamiStorySection />
            <TentangKamiPromiseSection />
            <TentangKamiGallerySection />
            <TentangKamiCTASection />
        </div>
    );
}
