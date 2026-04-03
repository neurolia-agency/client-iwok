import { Metadata } from "next";
import ServicesContent from "@/components/sections/ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fresques murales, design sur mesure, animation événementielle — sur tous les supports, pour tous les projets. Devis gratuit.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
