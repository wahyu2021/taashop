import { HeroSection } from "@/components/beranda/HeroSection";
import { ServicesSection } from "@/components/beranda/ServicesSection";
import { OrderingProcessSection } from "@/components/beranda/OrderingProcessSection";
import { WhyChooseUsSection } from "@/components/beranda/WhyChooseUsSection";
import { PortfolioSection } from "@/components/beranda/PortfolioSection";
import { CustomerComplimentsSection } from "@/components/beranda/CustomerComplimentsSection";
import { CTASection } from "@/components/beranda/CTASection";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Above the fold - critical */}
      <HeroSection />
      
      {/* Below the fold - use content-visibility for deferred rendering */}
      <div className="section-lazy">
        <ServicesSection />
      </div>
      <div className="section-lazy">
        <OrderingProcessSection />
      </div>
      <div className="section-lazy">
        <WhyChooseUsSection />
      </div>
      <div className="section-lazy">
        <PortfolioSection />
      </div>
      <div className="section-lazy">
        <CustomerComplimentsSection />
      </div>
      <div className="section-lazy">
        <CTASection />
      </div>
    </main>
  );
}
