# Bibliothèque d'Animations — IWOK

> **Contexte** : Ce document recense les 7 références code fournies dans `pipeline/input/references/animations/`.
> Ces références n'ont pas été analysées lors de A03 (étape centrée sur les sites web).
>
> **Statut actuel (post-analyse)** : 4 références sont **ACTIVES** — elles remplacent les animations initialement planifiées d'après A03, car suffisamment similaires visuellement avec l'avantage d'avoir le code fourni. 3 références restent en fallback ou sont rejetées.
>
> **Référence principale** : `pipeline/output/02-art-direction/visual-vocabulary.md` — c'est le document de référence animations mis à jour, qui pointe vers les fichiers code.

---

## Mapping : Références → Animations Planifiées

### 1. `gsap-clipmask-scrolltrigger`
**Preview** : `instagram.com/reel/DS4jDWOjAAH/`
**Ce que fait l'animation** :
- Lettres qui s'écartent latéralement au scroll (scale ×10 + translate hors écran) pendant que l'image hero se révèle derrière
- Image hero : clip-path polygon `inset(rotated)` → `0% 0% / 100% 100%` au scroll, scrubbed
- Simultanément : scale de l'image (zoom léger) synchronisé au scroll

**Correspondance planifiée** : → **Hero clip-path reveal** (`clip-path reveal`, 1200ms)

**Différence** : La version planifiée est un trigger instantané (1200ms à l'entrée). Cette référence est *scrubbed* au scroll — le visiteur contrôle la vitesse de révélation en scrollant. Plus immersif, incarne mieux le Magician.

**Avantage code** : Implémentation complète inline dans `index.html` — ~50 lignes GSAP, pas de dépendance externe supplémentaire.

---

### 2. `gsap-flip-plugin-landing-page`
**Preview** : `instagram.com/reel/DTfNEz5jEI1/`
**Ce que fait l'animation** :
- Séquence d'intro : clip-path revealer (2 panneaux qui s'écartent), puis images qui scale de 0 → 1 en stagger
- GSAP Flip : les images se reorganisent de layout "stacked" vers layout "grille" avec animation fluide
- Split-text slide-up pour les titres (via SplitType)

**Correspondance planifiée** :
- → **Portfolio galerie filtrable** (GSAP Flip prévu dans les wireframes pour le filtre catégories)
- → **Split-text reveal** des titres Syne

**Différence** : La version planifiée du Flip est pour les filtres (reconfiguration de grille au clic). Cette référence montre le Flip à l'entrée de page. Les deux usages sont valides.

**Avantage code** : `script.js` complet avec CustomEase "hop" et "hop2" — les easings signature déjà calibrés, directement réutilisables.

---

### 3. `gsap-scroll-trigger`
**Preview** : `instagram.com/reel/DTZ-CfnjB4m/`
**Ce que fait l'animation** :
- Images qui se révèlent via clip-path polygon au scroll (scrub) — image 1 puis image 2 puis image 3 en séquence
- Zoom simultané des images (scale 1 → 1.125 → 1.25 → 2.9 → retour 1 selon la progression scroll)
- **Flicker animation** : texte intro dont les lettres apparaissent/disparaissent avec opacité aléatoire staggerée (effet "écran qui s'allume")
- Lenis intégré

**Correspondance planifiée** :
- → **Reveal sections au scroll** (alternative scrub vs trigger)
- → **Split-text reveal** des titres (variante : flicker aléatoire vs blur-in linéaire)

**Différence** : Le flicker aléatoire est plus brut et urbain que le blur-in planifié (Vitalina Bender). Cohérent avec l'univers graffiti d'IWOK mais moins élégant. À évaluer visuellement.

**Avantage code** : `script.js` complet, Lenis déjà intégré — structure directement réutilisable pour les sections portfolio.

---

### 4. `reverse-scrolling-column`
**Preview** : `instagram.com/reel/DUDPMhAjDgv/`
**Ce que fait l'animation** :
- Colonnes alternées : les colonnes impaires scrollent en sens normal, les paires scrollent en sens inverse (yPercent 0 → 100, scrubbed)
- GSAP ScrollTrigger + Lenis
- Effet : les images semblent "défiler" dans des directions opposées pendant que l'utilisateur scroll

**Correspondance planifiée** : → **Portfolio aperçu homepage** (section défilante en avant-première)

**Différence** : La version planifiée est une grille masonry statique avec reveal. Cette référence crée un mouvement continu — plus dynamique, montre plus d'images en peu d'espace. Particulièrement adapté pour prévisualiser la diversité du portfolio IWOK.

**Avantage code** : `script.js` = 25 lignes. La référence la plus légère du dossier. Simple à adapter.

---

### 5. `book-gallery`
**Preview** : `instagram.com/reel/DTZ7FUUDBYp/`
**Ce que fait l'animation** :
- Galerie en "livre 3D" : les items ont une perspective CSS 3D, le clic sur un item le "ouvre" (toggle classe `is-open`)
- Pas de GSAP — CSS 3D transforms + classes JS vanilla
- Le container reçoit une classe `book-open` si au moins un item est ouvert

**Correspondance planifiée** : Pas de correspondance directe — paradigme différent du portfolio filtrable masonry prévu.

**Positionnement** : Alternative complète au composant portfolio. Convient mieux à un nombre limité de projets mis en avant (homepage portfolio aperçu) qu'à une galerie exhaustive.

**Note performance** : Pur CSS3D, pas de WebGL — compatible mobile.

---

### 6. `canvas-transition-scroll-animation`
**Preview** : `instagram.com/reel/DTfJ6yFDCbx/`
**Ce que fait l'animation** :
- Grille de triangles Canvas 2D : au scroll (65-100% de la section sticky), les triangles se remplissent progressivement de manière aléatoire (orange `#ff6b00`)
- Simultanément : cards qui défilent horizontalement (translateX) liées au scroll progress
- GSAP ScrollTrigger + Lenis
- Section sticky pin pendant 5× la hauteur viewport

**Correspondance planifiée** : Pas de correspondance directe.

**Positionnement** : Animation de transition entre sections (ex: entre Portfolio et Services). L'effet de remplissage triangulaire en Ocre Artiste au lieu d'orange serait cohérent avec la palette. Mais complexité élevée pour un gain visuel incertain sur mobile.

**Note** : La couleur `#ff6b00` serait remplacée par `oklch(0.69 0.14 75)` (Ocre Artiste) pour la cohérence palette.

---

### 7. `webgl-slider`
**Preview** : `instagram.com/reel/DTchGwXDHvB/`
**Ce que fait l'animation** :
- Slider Three.js avec displacement map : transition entre images via un shader GLSL qui distord les deux textures selon une noise map
- Déclenchement au scroll (wheel event)
- TweenMax pour animer `dispPower` uniform du shader (2.5s, Expo.easeInOut)

**Correspondance planifiée** : Pas de correspondance — WebGL a été **explicitement rejeté** en A03 (performance mobile rédhibitoire, trafic Instagram).

**Statut** : Conservé en bibliothèque mais déconseillé pour IWOK sauf si une décision de prioriser desktop est prise.

---

## Tableau Récapitulatif

| Référence | Animation cible | Statut | Code prêt | Mobile safe |
|-----------|----------------|--------|-----------|-------------|
| `gsap-clipmask-scrolltrigger` | "clip-path reveal hero" | ✅ **ACTIF** | ✅ | ✅ |
| `gsap-flip-plugin-landing-page` | "split-text reveal" + easings hop/hop2 | ✅ **ACTIF** | ✅ | ✅ |
| `gsap-scroll-trigger` | "clip-path reveal image" (portfolio) | ✅ **ACTIF** | ✅ | ✅ |
| `reverse-scrolling-column` | "colonnes inversées aperçu" homepage | ✅ **ACTIF** | ✅ | ✅ |
| `book-gallery` | — | ⏸ Fallback (pas de correspondance directe) | ✅ | ✅ |
| `canvas-transition-scroll-animation` | — | ⏸ Fallback (pas de correspondance directe) | ✅ | ⚠️ |
| `webgl-slider` | — | ❌ Rejeté (WebGL, mobile incompatible) | ✅ | ❌ |

---

## Note sur les Easings

`gsap-flip-plugin-landing-page` définit deux CustomEase réutilisables :
```js
CustomEase.create("hop",  "M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1")
CustomEase.create("hop2", "M0,0 C0.078,0.617 0.114,0.716 0.255,0.828 0.373,0.922 0.561,1 1,1")
```
Ces easings sont plus précis que les `cubic-bezier` définis dans `globals.css` — envisager de les intégrer comme variables CSS custom ou constantes GSAP dans Phase B.

---

## Pourquoi Ces Références N'ont Pas Été Analysées en A03

L'étape A03 a analysé exclusivement les références *sites web* du fichier `pipeline/input/references/sites.md`. Le dossier `pipeline/input/references/animations/` contenant les codes n'était pas dans le scope de l'étape. Ce document comble cet oubli.

---

*Créé : 2026-02-23 — Post-A06, pré-Phase B*
*Utilisation : Phase B — consulter avant d'implémenter chaque animation*
