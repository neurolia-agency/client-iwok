# Étape B4 : Polish (Animations & Finitions)

> **Phase B : Design / Vibe Coding** - Finalisation visuelle.

## Invocation frontend-design (optionnel)

Pour les ajustements visuels ou micro-interactions :

```bash
/frontend-design
```

Cette étape est plus technique (animations, SEO). Utiliser frontend-design uniquement si des ajustements UI sont nécessaires.

---

## Objectif

Améliorer les détails visuels, animations et UX du site.

## Input

- Tous les composants créés aux étapes B1-B3
- `app/globals.css` (design tokens)
- `output/01.5-art-direction/constraints.md` (règles animations)

## Animations avec Motion

### Pattern Recommandé : useInView

```tsx
"use client"

import { useRef } from 'react'
import { useInView } from 'motion/react'

export function AnimatedSection({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out"
      }}
    >
      {children}
    </section>
  )
}
```

### Scroll Animations (hardware accelerated)

```tsx
"use client"

import { useRef } from 'react'
import { scroll, animate } from 'motion'

export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!ref.current) return

    scroll(
      animate(ref.current, { y: [0, 100] }),
      { target: ref.current }
    )
  }, [])

  return <img ref={ref} src={src} alt={alt} />
}
```

### Stagger Animations

```tsx
"use client"

import { stagger, animate } from 'motion'

function animateCards() {
  animate(
    ".card",
    { opacity: [0, 1], y: [20, 0] },
    { delay: stagger(0.1), duration: 0.4 }
  )
}
```

## Smooth Scroll avec Lenis

```tsx
// components/smooth-scroll-provider.tsx
"use client"

import { ReactLenis } from 'lenis/react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  )
}
```

## SEO

### Metadata par page

```tsx
// app/services/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | [NOM]',
  description: '[Description services]',
  openGraph: {
    title: 'Services | [NOM]',
    description: '[Description]',
    url: '[URL]/services',
  },
}
```

### Structured Data (JSON-LD)

```tsx
// app/layout.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "[NOM]",
      "url": "[URL]",
      "logo": "[URL]/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "[EMAIL]",
        "contactType": "customer service"
      }
    })
  }}
/>
```

## Performance

### Images optimisées

```tsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Lazy loading

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <Skeleton />,
})
```

## Checklist Polish

### Animations
- [ ] Sections apparaissent au scroll (fade-in + translateY)
- [ ] Hover states cohérents (translate, pas scale)
- [ ] Transitions fluides (300-400ms)
- [ ] Pas d'animations excessives

### SEO
- [ ] Metadata sur toutes les pages
- [ ] Open Graph tags
- [ ] Structured data (JSON-LD)
- [ ] Sitemap.xml généré
- [ ] robots.txt configuré

### Performance
- [ ] Images optimisées (next/image)
- [ ] Fonts optimisées (next/font)
- [ ] Lazy loading composants lourds
- [ ] Pas de CLS (Cumulative Layout Shift)

### Accessibilité
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Contrastes suffisants (WCAG AA)
- [ ] Navigation clavier fonctionnelle
- [ ] Skip to content link

### Mobile
- [ ] Touch targets >= 44px
- [ ] Pas de scroll horizontal
- [ ] Forms utilisables sur mobile

## Validation

- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO > 90
- [ ] Conforme à constraints.md

## Prochaine Étape

→ `stages/08-validate.md`

---

**Version** : 1.0
**Phase** : B4 (Design / Vibe Coding)
**Dépendances** : B2 (05-Homepage), B3 (06-Pages)
**Produit pour** : B5 (08-Validate)
