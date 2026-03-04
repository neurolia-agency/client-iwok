# Étape A03 : Direction Artistique

> **Phase A : Architecture** — Traduction de la stratégie de marque en vision visuelle concrète et actionnable.

## Objectif

Transformer la stratégie de marque (A02-Brand) en **direction artistique mesurable** : un ensemble de règles visuelles précises, traçables jusqu'à la plateforme de marque, qui guideront toutes les décisions de design en Phase B.

## Input

- `output/01-brand/` (tous les fichiers, en particulier `00-platform.md`)
- `output/00-brief.md` (pages prévues, cibles, contexte)
- `input/references/sites.md` (si fourni par le client)

## Output

```
output/02-art-direction/
├── moodboard.md                    # Références visuelles analysées avec mesures
├── visual-vocabulary.md            # Lexique visuel → valeurs CSS précises
├── constraints.md                  # Règles ON FAIT / ON NE FAIT PAS + Exceptions
├── emotion-map.md                  # Émotion cible par section/page + courbe émotionnelle
├── art-direction-philosophy.md     # Manifeste esthétique (généré par /canvas-design)
├── art-direction-board.png         # Planche visuelle concrète (généré par /canvas-design)
└── README.md                       # Index, ADN visuel, équation visuelle, test rapide
```

## Phases

| # | Phase | Input | Output | Tooling |
|---|-------|-------|--------|---------|
| 1 | Diagnostic & Références | 01-brand/, 00-brief.md, sites.md | Carte de dérivation, références validées | Subagent websearch (si sites.md vide) |
| 2 | Production Markdown | Carte dérivation + références | 4 fichiers .md + README.md | — |
| 3 | Art Direction Board | 4 fichiers .md | philosophy.md + board.png | `/canvas-design` |
| 4 | Validation | Tous les outputs | Checklist passée | — |

---

## Phase 1 : Diagnostic & Références

### 1.1 Lecture des inputs

Lire dans cet ordre :

1. `output/01-brand/00-platform.md` — Archétype, valeurs, promesse, insight
2. `output/01-brand/colors.md` — Palette complète (noms, OKLCH, variantes)
3. `output/01-brand/typography.md` — Polices, échelle, axes variables
4. `output/01-brand/tone.md` — Registre, personnalité, champ lexical
5. `output/01-brand/positioning.md` — Messages par section, tagline, CTAs
6. `output/00-brief.md` — Pages prévues, cibles, contexte technique

### 1.2 Carte de dérivation

Construire un tableau reliant chaque composant de la plateforme de marque à son expression visuelle attendue. Ce tableau est la **fondation** de toutes les décisions qui suivent — chaque règle dans constraints.md, chaque valeur dans visual-vocabulary.md doit pouvoir être tracée à une ligne de ce tableau.

```markdown
## Carte de Dérivation Brand → Visuel

| Composant Brand | Source | Expression Visuelle Attendue |
|-----------------|--------|------------------------------|
| Archétype [X] | 00-platform.md | [Caractéristiques visuelles de cet archétype : formes, rythme, ton visuel] |
| Valeur 1 : [X] | 00-platform.md | [Traduction en choix de design concrets] |
| Valeur 2 : [X] | 00-platform.md | [Traduction en choix de design concrets] |
| Valeur 3 : [X] | 00-platform.md | [Traduction en choix de design concrets] |
| Palette | colors.md | [Ratios d'utilisation, dominante, accent, neutres] |
| Polices [X + Y] | typography.md | [Rôles, hiérarchie, feeling typographique] |
| Registre [X] | tone.md | [Impact sur animations, spacing, rythme visuel] |
| Promesse | 00-platform.md | [Comment le visuel incarne la promesse client] |
```

### 1.3 Analyse des références

#### Si `input/references/sites.md` est fourni

- Analyser les sites fournis par le client (toujours prioritaires)
- Compléter avec 2-3 sites du même secteur trouvés par websearch pour atteindre le minimum de 5

#### Si `input/references/sites.md` est vide ou absent

**Recherche active obligatoire.** Utiliser un subagent websearch pour trouver **5-7 sites de référence** :

- 2-3 sites du **même secteur** (même type d'établissement, même positionnement)
- 1-2 sites d'un **secteur adjacent** avec une esthétique cohérente avec l'archétype de marque
- 1-2 sites **primés** (Awwwards, CSS Design Awards, FWA) dans un registre émotionnel similaire

**Critères de sélection** : Chercher des sites qui incarnent visuellement des qualités proches de l'archétype et des valeurs de la plateforme de marque — pas simplement des sites "jolis" du même secteur.

Pour chaque site, noter : URL, nom, secteur, et 3-5 éléments visuels remarquables.

---

## Phase 2 : Production Markdown

### 2.1 Moodboard (moodboard.md)

Analyser **5-7 références visuelles** en détail. Chaque référence **DOIT** avoir une URL réelle et vérifiable.

```markdown
# Moodboard

<!-- Dérive de : Carte de Dérivation (Phase 1.2) -->

## Référence 1 : [Nom du site]

- **URL** : https://...
- **Secteur** : [Ex: Brasserie artisanale, Café indépendant]
- **Ce qu'on retient** :
  - [Élément visuel 1]
  - [Élément visuel 2]
  - [Élément visuel 3]
- **Mesures concrètes** :
  - Taille H1 : ~[X]px
  - Espacement sections : ~[X]px
  - Ratio images : [X:Y]
  - Border radius : [X]px
  - Palette dominante : [couleurs hex]
- **Cohérence avec notre archétype [X]** : [En quoi ce site résonne avec l'archétype]
- **À adapter pour ce projet** :
  - [Comment transposer concrètement]

## Référence 2 : [Nom]
[Même structure...]

[5-7 références au total]

## Patterns Communs

| Pattern | Fréquence | Décision | Justification (lien brand) |
|---------|-----------|----------|---------------------------|
| [Ex: Fond chaud / crème] | 5/6 | ✅ Adopter | Archétype [X] : chaleur, accueil |
| [Ex: Scroll animations] | 4/6 | ✅ Adopter | Registre [X] : fluidité |
| [Ex: Vidéo hero autoplay] | 1/6 | ❌ Rejeter | Performance mobile ([X]% trafic) |

[10-15 patterns évalués]

## Synthèse Visuelle

### L'équation [NOM_PROJET]

​```
[NOM_PROJET] = [Axe 1] + [Axe 2] + [Axe 3]

[Axe 1]  = [Traduction concrète en éléments visuels]
[Axe 2]  = [Traduction concrète en éléments visuels]
[Axe 3]  = [Traduction concrète en éléments visuels]
​```

### Mots-clés visuels

- [Mot-clé 1] ([Traduction concrète : couleur, forme, ou texture])
- [Mot-clé 2] ([Traduction concrète])
- [Mot-clé 3] ([Traduction concrète])
- [Mot-clé 4] ([Traduction concrète])
- [Mot-clé 5] ([Traduction concrète])
```

### 2.2 Vocabulaire Visuel (visual-vocabulary.md)

Dictionnaire de traduction entre termes de design et **valeurs CSS précises**. Couvrir les **8 catégories** suivantes (toutes obligatoires) :

```markdown
# Vocabulaire Visuel

<!-- Dérive de : 01-brand/colors.md, 01-brand/typography.md, Moodboard patterns -->

## Espacements

| Terme | Valeur | Usage |
|-------|--------|-------|
| "whitespace généreux" | [X]px ([Y]rem) | Entre sections (desktop) |
| "whitespace mobile" | [X]px ([Y]rem) | Entre sections (mobile) |
| "padding section" | [X]px top/bottom | Intérieur sections desktop |
| "padding section mobile" | [X]px top/bottom | Intérieur sections mobile |
| "espace respiration" | [X]-[Y]px | Entre groupes d'éléments |
| "gap composant" | [X]px | Entre éléments d'un groupe |
| "gap serré" | [X]px | Entre éléments liés |
| "marge latérale" | clamp([X]px, [Y]vw, [Z]px) | Padding conteneur |
| "max-width contenu" | [X]px | Largeur max du contenu |
| "max-width texte" | [X]px | Largeur max paragraphes |

## Typographie

| Terme | Valeur | Usage |
|-------|--------|-------|
| "typo massive" | clamp([X]rem, [Y]vw + [Z]rem, [W]rem) | H1 Hero uniquement |
| "titre section" | clamp(...) | H2 sections |
| "sous-titre" | clamp(...) | H3 |
| "corps confortable" | clamp(...) | Body text |
| "corps large" | clamp(...) | Intros, lead |
| "texte discret" | [X]rem | Captions, labels |
| "line-height aéré" | [X] | Body text |
| "line-height titre" | [X] | Headings |
| "letter-spacing titre" | [X]em | Gros titres |

## Transitions & Animations

| Terme | Valeur | Usage |
|-------|--------|-------|
| "hover subtil" | [Transform], [Duration] [Easing] | Cards, liens |
| "hover bouton" | [Transform], [Duration] [Easing] | Boutons |
| "apparition douce" | [Détails complets] | Sections au scroll |
| "apparition rapide" | [Détails] | Éléments UI |
| "transition standard" | [Duration] [Easing] | Changements d'état |
| "animation macro" | [Duration] [Easing] | Reveal sections |
| "easing standard" | [Easing function] | Tous les éléments |

## Couleurs (référence)

| Terme | Valeur | Usage |
|-------|--------|-------|
| "accent signature" | oklch(...) / #[Hex] | [Nom] — highlights |
| "accent action" | oklch(...) / #[Hex] | [Nom] — CTAs |
| "fond principal" | oklch(...) / #[Hex] | [Nom] |
| "fond alternatif" | oklch(...) / #[Hex] | [Nom] |
| "surface card" | oklch(...) / #[Hex] | [Nom] |
| "bordure subtile" | oklch(...) / #[Hex] | Séparateurs |
| "texte principal" | oklch(...) / #[Hex] | [Nom] |
| "texte secondaire" | oklch(...) / #[Hex] | [Nom] |
| "présence couleur" | [X]-[Y]% de la surface | Ratio couleur signature |

## Formes & Radius

| Terme | Valeur | Usage |
|-------|--------|-------|
| "radius standard" | [X]px | Cards, boutons |
| "radius large" | [X]px | Sections, images |
| "radius pill" | [X]px | Badges, tags |
| "radius input" | [X]px | Champs de formulaire |
| "radius subtle" | [X]px | Petits éléments |

## Ombres

| Terme | Valeur | Usage |
|-------|--------|-------|
| "ombre subtle" | [Box-shadow value] | État par défaut |
| "ombre hover" | [Box-shadow value] | Hover léger |
| "ombre élevée" | [Box-shadow value] | Cards élevées |
| "teinte ombre" | rgba([R], [G], [B], x) | Toujours [tonalité cohérente palette] |

## Layout

| Terme | Valeur | Usage |
|-------|--------|-------|
| "conteneur" | max-width: [X]px, margin: 0 auto | Wrapper principal |
| "grille standard" | [Colonnes], gap [X]px | Layout desktop |
| "grille mobile" | [Colonnes], gap [X]px | Layout mobile |
| "full-bleed" | width: 100vw | Sections pleine largeur |
| "sticky header" | position: sticky, top: 0, z-index: [X] | Navigation |

## Breakpoints

| Terme | Valeur | Usage |
|-------|--------|-------|
| "mobile" | < [X]px | Smartphones |
| "tablet" | [X]px - [Y]px | Tablettes |
| "desktop" | > [Y]px | Ordinateurs |
| "large" | > [Z]px | Grands écrans |
```

### 2.3 Contraintes (constraints.md)

Règles **non-négociables** organisées par catégorie. Chaque règle est justifiée par un lien avec la plateforme de marque.

```markdown
# Contraintes Design

<!-- Dérive de : 00-platform.md (archétype + valeurs), Moodboard (patterns adoptés/rejetés) -->

## ON FAIT (obligatoire)

### Couleurs & Identité

1. **[Règle]** : [Valeur précise]
   - Justification : [Lien avec archétype/valeur/référence moodboard]

[...]

### Typographie

[...]

### Formes & Espace

[...]

### Interactions

[...]

[8-12 règles minimum au total, chacune justifiée]

## ON NE FAIT PAS (interdit)

### Couleurs

1. **[Anti-pattern]**
   - Pourquoi : [Justification liée à la marque]

[...]

### Typographie

[...]

### Formes & Layout

[...]

### Interactions

[...]

### Contenu

[...]

[8-12 règles minimum au total, chacune justifiée]

## Exceptions Autorisées

| Exception | Contexte | Condition |
|-----------|----------|-----------|
| [Ex: Rouge erreur] | Formulaires | Uniquement pour erreurs de validation |
| [Ex: Angles droits] | Lignes séparatrices | Uniquement lignes 1px horizontales |
| [Ex: Texte < 16px] | Labels de formulaire | Minimum 14px, jamais moins |

## Test Rapide "Est-ce [NOM_PROJET] ?"

- [ ] [Critère 1] ?
- [ ] [Critère 2] ?
- [ ] [Critère 3] ?
- [ ] [Critère 4] ?
- [ ] [Critère 5] ?
- [ ] [Critère 6] ?
- [ ] [Critère 7] ?
- [ ] [Critère 8] ?

→ 8/8 = ✅ Conforme | 6-7/8 = ⚠️ Revoir | < 6/8 = ❌ Refaire
```

### 2.4 Carte des Émotions (emotion-map.md)

Pour chaque page/section, définir l'expérience émotionnelle complète.

```markdown
# Carte des Émotions

<!-- Dérive de : 00-platform.md (promesse, archétype), positioning.md (messages par section) -->

## Homepage

### Hero
- **Émotion primaire** : [Ex: Accueil chaleureux]
- **Émotion secondaire** : [Ex: Curiosité, envie]
- **Tension visuelle** : [Ex: Calme du fond vs Énergie du CTA]
- **Élément signature** : [Ex: Image immersive + typographie massive]

### [Section 2]
- **Émotion primaire** : [...]
- **Émotion secondaire** : [...]
- **Tension visuelle** : [...]
- **Élément signature** : [...]

[Continuer pour CHAQUE section de la homepage prévue dans 00-brief.md]

## Pages Secondaires

### [Page 1]
- **Émotion globale** : [...]
- **Parcours émotionnel** :
  1. [Étape : émotion à l'arrivée]
  2. [Étape : émotion pendant la lecture]
  3. [Étape : émotion au CTA]
- **Élément signature** : [...]

[Continuer pour chaque page prévue]

## Récapitulatif

| Section | Émotion Primaire | Couleur Dominante | Élément Clé |
|---------|------------------|-------------------|-------------|
| Hero | [...] | [...] | [...] |
| [...] | [...] | [...] | [...] |

## Courbe Émotionnelle du Parcours

​```
Émotion
   ↑
   │     ●────────●  [Émotion plateau]
   │    /          \
   │   /            ●  [Émotion finale / passage à l'action]
   │  ● [Émotion initiale]
   │ /
   │● [État d'arrivée sur le site]
   └──────────────────────────────→ Scroll
     [Sections labellisées...]
​```

**Objectif** : [Description du parcours émotionnel souhaité — comment transformer l'état d'arrivée en action]
```

### 2.5 README (README.md)

Index enrichi synthétisant toute la direction artistique.

```markdown
# Direction Artistique — [NOM_PROJET]

## ADN Visuel

| Aspect | Valeur |
|--------|--------|
| Couleur signature | [Couleur] ([Code]) |
| Couleur action | [Couleur] ([Code]) |
| Background | [Couleur] ([Code]) |
| Forme signature | [Description] |
| Mouvement | [Type, durée, easing] |
| Structure | [Séquence des sections] |
| Espace sections | [Desktop] / [Mobile] |
| Radius | [Valeurs par usage] |
| Typographies | [Police 1] (titres) + [Police 2] (body) |
| Texture | [Si applicable] |

## Équation Visuelle

​```
[NOM_PROJET] = [Axe 1] + [Axe 2] + [Axe 3]

[Axe 1]  = [Traduction concrète]
[Axe 2]  = [Traduction concrète]
[Axe 3]  = [Traduction concrète]
​```

## Test Rapide "Est-ce [NOM_PROJET] ?"

[Copier les 8 critères depuis constraints.md]

→ 8/8 = ✅ Conforme | 6-7/8 = ⚠️ Revoir | < 6/8 = ❌ Refaire

## Palette Résumée

​```
Backgrounds          Accents               Textes
─────────────        ─────────────         ─────────────
[Hex] [Nom]          [Hex] [Nom]           [Hex] [Nom]
[...]                [...]                 [...]
​```

## Liens avec les Valeurs de Marque

| Valeur Marque | Traduction Visuelle |
|---------------|---------------------|
| [Valeur 1] | [Comment elle se manifeste visuellement] |
| [Valeur 2] | [Comment elle se manifeste visuellement] |
| [Valeur 3] | [Comment elle se manifeste visuellement] |

## Fichiers

| Fichier | Usage | Consommateur |
|---------|-------|--------------|
| moodboard.md | Références analysées avec mesures | Inspiration, validation |
| visual-vocabulary.md | Termes → valeurs CSS précises | A06 (Design Tokens) |
| constraints.md | Règles ON FAIT / ON NE FAIT PAS | B01-B04 (Frontend) |
| emotion-map.md | Émotion cible par section | A05 (Wireframes), B02-B03 |
| art-direction-philosophy.md | Manifeste esthétique | Référence créative |
| art-direction-board.png | Planche visuelle concrète | B01-B03 (validation visuelle) |

## Usage par Étape

- **A04 (Structure)** : Consulter emotion-map.md pour la séquence des sections
- **A05 (Wireframes)** : Intégrer les émotions par section et les éléments signature
- **A06 (Design Tokens)** : Implémenter visual-vocabulary.md en CSS custom properties
- **B01-B03 (Frontend)** : Valider chaque composant contre constraints.md + art-direction-board.png
- **B04 (Polish)** : Exécuter le Test Rapide sur chaque page
```

---

## Phase 3 : Art Direction Board (`/canvas-design`)

**Obligatoire.** Une fois les 4 fichiers markdown + README produits, invoquer `/canvas-design` pour matérialiser la vision visuelle en une planche concrète.

### Brief pour le skill

Synthétiser en un paragraphe dense les éléments clés issus des fichiers produits. Le brief doit être **ancré dans la carte de dérivation** (Phase 1.2) :

```
/canvas-design Art direction board pour [NOM_PROJET] — [description du positionnement, archétype].
Palette : [couleurs principales + noms évocateurs de colors.md].
Typo : [polices + rôles de typography.md].
Mood : [émotion dominante hero + 2-3 émotions secondaires de emotion-map.md].
Contraintes : [3-5 règles ON FAIT clés de constraints.md].
Vocabulaire spatial : [radius, espacement, formes de visual-vocabulary.md].
Équation visuelle : [L'équation du moodboard].
```

### Ce que le skill produit

1. **`art-direction-philosophy.md`** — Manifeste esthétique nommé (ex: "Warm Stillness", "Organic Comfort"). 4-6 paragraphes décrivant l'univers visuel du projet. Conserver pour traçabilité.
2. **`art-direction-board.png`** (ou `.pdf`) — Composition visuelle synthétisant palette, typographies, formes, espacement et mood en une seule planche. C'est une **planche d'ambiance matérialisée**, pas un mockup UI.

### Usage en Phase B

Le board sert de **référence visuelle concrète** pour `/frontend-design`. Lors du vibe coding (B01-B03), le développeur peut regarder le board pour vérifier la cohérence avec la direction artistique, au lieu de s'appuyer uniquement sur des descriptions textuelles.

---

## Phase 4 : Validation

### Règles de Rédaction (à respecter dans tous les fichiers)

#### Être Spécifique

❌ "Utiliser des titres grands"
✅ "H1 = clamp(3rem, 6vw + 1rem, 4.5rem)"

❌ "Espacement généreux entre sections"
✅ "160px desktop / 96px mobile, jamais en dessous de 120px / 80px"

❌ "Animations subtiles"
✅ "Transitions = translateY(-4px), 300ms ease-out"

#### Justifier Chaque Choix

Chaque contrainte, chaque valeur doit être liée à :
- Un composant de la plateforme de marque (archétype, valeur, promesse)
- Ou un pattern validé dans le moodboard
- Ou une exigence technique du brief (mobile-first, performance)

#### Traçabilité

Chaque fichier commence par un commentaire `<!-- Dérive de : ... -->` indiquant ses sources dans la plateforme de marque et le moodboard.

### Checklist de Validation

#### Diagnostic & Dérivation (Phase 1)

- [ ] Tous les fichiers de `01-brand/` ont été lus (8 fichiers)
- [ ] `00-brief.md` lu pour les pages prévues et le contexte technique
- [ ] Carte de dérivation complète (archétype, valeurs, palette, polices, registre, promesse)
- [ ] Chaque ligne de la carte a une expression visuelle concrète (pas de "[À définir]")

#### Moodboard

- [ ] 5+ références analysées avec **URLs réelles vérifiables**
- [ ] Mesures concrètes pour chaque référence (px, ratios, hex)
- [ ] Cohérence avec l'archétype évaluée pour chaque référence
- [ ] Tableau "Patterns Communs" avec 10+ patterns évalués
- [ ] Chaque décision du tableau est justifiée par un lien brand
- [ ] Synthèse Visuelle : équation nommée
- [ ] Mots-clés visuels : 5+ avec traductions concrètes

#### Vocabulaire Visuel

- [ ] 8 catégories couvertes : espacements, typo, transitions, couleurs, formes, ombres, layout, breakpoints
- [ ] Chaque terme a une valeur CSS précise (pas de fourchettes vagues)
- [ ] Valeurs responsive présentes (desktop + mobile pour espacements, typo)
- [ ] Couleurs en OKLCH + Hex (cohérent avec `01-brand/colors.md`)

#### Contraintes

- [ ] 8+ règles "ON FAIT" organisées par catégorie
- [ ] 8+ règles "ON NE FAIT PAS" organisées par catégorie
- [ ] Chaque règle justifiée (lien marque, moodboard, ou technique)
- [ ] Section "Exceptions Autorisées" présente avec contexte et conditions
- [ ] Test Rapide avec 8 critères spécifiques au projet
- [ ] Scoring documenté (8/8, 6-7/8, < 6/8)

#### Carte des Émotions

- [ ] Chaque section homepage a : émotion primaire + secondaire + tension + élément signature
- [ ] Chaque page secondaire a : émotion globale + parcours émotionnel + élément signature
- [ ] Tableau récapitulatif (section / émotion / couleur / élément)
- [ ] Courbe émotionnelle du parcours avec objectif narratif

#### Art Direction Board

- [ ] `/canvas-design` invoqué avec brief synthétisant les 4 fichiers + carte de dérivation
- [ ] `art-direction-philosophy.md` produit (manifeste nommé, 4-6 paragraphes)
- [ ] `art-direction-board.png` (ou .pdf) produit
- [ ] Le board reflète la palette de `01-brand/colors.md`
- [ ] Les typographies correspondent à `01-brand/typography.md`
- [ ] L'ambiance est cohérente avec `emotion-map.md` (émotion hero)
- [ ] Les contraintes de `constraints.md` sont respectées visuellement
- [ ] Le board est une composition artistique, pas un mockup d'interface

#### README & Cohérence

- [ ] README contient : ADN visuel, équation, test rapide, palette résumée, liens valeurs, fichiers, usage
- [ ] Tous les fichiers commencent par `<!-- Dérive de : ... -->`
- [ ] Aucune valeur en conflit entre visual-vocabulary.md et constraints.md
- [ ] Les couleurs de visual-vocabulary.md correspondent à `01-brand/colors.md`
- [ ] Les polices de visual-vocabulary.md correspondent à `01-brand/typography.md`

## Prochaine Étape

Une fois `output/02-art-direction/` complet (7 fichiers, checklist passée) → Passer à `stages/A04-structure.md`

---

**Version** : 2.0
**Phase** : A03 (Architecture)
**Dépendances** : A02 (01-Brand)
**Tooling** : Subagent websearch (références), `/canvas-design` (art direction board)
**Produit pour** : A04 (Structure), A05 (Wireframes), A06 (Design Tokens), B01-B04 (Frontend)
