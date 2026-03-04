# Contraintes Design

<!-- Dérive de : 00-platform.md (archétype Creator+Magician, valeurs Authenticité/Sur-mesure/Polyvalence), Moodboard (patterns adoptés/rejetés), 01-brand/colors.md, 01-brand/typography.md -->

## ON FAIT (obligatoire)

### Couleurs & Identité

1. **Palette exclusivement chaude** : Toutes les couleurs restent dans l'arc 40°-90° OKLCH (ocre, terracotta, neutres chauds). Aucune couleur froide sauf le bleu-gris Info oklch(0.55 0.05 220) réservé aux messages système.
   - Justification : Archétype Creator — pigments naturels de la fresque (ocre jaune, terre de Sienne, noir de fumée). L'absence de froid renforce la chaleur artisanale (Value Authenticité).

2. **Ocre Artiste en parcimonie** : Le #C8962D occupe maximum 8-12% de la surface visible. Réservé aux CTA, liens actifs, barre de progression, highlights.
   - Justification : Moodboard pattern — les accents ont plus d'impact quand ils sont rares. L'ocre est la signature, pas le fond.

3. **Noir Mural jamais pur** : Utiliser #1C1917 (sous-ton chaud 55°), jamais #000000. Sur fond sombre, texte en Craie #FAFAF7, accents en Ocre #C8962D.
   - Justification : colors.md — le noir pur est artificiel, le Noir Mural a la chaleur du noir de fumée.

### Typographie

4. **Syne 800 réservé au H1** : Le poids extra-bold n'apparaît que sur les H1 hero/page. Les H2 utilisent 700, les H3-H4 utilisent 600. Jamais de Syne en body text.
   - Justification : typography.md — diluer le 800 partout tue l'impact. Les lettres en 800 « occupent l'espace comme une fresque occupe un mur ».

5. **Taille minimum 16px mobile** : Aucun texte de lecture (body, descriptions) ne descend en-dessous de 16px (1rem) sur mobile. Seuls les captions (12px) et labels (14px) peuvent être plus petits.
   - Justification : Brief — mobile-first impératif (trafic Instagram). Lisibilité non-négociable.

6. **Contrastes WCAG AA minimum** : Tout texte respecte un ratio de contraste minimum 4.5:1 (AA). Les titres ≥ 24px respectent 3:1.
   - Justification : Accessibilité + professionnalisme. Le portfolio doit être lisible par tous les personas (Catherine la directrice d'école incluse).

### Formes & Espace

7. **Images plein écran = radius 0** : Les photos de fresques en full-bleed n'ont aucun border-radius. La fresque va bord à bord — comme sur un vrai mur.
   - Justification : Archétype Creator — la fresque ne s'arrête pas au cadre. Moodboard pattern 7/7 : images immersives.

8. **Whitespace généreux non-négociable** : Minimum 160px entre sections (desktop), 96px (mobile). Jamais compresser l'espace pour « rentrer plus de contenu ».
   - Justification : Moodboard — breathing whitespace (POMARES, Vitalina Bender). Le rythme impact/repos reflète le geste du pinceau (ample puis fin).

9. **Alternance sections claires/sombres** : La homepage alterne entre fond Craie/Sable et fond Noir Mural. Pas plus de 2 sections claires consécutives.
   - Justification : Archétype Magician — le contraste crée le rythme de transformation. Évite la monotonie visuelle.

### Interactions

10. **Scroll smooth obligatoire** : Lenis activé globalement (lerp: 0.075). Pas de scroll natif saccadé.
    - Justification : Moodboard pattern 5/7. Registre « accessible-passionné » — fluidité sans précipitation.

11. **Reveal au scroll pour chaque section** : Chaque section utilise une apparition douce (translateY + opacity, 800ms) via ScrollTrigger. Pas de contenu qui « apparaît d'un coup ».
    - Justification : Archétype Magician — chaque scroll est une métamorphose visible. Le site se peint sous les yeux du visiteur.

12. **Animation d'entrée hero** : Le hero utilise un clip-path reveal (lettrage IWOK ou fresque qui se dévoile, 1200ms). C'est la première impression — elle doit incarner la transformation.
    - Justification : Moodboard (fourmula.ai, MYSTA Electric). Archétype Magician — le site lui-même est un acte de révélation.

---

## ON NE FAIT PAS (interdit)

### Couleurs

1. **Pas de couleur froide dans la palette** : Aucun bleu, vert, violet dans les accents ou fonds. Seule exception : bleu-gris Info pour les messages système.
   - Pourquoi : colors.md — la palette repose sur un arc chaud (40°-90° OKLCH). Une couleur froide briserait la cohérence des pigments naturels.

2. **Pas de dégradés multicolores** : Pas de gradient rainbow, pastel, ou multicolore. Si gradient, uniquement entre deux couleurs de la palette (ex: Ocre → Terracotta).
   - Pourquoi : Value Authenticité — les dégradés multicolores sont artificiels et incompatibles avec l'univers pigments/matière.

3. **Pas de Noir Mural en fond sur plus de 40% des sections** : Le dark mode partiel (hero + footer + 1-2 sections) est souhaité, mais le site ne doit pas être « un site sombre ».
   - Pourquoi : Les photos de fresques ont besoin de contraste. Un fond trop sombre partout les noie au lieu de les mettre en valeur.

### Typographie

4. **Pas de police tierce** : Syne (titres) et Inter (corps) uniquement. Aucune police supplémentaire, même pour des éléments décoratifs.
   - Pourquoi : typography.md — le pairing Syne+Inter est le contraste graffiti→pro. Une troisième police dilue l'identité.

5. **Pas de Syne en body text** : Syne a trop de caractère pour le texte courant. Le body utilise exclusivement Inter.
   - Pourquoi : typography.md — Syne fatigue en lecture longue. Inter s'efface pour laisser parler le contenu et les images.

6. **Pas de texte en image** : Aucun texte important rendu en image (sauf le logo). Tout le texte est du vrai texte HTML (accessibilité + SEO).
   - Pourquoi : Brief — SEO local essentiel (« fresquiste mural Rodez »). Le texte en image est invisible pour Google.

### Formes & Layout

7. **Pas de carousel auto-play** : Les galeries ne défilent pas automatiquement. L'utilisateur contrôle la navigation (swipe, clic, scroll).
   - Pourquoi : Brief mobile-first — l'auto-play est hostile sur mobile (consommation data, perte de contrôle). UX pattern déconseillé.

8. **Pas de sidebar** : Layout à une colonne pour le contenu principal. Pas de sidebar de navigation ou de widgets latéraux.
   - Pourquoi : Mobile-first — une sidebar ne se traduit pas bien sur mobile et complique le responsive.

9. **Pas de parallax intensif** : Pas d'effets de parallax à plus de 2 niveaux de profondeur. Un léger décalage de vitesse est acceptable, pas un effet 3D complexe.
   - Pourquoi : Brief — 80%+ du trafic vient d'Instagram (mobile). Le parallax intensif dégrade les performances sur mobile et cause des saccades.

### Interactions

10. **Pas de WebGL ni Canvas pour le contenu principal** : Les effets WebGL/Canvas sont réservés aux transitions décoratives (si utilisés). Le portfolio et le contenu doivent rester en HTML/CSS natif.
    - Pourquoi : Moodboard — WebGL rejeté (1/7 fréquence). Performance mobile rédhibitoire pour un trafic Instagram.

11. **Pas de micro-interactions gadget** : Pas de curseur personnalisé, pas de particules, pas de confetti, pas d'effets au hover sans fonction. Chaque animation a un but (reveal, feedback, transition).
    - Pourquoi : Registre « passionné mais accessible » — les gadgets visuels éloignent du sérieux professionnel et ralentissent le mobile.

12. **Pas de popup ni d'interstitiel** : Pas de popup newsletter, pas de cookie banner intrusif (utiliser un bandeau discret), pas de chatbot flottant.
    - Pourquoi : Le site est un portfolio artiste, pas un site e-commerce. Chaque interruption brise l'immersion dans les oeuvres.

---

## Exceptions Autorisées

| Exception | Contexte | Condition |
|-----------|----------|-----------|
| Bleu-gris Info | Messages système (info, validation) | Uniquement oklch(0.55 0.05 220) — jamais en accent ou décoration |
| Rouge erreur | Formulaire de devis (champs requis) | Uniquement oklch(0.52 0.15 30) — rouge-terre cohérent palette |
| Radius 0 + radius 8px cohabitation | Images plein écran vs cards | Les images full-bleed = radius 0 (fresque bord-à-bord). Les cards/boutons = radius 8px |
| Texte < 16px | Captions et labels uniquement | Minimum 14px pour les labels. 12px réservé aux captions photo et micro-texte |
| Syne en non-heading | Navigation principale + tagline | Syne 500-600 autorisé pour les liens de navigation et la tagline en footer |
| Animation > 800ms | Hero clip-path reveal uniquement | 1200ms max, uniquement pour l'animation d'entrée initiale du site |

---

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
