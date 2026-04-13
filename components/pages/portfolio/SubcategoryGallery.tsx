"use client";

import { useState } from "react";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";
import type { PortfolioProject } from "@/data/portfolio-projects";

interface SubcategoryGalleryProps {
  projects: PortfolioProject[];
}

export default function SubcategoryGallery({ projects }: SubcategoryGalleryProps) {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  return (
    <>
      <div className="masonry-grid">
        {projects.map((project) => (
          <GalleryCard
            key={project.id}
            project={project}
            onClick={() => setActiveProject(project)}
          />
        ))}
      </div>

      {activeProject && (
        <Lightbox
          project={activeProject}
          initialIndex={activeProject.cover}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
