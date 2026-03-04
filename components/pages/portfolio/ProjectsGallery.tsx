"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import {
  PORTFOLIO_PROJECTS,
  SECTIONS,
  type PortfolioSectionSlug,
} from "@/data/portfolio-projects";
import GalleryFilter from "./GalleryFilter";
import GalleryCard from "./GalleryCard";

const FeaturedSlider = dynamic(() => import("./FeaturedSlider"), { ssr: false });

export default function ProjectsGallery() {
  const [activeSection, setActiveSection] = useState<PortfolioSectionSlug>("projets-a-la-une");

  const section = SECTIONS.find((s) => s.slug === activeSection)!;

  const projects = useMemo(
    () => PORTFOLIO_PROJECTS.filter((p) => p.section === activeSection),
    [activeSection]
  );

  const hasSubcategories = section.subcategories && section.subcategories.length > 0;

  return (
    <section aria-label="Galerie de projets">
      <GalleryFilter active={activeSection} onChange={setActiveSection} />

      <div className="container-custom" style={{ paddingBlock: "var(--spacing-group)" }}>
        {/* Section header */}
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--foreground)",
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {section.title}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--font-size-small)",
              color: "var(--muted-foreground)",
              marginTop: "0.5rem",
              marginBottom: 0,
              maxWidth: "40ch",
            }}
          >
            {section.description}
          </p>
        </div>

        {/* Content */}
        {hasSubcategories ? (
          <FeaturedSlider />
        ) : (
          <>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--font-size-small)",
                color: "var(--muted-foreground)",
                marginBottom: "1rem",
                maxWidth: "none",
              }}
            >
              {projects.length} projet{projects.length > 1 ? "s" : ""}
            </p>
            <div className="masonry-grid">
              {projects.map((project) => (
                <GalleryCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
