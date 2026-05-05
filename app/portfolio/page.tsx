import type { Metadata } from "next";
import PortfolioHero from "@/components/pages/portfolio/PortfolioHero";
import ProjectsGallery from "@/components/pages/portfolio/ProjectsGallery";
import CtaContextuel from "@/components/pages/portfolio/CtaContextuel";
import { getPortfolioHeroConfig } from "@/lib/queries/section-config";
import { getFeaturedSlides } from "@/lib/queries/portfolio";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Portfolio | Fresques murales sur mesure",
  description:
    "Découvrez +100 réalisations de fresques murales : entreprises, collectivités, particuliers, événementiel. plus de 20 ans d'expérience en design mural.",
};

export default async function PortfolioPage() {
  const [heroConfig, featuredSlides] = await Promise.all([
    getPortfolioHeroConfig(),
    getFeaturedSlides(),
  ]);

  return (
    <>
      <PortfolioHero config={heroConfig} />
      <ProjectsGallery slides={featuredSlides.length > 0 ? featuredSlides : undefined} />
      <CtaContextuel />
    </>
  );
}
