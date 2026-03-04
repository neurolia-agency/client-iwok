# Moodboard

<!-- Dérive de : 00-platform.md (Archétype Creator+Magician, Values Authenticité/Sur-mesure/Polyvalence), 01-brand/colors.md (palette Ocre/Terracotta/Noir Mural), Carte de Dérivation (Phase 1.2) -->

## Carte de Dérivation Brand → Visuel

| Composant Brand | Source | Expression Visuelle Attendue |
|-----------------|--------|------------------------------|
| Archétype Creator + Magician | 00-platform.md | Immersion grand format (fresques plein écran). Reveal progressif (clip-path, scroll reveal) pour incarner la transformation. Textures authentiques (grain, matière). Le site EST un mur qu'on découvre en se promenant — pas une galerie de musée |
| Valeur 1 : Authenticité | 00-platform.md | Photos de projets réels in-situ uniquement (jamais de visuels stock). Tons terriens (ocre, terracotta). Montrer le processus (croquis → réalisation). Textures urbaines brutes. Palette de pigments naturels |
| Valeur 2 : Sur-mesure | 00-platform.md | Compositions uniques par section (pas de grille rigide répétitive). Espaces généreux qui respirent. Chaque page a sa personnalité propre. Typographie Syne expressive = chaque titre est un « tag maîtrisé » |
| Valeur 3 : Polyvalence | 00-platform.md | Galerie multi-catégories avec filtrage. Variété de formats (plein écran + grille masonry + détails). Montrer la diversité des supports (murs, véhicules, sols, containers) via les photos |
| Palette Ocre + Terracotta + Noir Mural | colors.md | 60% neutres chauds (Craie #FAFAF7 / Sable #F5F2ED). 30% Noir Mural (#1C1917) pour hero/footer/impact. 10% accents Ocre (#C8962D) et Terracotta (#BC5B3A) sur CTA/tags/highlights |
| Polices Syne + Inter | typography.md | Syne 800 en H1 = statement mural (lettres qui occupent l'espace comme une fresque occupe un mur). Syne 600-700 en H2-H4. Inter pour le corps = clarté professionnelle. Le contraste titres/corps reflète graffiti → pro |
| Registre accessible-passionné | tone.md | Animations impactantes mais pas gadget. Scroll smooth (Lenis). Reveal progressif au scroll. Rythme alternant impact visuel fort et espaces de respiration. Pas de micro-interactions superflues |
| Promesse : mur blanc → oeuvre unique | 00-platform.md | Hero immersif avec fresque plein écran. Effet de transformation visible (clip-path reveal, parallax). L'expérience de navigation INCARNE la métamorphose — on passe d'un fond neutre à l'immersion visuelle |

---

## Référence 1 : fourmula.ai (fournie par le client)

- **URL** : https://fourmula.ai/
- **Secteur** : Photography / Produit IA
- **Ce qu'on retient** :
  - Animation de chargement spectaculaire — première impression premium qui installe le niveau d'exigence
  - Typographie sans-serif bold ~48-56px desktop, responsive via vw — statement typographique fort
  - Scroll-triggered word reveals avec transitions de couleur orange (#F94A00) — texte comme élément graphique
  - Marquee infini (24s) — rythme visuel continu
  - Perspective 3D au scroll (rotationZ, rotationX jusqu'à 40°) — profondeur immersive
- **Mesures concrètes** :
  - Taille H1 : ~48-56px desktop, scale responsive via vw
  - Espacement sections : 60-120px vertical
  - Ratio images : 1:1 (produits) et 9:16 (portrait)
  - Border radius : 8-16px subtil
  - Palette : #F94A00 (orange), #FD7B03 (orange clair), noir/blanc
- **Cohérence avec notre archétype Creator+Magician** : L'animation d'entrée incarne le Magician — transformation de l'écran vide en expérience immersive. Le traitement typographique bold rejoint le Creator — les mots prennent l'espace comme des fresques sur un mur.
- **À adapter pour IWOK** :
  - Animation d'entrée → adapter en reveal de fresque (clip-path ou parallax sur une oeuvre IWOK)
  - Le scroll-triggered text reveal → appliquer à la tagline "Du mur blanc à l'oeuvre unique"
  - Rejeter la palette froide orange/noir → remplacer par Ocre/Terracotta/Noir Mural

## Référence 2 : siemprericc.com (fournie par le client)

- **URL** : https://siemprericc.com/work/commisions/
- **Secteur** : Photography / Portfolio
- **Ce qu'on retient** :
  - Menu fullscreen avec navigation immersive — le menu EST une expérience, pas juste une liste de liens
  - Page about immersive avec storytelling linéaire au scroll
  - Typographie Neue Haas Grotesk Display Pro, weight 600, uppercase — identité forte et nette
  - Loader multi-phase avec transition de couleur (#f5f5f5 → #000) — anticipation et reveal
  - Design plein écran (100dvh) — chaque section = un écran complet
- **Mesures concrètes** :
  - Taille H1 : responsive via clamp(), base ~0.7-0.95rem pour le texte photographer
  - Espacement : gap 1.5rem desktop, 1rem mobile
  - Border radius : 0 (aucun — angles droits partout)
  - Palette : #ffffff (fond), #1A1A1A (texte), #101010 (accent noir)
  - Navigation : sticky avec toggle light/dark
- **Cohérence avec notre archétype Creator+Magician** : Le menu fullscreen crée un moment de « magie » (Magician) — l'ouverture du menu est elle-même une micro-expérience. Le scroll linéaire sur la page about incarne le Creator — on déroule l'histoire de l'artiste comme on déroule un mur.
- **À adapter pour IWOK** :
  - Menu fullscreen → adapter avec la palette IWOK (fond Noir Mural, texte Craie, accents Ocre)
  - Page about scroll-based → parfait pour le storytelling graffiti → design mural pro
  - Rejeter la palette 100% monochrome → injecter chaleur avec Ocre et Terracotta

## Référence 3 : The Mural Co.

- **URL** : https://themuralco.com/
- **Secteur** : Agence muraliste professionnelle (USA)
- **Ce qu'on retient** :
  - Portfolio organisé par catégories de clients (corporate, retail, hospitality) — structure de navigation par public-cible
  - Layout masonry dynamique pour les galeries — les images trouvent leur rythme naturel
  - Photos des fresques in-situ (pas recadrées) — on voit le mur dans son contexte réel
  - Ton professionnel mais créatif — l'agence prouve sa crédibilité sans perdre l'énergie artistique
  - Performance optimisée pour galeries lourdes en images HD
- **Mesures concrètes** :
  - Taille H1 : ~48px
  - Espacement sections : ~80-100px
  - Ratio images : variable (masonry)
  - Border radius : 4-8px
  - Palette : blanc/noir + accents colorés variés selon les projets
- **Cohérence avec notre archétype Creator+Magician** : Le Creator est présent dans la mise en avant de l'artisanat (live painting, personnalisation). Le Magician dans la transformation visible des espaces bruts en expériences immersives. Les photos in-situ montrent le « avant/après » implicite.
- **À adapter pour IWOK** :
  - Organisation portfolio par catégorie → adapter avec les 4 catégories IWOK (entreprises, événementiel, participatif, particuliers)
  - Photos in-situ → même approche pour IWOK (montrer la fresque dans son contexte)
  - Rejeter l'aspect « agence multi-artistes » → IWOK est un artiste solo, plus intime

## Référence 4 : Art by Jessica Jones

- **URL** : https://www.artbyjessicajones.com/
- **Secteur** : Muralist portfolio individuel (Arkansas, USA)
- **Ce qu'on retient** :
  - Palette chaleureuse : fond crème/blanc cassé, accent moutarde (jaune ocre), noir — très proche de la palette IWOK
  - Hero carrousel plein écran avec fresques in-situ dès l'ouverture — impact immédiat
  - Copy conversationnel en hero : *"Have a mural idea? Let's grab some coffee and chat!"* — le ton artisanal-accessible fonctionne
  - Grid épuré HD avec pages projets détaillées (contexte, dimensions, commanditaire)
  - Équilibre « artiste accessible » (particuliers) + « professionnel de référence » (entreprises)
- **Mesures concrètes** :
  - Taille H1 : ~42-48px
  - Espacement sections : ~60-80px
  - Ratio images : 4:3 et 16:9 majoritaires
  - Border radius : 4-8px
  - Palette : crème #F5F0E8, moutarde #D4A843, noir #1A1A1A
- **Cohérence avec notre archétype Creator+Magician** : La chaleur du contact humain (café, conversation) incarne le Creator accessible. La page projet détaillée montre la transformation complète de l'espace — le Magician est dans le résultat final qui stupéfie le spectateur.
- **À adapter pour IWOK** :
  - Palette crème+ocre → directement transposable à la palette IWOK (Craie + Ocre Artiste)
  - Copy conversationnel → adapter au ton IWOK (vouvoiement mais chaleureux)
  - Pages projets détaillées → modèle pour le portfolio IWOK (contexte + photos + dimensions)

## Référence 5 : MYSTA ELECTRIC

- **URL** : https://www.mystaelectric.com/
- **Secteur** : Tatoueur professionnel (artiste français, ex-Kenzo et Givenchy)
- **Awards** : Awwwards SOTD + FWA + CSS Design Awards
- **Ce qu'on retient** :
  - Typographie blanche massive qui remplit l'écran — le texte comme texture, comme un lettrage mural
  - Interaction curseur 3D magnétique sur les images portfolio — les oeuvres réagissent au mouvement
  - Navigation scroll unique page — narration linéaire immersive
  - Palette ultra-radicale : seulement #000000, #9C9C9C, #ffffff — la sobriété laisse parler les oeuvres
  - Conçu par Tore Bensten — qualité technique de référence
- **Mesures concrètes** :
  - Taille H1 : ~80-120px (texte massif plein écran)
  - Espacement sections : ~100vh (chaque section = un écran)
  - Ratio images : portrait et carré dominants
  - Border radius : 0px (angles vifs partout)
  - Palette : #000000, #9C9C9C, #FFFFFF
- **Cohérence avec notre archétype Creator+Magician** : Le Magician domine — la transformation 3D au curseur crée un effet de magie perceptuelle. Le Creator apparaît dans le storytelling biographique (fashion → tatouage → art). Le texte-comme-mur résonne directement avec IWOK.
- **À adapter pour IWOK** :
  - Typographie massive en hero → Syne 800 occupant tout l'écran pour "IWOK" ou la tagline
  - Rejeter la palette 100% monochrome → remplacer par le trio Noir Mural + Craie + Ocre Artiste
  - Interaction curseur → envisager un tilt subtil sur les images portfolio (performance mobile à valider)

## Référence 6 : Vitalina Bender

- **URL** : https://www.vitalinabender.com/
- **Secteur** : Artiste tatoueuse fine-line / ornementale (Leipzig + New York)
- **Awards** : Awwwards Honorable Mention
- **Ce qu'on retient** :
  - Stack identique au projet IWOK : GSAP + ScrollTrigger + Lenis — preuve que cette stack est validée pour un portfolio artiste
  - Animations de révélation au scroll : split-text avec blur-in + slide-up — apparition progressive et élégante
  - Indicateur de progression scroll (0-100%) — feedback de navigation continu
  - Accroche hero conceptuelle : *"Where Art Lives on Skin"* — promesse évocatrice, pas descriptive
  - Grid Instagram intégré nativement — pont entre réseaux sociaux et site
- **Mesures concrètes** :
  - Taille H1 : ~64-72px
  - Espacement sections : ~120-160px
  - Ratio images : portrait et carré (photos tatouages)
  - Border radius : 0px
  - Palette : noir dominant, blanc texte, pas d'accent couleur
- **Cohérence avec notre archétype Creator+Magician** : Le Creator dans la philosophie (l'art vit sur une surface vivante — applicable aux murs). Le Magician dans les micro-animations qui révèlent progressivement le contenu comme un rideau qui s'ouvre.
- **À adapter pour IWOK** :
  - Split-text blur-in → appliquer aux titres Syne (cohérent avec le « reveal de fresque »)
  - Indicateur de progression → utile pour les pages longues (portfolio, about)
  - Accroche conceptuelle → IWOK a déjà "Du mur blanc à l'oeuvre unique" — même registre
  - Rejeter l'absence totale de couleur → la palette IWOK est sa signature

## Référence 7 : POMARES

- **URL** : https://nicolaspomares.com
- **Secteur** : Développeur créatif / Portfolio (France)
- **Awards** : Awwwards Nominee 2024
- **Ce qu'on retient** :
  - Identité mononymique forte : "POMARES" en header = brand personnelle en un mot — modèle pour "IWOK"
  - Présentation projets plein écran avec métadonnées minimalistes (rôle, attribution) — le travail parle, pas le CV
  - Breathing whitespace généreux — structure neutre qui valorise le visuel
  - Navigation fluide et sobre entre projets, transitions sans fioriture
  - Approche « show the work, not the commentary » — les images dominent
- **Mesures concrètes** :
  - Taille H1 : ~56-64px
  - Espacement sections : ~120-160px
  - Ratio images : 16:9 et variable
  - Border radius : 8-12px subtil
  - Palette : fond clair, texte sombre, accents minimaux
- **Cohérence avec notre archétype Creator+Magician** : Le pattern « nom unique comme logo » crée une identité forte (Creator). La sobriété du fond laisse parler les transformations visuelles des projets (Magician). « IWOK » a la même force phonétique que « POMARES ».
- **À adapter pour IWOK** :
  - Identité mononymique → "IWOK" en Syne 800 comme brand-mark typographique
  - Whitespace généreux → cohérent avec le visual-vocabulary IWOK (160px entre sections)
  - Présentation projet minimaliste → modèle pour les pages projets du portfolio

---

## Patterns Communs

| Pattern | Fréquence | Décision | Justification (lien brand) |
|---------|-----------|----------|---------------------------|
| Images plein écran / immersives | 7/7 | ✅ Adopter | Archétype Creator : les oeuvres occupent l'espace. Brief : « le portfolio EST le produit » |
| Typographie massive en hero | 6/7 | ✅ Adopter | Archétype Creator : les mots prennent le mur. Syne 800 = lettrage mural |
| Scroll smooth (Lenis ou équivalent) | 5/7 | ✅ Adopter | Registre « accessible-passionné » : fluidité sans précipitation. Déjà dans la stack |
| GSAP + ScrollTrigger | 5/7 | ✅ Adopter | Brief : animations de référence fournies. Stack validée pour portfolios artistes |
| Reveal progressif au scroll | 5/7 | ✅ Adopter | Archétype Magician : transformation progressive, rideau qui s'ouvre |
| Fond sombre pour hero/sections clés | 5/7 | ✅ Adopter | Noir Mural (#1C1917) en hero + footer. Contraste fort avec Ocre CTA. Pas sur tout le site |
| Navigation sticky / transparente | 4/7 | ✅ Adopter | UX standard. Toggle transparente → opaque au scroll |
| Palette neutre chaude (crème/blanc cassé) | 3/7 | ✅ Adopter | colors.md : Craie #FAFAF7 et Sable #F5F2ED. Chaleur terrienne (Value Authenticité) |
| Border radius 0 (angles vifs) | 4/7 | ⚠️ Adapter | Adopter pour les images (fresque = bord à bord). Garder un radius 8-12px pour les cards/boutons |
| Menu fullscreen | 2/7 | ✅ Adopter | Référence client siemprericc. Cohérent avec l'immersion. Fond Noir Mural + texte Craie |
| Indicateur de progression scroll | 2/7 | ✅ Adopter | Utile pour portfolio long. Discret, en Ocre Artiste |
| Interaction curseur 3D | 2/7 | ⚠️ Évaluer | Impact visuel fort (Magician) mais performance mobile à valider (trafic Instagram = mobile) |
| Portfolio grille masonry | 2/7 | ✅ Adopter | Polyvalence : formats variés des photos (murs, véhicules, sols). Masonry = rythme naturel |
| Animation d'entrée / loader | 2/7 | ✅ Adopter | Magician : le site se révèle. Clip-path avec lettrage IWOK → fresque |
| WebGL / Canvas effets | 1/7 | ❌ Rejeter | Performance mobile rédhibitoire (80%+ trafic Instagram). Complexité disproportionnée |
| Palette monochrome pure | 3/7 | ❌ Rejeter | Contradictoire avec colors.md. La palette IWOK EST sa signature (ocre, terracotta = pigments muraux) |

---

## Synthèse Visuelle

### L'équation IWOK

```
IWOK = Immersion Murale + Chaleur Terrienne + Reveal de Transformation

Immersion Murale    = Typographie Syne 800 plein écran + images bord-à-bord + scroll smooth Lenis
                      → Chaque section est un mur qu'on découvre en marchant

Chaleur Terrienne   = Palette Ocre/Terracotta/Noir Mural + fonds Craie/Sable + aucune couleur froide
                      → Les pigments naturels de la fresque historique (ocre jaune, terre de Sienne, noir de fumée)

Reveal de Transformation = Clip-path hero (lettrage IWOK → fresque) + scroll reveal sections + split-text titres
                           → Le Magician : chaque scroll est une métamorphose visible
```

### Mots-clés visuels

- **Brut** (textures urbaines, grain photographique, Noir Mural sans compromis — pas de vernis, pas de filtre)
- **Chaleur** (palette terrienne, espaces crème/sable, Syne arrondie — la chaleur d'un atelier, pas la froideur d'une galerie)
- **Immersion** (images plein écran, sections 100vh, menu fullscreen — le visiteur EST dans la fresque)
- **Reveal** (clip-path, scroll triggers, split-text — chaque interaction dévoile, comme un mur qu'on peint couche après couche)
- **Rythme** (alternance sections sombres/claires, breathing whitespace 160px, typographie massive puis corps léger — comme le mouvement du pinceau : geste ample puis trait fin)
