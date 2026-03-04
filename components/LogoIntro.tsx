"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function LogoIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoNoirRef = useRef<HTMLDivElement>(null);
  const logoBlancRef = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!overlayRef.current) return;

    // Lock scroll on both html and body for cross-browser reliability
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          setRemoved(true);
        },
      });

      const flash = 0.15;

      // Phase 1 (0–0.5s): Black logo scales in on white bg
      if (logoNoirRef.current) {
        tl.fromTo(
          logoNoirRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
          0
        );
      }

      // --- Cycle 1 : blanc → dark ---
      tl.to(overlayRef.current, { backgroundColor: "#1C1917", duration: flash, ease: "power3.inOut" }, 0.7);
      tl.to(logoNoirRef.current, { opacity: 0, duration: flash, ease: "power3.inOut" }, 0.7);
      tl.to(logoBlancRef.current, { opacity: 1, duration: flash, ease: "power3.inOut" }, 0.7);

      // --- Cycle 2 : dark → blanc ---
      tl.to(overlayRef.current, { backgroundColor: "#fff", duration: flash, ease: "power3.inOut" }, 1.0);
      tl.to(logoBlancRef.current, { opacity: 0, duration: flash, ease: "power3.inOut" }, 1.0);
      tl.to(logoNoirRef.current, { opacity: 1, duration: flash, ease: "power3.inOut" }, 1.0);

      // --- Cycle 3 : blanc → ocre (dernier flash) ---
      // Only animate what actually changes: the background color.
      // logoNoir is already at opacity 1, logoBlanc at 0 — no need to re-tween them.
      tl.to(overlayRef.current, { backgroundColor: "#C8962D", duration: flash, ease: "power3.inOut" }, 1.3);

      // --- Disparition seamless ---
      // Logo stays visible inside the overlay. The overlay fades as a unit,
      // crossfading with the hero's identical logo-noir.png underneath.
      // No separate logo fade = no flicker gap.
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      }, 1.7);
    });

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  if (removed) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        willChange: "opacity",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "relative",
          width: "clamp(100px, 18vw, 180px)",
          aspectRatio: "1",
        }}
      >
        <div
          ref={logoNoirRef}
          style={{ position: "absolute", inset: 0, opacity: 0 }}
        >
          <Image
            src="/images/logo/logo-noir.png"
            alt=""
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <div
          ref={logoBlancRef}
          style={{ position: "absolute", inset: 0, opacity: 0 }}
        >
          <Image
            src="/images/logo/logo-blanc.png"
            alt=""
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
    </div>
  );
}
