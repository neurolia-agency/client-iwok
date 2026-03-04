# Regle : Attribution des modeles par tache — IWOK Muraliste

Quand tu lances des agents en parallele (Task tool), tu DOIS consulter ce tableau pour affecter le bon `model` a chaque agent.

## Principe

| Modele | Usage | Cout |
|--------|-------|------|
| **haiku** | Restructuration brief, sitemap, design tokens, pages statiques simples, contenu placeholder | $ |
| **sonnet** | Creativite verbale/visuelle (brand, art direction), composants UI, wireframes, pages complexes | $$ |
| **opus** | Architecture complexe, decisions multi-systeme, orchestration | $$$ |

## Contexte projet

**IWOK** est un site vitrine artiste/portfolio. Pas de e-commerce, pas de CMS complexe, pas d'auth.
La complexite est dans la **direction artistique** (portfolio immersif, 15 ans de creations murales) et la **qualite visuelle** du rendu final.

---

## Phase A : Architecture (SEQUENTIEL — chaque etape nourrit la suivante)

| Etape | Modele | Skill requis | Justification |
|-------|--------|-------------|---------------|
| A01-Init | **haiku** | — | Restructuration d'un brief existant deja riche, pas de creativite |
| A02-Brand (diagnostic) | **haiku** | — | Lecture/analyse, pas de production |
| A02-Brand (plateforme) | **sonnet** | — | Frameworks strategiques (Kapferer, Brand Key, archetypes) |
| A02-Brand (expression verbale) | **sonnet** | `/brand-expression` | Creativite verbale : tagline, tone, positioning, about, services |
| A02-Brand (expression visuelle) | **sonnet** | — | Personas narratifs, systeme couleurs, systeme typo |
| A02-Brand (validation) | **haiku** | — | Checklist mecanique, pas de creativite |
| A03-Art Direction (diagnostic) | **sonnet** | websearch subagent | Recherche references visuelles, carte derivation |
| A03-Art Direction (production) | **sonnet** | — | 4 fichiers markdown (moodboard, vocabulary, constraints, emotions) |
| A03-Art Direction (board) | **sonnet** | `/canvas-design` | Planche visuelle concrete |
| A03-Art Direction (validation) | **haiku** | — | Checklist mecanique |
| A04-Structure | **haiku** | — | Sitemap mecanique depuis brief + services |
| A05-Wireframes | **sonnet** | — | Contenu par page, structure narrative, decisions de layout |
| A06-Design Tokens | **haiku** | — | Traduction mecanique visual-vocabulary.md → CSS |

### Execution Phase A

Phase A est **strictement sequentielle**. Pas de parallelisation possible — chaque etape depend de la precedente.

```
A01 → A02 (4 sous-phases) → A03 (4 sous-phases) → A04 → A05 → A06
```

**Estimation tokens Phase A** :
- haiku : A01, A02-diag, A02-valid, A03-valid, A04, A06 = 6 appels legers
- sonnet : A02-platform, A02-verbal, A02-visual, A03-diag, A03-prod, A03-board, A05 = 7 appels moyens
- opus : 0 (pas de complexite architecturale)

---

## Phase B : Design / Vibe Coding (PARALLELISABLE)

### Prerequis Phase B

Avant de lancer Phase B, s'assurer que :
- [ ] `app/globals.css` genere (A06)
- [ ] Projet Next.js initialise (`npx create-next-app`)
- [ ] Dependencies installees (motion, lenis)

### Taches Phase B

| Tache | Modele | Skill | Effort | Isolation |
|-------|--------|-------|--------|-----------|
| B01-Layout (header + footer + layout.tsx) | sonnet | `/frontend-design` | medium | — |
| B02-Homepage hero | sonnet | `/frontend-design` | high | worktree |
| B02-Homepage services apercu | sonnet | `/frontend-design` | medium | worktree |
| B02-Homepage portfolio apercu | sonnet | `/frontend-design` | high | worktree |
| B02-Homepage temoignages + CTA | haiku | `/frontend-design` | low | worktree |
| B03-Portfolio (galerie filtrable) | sonnet | `/frontend-design` | high | worktree |
| B03-Services | haiku | `/frontend-design` | medium | worktree |
| B03-About | haiku | `/frontend-design` | medium | worktree |
| B03-Contact (formulaire devis) | sonnet | `/frontend-design` | medium | worktree |
| B03-Mentions legales | haiku | — | low | worktree |
| B04-Polish (animations + SEO) | sonnet | — | medium | — |
| B05-Validate | haiku | — | low | — |

### Groupes de lancement parallele

#### Batch B-0 : Init (sequentiel, prerequis)
1. Initialiser projet Next.js + installer deps
2. B01-Layout → `model: "sonnet"`, skill: `/frontend-design`

> B01 doit etre termine avant tous les autres batches B.

#### Batch B-1 : Homepage (3 agents paralleles)
- B02-Hero → `model: "sonnet"`, skill: `/frontend-design`, `isolation: "worktree"`
- B02-Portfolio apercu → `model: "sonnet"`, skill: `/frontend-design`, `isolation: "worktree"`
- B02-Services apercu + Temoignages + CTA → `model: "haiku"`, skill: `/frontend-design`, `isolation: "worktree"`

#### Batch B-2 : Pages secondaires (4 agents paralleles)
- B03-Portfolio (galerie filtrable) → `model: "sonnet"`, skill: `/frontend-design`, `isolation: "worktree"`
- B03-Contact (formulaire devis) → `model: "sonnet"`, skill: `/frontend-design`, `isolation: "worktree"`
- B03-Services → `model: "haiku"`, skill: `/frontend-design`, `isolation: "worktree"`
- B03-About + Mentions legales → `model: "haiku"`, skill: `/frontend-design`, `isolation: "worktree"`

#### Batch B-3 : Finitions (sequentiel)
1. Merge tous les worktrees
2. B04-Polish → `model: "sonnet"` (animations, SEO, performance)
3. B05-Validate → `model: "haiku"` (checklist, Lighthouse)

---

## Pages specifiques IWOK

Le site IWOK a des besoins specifiques lies au metier d'artiste muraliste :

### Portfolio — Composant cle (B03-Portfolio)
- **Galerie filtrable** par categorie : entreprises/collectivites, evenementiel, participatif, particuliers
- **Lightbox** pour visualiser les photos en grand
- **Lazy loading** des images (beaucoup de photos HD)
- **Composant le plus complexe** du site → sonnet obligatoire

### Contact — Formulaire devis (B03-Contact)
- Formulaire de demande de devis (pas un simple contact)
- Champs : type de projet, surface estimee, lieu, description du projet
- Server Action pour envoi

### Homepage — Portfolio apercu
- Mise en avant immersive (grandes images, impact visuel)
- **Le portfolio EST le hero** pour un artiste → traitement visuel premium

---

## Agents custom (subagent_type)

| Agent | subagent_type | Usage |
|-------|--------------|-------|
| **general-purpose** | `general-purpose` | Phase A (toutes etapes), orchestration, taches generales |
| **general-purpose** | `general-purpose` | Phase B (composants UI avec `/frontend-design`) |
| **websearch** | `websearch` | Recherche references visuelles (A03) |

> Pas besoin d'agents custom specialises pour IWOK (pas de data layer, pas de CMS, pas d'auth).
> Tous les agents Phase B utilisent `general-purpose` avec le skill `/frontend-design`.

---

## Regle post-agent : Checklist verification humaine (IMMUABLE)

**OBLIGATOIRE** : Apres chaque completion d'agent, fournir une checklist de verifications humaines.

### Ce que l'agent verifie (deterministe)
- `npm run build` passe
- Pas d'erreurs TypeScript
- Imports corrects
- Fichiers crees aux bons emplacements

### Ce que l'humain DOIT verifier (non-deterministe)

```
## Verifications humaines — [Nom de la tache]

### Visuel
- [ ] Ouvrir `http://localhost:3000/...`
- [ ] Verifier a 1920px : ...
- [ ] Verifier a 375px : ...

### Fonctionnel
- [ ] Cliquer sur ... → doit ...
- [ ] Filtrer par ... → doit ...

### Portfolio (specifique IWOK)
- [ ] Les photos chargent correctement
- [ ] Le filtre par categorie fonctionne
- [ ] La lightbox s'ouvre et se ferme
- [ ] Lazy loading des images (pas de chargement massif au load)

### Navigation
- [ ] Lien "..." mene a ...
- [ ] Menu mobile fonctionne

### Contenu
- [ ] Les placeholders [A COMPLETER] sont visibles
- [ ] Les textes brand sont corrects (tagline, tone)
```

---

## Resume economie tokens

| Phase | Haiku | Sonnet | Opus | Total appels |
|-------|-------|--------|------|-------------|
| A (sequentiel) | 6 | 7 | 0 | 13 |
| B (parallele) | 5 | 7 | 0 | 12 |
| **Total** | **11** | **14** | **0** | **25** |

**Economie vs tout-sonnet** : ~35% (11 appels haiku au lieu de sonnet)
**Economie vs tout-opus** : ~75% (zero opus necessaire — site vitrine sans backend complexe)

---

*Derniere mise a jour : 2026-02-23*
