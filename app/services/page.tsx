import { Metadata } from "next";
import ServicesContent from "@/components/sections/ServicesContent";
import { getServices } from "@/lib/queries/services";
import {
  getServicesHeroConfig,
  getServicesCtaConfig,
} from "@/lib/queries/section-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Plus de 20 ans d'expérience en fresques murales, design sur mesure et animation événementielle, sur tous les supports. Devis gratuit.",
};

export default async function ServicesPage() {
  const [services, heroConfig, ctaConfig] = await Promise.all([
    getServices(),
    getServicesHeroConfig(),
    getServicesCtaConfig(),
  ]);

  return (
    <ServicesContent
      services={services.length > 0 ? services : undefined}
      heroConfig={heroConfig}
      ctaConfig={ctaConfig}
    />
  );
}
