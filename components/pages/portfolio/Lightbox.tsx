"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { PortfolioProject } from "@/data/portfolio-projects";

interface LightboxProps {
  project: PortfolioProject;
  initialIndex?: number;
  onClose: () => void;
  /** All projects in the same category, for cross-project navigation */
  allProjects?: PortfolioProject[];
}

/**
 * Flatten all images from a list of projects into a single array,
 * returning both the flat list and the starting index for the given project/image.
 */
function buildFlatImages(
  project: PortfolioProject,
  initialIndex: number,
  allProjects?: PortfolioProject[]
) {
  if (!allProjects || allProjects.length === 0) {
    return {
      images: project.images,
      titles: project.images.map(() => project.title),
      startIndex: initialIndex,
    };
  }

  const images: PortfolioProject["images"] = [];
  const titles: string[] = [];
  let startIndex = 0;

  for (const p of allProjects) {
    if (p.id === project.id) {
      startIndex = images.length + initialIndex;
    }
    for (const img of p.images) {
      images.push(img);
      titles.push(p.title);
    }
  }

  return { images, titles, startIndex };
}

export default function Lightbox({
  project,
  initialIndex = 0,
  onClose,
  allProjects,
}: LightboxProps) {
  const { images, titles, startIndex } = buildFlatImages(
    project,
    initialIndex,
    allProjects
  );

  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const image = images[current];
  const title = titles[current];
  const total = images.length;
  const hasMultiple = total > 1;

  // Swipe tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const isSwiping = useRef(false);

  const goNext = useCallback(() => {
    setImgLoaded(false);
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setImgLoaded(false);
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasMultiple) goNext();
      if (e.key === "ArrowLeft" && hasMultiple) goPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev, hasMultiple]);

  // Touch handlers for swipe
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    isSwiping.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    if (dx > dy && dx > 10) {
      isSwiping.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!hasMultiple) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const elapsed = Date.now() - touchStartTime.current;
      const velocity = Math.abs(dx) / elapsed;

      // Swipe threshold: at least 50px or fast flick
      if (Math.abs(dx) > 50 || (velocity > 0.3 && Math.abs(dx) > 20)) {
        if (dx < 0) {
          goNext();
        } else {
          goPrev();
        }
      }
      isSwiping.current = false;
    },
    [hasMultiple, goNext, goPrev]
  );

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — photo ${current + 1} sur ${total}`}
      onClick={() => {
        // Don't close if user was swiping
        if (!isSwiping.current) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.92)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        touchAction: "pan-y",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        style={{
          position: "absolute",
          top: "clamp(1rem, 3vw, 2rem)",
          right: "clamp(1rem, 3vw, 2rem)",
          zIndex: 110,
          width: "2.75rem",
          height: "2.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50%",
          cursor: "pointer",
          color: "#fff",
          transition: "background 0.2s",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M4 4L14 14M14 4L4 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Image container with AnimatePresence for carousel transitions */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${image.src}-${current}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30, duration: 0.35 },
              opacity: { duration: 0.25 },
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="90vw"
              quality={90}
              onLoad={() => setImgLoaded(true)}
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: "0.25rem",
                opacity: imgLoaded ? 1 : 0,
                transition:
                  "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows — desktop */}
      {hasMultiple && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Photo précédente"
            style={{
              position: "absolute",
              left: "clamp(0.75rem, 2vw, 1.5rem)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 110,
              width: "3rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              cursor: "pointer",
              color: "#fff",
              transition: "background 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11.5 3.5L5.5 9L11.5 14.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Photo suivante"
            style={{
              position: "absolute",
              right: "clamp(0.75rem, 2vw, 1.5rem)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 110,
              width: "3rem",
              height: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%",
              cursor: "pointer",
              color: "#fff",
              transition: "background 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6.5 3.5L12.5 9L6.5 14.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* Bottom info bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          bottom: "clamp(1rem, 3vw, 2rem)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 110,
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          padding: "0.6rem 1.25rem",
          background: "rgba(28,25,23,0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "2rem",
          maxWidth: "90vw",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#fff",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "50vw",
          }}
        >
          {title}
        </span>
        {hasMultiple && (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              color: "var(--primary)",
              fontWeight: 600,
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            {current + 1}/{total}
          </span>
        )}
      </div>
    </div>
  );
}
