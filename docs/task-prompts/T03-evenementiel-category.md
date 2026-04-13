# Brief T03 : Ajouter la categorie "Evenementiel"

## Contexte
Le portfolio a actuellement 4 categories : Particuliers, Entreprises et Collectivites, Participatifs, Coups de coeur. Il faut ajouter une 5eme categorie "Evenementiel" pour les projets de live painting, expositions, et festivals. Les images source sont dans `public/site communication/evenementiel expo/`.

## Fichiers a modifier
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/data/portfolio-projects.ts` — types, SECTIONS, CATEGORY_SLUGS, FEATURED_SLIDES, PORTFOLIO_PROJECTS
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/lib/queries/portfolio.ts` — mettre a jour les types importes (automatique si les exports changent)

## Fichiers a creer (assets)
- Copier les images de `public/site communication/evenementiel expo/` vers `public/images/evenementiel/` apres conversion webp (T02 doit etre fait avant)

## Code actuel — Types et structures

### PortfolioSectionSlug (ligne 4-8)
```ts
export type PortfolioSectionSlug =
  | "particuliers"
  | "entreprises"
  | "participatifs"
  | "coups-de-coeur";
```

### CategoryName (ligne 10)
```ts
export type CategoryName = "Particuliers" | "Entreprises et Collectivités" | "Participatifs" | "Coups de cœur";
```

### SECTIONS (ligne 35-56)
```ts
export const SECTIONS: PortfolioSection[] = [
  {
    slug: "particuliers",
    title: "Particuliers",
    description: "Fresques et décorations murales pour les particuliers — chambres, salons, façades.",
  },
  {
    slug: "entreprises",
    title: "Entreprises et Collectivités",
    description: "Les réalisations phares pour entreprises, collectivités et espaces publics.",
  },
  {
    slug: "participatifs",
    title: "Participatifs",
    description: "Ateliers et fresques collectives — quand l'art se partage.",
  },
  {
    slug: "coups-de-coeur",
    title: "Coups de cœur",
    description: "Moments forts et pièces marquantes — la sélection de l'artiste.",
  },
];
```

### CATEGORY_SLUGS (ligne 68-73)
```ts
export const CATEGORY_SLUGS: Record<CategoryName, PortfolioSectionSlug> = {
  "Particuliers": "particuliers",
  "Entreprises et Collectivités": "entreprises",
  "Participatifs": "participatifs",
  "Coups de cœur": "coups-de-coeur",
};
```

### FEATURED_SLIDES (ligne 75-104)
```ts
export const FEATURED_SLIDES: FeaturedSlide[] = [
  {
    category: "Particuliers",
    slug: "particuliers",
    background: "/images/particuliers/daft-punk.webp",
    preview1: "/images/particuliers/ophtalmo-femme.webp",
    preview2: "/images/particuliers/african-wife.webp",
  },
  {
    category: "Entreprises et Collectivités",
    slug: "entreprises",
    background: "/images/entreprises/Skate Park Decaze - Guillaume 2024-4.webp",
    preview1: "/images/entreprises/WhatsApp Image 2025-09-04 à 13.47.04_e2b04b2c.webp",
    preview2: "/images/entreprises/WhatsApp Image 2025-09-04 à 13.48.00_622e5da2.webp",
  },
  {
    category: "Participatifs",
    slug: "participatifs",
    background: "/images/participatif/WhatsApp Image 2023-07-05 at 12.34.13.webp",
    preview1: "/images/participatif/IMG_20231222_151117 - Copie.webp",
    preview2: "/images/participatif/IMG_20240209_115548.webp",
  },
  {
    category: "Coups de cœur",
    slug: "coups-de-coeur",
    background: "/images/selection-gui-on-scope/08122021-2.webp",
    preview1: "/images/entreprises/WhatsApp Image 2025-09-12 à 13.35.44_8e71f5be.webp",
    preview2: "/images/selection-gui-on-scope/WhatsApp Image 2023-07-05 at 12.33.57.webp",
  },
];
```

## Images source disponibles (evenementiel expo/)

Sous-dossiers :
- `caserne millau 12 2021/` : caserne Millau 2021.jpg, IMG_3227.jpg
- `expo salles gosses MJC Onet 12 2018/` : 20210303_163115.jpg, 20210303_163139.jpg, 20210303_163155.jpg
- `urban fest albi 2021/` : IMG_20210829_104235.jpg, urban fest albi 2021.jpg

Fichiers en vrac (selection) :
- Kerea reception-39.jpg, Kerea reception-41.jpg, Kerea arrivee-39.jpg (live painting KEREA)
- escape game agglobus rodez 2019.JPG
- atout aveyron event 2019.jpg
- biggy le krill 12 2018.jpg
- Snapseed.jpg
- IMG_20220206_075255.jpg, IMG_20220415_213936.jpg, etc. (divers live painting)
- WhatsApp Image 2023-07-05 at 12.33.15.jpeg, etc.
- WhatsApp Image 2025-09-10 a 14.30.01_401daddb.jpg, etc.
- WhatsApp Image 2025-09-12 a 13.35.41_f032a43e.jpg, etc.

## Cible
Ajouter `"evenementiel"` comme 5eme section dans le portfolio, entre "participatifs" et "coups-de-coeur".

## Instructions d'implementation

### Etape 1 : Copier et preparer les images

```bash
# Creer le dossier destination
mkdir -p /Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/public/images/evenementiel

# Copier les fichiers webp depuis site communication (apres T02)
# Si T02 n'est pas encore fait, convertir a la volee avec cwebp
```

Copier les images les plus representatives (les sous-dossiers et les fichiers en vrac lies a l'evenementiel). Les regrouper par projet logique.

### Etape 2 : Modifier les types

```ts
export type PortfolioSectionSlug =
  | "particuliers"
  | "entreprises"
  | "participatifs"
  | "evenementiel"          // AJOUTER
  | "coups-de-coeur";

export type CategoryName = "Particuliers" | "Entreprises et Collectivités" | "Participatifs" | "Événementiel" | "Coups de cœur";
```

### Etape 3 : Ajouter a SECTIONS (entre participatifs et coups-de-coeur)

```ts
{
  slug: "evenementiel",
  title: "Événementiel",
  description: "Live painting, expositions et festivals — l'art en direct.",
},
```

### Etape 4 : Ajouter a CATEGORY_SLUGS

```ts
"Événementiel": "evenementiel",
```

### Etape 5 : Ajouter un FEATURED_SLIDE

Inserer entre Participatifs et Coups de coeur :
```ts
{
  category: "Événementiel",
  slug: "evenementiel",
  background: "/images/evenementiel/[choisir une image impactante].webp",
  preview1: "/images/evenementiel/[image preview 1].webp",
  preview2: "/images/evenementiel/[image preview 2].webp",
},
```

Choisir les 3 images les plus visuellement impactantes parmi les fichiers copies.

### Etape 6 : Ajouter les PORTFOLIO_PROJECTS

Creer les projets en suivant le pattern existant. Grouper par sous-dossier :

```ts
/* ═══════════════════════════════════════════════
   ÉVÉNEMENTIEL
   ═══════════════════════════════════════════════ */
{
  id: "caserne-millau",
  title: "Caserne de Millau",
  section: "evenementiel",
  year: 2021,
  location: "Millau (12)",
  images: [
    { src: "/images/evenementiel/caserne-millau-2021.webp", alt: "...", width: XXXX, height: XXXX },
    // ...
  ],
  cover: 0,
},
```

**Important** : pour connaitre width et height, utiliser `identify` (ImageMagick) ou `file` sur chaque image webp. Exemple :
```bash
identify "/path/to/image.webp"
# ou
webpinfo "/path/to/image.webp"
```

Les projets a creer (minimum) :
1. **Caserne Millau** — 2 images (caserne millau 12 2021/)
2. **Expo Salles Gosses MJC Onet** — 3 images (expo salles gosses/)
3. **Urban Fest Albi** — 2 images (urban fest albi 2021/)
4. **Live Painting KEREA** — 3-5 images (Kerea reception-*.jpg)
5. **Escape Game Agglobus** — 1 image (deja dans entreprises, DEPLACER la section)
6. Ajouter 3-5 projets supplementaires a partir des fichiers en vrac (live paintings, expos)

### Etape 7 : Verifier les imports dans les fichiers dependants

Le fichier `lib/queries/portfolio.ts` importe les types depuis `data/portfolio-projects.ts` — verifier que `PortfolioSectionSlug` et `CategoryName` sont bien mis a jour.

Le fichier `app/portfolio/[subcategory]/page.tsx` utilise `SECTIONS` pour `generateStaticParams` et `CATEGORY_SLUGS` pour le mapping — la nouvelle categorie sera automatiquement prise en compte.

## Tokens CSS disponibles
Pas de tokens CSS a utiliser — cette tache est purement data.

## Patterns a respecter
- Inline styles avec CSS variables (PAS de classes Tailwind) — ne s'applique pas ici, c'est du data
- Suivre le format exact des `PortfolioProject[]` existants
- Noms de fichiers images en kebab-case sans accents dans `public/images/evenementiel/`
- Les alt text doivent etre descriptifs et en francais

## Criteres d'acceptation
- [ ] `PortfolioSectionSlug` inclut `"evenementiel"`
- [ ] `CategoryName` inclut `"Événementiel"`
- [ ] SECTIONS contient la categorie Evenementiel entre Participatifs et Coups de coeur
- [ ] CATEGORY_SLUGS mappe `"Événementiel"` vers `"evenementiel"`
- [ ] FEATURED_SLIDES contient un slide pour Evenementiel avec 3 images valides
- [ ] PORTFOLIO_PROJECTS contient au moins 4 projets evenementiels
- [ ] Les images existent dans `public/images/evenementiel/`
- [ ] `npm run build` passe sans erreur
- [ ] La page `/portfolio/evenementiel` fonctionne (generee par generateStaticParams)

## Anti-patterns a eviter
- Ne PAS mettre les images dans un sous-dossier de `entreprises/` ou autre
- Ne PAS utiliser de noms de fichiers avec espaces dans `public/images/evenementiel/` (renommer en kebab-case)
- Ne PAS oublier d'ajouter les dimensions width/height reelles des images
- Ne PAS dupliquer des projets deja dans d'autres sections (sauf si deliberement deplace)
