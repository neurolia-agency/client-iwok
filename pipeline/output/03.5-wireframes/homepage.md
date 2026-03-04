# Homepage — Wireframe

**Route** : /
**Objectif** : Créer l'émerveillement, qualifier le visiteur, générer des demandes de devis

> Dérive de : `03-sitemap.md > Accueil`, `01-brand/positioning.md`, `02-art-direction/constraints.md`

---

## Section 1 : Hero

**Fond** : `visual-vocabulary.md > couleurs > fond immersif` (#1C1917)

**Contenu** :
- Image plein écran : fresque extérieure la plus spectaculaire du portfolio (priorité : grande surface, entreprise ou collectivité) — `visual-vocabulary.md > formes > radius zéro`
- Overlay sombre dégradé bas → haut pour lisibilité du texte sur l'image
- H1 : `positioning.md > tagline` — `visual-vocabulary.md > typographie > typo massive`, couleur Craie
- Baseline : `positioning.md > baseline` — `visual-vocabulary.md > typographie > corps large`, couleur texte sur sombre (Craie 70%)
- CTA principal : `positioning.md > cta_principal` → /contact — bouton Ocre Artiste, `visual-vocabulary.md > formes > radius standard`
- CTA secondaire : `positioning.md > cta_secondaire` → /portfolio — lien texte, couleur Craie, underline hover

**Layout** : `visual-vocabulary.md > layout > section immersive` (min-height: 100vh), texte centré verticalement bas (20% du bas), `visual-vocabulary.md > layout > full-bleed`

**Interaction** :
- Animation d'entrée : `visual-vocabulary.md > transitions > clip-path reveal` sur l'image (1200ms, easing dramatic)
- Lettering H1 : `visual-vocabulary.md > transitions > split-text reveal` staggeré après le clip-path (délai 800ms)
- Baseline + CTAs : `visual-vocabulary.md > transitions > apparition rapide` staggeré (délai 1400ms)
- Scroll indicator : flèche vers le bas, `visual-vocabulary.md > transitions > apparition douce`, disparaît au scroll

**Ref design** : fourmula.ai (hero texte + image immersive), MYSTA Electric (clip-path reveal)

---

## Section 2 : Portfolio Aperçu

**Fond** : `visual-vocabulary.md > couleurs > fond immersif` (#1C1917) — continuité sombre avec le hero, rupture au scroll

**Contenu** :
- Titre section : `positioning.md > messages > portfolio` — `visual-vocabulary.md > typographie > titre section`, couleur Craie
- Indication chiffre clé : "+100 fresques" — `visual-vocabulary.md > typographie > titre section`, couleur Ocre Artiste (accent)
- Grille masonry 4-6 photos sélectionnées (1 par catégorie minimum) — `visual-vocabulary.md > layout > grille portfolio`
- Filtres visibles au-dessus de la grille : `Tous` · `Entreprises` · `Événementiel` · `Particuliers` · `Participatif` — couleur active : Terracotta
- CTA bas de section : `positioning.md > cta_secondaire` → /portfolio — lien avec underline animé

**Layout** : `visual-vocabulary.md > layout > full-bleed`, colonnes masonry 2-3 desktop / 1 mobile, `visual-vocabulary.md > espacements > padding section`

**Interaction** :
- Animation colonnes : défilement en sens inverse au scroll (reverse-scrolling-column) — colonnes impaires montent, colonnes paires descendent
- Hover image : overlay semi-transparent + titre projet + catégorie slide-up (300ms)
- Filtres : clic → GSAP Flip transition fluide entre les layouts
- Lazy loading obligatoire sur toutes les images

**Ref design** : awwwards.com/sites/pomares (reverse columns), siemprericc.com (masonry immersif)

---

## Section 3 : Services Aperçu

**Fond** : `visual-vocabulary.md > couleurs > fond alternatif` (#F5F2ED) — moment de respiration

**Contenu** :
- Titre section : `positioning.md > messages > services` — `visual-vocabulary.md > typographie > titre section`, couleur Encre
- Lead paragraph : "Fresques murales intérieures et extérieures, design sur mesure, animation événementielle — sur tous les supports, pour tous les projets" — `visual-vocabulary.md > typographie > corps large`
- 3 cards services mis en avant :
  1. **Fresques Murales** — `services.md > fresques-murales-interieures > tagline` + `services.md > fresques-murales-exterieures > tagline` (combinées)
  2. **Design Mural Sur Mesure** — `services.md > design-mural > tagline`
  3. **Animation Événementielle** — `services.md > animation-evenementielle > tagline`
- Chaque card : icône (pictogramme pinceau/mur/live) + tagline + description courte (placeholder) + lien "En savoir plus" → /services
- CTA bas de section : "Découvrir tous les services" → /services

**Layout** : `visual-vocabulary.md > layout > grille standard` — 3 colonnes desktop / 1 colonne mobile, `visual-vocabulary.md > espacements > gap composant` entre cards, cards en `visual-vocabulary.md > formes > radius standard`, fond card `visual-vocabulary.md > couleurs > surface card`

**Interaction** :
- Reveal section : `visual-vocabulary.md > transitions > apparition douce` au scroll
- Cards hover : `visual-vocabulary.md > transitions > hover subtil` (translateY -4px + `visual-vocabulary.md > ombres > ombre hover`)

**Ref design** : fourmula.ai (cards services avec respiration)

---

## Section 4 : Témoignages

**Fond** : `visual-vocabulary.md > couleurs > fond principal` (#FAFAF7)

**Contenu** :
- Titre section : "Ils ont transformé leurs murs" — `visual-vocabulary.md > typographie > titre section`, couleur Encre
- 2-3 blocs témoignages : citation + nom + type de projet + ville — (placeholder)
- Guillemets décoratifs : Terracotta (#BC5B3A), `visual-vocabulary.md > typographie > typo massive` (guillemets en grand)
- Format : texte citation en `visual-vocabulary.md > typographie > corps large`, auteur en `visual-vocabulary.md > typographie > texte discret` + uppercase + `visual-vocabulary.md > typographie > letter-spacing caps`

**Layout** : 2 colonnes desktop (ou 1 large column centered + 1 large), 1 colonne mobile, max-width 720px par témoignage, `visual-vocabulary.md > espacements > espace respiration` entre témoignages

**Interaction** :
- Reveal : `visual-vocabulary.md > transitions > apparition douce` staggeré par témoignage (délai 150ms)

**Ref design** : Vitalina Bender (témoignages minimalistes avec typographie expressive)

---

## Section 5 : CTA Final

**Fond** : `visual-vocabulary.md > couleurs > fond immersif` (#1C1917) — pleine largeur immersive

**Contenu** :
- Titre : "Racontez-nous votre mur, on lui donne vie" — `visual-vocabulary.md > typographie > titre section`, couleur Craie
- Sous-titre : "Devis gratuit — Réponse sous 48h" — `visual-vocabulary.md > typographie > corps confortable`, couleur Craie 60%
- CTA principal : `positioning.md > cta_principal` → /contact — bouton Ocre Artiste plein, `visual-vocabulary.md > transitions > hover bouton`

**Layout** : `visual-vocabulary.md > layout > full-bleed`, centré vertical et horizontal, `visual-vocabulary.md > espacements > padding section`

**Interaction** :
- Reveal : `visual-vocabulary.md > transitions > apparition douce` au scroll (titre + sous-titre + bouton staggeré)
- Fond optionnel : texture légère grain/bruit (CSS pseudo-element, opacity 3-5%)

**Ref design** : fourmula.ai (CTA final sombre avec impact typographique)

---

## Navigation (Header)

**État par défaut** : `visual-vocabulary.md > layout > sticky header` avec fond transparent sur hero (scrolled → fond Noir Mural + backdrop-filter blur)

**Contenu desktop** :
- Gauche : Logo IWOK (SVG, couleur Craie sur fond sombre, Encre sur fond clair) → /
- Centre : Menu `Portfolio` · `Services` · `À Propos` — Syne 500, couleur Craie/Encre selon contexte, hover Ocre Artiste
- Droite : CTA `positioning.md > cta_principal` → /contact — bouton Ocre Artiste outline → plein au hover

**Contenu mobile** : Logo + hamburger (3 lignes → croix) → Menu fullscreen Noir Mural, liens en `visual-vocabulary.md > typographie > sous-titre`

**Ref design** : fourmula.ai (navbar élégante sobre) + siemprericc.com (menu fullscreen)
