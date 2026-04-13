# Brief T01 : Simplifier l'animation d'accueil

## Contexte
L'animation logo au chargement du site fait actuellement une sequence de 3 changements de fond (blanc > noir > blanc > ocre) avec des swaps logo noir/blanc. Le client veut quelque chose de plus simple et plus court : un seul fond ocre, le logo noir qui scale-in, et disparition. L'animation actuelle dure ~2s, la nouvelle doit aussi rester autour de ~2s.

## Fichiers a modifier
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/LogoIntro.tsx` (fichier unique, 127 lignes)

## Code actuel (complet)

```tsx
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
      tl.to(overlayRef.current, { backgroundColor: "#C8962D", duration: flash, ease: "power3.inOut" }, 1.3);

      // --- Disparition seamless ---
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
```

## Cible
Un seul fond ocre (#C8962D = var(--primary)) des le depart. Le logo noir (logo-noir.png) scale-in de 0.7 a 1.0 avec un fade-in. Puis l'overlay disparait avec un fade-out. Pas de swap de logo, pas de changement de background. Duree totale ~2s.

## Instructions d'implementation

1. **Supprimer** `logoBlancRef` et tout le JSX/refs du logo blanc. Plus besoin de `logo-blanc.png` dans ce composant.
2. **Changer** le `backgroundColor` initial de l'overlay de `"#fff"` a `"#C8962D"` (la couleur ocre primaire).
3. **Simplifier la timeline GSAP** :
   - Phase 1 (0s-0.8s) : `logoNoirRef` fromTo `{ scale: 0.7, opacity: 0 }` vers `{ scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }`
   - Phase 2 (1.2s) : petit delai pour que le logo reste visible un instant
   - Phase 3 (1.2s-1.7s) : `overlayRef` fade out `{ opacity: 0, duration: 0.5, ease: "power2.inOut" }`
4. **Garder** : la structure useEffect + useRef + gsap.context, le scroll lock (html+body overflow hidden), le `setRemoved(true)` dans onComplete, le `if (removed) return null`.
5. **Garder** : `position: "fixed"`, `inset: 0`, `zIndex: 9999`, `pointerEvents: "none"`, `willChange: "opacity"`, `aria-hidden="true"`.
6. Le conteneur du logo garde `width: "clamp(100px, 18vw, 180px)"` et `aspectRatio: "1"`. Il n'y a plus qu'un seul enfant (logo noir).
7. Le `logoNoirRef` initial doit avoir `opacity: 0` (l'animation le fait apparaitre).

## Tokens CSS disponibles
- `--primary: oklch(0.69 0.14 75)` (#C8962D) : couleur du fond de l'overlay
- `--background-dark: oklch(0.17 0.01 55)` (#1C1917) : pas utilise ici
- `--easing-standard: cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- `--easing-spring: cubic-bezier(0.16, 1, 0.3, 1)`

## Patterns a respecter
- Inline styles avec CSS variables (PAS de classes Tailwind utilitaires)
- GSAP timeline avec gsap.context() pour le cleanup
- Scroll lock sur html ET body (cross-browser)
- Image Next.js avec `fill` et `objectFit: "contain"`

## Criteres d'acceptation
- [ ] Un seul fond ocre #C8962D, aucun changement de couleur
- [ ] Logo noir scale-in (0.7 > 1.0) + fade-in en ~0.8s
- [ ] Overlay fade-out en ~0.5s apres un court delai
- [ ] Scroll bloque pendant l'animation, debloque a la fin
- [ ] `setRemoved(true)` appele => composant se retire du DOM
- [ ] Aucune reference au logo blanc restante
- [ ] Duree totale ~2s
- [ ] `npm run build` passe sans erreur

## Anti-patterns a eviter
- Ne PAS utiliser de classes Tailwind utilitaires
- Ne PAS garder le logo blanc (logoBlancRef, Image logo-blanc.png)
- Ne PAS garder les cycles de changement de background
- Ne PAS utiliser de clip-path (le brief mentionne "ou fade" — utiliser fade)
