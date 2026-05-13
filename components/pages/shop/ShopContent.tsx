"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";
import type { ShopProduct } from "@/lib/queries/shop";
import type {
  PageHeroConfig,
  CtaFinalConfig,
} from "@/lib/queries/section-config";

gsap.registerPlugin(ScrollTrigger);

interface ShopContentProps {
  products: ShopProduct[];
  heroConfig: PageHeroConfig;
  ctaConfig: CtaFinalConfig;
}

export default function ShopContent({
  products,
  heroConfig,
  ctaConfig,
}: ShopContentProps) {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* Hero GSAP reveal (same pattern as ServicesContent) */
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const els = heroRef.current!.querySelectorAll(".hero-el");
      gsap.set(els, { opacity: 0, y: 25 });
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out",
      });
    }, heroRef.current);
    return () => ctx.revert();
  }, []);

  /* Grid reveal on scroll */
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll(".product-card");
      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current!,
          start: "top 70%",
          once: true,
        },
      });
    }, gridRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════
          HERO — Dark, cinematic, left-aligned
          ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="dark-section"
        style={{
          position: "relative",
          minHeight: "clamp(45vh, 50vh, 55vh)",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          paddingTop: "clamp(8rem, 14vh, 12rem)",
          paddingBottom: "clamp(4rem, 7vh, 6rem)",
        }}
      >
        {/* Background image */}
        <Image
          src={heroConfig.backgroundImage || "/images/selection-gui-on-scope/08122021-2.webp"}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
        />

        {/* Dark gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(28,25,23,0.82) 0%, rgba(28,25,23,0.68) 40%, rgba(28,25,23,0.9) 100%)",
            zIndex: 1,
          }}
        />

        {/* Grain */}
        <div
          className="grain-overlay"
          aria-hidden="true"
          style={{ zIndex: 2 }}
        />

        {/* Content */}
        <div
          className="container-custom"
          style={{ position: "relative", zIndex: 10, width: "100%" }}
        >
          {/* Eyebrow */}
          {heroConfig.eyebrow && (
            <p
              className="hero-el"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--primary)",
                marginBottom: "1.5rem",
                maxWidth: "none",
              }}
            >
              {heroConfig.eyebrow}
            </p>
          )}

          {/* H1 */}
          <h1
            className="hero-el"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3rem, 8vw + 1rem, 6rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "var(--foreground-on-dark)",
              marginBottom: "1.5rem",
            }}
          >
            {heroConfig.title}
          </h1>

          {/* Accent line */}
          <div
            className="hero-el"
            aria-hidden="true"
            style={{
              width: 48,
              height: 2,
              backgroundColor: "var(--primary)",
              marginBottom: "1.25rem",
            }}
          />

          {/* Subtitle */}
          {heroConfig.subtitle && (
            <p
              className="hero-el"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.2vw + 0.5rem, 1.1875rem)",
                lineHeight: 1.65,
                color: "var(--muted-foreground)",
                maxWidth: "46ch",
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {heroConfig.subtitle}
            </p>
          )}

          {/* CTA secondaire — Suivre ma commande */}
          <Link
            href="/shop/suivi"
            className="hero-el"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "2rem",
              padding: "0.625rem 1.125rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "var(--foreground-on-dark)",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "999px",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s, transform 0.15s",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ color: "var(--primary)" }}
            >
              <path d="M16.5 9.4 7.55 4.24" />
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
            <span>Déjà commandé&nbsp;? Suivre ma commande</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ opacity: 0.6 }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCTS GRID
          ═══════════════════════════════════════════════ */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--background-alt)" }}
      >
        <div className="container-custom">
          {products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "clamp(3rem, 8vh, 5rem) 0",
                maxWidth: "44ch",
                marginInline: "auto",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--font-size-body-lg)",
                  color: "var(--muted-foreground)",
                  marginBottom: "1.5rem",
                  lineHeight: "var(--line-height-relaxed)",
                }}
              >
                La boutique se prépare. De nouvelles pièces uniques sont
                en route — toiles, prints, créations originales.
              </p>
              <Link href="/contact" className="cta-primary">
                Commander une pièce sur mesure
              </Link>
            </div>
          ) : (
            <div
              ref={gridRef}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                gap: "2rem",
              }}
            >
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CTA FINAL
          ═══════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "var(--background)",
          paddingBlock: "var(--spacing-section-inner)",
          textAlign: "center",
        }}
      >
        <div className="container-custom">
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-h2)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "var(--letter-spacing-tight)",
              color: "var(--foreground-heading)",
              marginBottom: "1rem",
            }}
          >
            {ctaConfig.title}
          </h2>
          {ctaConfig.subtitle && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--font-size-body-lg)",
                lineHeight: "var(--line-height-relaxed)",
                color: "var(--muted-foreground)",
                marginBottom: "2.5rem",
                maxWidth: "40ch",
                marginInline: "auto",
              }}
            >
              {ctaConfig.subtitle}
            </p>
          )}
          <Link href={ctaConfig.ctaHref} className="cta-primary">
            {ctaConfig.ctaText}
          </Link>
        </div>
      </section>
    </>
  );
}
