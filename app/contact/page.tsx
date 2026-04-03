import { Metadata } from "next";
import ContactContent from "@/components/pages/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Envie de donner vie a un mur ? Appelez Guillaume ou laissez vos coordonnees. Devis gratuit, reponse sous 24h.",
};

export default function ContactPage() {
  return <ContactContent />;
}
