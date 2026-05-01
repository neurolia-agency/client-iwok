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

    const restoreScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    // Filet de sécurité : si la timeline GSAP ne se termine jamais (bug,
    // erreur de rendu, prefers-reduced-motion qui court-circuite), on
    // force le démontage après 6s pour ne pas laisser le scroll bloqué.
    const fallback = window.setTimeout(() => {
      restoreScroll();
      setRemoved(true);
    }, 6000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(fallback);
          restoreScroll();
          setRemoved(true);
        },
      });

      tl.fromTo(
        logoRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
        0
      );

      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      }, 1.6);
    });

    return () => {
      window.clearTimeout(fallback);
      restoreScroll();
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
