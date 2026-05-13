"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShopProduct } from "@/lib/queries/shop";

const CATEGORY_LABELS: Record<string, string> = {
  toile: "Toile",
  print: "Print",
  sticker: "Sticker",
  original: "Original",
  custom: "Sur mesure",
  autre: "Autre",
};

export default function ProductCard({ product }: { product: ShopProduct }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      href={`/shop/${product.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        backgroundColor: "var(--background)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        boxShadow: hovered ? "var(--shadow-hover)" : "var(--shadow-subtle)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition:
          "box-shadow var(--transition-standard), transform var(--transition-standard)",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4 / 3",
          overflow: "hidden",
          backgroundColor: "var(--background-alt)",
        }}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            style={{
              objectFit: "cover",
              opacity: imgLoaded ? 1 : 0,
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "opacity 0.5s ease, transform 0.6s ease",
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Image à venir
          </div>
        )}

        {/* Hover overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(28,25,23,0.52)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            Voir l&apos;œuvre →
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          flex: 1,
        }}
      >
        {/* Category badge */}
        <span
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "0.25rem 0.75rem",
            borderRadius: "var(--radius-pill)",
            backgroundColor: "var(--primary-pale)",
            color: "var(--primary-dark)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.625rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {CATEGORY_LABELS[product.category] || product.category}
        </span>

        {/* Name */}
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--font-size-h5)",
            fontWeight: 600,
            color: "var(--foreground-heading)",
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: "var(--letter-spacing-tight)",
          }}
        >
          {product.title}
        </h3>

        {/* Description — 2 lignes max */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-body)",
            lineHeight: "var(--line-height-relaxed)",
            color: "var(--muted-foreground)",
            margin: 0,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        {/* Prix + indicateur */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--font-size-body-lg)",
              fontWeight: 700,
              color: "var(--primary)",
            }}
          >
            {product.priceLabel}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--muted-foreground)",
              letterSpacing: "0.08em",
              transition: "color var(--transition-standard)",
              ...(hovered ? { color: "var(--primary)" } : {}),
            }}
          >
            Commander →
          </span>
        </div>
      </div>
    </Link>
  );
}
