"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import GalleryFilter from "./GalleryFilter";
import type { FeaturedSliderHandle } from "./FeaturedSlider";

const FeaturedSlider = dynamic(() => import("./FeaturedSlider"), { ssr: false });

export default function ProjectsGallery() {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<FeaturedSliderHandle>(null);

  const handleFilterChange = useCallback((index: number) => {
    sliderRef.current?.goToSlide(index);
  }, []);

  const handleSlideChange = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  return (
    <section aria-label="Galerie de projets">
      <GalleryFilter activeIndex={activeSlide} onChange={handleFilterChange} />

      <div className="container-custom" style={{ paddingBlock: "var(--spacing-group)" }}>
        <FeaturedSlider ref={sliderRef} onSlideChange={handleSlideChange} />
      </div>
    </section>
  );
}
