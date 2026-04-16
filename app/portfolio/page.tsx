import type { Metadata } from "next";
import PortfolioHero from "@/components/pages/portfolio/PortfolioHero";
import ProjectsGallery from "@/components/pages/portfolio/ProjectsGallery";
import CtaContextuel from "@/components/pages/portfolio/CtaContextuel";
import { getPortfolioHeroConfig } from "@/lib/queries/section-config";

export const metadata: Metadata = {
  title: "Portfolio — IWOK | Fresques murales sur mesure",
  description:
    "Découvrez +100 réalisations de fresques murales : entreprises, collectivités, particuliers, événementiel. plus de 20 ans d'expérience en design mural.",
};

export default async function PortfolioPage() {
  const heroConfig = await getPortfolioHeroConfig();

  return (
    <>
      <PortfolioHero config={heroConfig} />
      <ProjectsGallery />
      <CtaContextuel />
    </>
  );
}
