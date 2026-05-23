import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps, ProductData, PortfolioData, NewsData, MaterialData, FAQData, TestimonialData } from '@/types';

// Home Feature Components
import Hero from '@/Components/features/home/Hero';
import HowToOrder from '@/Components/features/home/HowToOrder';
import KeyBenefits from '@/Components/features/home/KeyBenefits';
import MaterialShowcase from '@/Components/features/home/MaterialShowcase';
import FeaturedProducts from '@/Components/features/home/FeaturedProducts';
import PortfolioShowcase from '@/Components/features/home/PortfolioShowcase';
import Testimonials from '@/Components/features/home/Testimonials';
import FAQSection from '@/Components/features/home/FAQSection';
import LatestNews from '@/Components/features/home/LatestNews';
import CTA from '@/Components/features/home/CTA';

interface Props {
    featured_products: ProductData[];
    latest_portfolios: PortfolioData[];
    latest_news: NewsData[];
    materials: MaterialData[];
    faqs: FAQData[];
    testimonials: TestimonialData[];
}

export default function Home({ 
    featured_products, 
    latest_portfolios, 
    latest_news, 
    materials,
    faqs,
    testimonials
}: Props) {
    const { site_settings } = usePage<PageProps>().props;
    const whatsappUrl = `https://wa.me/${site_settings?.contact_whatsapp?.replace(/\D/g, '')}`;

    return (
        <PublicLayout>
            <Head title="Home - Premium Jersey & Sablon" />

            {/* 1. Hero Section */}
            <Hero 
                title={site_settings?.hero_title ?? undefined} 
                description={site_settings?.hero_description ?? undefined} 
                whatsappUrl={whatsappUrl}
                heroImageUrl={site_settings?.hero_image ?? undefined}
            />

            {/* 2. Trust Bar — Key Benefits */}
            <KeyBenefits />

            {/* 3. Featured Products */}
            <FeaturedProducts products={featured_products} />

            {/* 4. Portfolio Highlights */}
            <PortfolioShowcase portfolios={latest_portfolios} />

            {/* 5. Material Showcase */}
            <MaterialShowcase materials={materials} />

            {/* 6. How to Order */}
            <HowToOrder />

            {/* 7. Testimonials */}
            <Testimonials testimonials={testimonials} />

            {/* 8. FAQ Section */}
            <FAQSection faqs={faqs} />

            {/* 9. Latest News */}
            <LatestNews news={latest_news} />

            {/* 10. CTA Section */}
            <CTA whatsappUrl={whatsappUrl} />
            
        </PublicLayout>
    );
}
