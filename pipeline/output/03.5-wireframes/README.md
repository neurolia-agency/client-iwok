# Wireframes — IWOK / GuiHome Décoration

> Produit par l'étape A05-Wireframes — 2026-02-23 (v1)
> Source unique de contenu pour les étapes B01-B03

---

## Fichiers

| Fichier | Route | Sections | Complexité |
|---------|-------|----------|-----------|
| `homepage.md` | `/` | 5 sections + header | Haute (reverse-scroll + clip-path) |
| `portfolio.md` | `/portfolio` | 3 sections | Très haute (GSAP Flip + Lightbox) |
| `services.md` | `/services` | 4 sections | Moyenne (accordéons + timeline) |
| `about.md` | `/a-propos` | 4 sections | Haute (sticky scroll narratif) |
| `contact.md` | `/contact` | 3 sections | Moyenne (formulaire Server Action) |

---

## Principe

Les wireframes **référencent** les fichiers brand sans dupliquer leur contenu :

```
positioning.md > tagline           → "Du mur blanc à l'oeuvre unique."
positioning.md > cta_principal     → "Demander un devis" → /contact
services.md > design-mural > tagline → "Votre vision, notre trait"
visual-vocabulary.md > transitions > clip-path reveal → inset(100% 0 0 0) → inset(0 0 0 0), 1200ms
```

---

## Usage par étape

| Étape | Lire |
|-------|------|
| B01-Layout | `03-sitemap.md` (navigation + footer) uniquement |
| B02-Homepage | `homepage.md` uniquement |
| B03-Portfolio | `portfolio.md` uniquement |
| B03-Services | `services.md` uniquement |
| B03-About | `about.md` uniquement |
| B03-Contact | `contact.md` uniquement |

**Important** : Toujours valider contre `02-art-direction/constraints.md` avant implémentation

---

## Architecture des fonds (alternance sombre/clair)

Règle `constraints.md` : pas plus de 2 sections claires consécutives.

### Homepage
```
Hero                → Noir Mural (fond immersif)
Portfolio Aperçu    → Noir Mural (continuité immersive)
Services Aperçu     → Sable (respiration)
Témoignages         → Craie
CTA Final           → Noir Mural
```

### Portfolio
```
Hero                → Noir Mural
Galerie             → Craie (les photos se détachent sur fond clair)
CTA Contextuel      → Sable
```

### Services
```
Hero                → Noir Mural
Grille Services     → Craie/Sable (alternance interne)
Process             → Noir Mural
CTA                 → Sable
```

### À Propos
```
Hero + Portrait     → Noir Mural
Storytelling        → Alternance Noir/Craie/Sable/Noir (4 chapitres)
Chiffres Clés       → Noir Mural
CTA                 → Sable
```

### Contact
```
Header              → Noir Mural
Formulaire          → Craie
Coordonnées         → Sable
```

---

## Animations signature par page

| Page | Animation principale |
|------|---------------------|
| Homepage hero | `clip-path reveal` (image) + `split-text reveal` (H1) |
| Portfolio | GSAP Flip (filtres) + `clip-path reveal` (lightbox) |
| Services | Counter animation (chiffres), timeline drawn au scroll |
| About | Sticky scroll chapitres + counter animation chiffres |
| Contact | Transition form → confirmation douce |

---

## Validation A05-Wireframes

- [x] 5 wireframes créés (+ README)
- [x] Format strict respecté (pas de texte dupliqué)
- [x] Références `fichier.md > clé` utilisées systématiquement
- [x] Sections numérotées
- [x] Notes design présentes (layout, interaction, ref) pour chaque section
- [x] Contraintes `constraints.md` respectées (alternance fonds, palette chaude, radius images)
- [x] Mobile-first documenté (breakpoints, stack vertical mobile)
- [x] Animations référencées depuis `visual-vocabulary.md`

## Prochaine Étape

Wireframes validés → Passer à `stages/A06-design-tokens.md`
