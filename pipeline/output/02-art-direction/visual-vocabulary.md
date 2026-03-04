# Vocabulaire Visuel

<!-- Dérive de : 01-brand/colors.md (palette Ocre/Terracotta/Noir Mural), 01-brand/typography.md (Syne+Inter, échelle), Moodboard patterns (immersion, reveal, breathing whitespace) -->

## Espacements

| Terme | Valeur | Usage |
|-------|--------|-------|
| "whitespace généreux" | 160px (10rem) | Entre sections principales (desktop) |
| "whitespace mobile" | 96px (6rem) | Entre sections principales (mobile) |
| "padding section" | 120px (7.5rem) top/bottom | Intérieur sections desktop |
| "padding section mobile" | 64px (4rem) top/bottom | Intérieur sections mobile |
| "espace respiration" | 48-64px (3-4rem) | Entre groupes d'éléments dans une section |
| "gap composant" | 24px (1.5rem) | Entre éléments d'un même groupe (cards, items) |
| "gap serré" | 12px (0.75rem) | Entre éléments liés (label + input, icône + texte) |
| "marge latérale" | clamp(20px, 5vw, 80px) | Padding conteneur gauche/droite |
| "max-width contenu" | 1280px | Largeur max du conteneur principal |
| "max-width texte" | 680px | Largeur max paragraphes (confort de lecture ~70 caractères) |

## Typographie

| Terme | Valeur | Usage |
|-------|--------|-------|
| "typo massive" | clamp(2.5rem, 5vw + 1rem, 4.5rem), Syne 800, line-height 1.05 | H1 Hero uniquement — lettrage mural |
| "titre section" | clamp(2rem, 3vw + 0.75rem, 3rem), Syne 700, line-height 1.1 | H2 sections |
| "sous-titre" | clamp(1.625rem, 2vw + 0.5rem, 2.25rem), Syne 600, line-height 1.15 | H3 |
| "titre card" | clamp(1.25rem, 1.5vw + 0.25rem, 1.5rem), Syne 600, line-height 1.2 | H4 (titres de cards, services) |
| "corps confortable" | clamp(1rem, 0.5vw + 0.875rem, 1.125rem), Inter 400, line-height 1.6 | Body text principal |
| "corps large" | clamp(1.125rem, 1vw + 0.25rem, 1.25rem), Inter 400, line-height 1.5 | Intros de section, lead paragraphs |
| "texte discret" | 0.875rem (14px), Inter 400, line-height 1.5 | Captions, labels, métadonnées |
| "texte micro" | 0.75rem (12px), Inter 500, line-height 1.4 | Captions photos, tags catégorie |
| "line-height aéré" | 1.6 | Body text Inter (confort de lecture) |
| "line-height titre" | 1.05-1.15 | Headings Syne (compact, impactant) |
| "letter-spacing titre" | -0.02em | Gros titres Syne (légèrement serré = densité) |
| "letter-spacing caps" | 0.05em | Captions et labels en uppercase uniquement |

## Transitions & Animations

| Terme | Valeur | Usage |
|-------|--------|-------|
| "hover subtil" | translateY(-4px), 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) | Cards portfolio, liens |
| "hover bouton" | scale(1.03), 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) | Boutons CTA |
| "apparition douce" | translateY(40px) → translateY(0), opacity 0 → 1, 800ms cubic-bezier(0.16, 1, 0.3, 1) | Textes et composants UI au scroll (pas les images — voir clip-path reveal image) |
| "apparition rapide" | translateY(20px) → translateY(0), opacity 0 → 1, 400ms cubic-bezier(0.16, 1, 0.3, 1) | Éléments UI, textes |
| "split-text reveal" | SplitType par lignes, translateY(100%) → translateY(0), CustomEase "hop2", stagger 0.1s | Titres Syne au scroll — slide-up pur (sans blur) · Code : `references/animations/gsap-flip-plugin-landing-page/script.js` |
| "clip-path reveal hero" | polygon(collapsed) → polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%), scrubbed scroll (end +=200%), simultané : lettres IWOK scale ×10 + translateX hors écran | Hero — la fresque se révèle pendant que le nom IWOK s'écarte · Code : `references/animations/gsap-clipmask-scrolltrigger/index.html` |
| "clip-path reveal image" | polygon(centré 40%/60%) → polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%), scrubbed scroll, scale simultané 1 → 1.125 | Images portfolio plein écran — s'ouvrent depuis le centre comme une fresque qu'on peint · Code : `references/animations/gsap-scroll-trigger/script.js` |
| "transition standard" | 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) | Changements d'état (hover, focus, active) |
| "animation macro" | 800ms cubic-bezier(0.16, 1, 0.3, 1) | Reveal sections complètes au scroll |
| "easing standard" | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Tous les éléments interactifs |
| "easing dramatic" | cubic-bezier(0.77, 0, 0.175, 1) | Transitions CSS (non-GSAP) — remplacé par "hop" dans les contextes GSAP |
| "easing hop" | GSAP CustomEase `M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1` | GSAP : clip-path panels, transitions d'entrée · Code : `references/animations/gsap-flip-plugin-landing-page/script.js` |
| "easing hop2" | GSAP CustomEase `M0,0 C0.078,0.617 0.114,0.716 0.255,0.828 0.373,0.922 0.561,1 1,1` | GSAP : split-text reveals, reveals de contenu · Code : `references/animations/gsap-flip-plugin-landing-page/script.js` |
| "smooth scroll" | Lenis, lerp: 0.075 | Scroll global du site |
| "progress indicator" | scaleX(0) → scaleX(1), lié au scroll Y, height 2px | Barre de progression en Ocre Artiste, top du viewport |

## Couleurs (référence)

| Terme | Valeur | Usage |
|-------|--------|-------|
| "accent signature" | oklch(0.69 0.14 75) / #C8962D | Ocre Artiste — CTA, highlights, barre de progression, liens actifs |
| "accent action" | oklch(0.55 0.14 42) / #BC5B3A | Terracotta — tags catégorie, filtres actifs, badges, navigation hover |
| "fond principal" | oklch(0.98 0.01 90) / #FAFAF7 | Craie — background par défaut des sections claires |
| "fond alternatif" | oklch(0.96 0.01 80) / #F5F2ED | Sable — sections alternées, variation subtile |
| "fond immersif" | oklch(0.17 0.01 55) / #1C1917 | Noir Mural — hero, footer, sections d'impact |
| "surface card" | oklch(0.93 0.01 80) / #EDEAE4 | Pierre — cards, panels |
| "bordure subtile" | oklch(0.86 0.02 80) / #D6D0C6 | Grès — séparateurs, bordures |
| "texte principal" | oklch(0.17 0.01 55) / #1C1917 | Encre (= Noir Mural) — texte sur fond clair |
| "texte secondaire" | oklch(0.53 0.02 60) / #78716C | Cendre — descriptions, texte body secondaire |
| "texte sur sombre" | oklch(0.98 0.01 90) / #FAFAF7 | Craie — texte sur fond Noir Mural |
| "présence accent" | 8-12% de la surface totale | Ratio Ocre+Terracotta — parcimonie = impact |

## Formes & Radius

| Terme | Valeur | Usage |
|-------|--------|-------|
| "radius standard" | 8px | Cards, boutons, inputs |
| "radius large" | 12px | Sections surélevées, images dans cards |
| "radius pill" | 9999px | Badges catégorie, tags, chips |
| "radius input" | 8px | Champs de formulaire |
| "radius subtle" | 4px | Petits éléments (tooltips, dropdowns) |
| "radius zéro" | 0px | Images plein écran, hero, sections full-bleed (fresque = bord-à-bord) |

## Ombres

| Terme | Valeur | Usage |
|-------|--------|-------|
| "ombre subtle" | 0 1px 3px rgba(28, 25, 23, 0.06), 0 1px 2px rgba(28, 25, 23, 0.04) | Cards au repos |
| "ombre hover" | 0 4px 12px rgba(28, 25, 23, 0.08), 0 2px 4px rgba(28, 25, 23, 0.04) | Cards au hover |
| "ombre élevée" | 0 12px 32px rgba(28, 25, 23, 0.12), 0 4px 8px rgba(28, 25, 23, 0.06) | Modals, dropdowns, lightbox |
| "teinte ombre" | rgba(28, 25, 23, x) | Toujours basée sur Noir Mural — jamais de gris froid |

## Layout

| Terme | Valeur | Usage |
|-------|--------|-------|
| "conteneur" | max-width: 1280px, margin: 0 auto, padding: 0 clamp(20px, 5vw, 80px) | Wrapper principal |
| "grille standard" | 12 colonnes, gap 24px | Layout desktop (cards portfolio, services) |
| "grille portfolio" | masonry, colonnes auto-fill minmax(300px, 1fr), gap 16px | Galerie portfolio filtrable |
| "colonnes inversées aperçu" | 3 colonnes, colonnes impaires : flex-direction column-reverse + yPercent 0→100 scrubbed, colonnes paires : normales, Lenis | Portfolio aperçu homepage — colonnes défilent en sens alternés · Code : `references/animations/reverse-scrolling-column/script.js` |
| "grille mobile" | 1 colonne, gap 16px | Layout mobile |
| "grille tablet" | 2 colonnes, gap 20px | Layout tablette |
| "full-bleed" | width: 100vw, margin-left: calc(-50vw + 50%) | Sections pleine largeur (hero, portfolio aperçu) |
| "sticky header" | position: sticky, top: 0, z-index: 50, backdrop-filter: blur(12px) | Navigation principale |
| "section immersive" | min-height: 100vh, display: flex, align-items: center | Hero, sections de transition |
| "section standard" | padding: 120px 0 (desktop) / 64px 0 (mobile) | Sections de contenu |

## Breakpoints

| Terme | Valeur | Usage |
|-------|--------|-------|
| "mobile" | < 640px | Smartphones — 1 colonne, navigation hamburger |
| "tablet" | 640px - 1024px | Tablettes — 2 colonnes, navigation hybride |
| "desktop" | > 1024px | Ordinateurs — grille complète, navigation horizontale |
| "large" | > 1440px | Grands écrans — max-width 1280px reste centré, marges latérales augmentent |
