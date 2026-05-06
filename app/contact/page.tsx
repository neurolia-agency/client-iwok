import { Metadata } from "next";
import ContactContent from "@/components/pages/contact/ContactContent";
import { getContactInfo } from "@/lib/queries/site-contact";
import { getContactHeroConfig } from "@/lib/queries/section-config";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Envie de donner vie à un mur ? Appelez Guillaume ou laissez vos coordonnées. Devis gratuit, réponse sous 24h.",
};

export default async function ContactPage() {
  const [contact, hero] = await Promise.all([
    getContactInfo(),
    getContactHeroConfig(),
  ]);
  return <ContactContent contact={contact} hero={hero} />;
}
