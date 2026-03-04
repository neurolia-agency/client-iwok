"use client";

import { SECTIONS, type PortfolioSectionSlug } from "@/data/portfolio-projects";

interface GalleryFilterProps {
  active: PortfolioSectionSlug;
  onChange: (slug: PortfolioSectionSlug) => void;
}

export default function GalleryFilter({ active, onChange }: GalleryFilterProps) {
  return (
    <nav
      aria-label="Naviguer entre les sections du portfolio"
      style={{
        position: "sticky",
        top: "4.5rem",
        zIndex: 40,
        backgroundColor: "color-mix(in oklch, var(--background) 92%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        padding: "1rem 0",
      }}
    >
      <div
        className="container-custom"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        {SECTIONS.map(({ slug, title }) => {
          const isActive = active === slug;
          return (
            <button
              key={slug}
              onClick={() => onChange(slug)}
              aria-pressed={isActive}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8125rem",
                fontWeight: isActive ? 600 : 400,
                letterSpacing: "0.01em",
                color: isActive
                  ? "var(--primary-foreground)"
                  : "var(--foreground-subtitle)",
                backgroundColor: isActive ? "var(--primary)" : "transparent",
                border: `1px solid ${isActive ? "var(--primary)" : "var(--border)"}`,
                borderRadius: "var(--radius-pill)",
                padding: "0.5rem 1.125rem",
                cursor: "pointer",
                transition:
                  "background-color var(--transition-button), color var(--transition-button), border-color var(--transition-button)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--primary)";
                  e.currentTarget.style.color = "var(--foreground)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--foreground-subtitle)";
                }
              }}
            >
              {title}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
