"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import type { PortfolioProject } from "@/data/portfolio-projects";

interface LightboxProps {
  project: PortfolioProject;
  initialIndex?: number;
  onClose: () => void;
}

export default function Lightbox({ project, initialIndex = 0, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [imgLoaded, setImgLoaded] = useState(false);
  const image = project.images[current];
  const total = project.images.length;
  const hasMultiple = total > 1;

  const goNext = useCallback(() => {
    setImgLoaded(false);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setImgLoaded(false);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — photo ${current + 1} sur ${total}`}
      onClick={onClose}
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
          <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Image container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          key={image.src}
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
            transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </div>

      {/* Navigation arrows */}
      {hasMultiple && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
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
              <path d="M11.5 3.5L5.5 9L11.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
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
              <path d="M6.5 3.5L12.5 9L6.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#fff",
            whiteSpace: "nowrap",
          }}
        >
          {project.title}
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
