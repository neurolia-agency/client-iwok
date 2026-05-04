"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShopProduct } from "@/lib/queries/shop";

interface ProductCardProps {
  product: ShopProduct;
}

const CATEGORY_LABELS: Record<string, string> = {
  toile: "Toile",
  print: "Print",
  sticker: "Sticker",
  original: "Original",
  custom: "Sur mesure",
  autre: "Autre",
};

export default function ProductCard({ product }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        boxShadow: "var(--shadow-subtle)",
        transition:
          "box-shadow var(--transition-standard), transform var(--transition-standard)",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-hover)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-subtle)";
        e.currentTarget.style.transform = "translateY(0)";
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
              transition: "opacity 0.5s ease, transform 0.7s ease",
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

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--font-size-body)",
            lineHeight: "var(--line-height-relaxed)",
            color: "var(--muted-foreground)",
            margin: 0,
            maxWidth: "none",
            flex: 1,
          }}
        >
          {product.description}
        </p>

        {/* Price + CTA */}
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
          <Link
            href={`/contact?from=shop&product=${product.slug}`}
            className="cta-primary cta-primary--sm"
          >
            Commander
          </Link>
        </div>
      </div>
    </div>
  );
}
