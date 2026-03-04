# Étape B1 : Layout (Header & Footer)

> **Phase B : Design / Vibe Coding** - Début de la construction du site.

## Invocation frontend-design

**OBLIGATOIRE** : Pour chaque composant UI de cette étape, utiliser le skill frontend-design :

```bash
/frontend-design
```

**Workflow vibe coding** :
1. Invoquer `/frontend-design` avec le brief du composant
2. Réviser le résultat visuellement
3. Itérer jusqu'à satisfaction (`/frontend-design` à nouveau si besoin)
4. Passer au composant suivant

---

## Objectif

Créer les composants layout transversaux (Header, Footer) utilisés sur toutes les pages.

## Input

| Fichier | Usage |
|---------|-------|
| `app/globals.css` | Design tokens (source unique) |
| `output/03-sitemap.md` | Navigation (liens menu) + CTA |

## Composants à Créer

### 1. Header

**Fichier** : `components/layout/header.tsx`

**Brief frontend-design** :
```
Créer Header minimaliste (Next.js 15+)

Contexte :
- Navigation : [liens depuis sitemap.md]
- CTA : [texte CTA] → /contact
- Design tokens : app/globals.css

Architecture :
- header.tsx = Server Component (pas de "use client")
- mobile-menu.tsx = Client Component (useState pour toggle)

Consignes :
- Logo texte uniquement "[NOM]" (ou logo si fourni)
- Navigation épurée
- Monochrome, accent au hover
- Mobile : hamburger menu
- Sticky header
- Ref design : [depuis art-direction]

Accessibilité :
- aria-label sur nav
- aria-expanded sur hamburger
- aria-current="page" sur lien actif
- Focus visible

Output :
- components/layout/header.tsx (Server Component)
- components/layout/mobile-menu.tsx (Client Component)
```

### 2. Footer

**Fichier** : `components/layout/footer.tsx`

**Brief frontend-design** :
```
Créer Footer minimaliste (Next.js 15+)

Contexte :
- Liens : même navigation que header
- Contact : [email]
- Tagline : [tagline]

Architecture :
- footer.tsx = Server Component

Consignes :
- 2-4 colonnes
- Whitespace généreux
- Copyright avec année dynamique
- Ref design : [depuis art-direction]

Output : components/layout/footer.tsx
```

### 3. Root Layout

**Fichier** : `app/layout.tsx`

```tsx
import type { Metadata } from 'next'
import { [Font] } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'
import { ThemeProvider } from '@/components/theme-provider'

const font = [Font]({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '[NOM] - [Tagline]',
  description: '[Description]',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="[light/dark]"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Server vs Client Components

| Composant | Type | Raison |
|-----------|------|--------|
| header.tsx | Server | Contenu statique, SEO |
| mobile-menu.tsx | Client | useState pour toggle |
| footer.tsx | Server | Contenu statique |
| layout.tsx | Server | Wrapper structural |

## Output

```
components/layout/
├── header.tsx        (Server Component)
├── mobile-menu.tsx   (Client Component)
└── footer.tsx        (Server Component)

app/
└── layout.tsx        (mise à jour)
```

## Validation

- [ ] Header responsive (desktop + mobile)
- [ ] Mobile menu fonctionnel
- [ ] Footer minimaliste
- [ ] Navigation correcte (liens depuis sitemap)
- [ ] CTA visible dans header
- [ ] Server/Client Components correctement séparés
- [ ] Accessibilité : aria-labels, focus visible
- [ ] Conforme à constraints.md

## Prochaine Étape

→ `stages/05-homepage.md`

---

**Version** : 1.0
**Phase** : B1 (Design / Vibe Coding)
**Dépendances** : A6 (02-Design), A4 (03-Structure)
**Produit pour** : B2 (05-Homepage), B3 (06-Pages)
