import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main>
      <div
        className="container-custom"
        style={{
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "clamp(6rem, 12vh, 9rem)",
          paddingBottom: "clamp(3rem, 8vh, 5rem)",
          maxWidth: "640px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: "1.5rem",
          }}
        >
          Erreur 404
        </p>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.25rem, 6vw + 0.5rem, 4rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "var(--letter-spacing-tight)",
            color: "var(--foreground-heading)",
            marginBottom: "1rem",
          }}
        >
          Cette page n&apos;existe pas.
        </h1>

        <div
          aria-hidden="true"
          style={{
            width: 48,
            height: 2,
            backgroundColor: "var(--primary)",
            marginBottom: "1.5rem",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-body)",
            lineHeight: "var(--line-height-relaxed)",
            color: "var(--muted-foreground)",
            marginBottom: "2.5rem",
            maxWidth: "48ch",
          }}
        >
          Le lien que vous avez suivi est peut-être obsolète, ou la page a été déplacée. Retournez à l&apos;accueil pour découvrir le portfolio de Guillaume.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          <Link href="/" className="cta-primary">
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            Contacter Guillaume
          </Link>
        </div>
      </div>
    </main>
  );
}
