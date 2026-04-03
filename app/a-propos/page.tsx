import { Metadata } from "next";
import AboutContent from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "A propos — IWOK | Guillaume Jeanjean, designer mural",
  description:
    "Du graffiti au design mural professionnel. Decouvrez le parcours de Guillaume Jeanjean, artiste muraliste avec plus de 15 ans d'experience en Aveyron et au-dela.",
};

export default function AboutPage() {
  return <AboutContent />;
}
