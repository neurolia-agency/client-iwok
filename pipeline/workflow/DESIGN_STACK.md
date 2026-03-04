# Stack Technique

## Frontend

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 15+ | Framework React, App Router |
| React | 19+ | UI Library |
| TypeScript | 5+ | Typage statique |
| Tailwind CSS | 4+ | Styling (directive @theme) |

## Animations

| Technologie | Version | Usage |
|-------------|---------|-------|
| Motion | 12+ | Animations (ex Framer Motion) |
| Lenis | Latest | Smooth scroll |

## Formulaires

| Technologie | Version | Usage |
|-------------|---------|-------|
| react-hook-form | 7+ | Gestion formulaires |
| zod | 3+ | Validation schémas |
| sonner | Latest | Toasts notifications |

## UI Components

| Technologie | Usage |
|-------------|-------|
| Lucide React | Icônes |
| shadcn/ui | Composants (Input, Textarea uniquement) |

## Structure Codebase

```
app/
├── globals.css          # SOURCE UNIQUE design tokens (@theme)
├── layout.tsx           # Root layout (Server Component)
├── page.tsx             # Homepage
├── actions/             # Server Actions
│   └── contact.ts       # Form submission
└── [pages]/             # Pages dynamiques
    ├── services/
    ├── portfolio/
    ├── about/
    └── contact/

components/
├── layout/              # Header, Footer (Server Components)
│   ├── header.tsx
│   ├── mobile-menu.tsx  # Client Component
│   └── footer.tsx
├── sections/            # Sections homepage
│   ├── hero.tsx
│   ├── services-preview.tsx
│   └── ...
├── pages/               # Sections pages secondaires
│   ├── services/
│   ├── portfolio/
│   └── ...
└── ui/                  # Composants réutilisables
    ├── animated-section.tsx  # Client Component
    ├── input.tsx             # shadcn/ui
    └── textarea.tsx          # shadcn/ui
```

## Conventions

### Server vs Client Components

| Type | Usage | Marqueur |
|------|-------|----------|
| Server Component | Contenu statique, SEO | (défaut) |
| Client Component | Interactivité, useState, hooks | `"use client"` |

### Règle de composition

```tsx
// header.tsx (Server Component - pas de "use client")
import MobileMenu from './mobile-menu' // Client Component

export default function Header() {
  return (
    <header>
      <nav className="hidden md:flex">...</nav>
      <MobileMenu /> {/* Client Component pour interactivité */}
    </header>
  )
}
```

### Animations

- **Wrapper pattern** : Utiliser `AnimatedSection` (Client) pour wrapper du contenu Server
- **Type de transition** : `translate` uniquement (pas de scale)
- **Durée** : 300-400ms
- **Easing** : `ease-out`

### CSS

- **Source unique** : `app/globals.css`
- **Format couleurs** : OKLCH
- **Classes** : Tailwind uniquement, pas de CSS custom inline
- **Spacing** : Variables CSS via @theme

## Installation

```bash
# Créer projet Next.js
npx create-next-app@latest [nom-projet] --typescript --tailwind --eslint --app --src-dir=false

# Dépendances
npm install motion lenis react-hook-form @hookform/resolvers zod sonner lucide-react

# shadcn/ui (uniquement Input et Textarea)
npx shadcn@latest init
npx shadcn@latest add input textarea
```

---

*Template Workflow v1.0*
