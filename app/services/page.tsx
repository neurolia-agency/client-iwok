import { Metadata } from "next";
import ServicesContent from "@/components/sections/ServicesContent";
import { getServices } from "@/lib/queries/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fresques murales, design sur mesure, animation événementielle — sur tous les supports, pour tous les projets. Devis gratuit.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return <ServicesContent services={services.length > 0 ? services : undefined} />;
}
