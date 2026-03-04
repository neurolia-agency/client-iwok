# Services — Wireframe

**Route** : /services
**Objectif** : Détailler l'offre, rassurer sur le process, orienter vers la conversion

> Dérive de : `03-sitemap.md > Services`, `01-brand/services.md`, `02-art-direction/constraints.md`

---

## Section 1 : Hero Page

**Fond** : `visual-vocabulary.md > couleurs > fond immersif` (#1C1917)

**Contenu** :
- Titre H1 : "Services" — `visual-vocabulary.md > typographie > typo massive`, couleur Craie
- Sous-titre : `positioning.md > messages > services` — `visual-vocabulary.md > typographie > corps large`, couleur Craie 70%

**Layout** : `visual-vocabulary.md > espacements > padding section`, min-height 45vh, conteneur `visual-vocabulary.md > layout > max-width contenu`

**Interaction** :
- H1 : `visual-vocabulary.md > transitions > split-text reveal` au load
- Sous-titre : `visual-vocabulary.md > transitions > apparition rapide` délai 400ms

**Ref design** : Cohérent avec hero Portfolio (même traitement sombre sobre)

---

## Section 2 : Grille des Services

**Fond** : Alternance `visual-vocabulary.md > couleurs > fond principal` (#FAFAF7) et `visual-vocabulary.md > couleurs > fond alternatif` (#F5F2ED)

**Contenu** :
6 cards de services (depuis `01-brand/services.md`) :

| # | Service | Tagline | Photo illustration |
|---|---------|---------|-------------------|
| 1 | Fresques Murales Intérieures | `services.md > fresques-murales-interieures > tagline` | Projet intérieur (chambre, restaurant, hall) |
| 2 | Fresques Murales Extérieures | `services.md > fresques-murales-exterieures > tagline` | Façade ou mur extérieur |
| 3 | Design Mural Sur Mesure | `services.md > design-mural > tagline` | Projet sur mesure en cours de réalisation |
| 4 | Décoration Tous Supports | `services.md > decoration-tous-supports > tagline` | Véhicule, container ou support atypique |
| 5 | Animation Événementielle | `services.md > animation-evenementielle > tagline` | Live painting devant un public |
| 6 | Ateliers Participatifs | `services.md > ateliers-participatifs > tagline` | Groupe autour d'une fresque participative |

Structure de chaque card :
- Photo illustration : 16/9, `visual-vocabulary.md > formes > radius large` (12px en card, contrairement au full-bleed)
- Tag catégorie (pill Terracotta) : "Intérieur" / "Extérieur" / "Sur mesure" / "Tous supports" / "Événementiel" / "Participatif"
- Titre service H3 : `visual-vocabulary.md > typographie > titre card`
- Tagline : `visual-vocabulary.md > typographie > corps large`, style italic
- Description courte : `services.md > [service] > description` (2 premières phrases) — `visual-vocabulary.md > typographie > corps confortable`
- Lien "En savoir plus" : déploie un accordéon avec le détail "Inclus" — flèche chevron, couleur Ocre Artiste

**Layout** : Grille 2 colonnes desktop / 1 colonne mobile, `visual-vocabulary.md > espacements > gap composant`, cards fond `visual-vocabulary.md > couleurs > surface card`, `visual-vocabulary.md > formes > radius standard`

**Interaction** :
- Reveal cards : `visual-vocabulary.md > transitions > apparition douce` staggeré par 2 (paires de colonnes, délai 150ms)
- Card hover : `visual-vocabulary.md > transitions > hover subtil` + `visual-vocabulary.md > ombres > ombre hover`
- Accordéon "En savoir plus" : expand/collapse avec animation height (overflow: hidden, transition 400ms `visual-vocabulary.md > transitions > easing standard`)

**Ref design** : Grid services fourmula.ai (photo + tagline + description accordéon)

---

## Section 3 : Process "Comment ça marche"

**Fond** : `visual-vocabulary.md > couleurs > fond immersif` (#1C1917)

**Contenu** :
- Titre section H2 : "De l'idée à la fresque — 4 étapes" — `visual-vocabulary.md > typographie > titre section`, couleur Craie
- 4 étapes :
  1. **Prise de contact** — "Échange sur votre projet (téléphone ou email)"
  2. **Proposition créative** — "Visite sur site + croquis/maquette"
  3. **Réalisation** — "La fresque prend vie sur votre mur"
  4. **Livraison** — "Finitions, protection, remise du support"
- Chaque étape : numéro grand format (Syne 800, Ocre Artiste, opacity 30% fond décoratif) + titre + description courte

**Layout** :
- Desktop : timeline horizontale, 4 colonnes égales, ligne de connexion Ocre Artiste entre les étapes
- Mobile : timeline verticale, 1 colonne, ligne verticale à gauche, `visual-vocabulary.md > espacements > gap composant`

**Interaction** :
- Reveal : chaque étape `visual-vocabulary.md > transitions > apparition douce` staggeré au scroll (délai 200ms entre chaque)
- Ligne de connexion : dessinée progressivement au scroll (scaleX 0 → 1, 1000ms, déclenché au viewport center)

**Ref design** : Timeline process propre, style étapes numérotées (Vitalina Bender, POMARES)

---

## Section 4 : CTA Contact

**Fond** : `visual-vocabulary.md > couleurs > fond alternatif` (#F5F2ED)

**Contenu** :
- Titre : "Discutons de votre projet" — `visual-vocabulary.md > typographie > sous-titre`, couleur Encre
- CTA : `positioning.md > cta_principal` → /contact — bouton Ocre Artiste
- Texte sous le CTA : "Devis gratuit — Réponse sous 48h" — `visual-vocabulary.md > typographie > texte discret`, couleur `visual-vocabulary.md > couleurs > texte secondaire`

**Layout** : Centré, `visual-vocabulary.md > espacements > padding section`

**Interaction** :
- Reveal : `visual-vocabulary.md > transitions > apparition douce` au scroll
