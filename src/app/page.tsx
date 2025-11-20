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
