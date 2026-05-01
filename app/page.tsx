import LogoIntro from "@/components/LogoIntro";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import ServicesPreview from "@/components/sections/ServicesPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaFinal from "@/components/sections/CtaFinal";
import { getTestimonials } from "@/lib/queries/testimonials";
import { getHeroConfig, getServicesPreviewConfig, getCtaFinalConfig, getPortfolioPreviewConfig } from "@/lib/queries/section-config";

export const revalidate = 3600;

export default async function HomePage() {
  const [testimonials, heroConfig, servicesPreviewConfig, ctaConfig, portfolioPreviewConfig] = await Promise.all([
    getTestimonials(),
    getHeroConfig(),
    getServicesPreviewConfig(),
    getCtaFinalConfig(),
    getPortfolioPreviewConfig(),
  ]);

  return (
    <>
      <LogoIntro />
      <HeroSection config={heroConfig} />
      <PortfolioPreview config={portfolioPreviewConfig} />
      <ServicesPreview config={servicesPreviewConfig} />
      <TestimonialsSection testimonials={testimonials.length > 0 ? testimonials : undefined} />
      <CtaFinal config={ctaConfig} />
    </>
  );
}
