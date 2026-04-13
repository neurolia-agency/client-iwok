"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export default function ShopContent() {
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
          src="/images/selection-gui-on-scope/08122021-2.webp"
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
            Boutique
          </p>

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
            Shop
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
          <p
            className="hero-el"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.2vw + 0.5rem, 1.1875rem)",
              lineHeight: 1.65,
              color: "var(--muted-foreground)",
              maxWidth: "46ch",
              margin: 0,
            }}
          >
            Toiles, prints et cr&eacute;ations originales. L&apos;art mural
            s&apos;invite chez vous.
          </p>
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
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: "2rem",
            }}
          >
            {PRODUCTS.map((product) => (
              <div key={product.id} className="product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
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
            Un projet sur mesure ?
          </h2>
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
            Toile grand format, support atypique, id&eacute;e folle — parlons-en.
          </p>
          <Link href="/contact" className="cta-primary">
            Discuter de mon projet
          </Link>
        </div>
      </section>
    </>
  );
}
