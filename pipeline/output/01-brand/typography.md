# Typographie

<!-- Dérive de : 00-platform.md > Archétype Creator (expression artistique), Values (authenticité, professionnalisme) -->

## Choix de pairing — Justification

3 pairings évalués :

| Pairing | Cohérence Archétype | Lisibilité Mobile | Contraste Hiérarchique | Performance |
|---------|--------------------|--------------------|----------------------|-------------|
| **Syne + Inter** | 5/5 — Syne est artistique et distinctive | 5/5 — Inter excellent partout | 4/5 — Bon contraste display/text | 5/5 — Tous deux variable fonts, Google Fonts |
| Space Grotesk + DM Sans | 4/5 — Géométrique/urbain mais moins distinctif | 4/5 — Bon mais DM Sans moins testé à petites tailles | 3/5 — Trop proches visuellement | 4/5 — Google Fonts |
| Clash Display + Inter | 5/5 — Très distinctif | 4/5 — Clash pas sur Google Fonts | 5/5 — Excellent contraste | 2/5 — Clash nécessite Fontshare (CDN externe) |

**Choix retenu : Syne + Inter**

Pourquoi : Syne a été créée par le collectif français Bonjour Monde — ses proportions légèrement non-conventionnelles et ses formes géométriques arrondies évoquent l'expression artistique sans sacrifier la lisibilité. Elle incarne le Creator : originale mais maîtrisée, distinctive mais pas illisible. Inter, en body, apporte la clarté et le professionnalisme — le designer mural "professionnel" dans "designer mural professionnel". Le contraste entre la personnalité de Syne et la neutralité d'Inter reflète le parcours IWOK : l'énergie créative du graffiti canalisée dans la rigueur professionnelle.

---

## Police Principale (Titres)

- **Nom** : Syne
- **Source** : Google Fonts
- **Weights** : 400, 500, 600, 700, 800
- **Fallback** : 'Arial Black', system-ui, sans-serif
- **Usage** : Titres (H1-H4), éléments d'emphase, navigation principale, tagline
- **Feeling** : Artistique, géométrique, légèrement brute, contemporaine. Comme un tag bien maîtrisé — structuré mais avec du caractère.

## Police Secondaire (Corps)

- **Nom** : Inter
- **Source** : Google Fonts (variable)
- **Weights** : 300, 400, 500, 600, 700
- **Fallback** : system-ui, -apple-system, sans-serif
- **Usage** : Body text, descriptions, boutons, formulaires, labels, captions
- **Feeling** : Claire, précise, invisible. La police qui s'efface pour laisser parler le contenu et les images — exactement ce qu'il faut pour un portfolio où les photos sont le produit.

## Échelle de Tailles

| Élément | Desktop | Mobile | Weight | Line-height | Font |
|---------|---------|--------|--------|-------------|------|
| H1 | 72px | 40px | 800 | 1.05 | Syne |
| H2 | 48px | 32px | 700 | 1.1 | Syne |
| H3 | 36px | 26px | 600 | 1.15 | Syne |
| H4 | 24px | 20px | 600 | 1.2 | Syne |
| H5 | 20px | 18px | 500 | 1.3 | Syne |
| Body | 16px | 16px | 400 | 1.6 | Inter |
| Body Large | 20px | 18px | 400 | 1.5 | Inter |
| Small | 14px | 14px | 400 | 1.5 | Inter |
| Caption | 12px | 12px | 500 | 1.4 | Inter |

Notes sur l'échelle :
- H1 très grand (72px desktop) : le hero doit impacter. "Du mur blanc à l'oeuvre unique" en Syne 800 = statement
- Body à 16px minimum mobile : lisibilité non-négociable
- Syne en 800 (extra-bold) pour H1 : le poids maximum accentue le côté "mural" — les lettres occupent l'espace comme une fresque occupe un mur
- Line-height serrée sur les titres (1.05-1.2) : compacte et impactante. Line-height aérée sur le body (1.6) : confort de lecture

## Variables CSS

```css
:root {
  /* Familles */
  --font-heading: 'Syne', 'Arial Black', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;

  /* Tailles fluides (clamp) */
  --font-size-h1: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  --font-size-h2: clamp(2rem, 3vw + 0.75rem, 3rem);
  --font-size-h3: clamp(1.625rem, 2vw + 0.5rem, 2.25rem);
  --font-size-h4: clamp(1.25rem, 1.5vw + 0.25rem, 1.5rem);
  --font-size-h5: clamp(1.125rem, 1vw + 0.25rem, 1.25rem);
  --font-size-body: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
  --font-size-body-lg: clamp(1.125rem, 1vw + 0.25rem, 1.25rem);
  --font-size-small: 0.875rem;
  --font-size-caption: 0.75rem;

  /* Poids */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Line heights */
  --line-height-tight: 1.05;
  --line-height-snug: 1.15;
  --line-height-normal: 1.4;
  --line-height-relaxed: 1.6;
  --line-height-loose: 1.7;

  /* Letter spacing */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.05em;
  --letter-spacing-wider: 0.1em;
}
```

## Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

## Notes d'Usage

- **Syne 800** réservé au H1 uniquement — ne pas diluer l'impact en l'utilisant partout
- **Syne 600-700** pour H2-H4 et la navigation principale
- **Inter 400** pour le body — jamais de Syne en body text (trop de caractère, fatigue visuelle)
- **Inter 500-600** pour les boutons et labels importants
- Taille minimum 16px pour le body sur mobile — jamais descendre en-dessous pour le texte courant
- Le letter-spacing wide (0.05em) est réservé aux captions et labels en uppercase — ne pas appliquer aux titres Syne qui ont déjà un espacement naturel suffisant
- En uppercase, utiliser letter-spacing-wide (0.05em) — Syne en caps + wide spacing = sensation "enseigne murale"
