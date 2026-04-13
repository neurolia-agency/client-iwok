"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function LogoIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoNoirRef = useRef<HTMLDivElement>(null);
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

      // Phase 1 (0–0.8s): Black logo scales in + fades in on ocre bg
      if (logoNoirRef.current) {
        tl.fromTo(
          logoNoirRef.current,
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
          0
        );
      }

      // Phase 2 (1.2s): Overlay fades out after a short pause
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }, 1.2);
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
        backgroundColor: "#C8962D",
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
      </div>
    </div>
  );
}
