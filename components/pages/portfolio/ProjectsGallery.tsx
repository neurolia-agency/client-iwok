"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import GalleryFilter from "./GalleryFilter";
import type { FeaturedSliderHandle } from "./FeaturedSlider";
import type { FeaturedSlide } from "@/data/portfolio-projects";

const FeaturedSlider = dynamic(() => import("./FeaturedSlider"), { ssr: false });

interface ProjectsGalleryProps {
  slides?: FeaturedSlide[];
}

export default function ProjectsGallery({ slides }: ProjectsGalleryProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<FeaturedSliderHandle>(null);

  const handleFilterChange = useCallback((index: number) => {
    // Update visuel immediat du bouton actif (sans attendre la fin de l'animation du slider)
    setActiveSlide(index);
    sliderRef.current?.goToSlide(index);
  }, []);

  const handleSlideChange = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  return (
    <section aria-label="Galerie de projets">
      <GalleryFilter activeIndex={activeSlide} onChange={handleFilterChange} slides={slides} />

      <div className="container-custom" style={{ paddingBlock: "var(--spacing-group)" }}>
        <FeaturedSlider ref={sliderRef} slides={slides} onSlideChange={handleSlideChange} />
      </div>
    </section>
  );
}
