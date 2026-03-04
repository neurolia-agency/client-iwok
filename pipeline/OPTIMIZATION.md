# Pipeline Optimization — IWOK Muraliste

## Statut Courant

| Champ | Valeur |
|-------|--------|
| **Étape active** | B01-Layout (prochaine) |
| **Dernière complétée** | A06-Design Tokens |
| **Bloqueurs** | Aucun |

## Journal des Décisions

| Date | Changement | Raison |
|------|-----------|--------|
| 2026-02-23 | A01-Init complétée → `output/00-brief.md` créé | Brief client restructuré en document stratégique. 10/11 critères validés. Seules les références visuelles manquent (en attente client). |
| 2026-02-23 | Références visuelles ajoutées au brief | 2 sites (fourmula.ai, siemprericc.com) + 7 animations codées (GSAP, WebGL, clip-mask…). Validation 11/11. A03 débloquée. |
| 2026-02-23 | A02-Brand complétée → `output/01-brand/` (8 fichiers) | Plateforme stratégique (Brand Key, Kapferer, Creator+Magician), expression verbale (tagline, positioning, about, services, tone), identité visuelle (personas, colors OKLCH, typography Syne+Inter). Validation 44/44 items. |
| 2026-02-23 | A03-Art Direction complétée → `output/02-art-direction/` (7 fichiers) | Phase 1: Carte de dérivation brand→visuel + 7 références analysées (2 client + 5 websearch dont 2 Awwwards). Phase 2: moodboard.md, visual-vocabulary.md (8 catégories CSS), constraints.md (12 ON FAIT + 12 ON NE FAIT PAS), emotion-map.md (courbe émotionnelle complète). Phase 3: art-direction-philosophy.md "Pigment Revelation" + art-direction-board.png (2400x1600). Équation: IWOK = Immersion Murale + Chaleur Terrienne + Reveal de Transformation. |
| 2026-02-23 | A04-Structure complétée → `output/03-sitemap.md` | 6 pages définies (Accueil, Portfolio, Services, À Propos, Contact, Mentions légales). Sections spécifiées avec messages positioning.md + émotions emotion-map.md. Galerie filtrable (4 catégories) et formulaire de devis (7 champs) détaillés. URLs SEO définies. |
| 2026-02-23 | A05-Wireframes complétée → `output/03.5-wireframes/` (6 fichiers) | 5 wireframes (homepage, portfolio, services, about, contact) + README. Format strict : références `fichier.md > clé` sans duplication. Architecture fonds documentée (alternance Noir Mural/Craie/Sable). Animations signature par page (clip-path hero, GSAP Flip portfolio, sticky scroll about). Galerie filtrable portfolio désignée comme composant le plus complexe (sonnet + GSAP Flip + Lightbox + lazy loading). Validation 7/7 critères. |
| 2026-02-23 | Bibliothèque d'animations créée → `output/animation-library.md` | 7 références code (`pipeline/input/references/animations/`) non analysées en A03 (hors scope). Documentées comme alternatives Phase B avec code disponible. Mapping vers animations planifiées. 2 priorité haute : gsap-clipmask-scrolltrigger (hero) + gsap-flip-plugin-landing-page (portfolio+split-text). |
| 2026-02-23 | 4 animations remplacées dans `visual-vocabulary.md` par les références code locales | Correspondances visuelles identifiées : (1) "split-text reveal" blur+slide → slide-up pur SplitType + CustomEase hop2 (gsap-flip-plugin-landing-page). (2) "clip-path reveal hero" → scrubbed + lettres IWOK qui s'écartent (gsap-clipmask-scrolltrigger). (3) "clip-path reveal image" → polygon centré→plein + scale scrubbed (gsap-scroll-trigger). (4) "colonnes inversées aperçu" ajoutée au Layout (reverse-scrolling-column). "easing hop" et "hop2" ajoutés. Commentaires GSAP CustomEase dans globals.css. 3 références non remplacées (book-gallery, canvas, webgl) : pas de correspondance suffisante. |
| 2026-02-23 | A06-Design Tokens complétée → `app/globals.css` créé | Traduction mécanique des sources (colors.md + typography.md + visual-vocabulary.md + constraints.md) en CSS tokens. Palette OKLCH complète (Ocre, Terracotta, Noir Mural, neutrals chauds), tailles fluides Syne+Inter (clamp), spacing (section 10rem/6rem, padding 7.5rem/4rem), transitions (standard 300ms, reveal 800ms, hero 1200ms), ombres chaudes (Noir Mural base), utilities custom (container-custom, section-padding, full-bleed, dark-section, img-fresque, progress-bar). Projet Next.js non encore initialisé — fichier prêt pour Batch B-0. |

| 2026-02-25 | Restructuration catégories portfolio → `output/04-portfolio-categories.md` + refactor `data/portfolio-projects.ts` + composants gallery | Passage de 4 filtres plats (Entreprises/Événementiel/Particuliers/Participatif) à 4 sections empilées (Projets à la une avec sous-catégories, Intérieur, Extérieur, Coups de cœur). Navigation par ancres au lieu de filtres. 44 projets re-mappés. |

## Changements Propagés au Template

| Date | Fichier modifié | Propagé ? |
|------|----------------|-----------|
| — | — | — |
