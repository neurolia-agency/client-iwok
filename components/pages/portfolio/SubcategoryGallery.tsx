"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import GalleryCard from "./GalleryCard";
import type { PortfolioProject } from "@/data/portfolio-projects";

// Lightbox embarque motion + handlers clavier — chargé à la demande pour
// alléger le bundle initial de la page portfolio.
const Lightbox = dynamic(() => import("./Lightbox"), { ssr: false });

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
          allProjects={projects}
        />
      )}
    </>
  );
}
