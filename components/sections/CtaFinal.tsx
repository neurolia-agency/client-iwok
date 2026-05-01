"use client";

import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import type { CtaFinalConfig } from "@/lib/queries/section-config";

interface CtaFinalProps {
  config?: CtaFinalConfig;
}

export default function CtaFinal({ config }: CtaFinalProps) {
  const { ref: sectionRef, isVisible } = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      className="dark-section full-bleed section-padding"
      style={{
        backgroundColor: "var(--background-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "680px",
          margin: "0 auto",
          padding: "0 var(--container-padding)",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: "var(--font-size-h2)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--foreground-on-dark)",
            fontFamily: "var(--font-heading)",
            letterSpacing: "var(--letter-spacing-tight)",
            lineHeight: "1.1",
            marginBottom: "1.5rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 0ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 0ms",
            willChange: "opacity, transform",
          }}
        >
          {config?.title ?? "Racontez-nous votre mur, on lui donne vie"}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "var(--font-size-body-lg)",
            lineHeight: "var(--line-height-relaxed)",
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-sans)",
            marginBottom: "2.5rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 150ms",
            willChange: "opacity, transform",
          }}
        >
          {config?.subtitle ?? "Devis gratuit · Réponse sous 48h"}
        </p>

        {/* CTA Button — utilise la classe standard .cta-primary du site */}
        <Link
          href={config?.ctaHref ?? "/contact"}
          className="cta-primary"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transitionDelay: "300ms",
            willChange: "opacity, transform",
          }}
        >
          {config?.ctaText ?? "Parler de mon projet"}
        </Link>
      </div>
    </section>
  );
}
