import { Metadata } from "next";
import AboutContent from "@/components/pages/AboutContent";
import { getAboutChapters, getMetrics } from "@/lib/queries/about";
import { getAboutHeroConfig } from "@/lib/queries/section-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "A propos — GUIHOME | Guillaume Jeanjean, designer mural",
  description:
    "Du graffiti au design mural professionnel. Decouvrez le parcours de Guillaume Jeanjean, artiste muraliste avec plus de 20 ans d'experience en Aveyron et au-dela.",
};

export default async function AboutPage() {
  const [chapters, metrics, heroConfig] = await Promise.all([
    getAboutChapters(),
    getMetrics(),
    getAboutHeroConfig(),
  ]);

  return (
    <AboutContent
      chapters={chapters.length > 0 ? chapters : undefined}
      metrics={metrics.length > 0 ? metrics : undefined}
      heroConfig={heroConfig}
    />
  );
}
