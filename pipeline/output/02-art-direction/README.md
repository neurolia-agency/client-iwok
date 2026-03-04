# Direction Artistique — IWOK

## ADN Visuel

| Aspect | Valeur |
|--------|--------|
| Couleur signature | Ocre Artiste (#C8962D / oklch(0.69 0.14 75)) |
| Couleur action | Terracotta (#BC5B3A / oklch(0.55 0.14 42)) |
| Background principal | Craie (#FAFAF7) / Sable (#F5F2ED) alternés |
| Background immersif | Noir Mural (#1C1917) — hero, footer, sections d'impact |
| Forme signature | Images plein écran radius 0 (fresque bord-à-bord) + cards radius 8px |
| Mouvement | Reveal au scroll (800ms, cubic-bezier(0.16, 1, 0.3, 1)) + smooth scroll Lenis |
| Structure | Hero → Portfolio Aperçu → Services → Témoignages → CTA (alternance clair/sombre) |
| Espace sections | 160px desktop / 96px mobile (breathing whitespace) |
| Radius | 0px images full-bleed, 8px cards/boutons, 9999px badges/tags |
| Typographies | Syne (titres, 800 pour H1) + Inter (body) |
| Texture | Grain photographique naturel des photos in-situ — pas de filtre, pas d'overlay artificiel |

## Équation Visuelle

```
IWOK = Immersion Murale + Chaleur Terrienne + Reveal de Transformation

Immersion Murale    = Typographie Syne 800 plein écran + images bord-à-bord + scroll smooth Lenis
                      → Chaque section est un mur qu'on découvre en marchant

Chaleur Terrienne   = Palette Ocre/Terracotta/Noir Mural + fonds Craie/Sable + aucune couleur froide
                      → Les pigments naturels de la fresque historique

Reveal de Transformation = Clip-path hero + scroll reveal sections + split-text titres
                           → Le Magician : chaque scroll est une métamorphose visible
```

## Test Rapide "Est-ce IWOK ?"

- [ ] Les images de fresques sont en plein écran, sans radius, immersives ?
- [ ] La palette est exclusivement chaude (ocre, terracotta, noir chaud, crème) — aucune couleur froide ?
- [ ] Les titres en Syne 800 ont l'impact visuel d'un lettrage mural — ils occupent l'espace ?
- [ ] Le whitespace entre sections est généreux (≥120px desktop) — le site respire ?
- [ ] Le scroll est smooth et les sections se révèlent progressivement — pas d'apparition brutale ?
- [ ] L'alternance fond clair/sombre crée un rythme visuel — pas de monotonie ?
- [ ] Le hero a une animation de reveal (clip-path ou split-text) — la première impression est une transformation ?
- [ ] L'Ocre Artiste est rare et impactant (CTA, highlights) — pas dilué dans le fond ?

→ 8/8 = ✅ Conforme | 6-7/8 = ⚠️ Revoir | < 6/8 = ❌ Refaire

## Palette Résumée

```
Backgrounds          Accents               Textes
─────────────        ─────────────         ─────────────
#FAFAF7 Craie        #C8962D Ocre Artiste  #1C1917 Encre
#F5F2ED Sable        #BC5B3A Terracotta    #2D2926 Charbon
#EDEAE4 Pierre       #DDB65A Ocre clair    #57534E Graphite
#1C1917 Noir Mural   #D07A5C Terra. clair  #78716C Cendre
#D6D0C6 Grès                               #A8A29E Poussière
```

## Liens avec les Valeurs de Marque

| Valeur Marque | Traduction Visuelle |
|---------------|---------------------|
| Authenticité | Photos in-situ uniquement (jamais stock). Palette terrienne de pigments naturels. Textures brutes sans filtre. Processus visible (croquis → réalisation). Noir Mural chaud, pas noir pur artificiel |
| Sur-mesure | Compositions uniques par section (pas de grille rigide). Syne expressive donne un caractère propre aux titres. Chaque page a sa personnalité. Les cards de services ont des taglines distinctes |
| Polyvalence | Galerie multi-catégories filtrable (entreprises, événementiel, participatif, particuliers). Masonry = formats variés. La diversité des photos (murs, véhicules, sols, containers) est mise en valeur, pas cachée |

## Fichiers

| Fichier | Usage | Consommateur |
|---------|-------|--------------|
| moodboard.md | 7 références analysées avec mesures + carte de dérivation + patterns communs + équation visuelle | Inspiration, validation, briefing design |
| visual-vocabulary.md | 8 catégories de termes → valeurs CSS précises (espacements, typo, transitions, couleurs, formes, ombres, layout, breakpoints) | A06 (Design Tokens) — traduction directe en CSS custom properties |
| constraints.md | 12 règles ON FAIT + 12 règles ON NE FAIT PAS + 6 exceptions + test rapide 8 critères | B01-B04 (Frontend) — validation de chaque composant |
| emotion-map.md | Émotion cible par section (hero, portfolio, services, témoignages, CTA) + pages secondaires + courbe émotionnelle | A05 (Wireframes), B02-B03 — guide le contenu et le rythme |
| art-direction-philosophy.md | Manifeste esthétique nommé (4-6 paragraphes) | Référence créative pour toute la Phase B |
| art-direction-board.png | Planche visuelle concrète (palette, typo, formes, mood) | B01-B03 — validation visuelle par comparaison |

## Usage par Étape

- **A04 (Structure)** : Consulter emotion-map.md pour la séquence des sections et le parcours émotionnel
- **A05 (Wireframes)** : Intégrer les émotions par section, les éléments signature, et le visual-vocabulary pour les proportions
- **A06 (Design Tokens)** : Implémenter visual-vocabulary.md en CSS custom properties dans globals.css
- **B01-B03 (Frontend)** : Valider chaque composant contre constraints.md (test rapide) + art-direction-board.png (cohérence visuelle)
- **B04 (Polish)** : Exécuter le test rapide "Est-ce IWOK ?" sur chaque page. Vérifier la courbe émotionnelle
