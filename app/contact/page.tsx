import { Metadata } from "next";
import ContactContent from "@/components/pages/contact/ContactContent";
import { getContactInfo } from "@/lib/queries/site-contact";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Envie de donner vie à un mur ? Appelez Guillaume ou laissez vos coordonnées. Devis gratuit, réponse sous 24h.",
};

export default async function ContactPage() {
  const contact = await getContactInfo();
  return <ContactContent contact={contact} />;
}
