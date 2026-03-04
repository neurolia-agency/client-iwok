# Étape A6 : Design System (Tokens CSS)

> **Phase A : Architecture** - Dernière étape avant le code.

## Objectif

Configurer le système de design dans `app/globals.css` en utilisant la directive `@theme` de Tailwind CSS 4 et le format de couleurs **OKLCH**.

**IMPORTANT** : `app/globals.css` est la source unique des tokens CSS.

## Input

- `output/01-brand/colors.md`
- `output/01-brand/typography.md`
- `output/01.5-art-direction/visual-vocabulary.md`
- `output/01.5-art-direction/constraints.md`
- `output/03.5-wireframes/` (pour valider que les tokens couvrent les besoins)

## Instructions

### 1. Lire les fichiers sources

Extraire les valeurs concrètes de :
- `visual-vocabulary.md` → Espacements, transitions, formes
- `colors.md` → Palette en OKLCH
- `typography.md` → Échelle et font

### 2. Configurer app/globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";

/* Dark mode variant (si applicable) */
@custom-variant dark (&:is(.dark *));

/* ============================================
   DESIGN TOKENS - [NOM_PROJET]
   Source: output/01-brand/, output/01.5-art-direction/
   ============================================ */

:root {
  /* ---------- Radius ---------- */
  --radius: 0.5rem;  /* ou 0 selon constraints.md */

  /* ---------- Couleurs Sémantiques ---------- */
  --background: oklch([L] [C] [H]);
  --foreground: oklch([L] [C] [H]);

  --card: oklch([L] [C] [H]);
  --card-foreground: oklch([L] [C] [H]);

  --popover: oklch([L] [C] [H]);
  --popover-foreground: oklch([L] [C] [H]);

  --primary: oklch([L] [C] [H]);
  --primary-foreground: oklch([L] [C] [H]);

  --secondary: oklch([L] [C] [H]);
  --secondary-foreground: oklch([L] [C] [H]);

  --muted: oklch([L] [C] [H]);
  --muted-foreground: oklch([L] [C] [H]);

  --accent: oklch([L] [C] [H]);
  --accent-foreground: oklch([L] [C] [H]);

  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);

  --border: oklch([L] [C] [H]);
  --input: oklch([L] [C] [H]);
  --ring: oklch([L] [C] [H]);

  /* ---------- Typographie ---------- */
  --font-sans: '[Font]', ui-sans-serif, system-ui, sans-serif;

  /* ---------- Spacing (depuis visual-vocabulary.md) ---------- */
  --spacing-section: [X]rem;
  --spacing-section-mobile: [X]rem;
  --spacing-container: [X]rem;
}

/* ---------- Dark Mode (si applicable) ---------- */
.dark {
  --background: oklch([L] [C] [H]);
  --foreground: oklch([L] [C] [H]);
  /* ... autres overrides ... */
}

/* ============================================
   THEME INLINE - Mapping vers Tailwind
   ============================================ */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --font-sans: var(--font-sans);
}

/* ============================================
   BASE STYLES
   ============================================ */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
  }

  /* Typographie - depuis typography.md */
  h1 {
    @apply text-5xl md:text-7xl font-bold leading-tight tracking-tight;
  }

  h2 {
    @apply text-3xl md:text-5xl font-bold leading-tight;
  }

  h3 {
    @apply text-2xl md:text-3xl font-semibold leading-snug;
  }

  h4 {
    @apply text-xl md:text-2xl font-semibold;
  }

  p {
    @apply text-base leading-relaxed text-muted-foreground;
  }
}

/* ============================================
   UTILITIES CUSTOM
   ============================================ */
@layer utilities {
  .container-custom {
    @apply mx-auto max-w-7xl px-6 md:px-8;
  }

  .section-padding {
    @apply py-16 md:py-24;  /* Ajuster selon visual-vocabulary.md */
  }

  .text-balance {
    text-wrap: balance;
  }
}
```

## Conversion HEX → OKLCH

| HEX | OKLCH (approximatif) |
|-----|---------------------|
| #FFFFFF | oklch(1 0 0) |
| #000000 | oklch(0 0 0) |
| #111827 | oklch(0.145 0.02 265) |
| #C45C3B | oklch(0.55 0.15 35) |

Utiliser un convertisseur en ligne ou les DevTools pour les valeurs exactes.

## Output

- `app/globals.css` (source unique - modifié)

## Validation

- [ ] `@theme inline` configuré avec tous les tokens
- [ ] Couleurs en format **OKLCH**
- [ ] Variables CSS sémantiques définies
- [ ] Mapping vers classes Tailwind fonctionnel
- [ ] Échelle typographique responsive
- [ ] Spacing cohérent avec visual-vocabulary.md
- [ ] Radius cohérent avec constraints.md
- [ ] Dark mode configuré (si applicable)

## Prochaine Étape

Une fois `app/globals.css` configuré → Passer à `stages/04-layout.md`

> **Note** : Cette étape clôture la Phase A (Architecture). La Phase B (Design/Vibe Coding) commence avec 04-layout.

---

**Version** : 1.0
**Phase** : A6 (Architecture - dernière étape)
**Dépendances** : A3 (01.5-Art Direction), A5 (03.5-Wireframes)
**Produit pour** : Phase B (04-layout et suivants)
