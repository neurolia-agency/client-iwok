"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Custom hook pour Intersection Observer
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

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}

export default function CtaFinal() {
  const { ref: sectionRef, isVisible } = useRevealOnScroll();

  return (
    <section
      ref={sectionRef}
      className="dark-section full-bleed"
      style={{
        backgroundColor: "var(--background-dark)",
        padding: "var(--spacing-section-inner)",
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
          Racontez-nous votre mur, on lui donne vie
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
          Devis gratuit — Réponse sous 48h
        </p>

        {/* CTA Button */}
        <Link
          href="/contact"
          style={{
            display: "inline-block",
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            fontWeight: "500",
            padding: "1rem 2.5rem",
            borderRadius: "var(--radius)",
            textDecoration: "none",
            transition:
              "background-color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            willChange: "opacity, transform",
            transitionDelay: "300ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary-dark)";
            e.currentTarget.style.boxShadow = "var(--shadow-hover)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Demander un devis
        </Link>
      </div>
    </section>
  );
}
