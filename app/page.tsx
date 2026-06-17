import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import SocialProof from "@/components/home/SocialProof";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUs from "@/components/home/WhyUs";
import ProcessSection from "@/components/home/ProcessSection";
import UrgenceSection from "@/components/home/UrgenceSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTABanner from "@/components/home/CTABanner";
import PartnersSection from "@/components/home/PartnersSection";
import DevisTabsSection from "@/components/home/DevisTabsSection";

export const metadata: Metadata = {
  title: "Therklima — Électricité, Plomberie, Chauffage, Climatisation, PAC & Ventilation à Paris",
  description:
    "Therklima, vos experts en électricité, plomberie, chauffage, climatisation, pompe à chaleur et ventilation. Intervention rapide 7j/7 sur Paris et Île-de-France. Devis gratuit.",
};

export default function HomePage() {
  return (
    <>
      {/* dark → white → f8fafc → white → f8fafc → white → dark (break) → f8fafc → white → f8fafc → dark */}
      <HeroSection />        {/* dark gradient */}
      <SocialProof />        {/* white */}
      <PartnersSection />    {/* f8fafc */}
      <ServicesSection />    {/* white */}
      <WhyUs />              {/* f8fafc */}
      <ProcessSection />     {/* white ← fixed */}
      <UrgenceSection />     {/* dark gradient — break visuel */}
      <DevisTabsSection />   {/* f8fafc */}
      <TestimonialsSection />{/* white */}
      <FAQSection />         {/* white ← fixed */}
      <CTABanner />          {/* dark gradient — fin */}
    </>
  );
}
