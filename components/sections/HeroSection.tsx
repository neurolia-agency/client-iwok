"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CtaSecondary from "@/components/ui/CtaSecondary";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const darkenOverlayRef = useRef<HTMLDivElement>(null);

  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const baselineRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // part1WordRefs : DU [0], SIMPLE [1], MUR [2]
  const part1WordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // part2WordRefs : À [0], L'ŒUVRE [1]
  const part2WordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // uniqueCharRefs : U N I Q U E . [0..6]
  const uniqueCharRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Refs lignes pour égalisation des largeurs
  const lineL1Ref = useRef<HTMLDivElement>(null); // DU SIMPLE
  const lineL2Ref = useRef<HTMLDivElement>(null); // MUR
  const lineR1Ref = useRef<HTMLDivElement>(null); // À L'ŒUVRE
  const lineR2Ref = useRef<HTMLDivElement>(null); // UNIQUE.

  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const heroBaselineShift = "clamp(0rem, 0.8vh, 0.75rem)";
  const heroBottomSafeSpace = "calc(5.5rem + env(safe-area-inset-bottom))";

  const handleVideoEnded = () => {
    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, { opacity: 1, duration: 1.0, ease: "power2.inOut" });
    }
    if (darkenOverlayRef.current) {
      gsap.to(darkenOverlayRef.current, {
        opacity: 1,
        duration: 1.2,
        delay: 0.8,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollIndicatorVisible(window.scrollY <= 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Égalisation des largeurs : MUR s'adapte à DU SIMPLE, UNIQUE. s'adapte à À L'ŒUVRE
  useLayoutEffect(() => {
    const equalize = () => {
      // Colonne gauche
      if (lineL1Ref.current && lineL2Ref.current) {
        // MUR s'adapte à la largeur totale de "DU SIMPLE"
        lineL2Ref.current.style.fontSize = getComputedStyle(lineL1Ref.current).fontSize;

        const w1 = lineL1Ref.current.getBoundingClientRect().width;
        const w2 = lineL2Ref.current.getBoundingClientRect().width;

        if (w1 > 0 && w2 > 0) {
          const baseSize = parseFloat(getComputedStyle(lineL1Ref.current).fontSize);
          lineL2Ref.current.style.fontSize = `${baseSize * (w1 / w2)}px`;
        }
      }

      // Colonne droite
      if (lineR1Ref.current && lineR2Ref.current) {
        // UNIQUE. s'adapte à la largeur totale de "À L'ŒUVRE"
        lineR2Ref.current.style.fontSize = getComputedStyle(lineR1Ref.current).fontSize;

        const w1 = lineR1Ref.current.getBoundingClientRect().width;
        const w2 = lineR2Ref.current.getBoundingClientRect().width;

        if (w1 > 0 && w2 > 0) {
          const baseSize = parseFloat(getComputedStyle(lineR1Ref.current).fontSize);
          lineR2Ref.current.style.fontSize = `${baseSize * (w1 / w2)}px`;
        }
      }
    };

    equalize();
    window.addEventListener("resize", equalize);
    return () => window.removeEventListener("resize", equalize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop + tablette
      mm.add("(min-width: 640px)", () => {
        const part1Refs = part1WordRefs.current.filter(Boolean);
        const part2Refs = part2WordRefs.current.filter(Boolean);
        const uniqueRefs = uniqueCharRefs.current.filter(Boolean);

        // État initial — skewX = énergie graffiti qui claque
        if (part1Refs.length > 0) gsap.set(part1Refs, { y: "125%", rotate: 5, skewX: -8, visibility: "visible" });
        if (part2Refs.length > 0) gsap.set(part2Refs, { y: "125%", rotate: -5, skewX: 8, visibility: "visible" });
        if (uniqueRefs.length > 0) gsap.set(uniqueRefs, { visibility: "hidden" });

        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, delay: 1.8 });

        // Révélation image
        if (imageWrapperRef.current) {
          tl.fromTo(
            imageWrapperRef.current,
            { clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)", scale: 1.1 },
            { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1, duration: 1.4 },
            0
          );
        }

        // DU SIMPLE MUR — slam avec redressement du skew
        if (part1Refs.length > 0) {
          tl.to(part1Refs, { y: "0%", rotate: 0, skewX: 0, duration: 0.75, stagger: 0.09, ease: "expo.out" }, 1.5);
        }
        // À L'ŒUVRE — même animation, ~1s après
        if (part2Refs.length > 0) {
          tl.to(part2Refs, { y: "0%", rotate: 0, skewX: 0, duration: 0.75, stagger: 0.09, ease: "expo.out" }, 2.5);
        }
        // UNIQUE. — typewriter lettre par lettre, ~1s après
        if (uniqueRefs.length > 0) {
          tl.to(uniqueRefs, { visibility: "visible", duration: 0, stagger: 0.09 }, 3.5);
        }
        // Contenu
        const contentEls = [eyebrowRef.current, baselineRef.current, ctasRef.current].filter(Boolean);
        if (contentEls.length > 0) {
          tl.fromTo(contentEls, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 4.3);
        }
        // Scroll indicator
        if (scrollIndicatorRef.current) {
          tl.fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 4.9);
        }
      });

      // Mobile
      mm.add("(max-width: 639px)", () => {
        const allWordRefs = [...part1WordRefs.current, ...part2WordRefs.current].filter(Boolean);
        const uniqueRefs = uniqueCharRefs.current.filter(Boolean);

        if (allWordRefs.length > 0) gsap.set(allWordRefs, { y: "125%", skewX: -6, visibility: "visible" });
        if (uniqueRefs.length > 0) gsap.set(uniqueRefs, { visibility: "hidden" });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 1.8 });
        if (imageWrapperRef.current) tl.fromTo(imageWrapperRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0);
        if (allWordRefs.length > 0) tl.to(allWordRefs, { y: "0%", skewX: 0, duration: 0.6, stagger: 0.1, ease: "expo.out" }, 0.9);
        if (uniqueRefs.length > 0) tl.to(uniqueRefs, { visibility: "visible", duration: 0, stagger: 0.08 }, 2.4);
        const contentEls = [eyebrowRef.current, baselineRef.current, ctasRef.current].filter(Boolean);
        if (contentEls.length > 0) tl.fromTo(contentEls, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 3.1);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes iwok-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>

      <section
        style={{ position: "relative", minHeight: "100svh", overflow: "hidden", backgroundColor: "#C8962D" }}
        aria-label="Section principale — IWOK Designer mural"
      >
        {/* Logo de fond */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ position: "relative", width: "clamp(100px, 18vw, 180px)", aspectRatio: "1" }}>
            <Image src="/images/logo/logo-noir.png" alt="" fill style={{ objectFit: "contain" }} />
          </div>
        </div>

        {/* Média de fond */}
        <div ref={imageWrapperRef} style={{ position: "absolute", inset: 0, zIndex: 1, willChange: "clip-path, transform" }}>
          <video
            ref={videoRef}
            src="/videos/hero-intro.mp4"
            muted
            autoPlay
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
          />
          <div ref={heroImageRef} style={{ position: "absolute", inset: 0, opacity: 0, zIndex: 1 }}>
            <Image src="/images/hero/hero-main.webp" alt="Fresque murale réalisée par IWOK" fill priority style={{ objectFit: "cover", objectPosition: "center" }} sizes="100vw" />
          </div>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(28,25,23,0.4) 0%, transparent 40%, transparent 60%, rgba(28,25,23,0.8) 100%)", zIndex: 2 }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(28,25,23,0.7) 0%, transparent 40%), linear-gradient(to left, rgba(28,25,23,0.7) 0%, transparent 40%)", zIndex: 2 }} />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(28,25,23,0.4) 100%)", zIndex: 2, mixBlendMode: "multiply" }} />
          <div
            ref={darkenOverlayRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(28,25,23,0.5)",
              zIndex: 3,
              opacity: 0,
              pointerEvents: "none",
            }}
          />
        </div>

        <div className="grain-overlay" aria-hidden="true" style={{ zIndex: 2 }} />

        {/* Contenu principal */}
        <div style={{ position: "absolute", inset: 0, zIndex: 10, padding: "0 var(--container-padding)" }}>
          <div style={{ width: "100%", height: "100%", margin: "0 auto", display: "grid", gridTemplateRows: "minmax(0, 1fr) auto", rowGap: "clamp(1.5rem, 3vh, 2.75rem)", paddingBottom: heroBottomSafeSpace }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 0 }}>
              {/* Eyebrow */}
              <p ref={eyebrowRef} style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "2rem", textAlign: "left", opacity: 0 }}>
                Artiste muraliste
              </p>

              <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--foreground-on-dark)", lineHeight: 1.05, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "18vw", width: "100%" }}>

                {/* Colonne gauche : DU SIMPLE / MUR */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

                  {/* Ligne 1 : DU SIMPLE */}
                  <div
                    ref={lineL1Ref}
                    style={{ display: "flex", columnGap: "0.35em", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.04em", fontSize: "clamp(1.8rem, 4.6vw, 4.2rem)" }}
                  >
                    {["DU", "SIMPLE"].map((word, i) => (
                      <span key={word} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.05em" }}>
                        <span
                          ref={(el) => { part1WordRefs.current[i] = el; }}
                          style={{ display: "inline-block", willChange: "transform", transform: "scaleY(1.15)", transformOrigin: "bottom", visibility: "hidden" }}
                        >{word}</span>
                      </span>
                    ))}
                  </div>

                  {/* Ligne 2 : MUR */}
                  <div
                    ref={lineL2Ref}
                    style={{ display: "inline-flex", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.04em", fontSize: "clamp(1.8rem, 4.6vw, 4.2rem)" }}
                  >
                    <span style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.05em" }}>
                      <span
                        ref={(el) => { part1WordRefs.current[2] = el; }}
                        style={{ display: "inline-block", willChange: "transform", transform: "scaleY(1.15)", transformOrigin: "bottom", visibility: "hidden" }}
                      >MUR</span>
                    </span>
                  </div>
                </div>

                {/* Colonne droite : À L'ŒUVRE / UNIQUE. */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>

                  {/* Ligne 1 : À L'ŒUVRE */}
                  <div
                    ref={lineR1Ref}
                    style={{ display: "flex", columnGap: "0.35em", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.04em", fontSize: "clamp(1.8rem, 4.6vw, 4.2rem)" }}
                  >
                    {["À", "L'ŒUVRE"].map((word, i) => (
                      <span key={word} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.05em" }}>
                        <span
                          ref={(el) => { part2WordRefs.current[i] = el; }}
                          style={{ display: "inline-block", willChange: "transform", transform: "scaleY(1.15)", transformOrigin: "bottom", visibility: "hidden" }}
                        >{word}</span>
                      </span>
                    ))}
                  </div>

                  {/* Ligne 2 : UNIQUE. (typewriter, terracotta) */}
                  <div
                    ref={lineR2Ref}
                    style={{ display: "inline-flex", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.04em", fontSize: "clamp(1.8rem, 4.6vw, 4.2rem)" }}
                  >
                    {"UNIQUE.".split("").map((char, i) => (
                      <span
                        key={i}
                        ref={(el) => { uniqueCharRefs.current[i] = el; }}
                        style={{ display: "inline-block", color: "var(--accent)", visibility: "hidden" }}
                      >{char}</span>
                    ))}
                  </div>
                </div>
              </h1>
            </div>
 
            {/* Baseline + CTAs */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "100%", transform: `translateY(${heroBaselineShift})` }}>
              <div style={{ maxWidth: "var(--container-max)", width: "100%", margin: "0 auto",marginBottom: "2.5em" }}>
                <p ref={baselineRef} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1vw + 0.4rem, 1.1875rem)", lineHeight: "1.7", fontWeight: 300, letterSpacing: "0.01em", color: "var(--muted)", marginBottom: "1.5rem", maxWidth: "48ch", marginInline: "auto", opacity: 0 }}>
                 L&apos;exigence de l&apos;artisan, l&apos;œil de l&apos;artiste.
                </p>
                <div ref={ctasRef} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem", opacity: 0 }}>
                  <Link href="/contact" className="cta-primary">Parler de mon projet</Link>
                  <CtaSecondary href="/portfolio" peekImage="/images/section-grid-animate/fire.jpg">Explorer la galerie <span aria-hidden="true"> →</span></CtaSecondary>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          aria-hidden="true"
          style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: scrollIndicatorVisible ? 1 : 0, transition: "opacity 400ms ease", pointerEvents: "none" }}
        >
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--foreground-subtle)" }}>Découvrir</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: "iwok-bounce 2s ease-in-out infinite", color: "var(--primary)" }}>
            <path d="M8 2L8 18M8 18L2 12M8 18L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>
    </>
  );
}
