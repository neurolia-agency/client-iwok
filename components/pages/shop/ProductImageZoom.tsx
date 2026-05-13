"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface Props {
  src: string;
  alt: string;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.5;

// ─── Icons ────────────────────────────────────────────────────────────────────

function ZoomInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductImageZoom({ src, alt }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const wasDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const pinchStart = useRef<{ distance: number; zoom: number } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock + slide-in
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    }, 200);
  }, []);

  // ESC + +/- keys
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "+" || e.key === "=") {
        setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
      }
      if (e.key === "-") {
        setZoom((z) => {
          const next = Math.max(MIN_ZOOM, z - ZOOM_STEP);
          if (next <= 1) setOffset({ x: 0, y: 0 });
          return next;
        });
      }
      if (e.key === "0") {
        setZoom(1);
        setOffset({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, handleClose]);

  function handleOpen() {
    setOpen(true);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }

  function handleWheel(e: React.WheelEvent) {
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom((z) => {
      const next = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, z + delta));
      if (next <= 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  }

  function handleImageClick() {
    // Si l'utilisateur a draggé, on ignore le clic
    if (wasDragging.current) {
      wasDragging.current = false;
      return;
    }
    // Toggle zoom 1x ↔ 2.5x
    if (zoom > 1) {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    } else {
      setZoom(2.5);
    }
  }

  function handlePointerDown(e: React.PointerEvent) {
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    wasDragging.current = false;
    if (zoom > 1) {
      (e.target as Element).setPointerCapture(e.pointerId);
      dragging.current = true;
    }
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      wasDragging.current = true;
    }
    setOffset({
      x: dragStart.current.offsetX + dx,
      y: dragStart.current.offsetY + dy,
    });
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!dragging.current) return;
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    dragging.current = false;
  }

  // Pinch-to-zoom — utilise les TouchEvents natifs pour avoir touches[0..1]
  function handleTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStart.current = {
        distance: Math.sqrt(dx * dx + dy * dy),
        zoom,
      };
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchStart.current) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const ratio = distance / pinchStart.current.distance;
      const nextZoom = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, pinchStart.current.zoom * ratio)
      );
      setZoom(nextZoom);
      if (nextZoom <= 1) setOffset({ x: 0, y: 0 });
    }
  }

  function handleTouchEnd() {
    pinchStart.current = null;
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  const modal = open ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image agrandie"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
      }}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15,12,10,0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 220ms ease-out",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "1rem 1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2,
          opacity: visible ? 1 : 0,
          transition: "opacity 220ms ease-out",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fermer"
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.85)",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Image area — clic dans la zone noire autour ferme, clic sur l'image zoome */}
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          touchAction: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          onClick={(e) => {
            e.stopPropagation();
            handleImageClick();
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            maxWidth: "94vw",
            maxHeight: "86vh",
            objectFit: "contain",
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: "center",
            transition: dragging.current ? "none" : "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
            userSelect: "none",
            opacity: visible ? 1 : 0,
            willChange: "transform",
            cursor: zoom > 1 ? (dragging.current ? "grabbing" : "grab") : "zoom-in",
            touchAction: "none",
          }}
        />
      </div>

      {/* Bottom controls */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.25rem",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "0.375rem",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.08)",
          zIndex: 2,
          opacity: visible ? 1 : 0,
          transition: "opacity 220ms ease-out",
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <button
          type="button"
          onClick={() => {
            setZoom((z) => {
              const next = Math.max(MIN_ZOOM, z - ZOOM_STEP);
              if (next <= 1) setOffset({ x: 0, y: 0 });
              return next;
            });
          }}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Dézoomer"
          style={zoomBtnStyle(zoom > MIN_ZOOM)}
        >
          <MinusIcon />
        </button>
        <button
          type="button"
          onClick={() => {
            setZoom(1);
            setOffset({ x: 0, y: 0 });
          }}
          aria-label="Réinitialiser le zoom"
          style={{
            ...zoomBtnStyle(zoom !== 1),
            width: "auto",
            padding: "0 0.75rem",
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            fontWeight: 600,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          type="button"
          onClick={() => {
            setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
          }}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoomer"
          style={zoomBtnStyle(zoom < MAX_ZOOM)}
        >
          <PlusIcon />
        </button>
      </div>

    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Agrandir l'image"
        style={{
          position: "absolute",
          inset: 0,
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "zoom-in",
        }}
      >
        {/* Hint badge */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "0.875rem",
            right: "0.875rem",
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            color: "#fff",
            padding: "0.5rem 0.75rem",
            borderRadius: "999px",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            fontFamily: "var(--font-sans)",
            fontSize: "0.6875rem",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <ZoomInIcon size={12} />
          Agrandir
        </span>
      </button>
      {mounted && createPortal(modal, document.body)}
    </>
  );
}

function zoomBtnStyle(active: boolean): React.CSSProperties {
  return {
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "999px",
    background: "transparent",
    border: "none",
    color: active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
    cursor: active ? "pointer" : "not-allowed",
    transition: "color 0.15s, background 0.15s",
  };
}
