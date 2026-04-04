import type { Metadata } from "next";
import PortfolioHero from "@/components/pages/portfolio/PortfolioHero";
import ProjectsGallery from "@/components/pages/portfolio/ProjectsGallery";
import CtaContextuel from "@/components/pages/portfolio/CtaContextuel";
import { getFeaturedSlides } from "@/lib/queries/portfolio";

export const metadata: Metadata = {
  title: "Portfolio — IWOK | Fresques murales sur mesure",
  description:
    "Découvrez +100 réalisations de fresques murales : entreprises, collectivités, particuliers, événementiel. 15 ans d'expérience en design mural.",
};

export default async function PortfolioPage() {
  const slides = await getFeaturedSlides();

  return (
    <>
      <PortfolioHero />
      <ProjectsGallery slides={slides.length > 0 ? slides : undefined} />
      <CtaContextuel />
    </>
  );
}
