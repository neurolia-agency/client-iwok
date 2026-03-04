import LogoIntro from "@/components/LogoIntro";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaFinal from "@/components/sections/CtaFinal";

export const metadata = {
  title: "IWOK — Fresques murales sur mesure en Occitanie",
  description:
    "Designer mural professionnel, +15 ans d'expérience. Fresques intérieures, extérieures, tous supports. Devis gratuit.",
};

export default function HomePage() {
  return (
    <>
      <LogoIntro />
      <HeroSection />
      <PortfolioPreview />
      <ServicesPreview />
      <TestimonialsSection />
      <CtaFinal />
    </>
  );
}
