import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import PositioningSection from "@/components/PositioningSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ToolsSection from "@/components/ToolsSection";
import ComplianceSection from "@/components/ComplianceSection";
import ReviewsSection from "@/components/ReviewsSection";
import CtaSection from "@/components/CtaSection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <PositioningSection />
        <ServicesSection />
        <ProcessSection />
        <ToolsSection />
        <ComplianceSection />
        <ReviewsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
};

export default Index;
