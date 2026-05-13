import { Metadata } from "next";
import Link from "next/link";
import { TrackOrderForm } from "./TrackOrderForm";

export const metadata: Metadata = {
  title: "Suivre ma commande | IWOK",
  description:
    "Suivez l'état d'avancement de votre commande IWOK — paiement, expédition, retrait.",
  robots: { index: false, follow: false },
};

export default function SuiviPage() {
  return (
    <main>
      <div
        className="container-custom"
        style={{
          paddingTop: "clamp(7rem, 12vh, 10rem)",
          paddingBottom: "clamp(4rem, 8vh, 6rem)",
          maxWidth: "560px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "var(--letter-spacing-tight)",
            color: "var(--foreground-heading)",
            marginBottom: "0.75rem",
            lineHeight: 1.1,
          }}
        >
          Suivre ma commande
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-body)",
            color: "var(--muted-foreground)",
            lineHeight: "var(--line-height-relaxed)",
            marginBottom: "2rem",
            maxWidth: "48ch",
          }}
        >
          Saisissez votre adresse e-mail et la référence de votre commande pour consulter son état d&apos;avancement.
        </p>

        <TrackOrderForm />

        <p
          style={{
            marginTop: "1.5rem",
            fontFamily: "var(--font-sans)",
            fontSize: "0.8125rem",
            color: "var(--muted-foreground)",
            lineHeight: 1.65,
            textAlign: "center",
          }}
        >
          Une question&nbsp;?{" "}
          <Link
            href="/contact"
            style={{ color: "var(--primary)", textDecoration: "underline" }}
          >
            Contactez-nous
          </Link>
        </p>
      </div>
    </main>
  );
}
