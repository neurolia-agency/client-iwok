# Portfolio — Wireframe

**Route** : /portfolio
**Objectif** : Démontrer l'expertise par les réalisations, créer la projection, convertir en demande de devis

> Dérive de : `03-sitemap.md > Portfolio`, `01-brand/positioning.md`, `02-art-direction/constraints.md`
> Composant le plus complexe du site — GSAP Flip + Lightbox + Lazy loading obligatoires

---

## Section 1 : Hero Page

**Fond** : `visual-vocabulary.md > couleurs > fond immersif` (#1C1917)

**Contenu** :
- Titre page H1 : "Réalisations" — `visual-vocabulary.md > typographie > typo massive`, couleur Craie
- Sous-titre : "Plus de 100 fresques murales depuis 2008 — entreprises, collectivités, particuliers, événementiel" — `visual-vocabulary.md > typographie > corps large`, couleur Craie 70%
- Pas d'image héro — entrée immédiate dans la galerie au scroll
- Barre de progression scroll : `visual-vocabulary.md > transitions > progress indicator` en Ocre Artiste, top viewport

**Layout** : `visual-vocabulary.md > espacements > padding section` top/bottom, conteneur centré `visual-vocabulary.md > layout > max-width contenu`, min-height 40vh (pas plein écran)

**Interaction** :
- H1 : `visual-vocabulary.md > transitions > split-text reveal` au load (blur-in + slide-up staggeré)
- Sous-titre : `visual-vocabulary.md > transitions > apparition rapide` délai 400ms

**Ref design** : Portfolio standard — sobre, fonctionnel, on va droit au but

---

## Section 2 : Galerie Filtrable

**Fond** : `visual-vocabulary.md > couleurs > fond principal` (#FAFAF7) — transition sombre → clair

**Contenu** :

### Barre de filtres
- Position : sticky top (sous le header) au scroll, z-index 40
- Filtres : `Tous` · `Entreprises & Collectivités` · `Événementiel` · `Particuliers` · `Participatif`
- Style inactif : fond `visual-vocabulary.md > couleurs > fond alternatif`, texte Encre, `visual-vocabulary.md > formes > radius pill`
- Style actif : fond Terracotta (#BC5B3A), texte Craie, `visual-vocabulary.md > formes > radius pill`
- Compteur items visible après le filtre actif : "(12)" — `visual-vocabulary.md > typographie > texte micro`

### Grille masonry
- Layout : `visual-vocabulary.md > layout > grille portfolio` (masonry, auto-fill minmax 300px)
- 3-4 colonnes desktop / 2 colonnes tablet / 1 colonne mobile
- Chaque item : photo projet + overlay au hover (voir interaction)
- Images : `visual-vocabulary.md > formes > radius zéro` — pas de radius sur les photos
- Données de chaque item : titre projet, catégorie, année, lieu (données JSON statiques, hardcodées en Phase B)

### Lightbox
- Déclencheur : clic sur n'importe quelle photo de la galerie
- Fond : `visual-vocabulary.md > couleurs > fond immersif` (opacity 96%)
- Contenu lightbox : photo HD centrée + titre projet + année + lieu + catégorie (bas gauche)
- Navigation : flèches ← → (clavier + clic), ESC pour fermer
- Fermeture : clic fond ou bouton ×
- Photo : `visual-vocabulary.md > formes > radius zéro`, `visual-vocabulary.md > ombres > ombre élevée`

**Layout** : `visual-vocabulary.md > layout > full-bleed` pour la grille (débords possibles), `visual-vocabulary.md > espacements > padding section` autour

**Interaction** :
- Changement de filtre : GSAP Flip — les items se réordonnent fluidement (scale + position interpolés, 600ms easing standard)
- Items qui disparaissent : opacity 0 + scale 0.95 (200ms)
- Items qui apparaissent : opacity 0 → 1 + scale 0.95 → 1 (300ms, délai après les disparitions)
- Hover photo : overlay semi-transparent (#1C1917 opacity 60%) + titre projet slide-up depuis le bas + tag catégorie Terracotta pill (200ms `visual-vocabulary.md > transitions > transition standard`)
- Lazy loading : IntersectionObserver sur toutes les images, placeholder blur léger pendant le chargement
- Ouverture lightbox : `visual-vocabulary.md > transitions > clip-path reveal` (inset 100% → 0, 600ms)
- Fermeture lightbox : reverse clip-path (300ms)
- Navigation lightbox : `visual-vocabulary.md > transitions > apparition rapide` entre photos

**Ref design** : Galerie portfolio fourmula.ai (filtres + masonry), lightbox style minimal type MutualArt

---

## Section 3 : CTA Contextuel

**Fond** : `visual-vocabulary.md > couleurs > fond alternatif` (#F5F2ED)

**Contenu** :
- Titre : "Un projet similaire en tête ?" — `visual-vocabulary.md > typographie > sous-titre`, couleur Encre
- Sous-texte : "Chaque fresque est unique — racontez-nous votre idée" — `visual-vocabulary.md > typographie > corps confortable`, couleur `visual-vocabulary.md > couleurs > texte secondaire`
- CTA : `positioning.md > cta_principal` → /contact — bouton Ocre Artiste

**Layout** : Centré, `visual-vocabulary.md > espacements > padding section`, max-width 640px

**Interaction** :
- Reveal : `visual-vocabulary.md > transitions > apparition douce` au scroll

**Ref design** : Pattern CTA contextuel post-portfolio (conversion naturelle dans le parcours)
