# À Propos — Wireframe

**Route** : /a-propos
**Objectif** : Créer la connexion humaine, raconter le parcours, renforcer la confiance

> Dérive de : `03-sitemap.md > À Propos`, `01-brand/positioning.md`, `01-brand/about.md` (si existant), `02-art-direction/constraints.md`

---

## Section 1 : Hero Page + Portrait

**Fond** : `visual-vocabulary.md > couleurs > fond immersif` (#1C1917)

**Contenu** :
- Titre H1 : "Guillaume Jeanjean — IWOK" — `visual-vocabulary.md > typographie > typo massive`, couleur Craie
- Sous-titre : `positioning.md > messages > a-propos` — `visual-vocabulary.md > typographie > corps large`, couleur Craie 70%
- Photo portrait : artiste en action (en train de peindre) — depuis `pipeline/input/assets/portrait/`
  - Position : droite du titre (desktop) / sous le titre (mobile)
  - Format : 4/5 portrait, `visual-vocabulary.md > formes > radius zéro` si full-bleed, ou `visual-vocabulary.md > formes > radius large` si card
  - Cadrage préféré : plan moyen/serré, artiste concentré sur son œuvre

**Layout** : 2 colonnes 60/40 desktop (texte gauche, photo droite) / 1 colonne mobile, `visual-vocabulary.md > espacements > padding section`

**Interaction** :
- H1 : `visual-vocabulary.md > transitions > split-text reveal` au load
- Photo : `visual-vocabulary.md > transitions > clip-path reveal` simultané (délai 400ms)
- Sous-titre : `visual-vocabulary.md > transitions > apparition rapide` délai 800ms

**Ref design** : Portrait artiste POMARES (portrait humain + typographie massive)

---

## Section 2 : Storytelling Parcours

**Fond** : Alternance `visual-vocabulary.md > couleurs > fond principal` et `visual-vocabulary.md > couleurs > fond immersif`

**Contenu** :
Chapitres narratifs (sticky scroll) :

| # | Chapitre | Titre | Texte (placeholder) | Fond |
|---|----------|-------|---------------------|------|
| 1 | Les débuts | "Le graffiti, les murs, la rue" | (placeholder — parcours graffiti, premières bombes, terrain urbain) | Noir Mural |
| 2 | La professionnalisation | "Du tag au design mural" | (placeholder — transition vers le pro, premiers clients, structuration) | Craie |
| 3 | L'expansion | "Tous les supports, tous les clients" | (placeholder — entreprises, collectivités, événementiel, polyvalence) | Sable |
| 4 | Aujourd'hui | "IWOK, l'artiste et la marque" | (placeholder — IWOK, la vision actuelle, les projets récents) | Noir Mural |

Structure par chapitre :
- Numéro chapitre : Syne 800, grand format, couleur Ocre Artiste opacity 20% (fond décoratif)
- Titre chapitre : `visual-vocabulary.md > typographie > sous-titre`
- Texte : `visual-vocabulary.md > typographie > corps confortable`, max-width `visual-vocabulary.md > layout > max-width texte`
- Photo associée : images d'archives ou actuelles depuis `pipeline/input/assets/`

**Layout** :
- Desktop : sticky sections — texte à gauche sticky pendant que les photos scrollent à droite (position: sticky, height: 100vh)
- Mobile : stack vertical (texte → image → texte → image), `visual-vocabulary.md > espacements > whitespace mobile`

**Interaction** :
- Sticky scroll : ScrollTrigger, chaque chapitre pin pendant 100vh de scroll
- Images révélées au pin avec `visual-vocabulary.md > transitions > clip-path reveal` (vertical, depuis le bas)
- Texte : `visual-vocabulary.md > transitions > apparition douce` lors du pin
- Transition entre chapitres : fondu de la couleur de fond (600ms)

**Ref design** : siemprericc.com (scroll narratif avec images reveal), Vitalina Bender (storytelling artiste)

---

## Section 3 : Chiffres Clés

**Fond** : `visual-vocabulary.md > couleurs > fond immersif` (#1C1917)

**Contenu** :
- 4 chiffres en Syne 800 massif, chacun avec label :
  1. `+15 ans` — "d'expérience"
  2. `+100 projets` — "réalisés"
  3. `4 types` — "de clientèle"
  4. `Tous supports` — "murs, façades, sols, véhicules"
- Chiffres : `visual-vocabulary.md > typographie > typo massive`, couleur Ocre Artiste
- Labels : `visual-vocabulary.md > typographie > corps confortable`, couleur Craie 70%

**Layout** : Grille 4 colonnes desktop / 2 colonnes tablet / 2 colonnes mobile, centré, `visual-vocabulary.md > espacements > padding section`

**Interaction** :
- Chiffres : counter animation au scroll (compteur numérique) — 0 → valeur finale en 1200ms `visual-vocabulary.md > transitions > easing dramatic`
- Labels : `visual-vocabulary.md > transitions > apparition rapide` staggeré après les chiffres

**Ref design** : MYSTA Electric (chiffres massifs impactants sur fond sombre)

---

## Section 4 : CTA Final

**Fond** : `visual-vocabulary.md > couleurs > fond alternatif` (#F5F2ED)

**Contenu** :
- Titre : `positioning.md > messages > contact` — `visual-vocabulary.md > typographie > sous-titre`, couleur Encre
- CTA : `positioning.md > cta_principal` → /contact — bouton Ocre Artiste
- Texte sous le CTA : "Devis gratuit — Réponse sous 48h" — `visual-vocabulary.md > typographie > texte discret`

**Layout** : Centré, `visual-vocabulary.md > espacements > padding section`

**Interaction** :
- Reveal : `visual-vocabulary.md > transitions > apparition douce` au scroll
