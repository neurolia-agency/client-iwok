"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-eyebrow]", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
      })
        .from(
          "[data-hero-title]",
          { opacity: 0, y: 30, duration: 0.8 },
          "-=0.3"
        )
        .from(
          "[data-hero-line]",
          { scaleX: 0, duration: 0.6 },
          "-=0.4"
        )
        .from(
          "[data-hero-sub]",
          { opacity: 0, y: 15, duration: 0.5 },
          "-=0.3"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="dark-section"
      style={{
        minHeight: "40vh",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "8rem",
        paddingBottom: "var(--spacing-section-inner-mobile)",
      }}
    >
      {/* Grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "var(--container-padding)",
          width: 1,
          height: "clamp(60px, 12vw, 120px)",
          backgroundColor: "var(--primary)",
          opacity: 0.5,
        }}
      />

      <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <p
          data-hero-eyebrow
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.6875rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--primary)",
            margin: "0 0 1.25rem",
            maxWidth: "none",
          }}
        >
          Portfolio
        </p>

        {/* Title */}
        <h1
          data-hero-title
          style={{
            fontSize: "var(--font-size-h1)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "var(--letter-spacing-tight)",
            color: "var(--foreground-on-dark)",
            margin: "0 0 1.5rem",
            maxWidth: "18ch",
          }}
        >
          Réalisations
        </h1>

        {/* Separator */}
        <div
          data-hero-line
          aria-hidden="true"
          style={{
            width: 48,
            height: 1,
            backgroundColor: "var(--primary)",
            opacity: 0.4,
            marginBottom: "1.25rem",
            transformOrigin: "left",
          }}
        />

        {/* Subtitle */}
        <p
          data-hero-sub
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-body-lg)",
            lineHeight: "var(--line-height-relaxed)",
            color: "var(--muted-foreground)",
            margin: 0,
            maxWidth: "52ch",
          }}
        >
          15 années de savoir-faire.<br />Des centaines de murs réveillés.<br /> Pour les particuliers comme pour les communes, chaque œuvre est une pièce unique.
        </p>
      </div>
    </section>
  );
}
