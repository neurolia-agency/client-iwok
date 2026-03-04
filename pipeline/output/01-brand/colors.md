# Palette de Couleurs

<!-- Dérive de : 00-platform.md > Archétype Creator+Magician (expression vibrante, transformation), Values (authenticité terrienne, chaleur artisanale) -->

## Stratégie de palette

**Split-complémentaire chaud** autour de l'ocre. Le jaune ocre (affinité client) est la base. On y ajoute un terracotta (voisin chaud, ancrage terre) et un noir profond aux sous-tons chauds pour le contraste. Pas de bleu ni de vert — la palette reste dans les terres et les feux, cohérente avec l'univers du graffiti et de la peinture artisanale.

Pourquoi ce choix :
- **Creator** = expression, couleur, vibrance → l'ocre et le terracotta sont des pigments historiques de la peinture murale (fresques romaines, art rupestre)
- **Magician** = transformation, éclat → le contraste ocre vif / noir profond crée un impact visuel fort
- **Authenticité** = matières nobles, pas de néons → palette terrienne, pas artificielle

---

## Couleur Primaire

- **Nom** : Ocre Artiste
- **HEX** : #C8962D
- **OKLCH** : oklch(0.69 0.14 75)
- **Usage** : Couleur d'identité principale — boutons CTA, accents, liens actifs, éléments de marque

### Variantes

- **Ocre clair** : #DDB65A — oklch(0.79 0.12 80) — Hover sur boutons, focus states
- **Ocre foncé** : #9A7020 — oklch(0.55 0.11 70) — Texte sur fond clair, active states
- **Ocre pâle** : #F5EDD8 — oklch(0.95 0.03 85) — Backgrounds de section subtils, badges

## Couleur Secondaire

- **Nom** : Noir Mural
- **HEX** : #1C1917
- **OKLCH** : oklch(0.17 0.01 55)
- **Usage** : Texte principal, backgrounds sombres (hero, footer), éléments de contraste

### Variantes

- **Noir mural clair** : #2D2926 — oklch(0.25 0.01 55) — Titres, headings
- **Noir mural doux** : #44403C — oklch(0.35 0.01 55) — Sous-titres, texte secondaire en mode sombre

## Couleur d'Accent

- **Nom** : Terracotta
- **HEX** : #BC5B3A
- **OKLCH** : oklch(0.55 0.14 42)
- **Usage** : Accent secondaire — tags de catégorie, badges, highlights, éléments de navigation active

### Variantes

- **Terracotta clair** : #D07A5C — oklch(0.64 0.12 48) — Hover, focus
- **Terracotta foncé** : #8E3F24 — oklch(0.42 0.12 38) — Active, texte accent
- **Terracotta pâle** : #F3E5DE — oklch(0.93 0.03 40) — Background accent subtil

## Neutrals

### Backgrounds

- **Craie** : #FAFAF7 — oklch(0.98 0.01 90) — Background principal
- **Sable** : #F5F2ED — oklch(0.96 0.01 80) — Background alternatif (sections alternées)
- **Pierre** : #EDEAE4 — oklch(0.93 0.01 80) — Surfaces (cards, panels)
- **Grès** : #D6D0C6 — oklch(0.86 0.02 80) — Bordures, séparateurs

### Textes

- **Encre** : #1C1917 — oklch(0.17 0.01 55) — Texte principal (= Noir Mural)
- **Charbon** : #2D2926 — oklch(0.25 0.01 55) — Titres (= Noir Mural clair)
- **Graphite** : #57534E — oklch(0.43 0.01 55) — Sous-titres
- **Cendre** : #78716C — oklch(0.53 0.02 60) — Texte secondaire (body descriptions)
- **Poussière** : #A8A29E — oklch(0.70 0.01 70) — Labels, captions, placeholders

## Sémantique

- **Succès** : #3D8B4F — oklch(0.55 0.12 145) — Harmonisé chaud (vert olive, pas vert néon)
- **Erreur** : #C44233 — oklch(0.52 0.15 30) — Rouge-terre (cohérent avec la palette terracotta)
- **Warning** : #C8962D — oklch(0.69 0.14 75) — Réutilise l'Ocre Artiste
- **Info** : #5B7D8A — oklch(0.55 0.05 220) — Bleu-gris discret (seule touche froide, volontairement désaturée)

## Harmonie Colorimétrique

```
           75° Ocre (Primaire)
          /
   42° Terracotta (Accent)
         \
          → Noir chaud 55° (Secondaire / Textes)
```

La palette repose sur un **arc chaud** entre 40° et 80° sur le cercle chromatique OKLCH, avec des neutres tirés vers le chaud (sous-ton 55°). C'est une palette de **pigments naturels** — ocre jaune, terre de Sienne, noir de fumée — qui évoque les matériaux historiques de la fresque murale. Le choix est intentionnel : l'artiste travaille avec la matière, la couleur doit le refléter.

Le contraste primaire (Ocre #C8962D sur Noir #1C1917) offre un ratio de contraste d'environ **6.5:1** — largement au-dessus du AA (4.5:1). Le texte principal (Encre #1C1917 sur Craie #FAFAF7) offre un ratio d'environ **17:1** — WCAG AAA.

## Variables CSS

```css
:root {
  /* Primaire — Ocre Artiste */
  --color-primary: oklch(0.69 0.14 75);
  --color-primary-light: oklch(0.79 0.12 80);
  --color-primary-dark: oklch(0.55 0.11 70);
  --color-primary-pale: oklch(0.95 0.03 85);

  /* Secondaire — Noir Mural */
  --color-secondary: oklch(0.17 0.01 55);
  --color-secondary-light: oklch(0.25 0.01 55);
  --color-secondary-soft: oklch(0.35 0.01 55);

  /* Accent — Terracotta */
  --color-accent: oklch(0.55 0.14 42);
  --color-accent-light: oklch(0.64 0.12 48);
  --color-accent-dark: oklch(0.42 0.12 38);
  --color-accent-pale: oklch(0.93 0.03 40);

  /* Backgrounds */
  --color-background: oklch(0.98 0.01 90);
  --color-background-alt: oklch(0.96 0.01 80);
  --color-surface: oklch(0.93 0.01 80);
  --color-border: oklch(0.86 0.02 80);

  /* Textes */
  --color-foreground: oklch(0.17 0.01 55);
  --color-foreground-heading: oklch(0.25 0.01 55);
  --color-foreground-subtitle: oklch(0.43 0.01 55);
  --color-foreground-muted: oklch(0.53 0.02 60);
  --color-foreground-subtle: oklch(0.70 0.01 70);

  /* Sémantique */
  --color-success: oklch(0.55 0.12 145);
  --color-error: oklch(0.52 0.15 30);
  --color-warning: oklch(0.69 0.14 75);
  --color-info: oklch(0.55 0.05 220);
}
```

## Notes d'Usage

- L'Ocre Artiste est la signature : l'utiliser avec parcimonie pour qu'il reste impactant (CTA, accents, pas les backgrounds)
- Le Noir Mural est la base — textes et sections immersives (hero, footer). Ne jamais utiliser du noir pur #000000
- Le Terracotta est l'accent de navigation et de catégorisation — tags de portfolio, filtres actifs, liens hover
- Sur fond sombre (Noir Mural), utiliser Craie #FAFAF7 pour le texte et Ocre Artiste pour les accents
- Sur fond clair (Craie/Sable), utiliser Encre #1C1917 pour le texte et Ocre Artiste pour les CTA
- Les couleurs sémantiques restent dans la gamme chaude (sauf Info, volontairement discret)
