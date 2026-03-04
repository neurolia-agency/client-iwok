"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  return { ref, isVisible };
}

export default function CtaContextuel() {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <section
      ref={ref}
      className="dark-section"
      style={{
        padding: "var(--spacing-section-inner) 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="grain-overlay" aria-hidden="true" />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "680px",
          margin: "0 auto",
          padding: "0 var(--container-padding)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-h2)",
            fontWeight: 700,
            color: "var(--foreground-on-dark)",
            fontFamily: "var(--font-heading)",
            letterSpacing: "var(--letter-spacing-tight)",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Un projet similaire en tête ?
        </h2>

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
          }}
        >
          Décrivez votre idée — devis gratuit sous 48h.
        </p>

        <Link
          href="/contact"
          className="cta-primary"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms, color 380ms cubic-bezier(0.16, 1, 0.3, 1), border-color 380ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Demander un devis
        </Link>
      </div>
    </section>
  );
}
