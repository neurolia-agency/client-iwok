# Brief T07 : Page catalogue produits (Shop)

## Contexte
Le client veut ajouter une page "Shop" pour vendre des produits derives (toiles, prints, stickers, etc.). Ce n'est pas un e-commerce complet — pas de panier, pas de paiement en ligne. Les produits sont affiches avec un CTA "Commander" qui redirige vers le formulaire de contact avec le produit pre-selectionne.

## Fichiers a creer
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/app/shop/page.tsx` (page route)
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/pages/shop/ShopContent.tsx` (composant principal)
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/pages/shop/ProductCard.tsx` (carte produit)
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/data/products.ts` (donnees statiques)

## Fichiers a modifier
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/layout/header.tsx` — ajouter "Shop" dans NAV_LINKS
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/layout/mobile-menu.tsx` — ajouter "Shop" dans NAV_LINKS
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/layout/footer.tsx` — ajouter "Shop" dans NAV_LINKS

## Code actuel — NAV_LINKS

### header.tsx (ligne 9-14)
```tsx
const NAV_LINKS = [
  { href: "/portfolio", label: "Réalisations" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];
```

### mobile-menu.tsx (ligne 7-12)
```tsx
const NAV_LINKS = [
  { href: "/portfolio", label: "Réalisations" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];
```

### footer.tsx (ligne 4-10)
```tsx
const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];
```

## Code actuel — Pattern des pages existantes

Toutes les pages suivent le meme pattern : hero sombre + contenu clair. Voir `app/services/page.tsx` :
```tsx
import { Metadata } from "next";
import ServicesContent from "@/components/sections/ServicesContent";
import { getServices } from "@/lib/queries/services";

export const metadata: Metadata = {
  title: "Services",
  description: "...",
};

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesContent services={services.length > 0 ? services : undefined} />;
}
```

## Cible
Une page `/shop` avec un hero sombre, une grille de produits sur fond clair, et un CTA vers le contact.

## Instructions d'implementation

### Etape 1 : Creer data/products.ts

```tsx
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string; // Ex: "A partir de 120€", "Sur devis"
  image: string; // Chemin vers l'image
  imageAlt: string;
  category: "toile" | "print" | "sticker" | "custom";
}

export const PRODUCTS: Product[] = [
  {
    id: "toile-portrait-custom",
    name: "Toile Portrait Sur Mesure",
    description: "Portrait peint a la main sur toile, d'apres photo ou commande. Format au choix.",
    price: "A partir de 250€",
    image: "/images/section-grid-animate/african-wife.webp",
    imageAlt: "Portrait sur toile — style muraliste",
    category: "toile",
  },
  {
    id: "toile-pop-art",
    name: "Toile Pop Art",
    description: "Oeuvre originale style pop art sur toile. Couleurs vibrantes, formats varies.",
    price: "A partir de 180€",
    image: "/images/section-grid-animate/wine.webp",
    imageAlt: "Toile pop art — style muraliste",
    category: "toile",
  },
  {
    id: "print-limited",
    name: "Print Edition Limitee",
    description: "Reproduction numerotee et signee sur papier fine art. Tirage limite a 50 exemplaires.",
    price: "A partir de 45€",
    image: "/images/selection-gui-on-scope/08122021-2.webp",
    imageAlt: "Print edition limitee — reproduction d'oeuvre",
    category: "print",
  },
  {
    id: "sticker-pack",
    name: "Pack Stickers IWOK",
    description: "Lot de 5 stickers vinyle haute qualite. Designs exclusifs inspires des fresques.",
    price: "15€",
    image: "/images/section-grid-animate/kerea.webp",
    imageAlt: "Pack stickers IWOK — designs exclusifs",
    category: "sticker",
  },
  {
    id: "fresque-miniature",
    name: "Fresque Miniature",
    description: "Mini fresque peinte a la main sur panneau bois (30x40cm). Piece unique.",
    price: "A partir de 120€",
    image: "/images/section-grid-animate/fire.webp",
    imageAlt: "Fresque miniature sur panneau bois",
    category: "custom",
  },
  {
    id: "commande-speciale",
    name: "Commande Speciale",
    description: "Un projet unique ? Toile grand format, support atypique, objet personnalise. Tout est possible.",
    price: "Sur devis",
    image: "/images/section-grid-animate/beer-cow.webp",
    imageAlt: "Commande speciale — projet sur mesure",
    category: "custom",
  },
];
```

### Etape 2 : Creer ProductCard.tsx

Structure de la carte :
- Image en haut (aspect-ratio 4/3, overflow hidden)
- Categorie en badge pill (meme style que les tags services)
- Nom du produit (h3, font-heading)
- Description (font-sans, muted-foreground)
- Prix (font-heading, primary color, gras)
- CTA "Commander" → lien vers `/contact?from=shop&product=[id]`

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const CATEGORY_LABELS: Record<string, string> = {
  toile: "Toile",
  print: "Print",
  sticker: "Sticker",
  custom: "Sur mesure",
};

export default function ProductCard({ product }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        boxShadow: "var(--shadow-subtle)",
        transition: "box-shadow var(--transition-standard), transform var(--transition-standard)",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-hover)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-subtle)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden" }}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          style={{
            objectFit: "cover",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.5s ease, transform 0.7s ease",
          }}
        />
      </div>

      {/* Content */}
      <div style={{
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        flex: 1,
      }}>
        {/* Category badge */}
        <span style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          padding: "0.25rem 0.75rem",
          borderRadius: "var(--radius-pill)",
          backgroundColor: "var(--primary-pale)",
          color: "var(--primary-dark)",
          fontFamily: "var(--font-sans)",
          fontSize: "0.625rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}>
          {CATEGORY_LABELS[product.category] || product.category}
        </span>

        {/* Name */}
        <h3 style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--font-size-h5)",
          fontWeight: 600,
          color: "var(--foreground-heading)",
          margin: 0,
          lineHeight: 1.2,
          letterSpacing: "var(--letter-spacing-tight)",
        }}>
          {product.name}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--font-size-body)",
          lineHeight: "var(--line-height-relaxed)",
          color: "var(--muted-foreground)",
          margin: 0,
          maxWidth: "none",
          flex: 1,
        }}>
          {product.description}
        </p>

        {/* Price + CTA */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--border)",
        }}>
          <span style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--font-size-body-lg)",
            fontWeight: 700,
            color: "var(--primary)",
          }}>
            {product.price}
          </span>
          <Link
            href={`/contact?from=shop&product=${product.id}`}
            className="cta-primary cta-primary--sm"
          >
            Commander
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### Etape 3 : Creer ShopContent.tsx

Structure :
1. Hero sombre (meme pattern que ServicesContent hero)
2. Section produits sur fond clair (grille 3 colonnes desktop, 2 tablette, 1 mobile)
3. CTA final "Commande speciale" vers /contact

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

export default function ShopContent() {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Hero GSAP reveal (meme pattern que ServicesContent)
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const els = heroRef.current!.querySelectorAll(".hero-el");
      gsap.set(els, { opacity: 0, y: 25 });
      gsap.to(els, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.2, ease: "power2.out",
      });
    }, heroRef.current);
    return () => ctx.revert();
  }, []);

  // Grid reveal on scroll
  useEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll(".product-card");
      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.to(cards, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current!, start: "top 70%", once: true },
      });
    }, gridRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="dark-section"
        style={{
          position: "relative",
          minHeight: "clamp(45vh, 50vh, 55vh)",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          paddingTop: "clamp(8rem, 14vh, 12rem)",
          paddingBottom: "clamp(4rem, 7vh, 6rem)",
        }}
      >
        {/* Background image — utiliser une image existante */}
        <Image
          src="/images/selection-gui-on-scope/08122021-2.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
        />

        {/* Dark gradient overlay */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(28,25,23,0.82) 0%, rgba(28,25,23,0.68) 40%, rgba(28,25,23,0.9) 100%)",
          zIndex: 1,
        }} />

        {/* Grain */}
        <div className="grain-overlay" aria-hidden="true" style={{ zIndex: 2 }} />

        {/* Content */}
        <div className="container-custom" style={{ position: "relative", zIndex: 10, width: "100%" }}>
          <p className="hero-el" style={{
            fontFamily: "var(--font-sans)", fontSize: "0.6875rem", fontWeight: 500,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)",
            marginBottom: "1.5rem", maxWidth: "none",
          }}>Boutique</p>
          <h1 className="hero-el" style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(3rem, 8vw + 1rem, 6rem)",
            fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em",
            color: "var(--foreground-on-dark)", marginBottom: "1.5rem",
          }}>Shop</h1>
          <div className="hero-el" aria-hidden="true" style={{
            width: 48, height: 2, backgroundColor: "var(--primary)", marginBottom: "1.25rem",
          }} />
          <p className="hero-el" style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 1.2vw + 0.5rem, 1.1875rem)",
            lineHeight: 1.65, color: "var(--muted-foreground)", maxWidth: "46ch", margin: 0,
          }}>
            Toiles, prints et creations originales. L&apos;art mural s&apos;invite chez vous.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="section-padding" style={{ backgroundColor: "var(--background-alt)" }}>
        <div className="container-custom">
          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: "2rem",
            }}
          >
            {PRODUCTS.map((product) => (
              <div key={product.id} className="product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{
        backgroundColor: "var(--background)",
        paddingBlock: "var(--spacing-section-inner)",
        textAlign: "center",
      }}>
        <div className="container-custom">
          <h2 style={{
            fontFamily: "var(--font-heading)", fontSize: "var(--font-size-h2)",
            fontWeight: 700, lineHeight: 1.1, letterSpacing: "var(--letter-spacing-tight)",
            color: "var(--foreground-heading)", marginBottom: "1rem",
          }}>Un projet sur mesure ?</h2>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "var(--font-size-body-lg)",
            lineHeight: "var(--line-height-relaxed)", color: "var(--muted-foreground)",
            marginBottom: "2.5rem", maxWidth: "40ch", marginInline: "auto",
          }}>
            Toile grand format, support atypique, idee folle — parlons-en.
          </p>
          <Link href="/contact" className="cta-primary">
            Discuter de mon projet
          </Link>
        </div>
      </section>
    </>
  );
}
```

### Etape 4 : Creer app/shop/page.tsx

```tsx
import { Metadata } from "next";
import ShopContent from "@/components/pages/shop/ShopContent";

export const metadata: Metadata = {
  title: "Shop — IWOK | Toiles, prints et creations originales",
  description:
    "Decouvrez les toiles, prints et creations originales de l'artiste muraliste IWOK. Commande sur mesure disponible.",
};

export default function ShopPage() {
  return <ShopContent />;
}
```

### Etape 5 : Ajouter "Shop" dans les navigations

**header.tsx** — Ajouter entre "Services" et "A Propos" :
```tsx
const NAV_LINKS = [
  { href: "/portfolio", label: "Réalisations" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];
```

**mobile-menu.tsx** — Meme ajout :
```tsx
const NAV_LINKS = [
  { href: "/portfolio", label: "Réalisations" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];
```

**footer.tsx** — Meme ajout :
```tsx
const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];
```

## Tokens CSS disponibles
- `--background`, `--background-alt` : fonds des sections
- `--background-dark`, `--foreground-on-dark` : hero sombre
- `--primary`, `--primary-dark`, `--primary-pale` : badges et prix
- `--foreground-heading`, `--muted-foreground` : textes
- `--font-heading`, `--font-sans`, `--font-body` : polices
- `--font-size-h1` a `--font-size-body` : tailles
- `--radius`, `--radius-pill` : bordures arrondies
- `--shadow-subtle`, `--shadow-hover` : ombres des cartes
- `--spacing-section-inner` : padding des sections
- `--container-max`, `--container-padding` : layout
- `--transition-standard`, `--transition-button` : transitions

## Patterns a respecter
- Inline styles avec CSS variables (PAS de classes Tailwind utilitaires, sauf container-custom, section-padding, dark-section, grain-overlay, hero-el, product-card)
- Hero identique aux autres pages (sombre, image background, overlay, grain)
- `.cta-primary` et `.cta-primary--sm` pour les boutons
- GSAP pour les animations (scroll reveal)
- Composant page server (app/shop/page.tsx) + composant client (ShopContent)
- Pas d'image locale pour les produits : reutiliser les images existantes de `public/images/`

## Criteres d'acceptation
- [ ] Page `/shop` accessible et rendue correctement
- [ ] Hero sombre avec eyebrow "Boutique", titre "Shop", sous-titre
- [ ] Grille de 6 produits responsive (3 cols desktop, 2 tablette, 1 mobile)
- [ ] Chaque carte : image, badge categorie, nom, description, prix, CTA "Commander"
- [ ] CTA "Commander" redirige vers `/contact?from=shop&product=[id]`
- [ ] "Shop" ajoute dans header, mobile-menu et footer
- [ ] CTA final "Un projet sur mesure ?" → /contact
- [ ] Animations GSAP (hero reveal, grid scroll reveal)
- [ ] `npm run build` passe sans erreur

## Anti-patterns a eviter
- Ne PAS utiliser de classes Tailwind utilitaires (sauf les utilitaires custom du site)
- Ne PAS creer un systeme de panier ou de paiement
- Ne PAS dupliquer les images — utiliser celles qui existent deja
- Ne PAS oublier d'ajouter "Shop" dans les TROIS fichiers de navigation
