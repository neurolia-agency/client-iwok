"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function LogoIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!overlayRef.current || !logoRef.current) return;

    // Lock scroll during intro
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

      // Logo fades in + subtle scale (0.85 → 1) over 0.9s
      tl.fromTo(
        logoRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
        0
      );

      // Hold for a beat, then fade the whole overlay out
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      }, 1.6);
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
        backgroundColor: "var(--primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        willChange: "opacity",
      }}
      aria-hidden="true"
    >
      <div
        ref={logoRef}
        style={{
          position: "relative",
          width: "clamp(100px, 18vw, 180px)",
          aspectRatio: "1",
          opacity: 0,
        }}
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
  );
}
