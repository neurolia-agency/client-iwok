# Dépendances Inter-Étapes

Matrice des inputs/outputs par étape du pipeline.

## Vue d'Ensemble

```
═══════════════════════════════════════════════════════════════════════════════
                        PHASE A : ARCHITECTURE
              (Définit CE QUI sera construit - Markdown uniquement)
═══════════════════════════════════════════════════════════════════════════════

pipeline/input/brief-client.md
        │
        ▼
┌──────────────────┐
│   A01: Init      │ → pipeline/output/01-brief.md
└──────────────────┘
        │
        ▼
┌──────────────────┐
│   A02: Brand     │ → pipeline/output/02-brand/ (7 fichiers)
└──────────────────┘
        │
        ├──────────────────────────────────────┐
        ▼                                      ▼
┌──────────────────┐                  ┌──────────────────┐
│ A03: Art Dir     │                  │  A04: Structure  │
└──────────────────┘                  └──────────────────┘
        │                                      │
        │  pipeline/output/03-art-direction/   │  pipeline/output/04-sitemap.md
        │                                      │
        └──────────────┬───────────────────────┘
                       ▼
              ┌──────────────────┐
              │ A05: Wireframes  │ → pipeline/output/05-wireframes/
              └──────────────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ A06: Design      │ → app/globals.css
              └──────────────────┘

═══════════════════════════════════════════════════════════════════════════════
                     PHASE B : DESIGN / VIBE CODING
                   (Construit le site avec /frontend-design)
═══════════════════════════════════════════════════════════════════════════════

              ┌──────────────────┐
              │   B01: Layout    │ → components/layout/
              └──────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                              ▼
┌──────────────────┐          ┌──────────────────┐
│   B02: Homepage  │          │   B03: Pages     │
└──────────────────┘          └──────────────────┘
        │                              │
        └──────────────┬───────────────┘
                       ▼
              ┌──────────────────┐
              │   B04: Polish    │
              └──────────────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   B05: Validate  │
              └──────────────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   B06: Deploy    │
              └──────────────────┘
```

## Matrice Détaillée

### Phase A : Architecture

| Étape | Stage | Inputs Requis | Outputs | Dépend de |
|-------|-------|---------------|---------|-----------|
| **A01** | `A01-init.md` | `pipeline/input/brief-client.md` | `pipeline/output/01-brief.md` | - |
| **A02** | `A02-brand.md` | `01-brief.md` | `pipeline/output/02-brand/` (7 fichiers) | A01 |
| **A03** | `A03-art-direction.md` | `02-brand/` (tous) | `pipeline/output/03-art-direction/` (5 fichiers) | A02 |
| **A04** | `A04-structure.md` | `01-brief.md`, `02-brand/services.md` | `pipeline/output/04-sitemap.md` | A02 |
| **A05** | `A05-wireframes.md` | `02-brand/`, `03-art-direction/`, `04-sitemap.md` | `pipeline/output/05-wireframes/` | A03, A04 |
| **A06** | `A06-design-tokens.md` | `03-art-direction/`, `05-wireframes/` | `app/globals.css` | A03, A05 |

### Phase B : Design / Vibe Coding

| Étape | Stage | Inputs Requis | Outputs | Dépend de |
|-------|-------|---------------|---------|-----------|
| **B01** | `B01-layout.md` | `app/globals.css`, `04-sitemap.md` | `components/layout/` | A06 |
| **B02** | `B02-homepage.md` | `05-wireframes/homepage.md` | `components/sections/`, `app/page.tsx` | B01 |
| **B03** | `B03-pages.md` | `05-wireframes/*.md` | `app/[pages]/`, `components/pages/` | B01 |
| **B04** | `B04-polish.md` | Composants B01-B03 | Animations, SEO | B02, B03 |
| **B05** | `B05-validate.md` | Tout `output/`, site assemblé | `pipeline/output/validation.md` | B04 |
| **B06** | `B06-deploy.md` | Validation PASS | Production | B05 |

### Parallélisme

- **A03** et **A04** peuvent démarrer en parallèle après A02
- **B02** et **B03** peuvent être développés en parallèle après B01
- Progression recommandée : **linéaire** pour simplifier le suivi

## Règles de Lecture de Contexte

### Pattern "Lazy Context Loading"

Les étapes B02-B03 utilisent un chargement paresseux :

1. **Lire d'abord** le wireframe de la page concernée
2. **Résoudre à la demande** les références vers `02-brand/`
3. **Ne pas pré-charger** tout le dossier brand/

```
Exemple pour Homepage :
1. Lire pipeline/output/05-wireframes/homepage.md
2. Trouver référence "positioning.md > tagline"
3. Lire pipeline/output/02-brand/positioning.md pour résoudre
4. Continuer avec la section suivante
```

### Fichiers Toujours Accessibles

Ces fichiers peuvent être lus à **toute étape** :

- `app/globals.css` - Design tokens
- `pipeline/output/03-art-direction/constraints.md` - Règles design
- `pipeline/output/03-art-direction/visual-vocabulary.md` - Traductions visuelles
- `CLAUDE.md` - Statut et contexte global

## Composants Partagés

| Composant | Créé à | Utilisé par |
|-----------|--------|-------------|
| `AnimatedSection` | B02 | B02, B03 (toutes pages) |
| `CtaFinal` | B02 | B03 (Services, Portfolio, About) |
| `SmoothScrollProvider` | B01 | B01+ (layout global) |

---

*Template Workflow v2.0 - 2026-02-02*
