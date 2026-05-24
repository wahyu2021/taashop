import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HeroImageSliderProps {
    heroImageUrl?: string;
}

export default function HeroImageSlider({ heroImageUrl }: HeroImageSliderProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const slideImages = [
        heroImageUrl || '/images/hero-jersey.png',
        '/images/hero-jersey-2.png',
        '/images/hero-jersey-3.png',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % slideImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [slideImages.length]);

    return (
        <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-orange-600/20 blur-3xl rounded-full" />
            
            {/* Slide Images */}
            {slideImages.map((src, index) => (
                <img 
                    key={index}
                    src={src} 
                    alt={`Taaashop Jersey ${index + 1}`} 

                    className={cn(
                        "absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-opacity duration-1000 ease-in-out",
                        currentImageIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                />
            ))}
        </div>
    );
}
