# Étape A5 : Wireframes

> **Phase A : Architecture** - Définition du contenu de chaque page.

## Objectif

Créer un brief structuré pour chaque page, servant d'**unique source de contenu** pour la Phase B (frontend-design).

**Principe clé** : Les wireframes **référencent** les fichiers brand/ sans dupliquer leur contenu.

## Input

- `output/01-brand/` (tous les fichiers)
- `output/01.5-art-direction/` (contraintes, vocabulaire)
- `output/03-sitemap.md` (architecture pages)

## Output

```
output/03.5-wireframes/
├── README.md
├── homepage.md
├── services.md
├── portfolio.md
├── about.md
└── contact.md
```

## Format Wireframe (STRICT)

Chaque wireframe suit ce format minimal :

```markdown
# [Page] - Wireframe

**Route** : /[route]
**Objectif** : [1 phrase]

---

## Section 1 : [Nom]

**Contenu** :
- H1 : `positioning.md > tagline`
- Baseline : `positioning.md > baseline`
- CTA : `positioning.md > cta_principal` → /contact

**Layout** : [Description courte]
**Interaction** : [hover/scroll/click]
**Ref design** : [Site de référence]

---

## Section 2 : [Nom]

[Même structure...]
```

### Règles du Format

1. **Pas de texte dupliqué** : Utiliser la notation `fichier.md > clé` pour référencer brand/
2. **Sections numérotées** : Ordre d'apparition sur la page
3. **1 section = 1 bloc** : Sera traité individuellement par frontend-design
4. **Notes design courtes** : Référence visuelle + contrainte principale

## Notation des Références

| Notation | Signification |
|----------|---------------|
| `fichier.md > clé` | Valeur à récupérer dans le fichier brand/ |
| `fichier.md > array[0-2]` | Premiers éléments d'une liste |
| `(placeholder)` | Contenu à définir plus tard |
| `→ /route` | Destination du lien/CTA |

## Exemple : Homepage

```markdown
# Homepage - Wireframe

**Route** : /
**Objectif** : Captiver, différencier, convertir

---

## Section 1 : Hero

**Contenu** :
- H1 : `positioning.md > tagline`
- Baseline : `positioning.md > baseline`
- CTA : `positioning.md > cta_principal` → /contact

**Layout** : Plein écran, centré, typographie seule (pas d'image)
**Interaction** : Fade-in staggered au load
**Ref design** : [Site référence]

---

## Section 2 : Services (aperçu)

**Contenu** :
- Titre : `positioning.md > messages > services`
- Cards : `services.md > services[0-2]` (3 premiers services)
- Lien : "Voir tous les services" → /services

**Layout** : Grid 3 colonnes (1 col mobile)
**Interaction** : Hover translateY(-4px)
**Ref design** : [Site référence]

---

## Section 3 : Portfolio (aperçu)

**Contenu** :
- Titre : `positioning.md > messages > portfolio`
- Projets : 2-3 projets (placeholder)
- Lien : "Voir nos réalisations" → /portfolio

**Layout** : Asymétrique, images grandes
**Interaction** : Hover overlay avec titre

---

## Section 4 : Témoignages

**Contenu** :
- Titre : "Ils nous font confiance"
- Témoignages : 2 citations (placeholder)

**Layout** : Stack vertical ou 2 colonnes

---

## Section 5 : CTA Final

**Contenu** :
- Titre : "Prêt à démarrer votre projet ?"
- CTA : `positioning.md > cta_principal` → /contact

**Layout** : Pleine largeur, fond accent subtil
```

## Pages à Créer

| Page | Sections principales |
|------|---------------------|
| homepage.md | Hero, Services, Portfolio, Témoignages, CTA |
| services.md | Hero, Grid services, Process, FAQ, CTA |
| portfolio.md | Hero, Grid projets, Étude de cas, CTA |
| about.md | Hero, Mission, Valeurs, Équipe, Chiffres, CTA |
| contact.md | Hero, Formulaire, Coordonnées |

## README.md

Créer un index :

```markdown
# Wireframes - [NOM_PROJET]

Source unique de contenu pour les étapes B1-B3.

## Fichiers

| Fichier | Route | Sections |
|---------|-------|----------|
| homepage.md | / | X sections |
| services.md | /services | X sections |
| portfolio.md | /portfolio | X sections |
| about.md | /about | X sections |
| contact.md | /contact | X sections |

## Principe

Les wireframes référencent les fichiers brand sans dupliquer :
```
positioning.md > tagline
services.md > services[0-2]
```

## Usage

| Étape | Lire |
|-------|------|
| B1-Layout | 03-sitemap.md uniquement |
| B2-Homepage | homepage.md uniquement |
| B3-Pages | Le wireframe de chaque page |

**Important** : Toujours valider contre `01.5-art-direction/constraints.md`
```

## Validation

- [ ] 5 wireframes créés (+ README)
- [ ] Format strict respecté (pas de texte dupliqué)
- [ ] Références `fichier.md > clé` utilisées
- [ ] Sections numérotées
- [ ] Notes design présentes (layout, interaction, ref)

## Prochaine Étape

Une fois les wireframes créés → Passer à `stages/02-design.md`

---

**Version** : 1.0
**Phase** : A5 (Architecture)
**Dépendances** : A3 (01.5-Art Direction), A4 (03-Structure)
**Produit pour** : A6 (02-Design), B1-B3 (Frontend)
