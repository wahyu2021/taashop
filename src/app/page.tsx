import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { OrderingProcessSection } from "@/components/sections/OrderingProcessSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { CustomerComplimentsSection } from "@/components/sections/CustomerComplimentsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ServicesSection />
      <OrderingProcessSection />
      <WhyChooseUsSection />
      <PortfolioSection />
      <CustomerComplimentsSection />
      <CTASection />
    </main>
  );
}
