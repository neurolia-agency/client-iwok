import LogoIntro from "@/components/LogoIntro";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaFinal from "@/components/sections/CtaFinal";
import { getTestimonials } from "@/lib/queries/testimonials";
import { getHeroConfig, getServicesPreviewConfig, getCtaFinalConfig } from "@/lib/queries/section-config";

export const metadata = {
  title: "IWOK — Fresques murales sur mesure en Occitanie",
  description:
    "Designer mural professionnel, +15 ans d'expérience. Fresques intérieures, extérieures, tous supports. Devis gratuit.",
};

export default async function HomePage() {
  const [testimonials, heroConfig, servicesPreviewConfig, ctaConfig] = await Promise.all([
    getTestimonials(),
    getHeroConfig(),
    getServicesPreviewConfig(),
    getCtaFinalConfig(),
  ]);

  return (
    <>
      <LogoIntro />
      <HeroSection config={heroConfig} />
      <PortfolioPreview />
      <ServicesPreview config={servicesPreviewConfig} />
      <TestimonialsSection testimonials={testimonials.length > 0 ? testimonials : undefined} />
      <CtaFinal config={ctaConfig} />
    </>
  );
}
