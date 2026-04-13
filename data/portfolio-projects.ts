/* ─── Portfolio Projects — IWOK Muraliste ─────────────── */
/* Source de vérité : public/images/site communication/    */

export type PortfolioSectionSlug =
  | "particuliers"
  | "entreprises"
  | "participatifs"
  | "evenementiel"
  | "coups-de-coeur";

export type CategoryName = "Particuliers" | "Entreprises et Collectivités" | "Participatifs" | "Événementiel" | "Coups de cœur";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  section: PortfolioSectionSlug;
  year: number;
  location: string;
  images: ProjectImage[];
  cover: number;
}

export interface PortfolioSection {
  slug: PortfolioSectionSlug;
  title: string;
  description: string;
}

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
    slug: "evenementiel",
    title: "Événementiel",
    description: "Live painting, expositions et festivals — l'art en direct.",
  },
  {
    slug: "coups-de-coeur",
    title: "Coups de cœur",
    description: "Moments forts et pièces marquantes — la sélection de l'artiste.",
  },
];

/* ─── Featured Slider Data ──────────────────────────── */

export interface FeaturedSlide {
  category: CategoryName;
  slug: PortfolioSectionSlug;
  background: string;
  preview1: string;
  preview2: string;
}

export const CATEGORY_SLUGS: Record<CategoryName, PortfolioSectionSlug> = {
  "Particuliers": "particuliers",
  "Entreprises et Collectivités": "entreprises",
  "Participatifs": "participatifs",
  "Événementiel": "evenementiel",
  "Coups de cœur": "coups-de-coeur",
};

export const FEATURED_SLIDES: FeaturedSlide[] = [
  {
    category: "Particuliers",
    slug: "particuliers",
    background: "/images/site communication/particuliers/IMG_20231102_132957.webp",
    preview1: "/images/site communication/particuliers/WhatsApp Image 2023-07-05 at 12.33.42.webp",
    preview2: "/images/site communication/particuliers/IMG_20240412_121039.webp",
  },
  {
    category: "Entreprises et Collectivités",
    slug: "entreprises",
    background: "/images/site communication/entreprises collectivitées/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-4.webp",
    preview1: "/images/site communication/entreprises collectivitées/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-04 à 13.47.04_e2b04b2c.webp",
    preview2: "/images/site communication/entreprises collectivitées/révélation cransac 12 2021/Cransac 12.webp",
  },
  {
    category: "Participatifs",
    slug: "participatifs",
    background: "/images/site communication/participatif/WhatsApp Image 2023-07-05 at 12.34.13.webp",
    preview1: "/images/site communication/participatif/IMG_20231222_151117 - Copie.webp",
    preview2: "/images/site communication/participatif/IMG_20240209_115548.webp",
  },
  {
    category: "Événementiel",
    slug: "evenementiel",
    background: "/images/site communication/événementiel expo/Kerea reception-09.webp",
    preview1: "/images/site communication/événementiel expo/urban fest albi 2021/IMG_20210829_104235.webp",
    preview2: "/images/site communication/événementiel expo/IMG_20220618_160655.webp",
  },
  {
    category: "Coups de cœur",
    slug: "coups-de-coeur",
    background: "/images/site communication/événementiel expo/Kerea reception-41.webp",
    preview1: "/images/site communication/entreprises collectivitées/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-31.webp",
    preview2: "/images/site communication/particuliers/IMG_20231102_165415.webp",
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  /* ═══════════════════════════════════════════════
     ENTREPRISES ET COLLECTIVITÉS
     ═══════════════════════════════════════════════ */
  {
    id: "skate-parc-decazeville",
    title: "Skate Parc Decazeville",
    section: "entreprises",
    year: 2024,
    location: "Decazeville (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-4.webp", alt: "Vue d'ensemble du skate parc de Decazeville avec fresques murales colorées", width: 3689, height: 2075 },
      { src: "/images/site communication/entreprises collectivitées/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-23.webp", alt: "Fresque skate parc Decazeville — détail", width: 4032, height: 3024 },
      { src: "/images/site communication/entreprises collectivitées/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-27.webp", alt: "Fresque murale skate parc — panoramique", width: 5955, height: 3970 },
      { src: "/images/site communication/entreprises collectivitées/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-31.webp", alt: "Fresque skate parc Decazeville — vue large", width: 6000, height: 3375 },
      { src: "/images/site communication/entreprises collectivitées/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-40.webp", alt: "Fresque murale abstraite skate parc Decazeville", width: 4032, height: 3024 },
      { src: "/images/site communication/entreprises collectivitées/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-41.webp", alt: "Skate parc Decazeville — détail fresque", width: 4032, height: 3024 },
    ],
    cover: 0,
  },
  {
    id: "aquasplash",
    title: "Aquasplash",
    section: "entreprises",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/aquasplash 12 2022/IMG_20220619_142004.webp", alt: "Fresque Aquasplash — vue d'ensemble", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/aquasplash 12 2022/IMG_20220619_171337.webp", alt: "Fresque Aquasplash — détail", width: 4000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "boulangerie-pampelonne",
    title: "Boulangerie Artisanale Pampelonne",
    section: "entreprises",
    year: 2022,
    location: "Pampelonne (81)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/boulangerie artisanle pampelonne 81 2022/IMG_20230226_155411.webp", alt: "Fresque boulangerie artisanale Pampelonne — façade", width: 3000, height: 4000 },
      { src: "/images/site communication/entreprises collectivitées/boulangerie artisanle pampelonne 81 2022/IMG_20230226_155736.webp", alt: "Fresque boulangerie Pampelonne — vue d'ensemble", width: 4000, height: 3000 },
    ],
    cover: 1,
  },
  {
    id: "brasserie-cantou",
    title: "Brasserie Le Cantou",
    section: "entreprises",
    year: 2025,
    location: "Currière (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/brasserie le cantou currière 12 2025/WhatsApp Image 2025-09-12 à 13.35.46_edfda391.webp", alt: "Fresque Brasserie Le Cantou — vue 1", width: 1200, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/brasserie le cantou currière 12 2025/WhatsApp Image 2025-09-12 à 13.35.47_62b5b2c3.webp", alt: "Fresque Brasserie Le Cantou — vue 2", width: 1200, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/brasserie le cantou currière 12 2025/WhatsApp Image 2025-09-12 à 13.35.47_80b29a12.webp", alt: "Fresque Brasserie Le Cantou — vue 3", width: 1200, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "burger-factory-courchevel",
    title: "Burger Factory Courchevel",
    section: "entreprises",
    year: 2022,
    location: "Courchevel",
    images: [
      { src: "/images/site communication/entreprises collectivitées/Burger factory courchevel 2022/IMG_20221103_082744.webp", alt: "Fresque Burger Factory Courchevel — vue 1", width: 2464, height: 3280 },
      { src: "/images/site communication/entreprises collectivitées/Burger factory courchevel 2022/IMG_20221103_083505.webp", alt: "Fresque Burger Factory Courchevel — vue 2", width: 3280, height: 2464 },
      { src: "/images/site communication/entreprises collectivitées/Burger factory courchevel 2022/IMG_20221103_083516.webp", alt: "Fresque Burger Factory Courchevel — vue 3", width: 2464, height: 3280 },
    ],
    cover: 1,
  },
  {
    id: "buron-sistre-laguiole",
    title: "Buron de la Sistre — Laguiole",
    section: "entreprises",
    year: 2023,
    location: "Laguiole (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/buron de la sistre lagile 2023/IMG_20230425_162707.webp", alt: "Fresque Buron de la Sistre — vue d'ensemble", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/buron de la sistre lagile 2023/IMG_20230425_164441.webp", alt: "Fresque Buron de la Sistre — détail", width: 2464, height: 3280 },
    ],
    cover: 0,
  },
  {
    id: "buron-mobile-laguiole",
    title: "Buron Mobile — Laguiole",
    section: "entreprises",
    year: 2023,
    location: "Laguiole (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/buron mobile laguiole 12 2023/IMG_20230425_082408.webp", alt: "Buron Mobile Laguiole — en cours de réalisation", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/buron mobile laguiole 12 2023/IMG_20230426_180222.webp", alt: "Buron Mobile Laguiole — avancement", width: 3280, height: 2464 },
      { src: "/images/site communication/entreprises collectivitées/buron mobile laguiole 12 2023/IMG_20230427_095058.webp", alt: "Buron Mobile Laguiole — vue latérale", width: 3280, height: 2464 },
      { src: "/images/site communication/entreprises collectivitées/buron mobile laguiole 12 2023/IMG_20230427_121032.webp", alt: "Buron Mobile Laguiole — résultat final", width: 3280, height: 2464 },
    ],
    cover: 3,
  },
  {
    id: "cabinet-ophtalmologie-rodez",
    title: "Cabinet d'Ophtalmologie — Rodez",
    section: "entreprises",
    year: 2024,
    location: "Rodez (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/2026.webp", alt: "Cabinet ophtalmologie Rodez — vue 1", width: 1600, height: 1200 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/2026 2.webp", alt: "Cabinet ophtalmologie Rodez — vue 2", width: 1600, height: 1200 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2025-05-13 à 20.24.36_6b369a59 - Copie.webp", alt: "Fresque cabinet ophtalmologie — portrait lunettes colorées", width: 1201, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2025-05-13 à 20.24.36_1c5e2e81 - Copie.webp", alt: "Cabinet ophtalmologie — portrait coloré", width: 1201, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2025-05-13 à 20.24.36_3ca1059f.webp", alt: "Cabinet ophtalmologie — détail fresque", width: 1201, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2026-02-16 at 17.36.webp", alt: "Cabinet ophtalmologie — vue intérieure", width: 2040, height: 1536 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2026-02-16 at 17.36.22.webp", alt: "Cabinet ophtalmologie — fresque murale", width: 2048, height: 1536 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2026-02-16 at 17.36.23.webp", alt: "Cabinet ophtalmologie — couloir", width: 2048, height: 1536 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2026-02-16 at 17.36.24.webp", alt: "Cabinet ophtalmologie — salle d'attente", width: 2040, height: 1536 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2026-02-16 at 17.36.2.webp", alt: "Cabinet ophtalmologie — détail mur", width: 2048, height: 1536 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2026-02-16 at 17.54.3.webp", alt: "Cabinet ophtalmologie — médaillon", width: 736, height: 736 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2026-02-16 at 17.54.31.webp", alt: "Cabinet ophtalmologie — médaillon détail", width: 736, height: 736 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2026-03-12 at 08.25.1.webp", alt: "Cabinet ophtalmologie — vue d'ensemble", width: 675, height: 437 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2026-03-12 at 08.25.17.webp", alt: "Cabinet ophtalmologie — portrait", width: 675, height: 1200 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2026-03-12 at 08.25.4.webp", alt: "Cabinet ophtalmologie — détail petit format", width: 249, height: 311 },
      { src: "/images/site communication/entreprises collectivitées/cabinet ophtalmologie rodez 12 2024/WhatsApp Image 2026-03-12 at 08.25.48.webp", alt: "Cabinet ophtalmologie — vue verticale", width: 736, height: 1308 },
    ],
    cover: 2,
  },
  {
    id: "camping-terrasses-viaur",
    title: "Camping Les Terrasses du Viaur",
    section: "entreprises",
    year: 2021,
    location: "Tarn (81)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/camping Les terrasses du viaur 81 2021/IMG-20210319-WA0006.webp", alt: "Fresque piscine camping — vue verticale", width: 1200, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/camping Les terrasses du viaur 81 2021/IMG-20210319-WA0008.webp", alt: "Fresque piscine camping — décoration aquatique", width: 1600, height: 1046 },
    ],
    cover: 1,
  },
  {
    id: "centre-tri-kerea",
    title: "Centre de Tri KEREA",
    section: "entreprises",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/centre de tris KEREA 12 2025/WhatsApp Image 2025-09-10 à 14.30.03_789d1e0c.webp", alt: "Fresque KEREA centre de tri — vue 1", width: 1600, height: 1064 },
      { src: "/images/site communication/entreprises collectivitées/centre de tris KEREA 12 2025/WhatsApp Image 2025-09-10 à 14.30.04_d76bdb38.webp", alt: "Fresque KEREA centre de tri — vue 2", width: 1600, height: 1064 },
    ],
    cover: 0,
  },
  {
    id: "club-tennis-caussade",
    title: "Club de Tennis Caussade",
    section: "entreprises",
    year: 2021,
    location: "Caussade (82)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/club tennis caussade 2021/20210422_204728.webp", alt: "Fresque club tennis Caussade — de nuit", width: 4032, height: 1960 },
      { src: "/images/site communication/entreprises collectivitées/club tennis caussade 2021/20210423_082428.webp", alt: "Détail fresque tennis Caussade", width: 4032, height: 1960 },
      { src: "/images/site communication/entreprises collectivitées/club tennis caussade 2021/20210423_082444.webp", alt: "Fresque club tennis Caussade — résultat final", width: 4032, height: 1960 },
    ],
    cover: 2,
  },
  {
    id: "controle-technique-pampelonne",
    title: "Contrôle Technique Pampelonne",
    section: "entreprises",
    year: 2021,
    location: "Pampelonne (81)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/Controle technique pampelonne 81 2021/IMG_20210827_131333.webp", alt: "Fresque contrôle technique Pampelonne — vue carrée", width: 3000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/Controle technique pampelonne 81 2021/IMG_20210827_131400.webp", alt: "Fresque contrôle technique Pampelonne — détail", width: 3000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/Controle technique pampelonne 81 2021/IMG_20210827_131604.webp", alt: "Fresque contrôle technique Pampelonne — vue large", width: 2400, height: 1800 },
    ],
    cover: 0,
  },
  {
    id: "ecole-tremouilles-facade",
    title: "École Trémouilles — Façade",
    section: "entreprises",
    year: 2021,
    location: "Trémouilles (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/ecole trémouilles façade 2021/DJI_0892-2.webp", alt: "Fresque façade école Trémouilles — vue drone aérienne", width: 7200, height: 6000 },
      { src: "/images/site communication/entreprises collectivitées/ecole trémouilles façade 2021/DJI_0946-2.webp", alt: "Fresque façade école Trémouilles — vue drone", width: 8000, height: 6000 },
      { src: "/images/site communication/entreprises collectivitées/ecole trémouilles façade 2021/DJI_0960-2.webp", alt: "Fresque façade école Trémouilles — panoramique", width: 4000, height: 2250 },
      { src: "/images/site communication/entreprises collectivitées/ecole trémouilles façade 2021/IMG_20220725_161735.webp", alt: "Fresque école Trémouilles — détail", width: 3000, height: 4000 },
      { src: "/images/site communication/entreprises collectivitées/ecole trémouilles façade 2021/IMG_20230301_125751.webp", alt: "Fresque école Trémouilles — vue rapprochée", width: 3280, height: 2464 },
    ],
    cover: 1,
  },
  {
    id: "foot-cagnac-les-mines",
    title: "Club de Foot Cagnac-les-Mines",
    section: "entreprises",
    year: 2021,
    location: "Cagnac-les-Mines (81)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/Foot cagnac les mines 81 2021/b34b3fe8-dbe5-414f-a868-a928f959fb74 (1).webp", alt: "Fresque club de foot Cagnac-les-Mines — résultat", width: 1920, height: 1500 },
      { src: "/images/site communication/entreprises collectivitées/Foot cagnac les mines 81 2021/IMG_20211010_093320.webp", alt: "Fresque foot — en cours de réalisation", width: 3000, height: 4000 },
      { src: "/images/site communication/entreprises collectivitées/Foot cagnac les mines 81 2021/IMG_20211010_171741.webp", alt: "Fresque foot Cagnac — vue d'ensemble", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/Foot cagnac les mines 81 2021/IMG_20211010_171923.webp", alt: "Fresque foot Cagnac — détail", width: 3280, height: 2464 },
      { src: "/images/site communication/entreprises collectivitées/Foot cagnac les mines 81 2021/IMG_20211010_171937.webp", alt: "Fresque foot Cagnac — vue latérale", width: 3280, height: 2464 },
      { src: "/images/site communication/entreprises collectivitées/Foot cagnac les mines 81 2021/IMG_20211011_093240.webp", alt: "Fresque foot Cagnac — résultat final", width: 2464, height: 2464 },
    ],
    cover: 0,
  },
  {
    id: "garage-mecanique",
    title: "Garage Mécanique",
    section: "entreprises",
    year: 2018,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/garage mécanique 12 2018/IMG_2808.webp", alt: "Fresque garage mécanique — vue d'ensemble", width: 3264, height: 2448 },
      { src: "/images/site communication/entreprises collectivitées/garage mécanique 12 2018/IMG_2856.webp", alt: "Fresque garage mécanique — panoramique", width: 6358, height: 2490 },
    ],
    cover: 1,
  },
  {
    id: "intermarche",
    title: "Intermarché",
    section: "entreprises",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/intermarcher 12 2021/IMG_20210729_131459.webp", alt: "Fresque Intermarché — vue d'ensemble", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/intermarcher 12 2021/inter.webp", alt: "Fresque Intermarché — résultat", width: 780, height: 970 },
      { src: "/images/site communication/entreprises collectivitées/intermarcher 12 2021/WhatsApp Image 2021-09-21 at 10.25.14.webp", alt: "Fresque Intermarché — détail", width: 1600, height: 1201 },
    ],
    cover: 0,
  },
  {
    id: "jolies-momes-castres",
    title: "Jolies Mômes — Castres",
    section: "entreprises",
    year: 2023,
    location: "Castres (81)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/jolies momes castres 81 2023/Jolies Mômes.webp", alt: "Fresque Jolies Mômes Castres — façade", width: 1124, height: 1500 },
      { src: "/images/site communication/entreprises collectivitées/jolies momes castres 81 2023/Jolies Mômes rue.webp", alt: "Fresque Jolies Mômes Castres — vue de la rue", width: 1125, height: 842 },
    ],
    cover: 0,
  },
  {
    id: "monastere-facade",
    title: "Façade Le Monastère",
    section: "entreprises",
    year: 2024,
    location: "Le Monastère (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/le monastère 12 Façade 2024/WhatsApp Image 2026-01-16 at 14.17.webp", alt: "Fresque façade Le Monastère — vue d'ensemble", width: 1600, height: 904 },
      { src: "/images/site communication/entreprises collectivitées/le monastère 12 Façade 2024/WhatsApp Image 2026-01-16.webp", alt: "Fresque Le Monastère — vue large", width: 1280, height: 960 },
      { src: "/images/site communication/entreprises collectivitées/le monastère 12 Façade 2024/WhatsApp Image 2026-01-16 at 14.17..webp", alt: "Fresque Le Monastère — détail 1", width: 960, height: 1043 },
      { src: "/images/site communication/entreprises collectivitées/le monastère 12 Façade 2024/WhatsApp Image 2026-01-16 at 14.17.3.webp", alt: "Fresque Le Monastère — détail 2", width: 960, height: 1064 },
      { src: "/images/site communication/entreprises collectivitées/le monastère 12 Façade 2024/WhatsApp Image 2026-01-16 at 14.17.36.webp", alt: "Fresque Le Monastère — vue verticale", width: 861, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "petits-chevaux-tremouilles",
    title: "Petits Chevaux — École Trémouilles",
    section: "entreprises",
    year: 2025,
    location: "Trémouilles (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/petits chevaux sol ecole trémouilles 2025/WhatsApp Image 2025-10-24 à 16.10.57_e1ebf6f7.webp", alt: "Petits chevaux école Trémouilles — résultat final", width: 1600, height: 900 },
      { src: "/images/site communication/entreprises collectivitées/petits chevaux sol ecole trémouilles 2025/WhatsApp Image 2025-10-24 à 16.10.58_d7a67ef2.webp", alt: "Petits chevaux — vue sol", width: 1600, height: 900 },
      { src: "/images/site communication/entreprises collectivitées/petits chevaux sol ecole trémouilles 2025/WhatsApp Image 2025-09-12 à 13.35.45_4eea7229.webp", alt: "Petits chevaux — en cours", width: 1200, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/petits chevaux sol ecole trémouilles 2025/WhatsApp Image 2025-09-12 à 13.35.45_51bfea78.webp", alt: "Petits chevaux — détail", width: 901, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "pont-bascule-flavin",
    title: "Pont Bascule — Flavin",
    section: "entreprises",
    year: 2023,
    location: "Flavin (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/pont bascule flavin 12 2023/IMG_20230502_122244.webp", alt: "Fresque pont bascule Flavin — début", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/pont bascule flavin 12 2023/IMG_20230503_184720.webp", alt: "Fresque pont bascule Flavin — avancement", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/pont bascule flavin 12 2023/IMG_20230510_200614.webp", alt: "Fresque pont bascule Flavin — résultat final", width: 4000, height: 3000 },
    ],
    cover: 2,
  },
  {
    id: "restaurant-bellevue-salles-curan",
    title: "Restaurant Bellevue — Salles-Curan",
    section: "entreprises",
    year: 2023,
    location: "Salles-Curan (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/restaurant bellevue salle curan 12 2023/IMG_20230723_122905.webp", alt: "Décoration murale Restaurant Bellevue — vue d'ensemble", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/restaurant bellevue salle curan 12 2023/IMG_20230723_122948.webp", alt: "Décoration murale Restaurant Bellevue — détail", width: 2464, height: 2464 },
    ],
    cover: 0,
  },
  {
    id: "restaurant-bichette-rodez",
    title: "Restaurant Bichette — Rodez",
    section: "entreprises",
    year: 2025,
    location: "Rodez (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-04 à 13.47.04_e2b04b2c.webp", alt: "Fresque restaurant Bichette — vue d'ensemble", width: 1068, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-04 à 13.47.04_40479fa7.webp", alt: "Fresque Bichette — vue complémentaire", width: 1068, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-04 à 13.47.05_bc59e8f0.webp", alt: "Décoration murale Bichette Rodez", width: 1066, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-04 à 13.48.00_622e5da2.webp", alt: "Fresque murale Bichette — style graphique", width: 1536, height: 2048 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-04 à 13.48.00_4dde2e50.webp", alt: "Fresque Bichette — autre angle", width: 1536, height: 2048 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-10 à 14.40.55_104ec02b.webp", alt: "Fresque Bichette — en cours de réalisation", width: 1600, height: 1201 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-10 à 14.40.55_bc4be19a.webp", alt: "Fresque Bichette — avancement", width: 1600, height: 1201 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-10-23 à 16.17.13_ef7b8194.webp", alt: "Résultat final fresque Bichette Rodez", width: 1600, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-10-23 à 16.17.14_b6af5275.webp", alt: "Détail fresque Bichette — finitions", width: 1600, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "restaurant-chimeres-toulouse",
    title: "Restaurant Les Chimères — Toulouse",
    section: "entreprises",
    year: 2019,
    location: "Toulouse (31)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/restaurant Les Chimères Toulouse 2019/20200219_151305.webp", alt: "Fresque Restaurant Les Chimères Toulouse — vue 1", width: 4032, height: 1960 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Les Chimères Toulouse 2019/20200229_141851.webp", alt: "Fresque Les Chimères — vue 2", width: 4032, height: 1960 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Les Chimères Toulouse 2019/20200229_141956.webp", alt: "Fresque Les Chimères — vue 3", width: 4032, height: 1960 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Les Chimères Toulouse 2019/20200330_121418.webp", alt: "Fresque Les Chimères — vue intérieure", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Les Chimères Toulouse 2019/20200330_121513.webp", alt: "Fresque Les Chimères — résultat final", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Les Chimères Toulouse 2019/G0192630.webp", alt: "Fresque Les Chimères — vue GoPro", width: 3849, height: 2165 },
      { src: "/images/site communication/entreprises collectivitées/restaurant Les Chimères Toulouse 2019/r.webp", alt: "Fresque Les Chimères — détail", width: 1924, height: 2020 },
    ],
    cover: 4,
  },
  {
    id: "revelation-cransac",
    title: "Révélation Cransac",
    section: "entreprises",
    year: 2021,
    location: "Cransac (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/révélation cransac 12 2021/Cransac 12.webp", alt: "Fresque Révélation Cransac — vue d'ensemble", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/révélation cransac 12 2021/IMG_20211029_182304.webp", alt: "Fresque Cransac — en cours", width: 3280, height: 2464 },
      { src: "/images/site communication/entreprises collectivitées/révélation cransac 12 2021/IMG_20211029_182324.webp", alt: "Fresque Cransac — détail", width: 3280, height: 2464 },
      { src: "/images/site communication/entreprises collectivitées/révélation cransac 12 2021/IMG_20211209_143908.webp", alt: "Fresque Cransac — vue finale 1", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/révélation cransac 12 2021/IMG_20211209_145441.webp", alt: "Fresque Cransac — vue finale 2", width: 4594, height: 2851 },
      { src: "/images/site communication/entreprises collectivitées/révélation cransac 12 2021/IMG_20211209_145512.webp", alt: "Fresque Cransac — résultat final", width: 4000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "rouergue-saveurs",
    title: "Rouergue et Saveurs",
    section: "entreprises",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/rouergue et saveurs 12 2022/IMG_20221015_113736.webp", alt: "Fresque Rouergue et Saveurs — panoramique", width: 3280, height: 1848 },
      { src: "/images/site communication/entreprises collectivitées/rouergue et saveurs 12 2022/IMG_20221021_163149.webp", alt: "Fresque Rouergue et Saveurs — détail", width: 2464, height: 2464 },
      { src: "/images/site communication/entreprises collectivitées/rouergue et saveurs 12 2022/IMG_20221108_165338_308.webp", alt: "Fresque Rouergue et Saveurs — résultat", width: 1440, height: 1325 },
    ],
    cover: 0,
  },
  {
    id: "salle-fetes-tremouilles",
    title: "Salle des Fêtes — Trémouilles",
    section: "entreprises",
    year: 2021,
    location: "Trémouilles (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/salle des fêtes trémouilles 2021/IMG_20220722_193057.webp", alt: "Fresque salle des fêtes Trémouilles — vue 1", width: 3000, height: 4000 },
      { src: "/images/site communication/entreprises collectivitées/salle des fêtes trémouilles 2021/IMG_20220722_194800.webp", alt: "Fresque salle des fêtes Trémouilles — vue 2", width: 3000, height: 4000 },
    ],
    cover: 0,
  },
  {
    id: "salon-esthetique-rodez",
    title: "Salon Esthétique — Rodez",
    section: "entreprises",
    year: 2023,
    location: "Rodez (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/Salon esthetique rodez 12 2023/IMG_20221115_101721_689.webp", alt: "Fresque salon esthétique Rodez — vue 1", width: 1440, height: 1440 },
      { src: "/images/site communication/entreprises collectivitées/Salon esthetique rodez 12 2023/IMG_20221115_101722_124.webp", alt: "Fresque salon esthétique Rodez — vue 2", width: 1440, height: 1440 },
      { src: "/images/site communication/entreprises collectivitées/Salon esthetique rodez 12 2023/NANA2.webp", alt: "Fresque salon esthétique — portrait NANA", width: 1440, height: 1440 },
    ],
    cover: 2,
  },
  {
    id: "soudhydro-rodez",
    title: "Soudhydro — Rodez",
    section: "entreprises",
    year: 2018,
    location: "Rodez (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/soudhydro Rodez 12 2018/IMG-20191220-WA0007.webp", alt: "Fresque Soudhydro — vue avant", width: 1440, height: 1440 },
      { src: "/images/site communication/entreprises collectivitées/soudhydro Rodez 12 2018/IMG-20191220-WA0022.webp", alt: "Fresque Soudhydro — en cours", width: 1600, height: 1200 },
      { src: "/images/site communication/entreprises collectivitées/soudhydro Rodez 12 2018/IMG-20191220-WA0026.webp", alt: "Fresque Soudhydro — vue latérale", width: 1200, height: 1600 },
      { src: "/images/site communication/entreprises collectivitées/soudhydro Rodez 12 2018/IMG-20191220-WA0032.webp", alt: "Soudhydro Rodez — fresque extérieure terminée", width: 1600, height: 1200 },
      { src: "/images/site communication/entreprises collectivitées/soudhydro Rodez 12 2018/IMG-20191221-WA0002.webp", alt: "Soudhydro Rodez — vue complète", width: 842, height: 528 },
    ],
    cover: 3,
  },
  {
    id: "vent-du-sud",
    title: "Vent du Sud",
    section: "entreprises",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/vent du sud 12 2022/IMG_20220304_155442.webp", alt: "Fresque Vent du Sud — vue d'ensemble", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/vent du sud 12 2022/IMG_20220304_155502.webp", alt: "Fresque Vent du Sud — détail", width: 3000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/vent du sud 12 2022/VDS.webp", alt: "Fresque Vent du Sud — logo", width: 1440, height: 1440 },
      { src: "/images/site communication/entreprises collectivitées/vent du sud 12 2022/VDSé.webp", alt: "Fresque Vent du Sud — résultat", width: 1440, height: 1440 },
    ],
    cover: 0,
  },
  {
    id: "vestiaires-lycee-laroque",
    title: "Vestiaires Lycée Laroque",
    section: "entreprises",
    year: 2019,
    location: "Onet-le-Château (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/vestiaires Lycée Laroque 12 2019/20200710_142600.webp", alt: "Fresque vestiaires Lycée Laroque — vue d'ensemble", width: 2407, height: 1753 },
      { src: "/images/site communication/entreprises collectivitées/vestiaires Lycée Laroque 12 2019/20200715_114329.webp", alt: "Fresque vestiaires Laroque — en cours", width: 4032, height: 1960 },
      { src: "/images/site communication/entreprises collectivitées/vestiaires Lycée Laroque 12 2019/20200715_211511.webp", alt: "Fresque vestiaires Laroque — de nuit", width: 2447, height: 1960 },
      { src: "/images/site communication/entreprises collectivitées/vestiaires Lycée Laroque 12 2019/20200716_175558.webp", alt: "Fresque vestiaires Laroque — couleurs vives", width: 4032, height: 1960 },
      { src: "/images/site communication/entreprises collectivitées/vestiaires Lycée Laroque 12 2019/20200720_140134.webp", alt: "Détail fresque vestiaires sportifs Lycée Laroque", width: 4032, height: 1960 },
      { src: "/images/site communication/entreprises collectivitées/vestiaires Lycée Laroque 12 2019/vestiaire laroque.webp", alt: "Résultat final vestiaires Lycée Laroque", width: 3977, height: 1933 },
    ],
    cover: 5,
  },
  /* --- Entreprises : fichiers isolés (hors sous-dossier) --- */
  {
    id: "salle-fetes-albi",
    title: "Salle des Fêtes — Albi",
    section: "entreprises",
    year: 2021,
    location: "Albi (81)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/salle des fêtes Albi 81.webp", alt: "Fresque murale salle des fêtes d'Albi", width: 3000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "ruthene-coachin",
    title: "Ruthène Coach'in",
    section: "entreprises",
    year: 2018,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/ruthene coah'in 2018.webp", alt: "Fresque Ruthène Coach'in", width: 4032, height: 3024 },
    ],
    cover: 0,
  },
  {
    id: "nana-fresque",
    title: "Fresque NANA",
    section: "entreprises",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/NANA.webp", alt: "Fresque portrait NANA — style pop art", width: 1440, height: 1440 },
    ],
    cover: 0,
  },
  {
    id: "fresque-piscine-camping",
    title: "Fresque Piscine — Camping",
    section: "entreprises",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/IMG-20210313-WA0001.webp", alt: "Fresque piscine camping — décoration aquatique", width: 884, height: 988 },
    ],
    cover: 0,
  },
  {
    id: "fresque-murale-2021-1",
    title: "Fresque Murale 2021",
    section: "entreprises",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/IMG-20211020-WA0011.webp", alt: "Fresque murale — vue verticale", width: 1086, height: 1448 },
      { src: "/images/site communication/entreprises collectivitées/IMG-20211020-WA0017.webp", alt: "Fresque murale — vue horizontale", width: 1448, height: 1086 },
    ],
    cover: 0,
  },

  /* ═══════════════════════════════════════════════
     PARTICULIERS
     ═══════════════════════════════════════════════ */
  {
    id: "fresque-surf",
    title: "Fresque Surf",
    section: "particuliers",
    year: 2020,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/SURF.webp", alt: "Fresque murale surf — chambre particulier", width: 960, height: 540 },
    ],
    cover: 0,
  },
  {
    id: "chambre-simon",
    title: "Chambre Simon",
    section: "particuliers",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/simon.webp", alt: "Fresque personnalisée chambre enfant Simon", width: 960, height: 712 },
    ],
    cover: 0,
  },
  {
    id: "decoration-exterieure",
    title: "Décoration Extérieure",
    section: "particuliers",
    year: 2019,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/20190305_114441.webp", alt: "Décoration murale extérieure — vue 1", width: 4032, height: 1960 },
      { src: "/images/site communication/particuliers/20190305_114501.webp", alt: "Décoration murale extérieure — vue 2", width: 4032, height: 1960 },
    ],
    cover: 0,
  },
  {
    id: "fresque-basketball",
    title: "Fresque Basketball",
    section: "particuliers",
    year: 2020,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/20200502_110339.webp", alt: "Fresque basketball — en cours de réalisation", width: 4032, height: 1960 },
      { src: "/images/site communication/particuliers/20200502_110419.webp", alt: "Fresque basketball — joueur en action", width: 2044, height: 1615 },
      { src: "/images/site communication/particuliers/20200502_110549.webp", alt: "Fresque basketball — vue large", width: 4032, height: 1960 },
      { src: "/images/site communication/particuliers/20200502_112154.webp", alt: "Fresque basketball — détail 1", width: 4032, height: 1960 },
      { src: "/images/site communication/particuliers/20200502_112159.webp", alt: "Fresque basketball — détail 2", width: 4032, height: 1960 },
    ],
    cover: 1,
  },
  {
    id: "fresque-chambre-coloree",
    title: "Fresque Chambre Colorée",
    section: "particuliers",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/20210118_171900.webp", alt: "Fresque murale chambre — univers coloré", width: 3024, height: 3024 },
    ],
    cover: 0,
  },
  {
    id: "fresque-portrait-realiste",
    title: "Portrait Réaliste",
    section: "particuliers",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/20210129_193148.webp", alt: "Portrait mural réaliste — nuit", width: 4032, height: 3024 },
      { src: "/images/site communication/particuliers/20210130_114910.webp", alt: "Portrait mural réaliste — jour", width: 2117, height: 2823 },
    ],
    cover: 0,
  },
  {
    id: "fresque-lion-realiste",
    title: "Fresque Lion Réaliste",
    section: "particuliers",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/286760592_593764265670510_6938627902755638076_n.webp", alt: "Fresque murale lion réaliste — intérieur particulier", width: 1440, height: 1082 },
    ],
    cover: 0,
  },
  {
    id: "fresque-personnage-bd",
    title: "Personnage Style BD",
    section: "particuliers",
    year: 2019,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/28752404_176937463112664_3180297642009690112_n - Copie.webp", alt: "Fresque personnage style bande dessinée — intérieur", width: 1080, height: 1075 },
      { src: "/images/site communication/particuliers/28752404_176937463112664_3180297642009690112_n.webp", alt: "Fresque personnage BD — originale", width: 1080, height: 1075 },
    ],
    cover: 0,
  },
  {
    id: "chambre-enfant-leny",
    title: "Chambre Enfant Lény — Toulouse",
    section: "particuliers",
    year: 2021,
    location: "Toulouse (31)",
    images: [
      { src: "/images/site communication/particuliers/chambre enfant Leny Toulouse.webp", alt: "Fresque chambre enfant Lény — Toulouse", width: 1440, height: 1081 },
    ],
    cover: 0,
  },
  {
    id: "fresque-gopro",
    title: "Fresque Extérieure",
    section: "particuliers",
    year: 2020,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/GOPR2011.webp", alt: "Fresque extérieure — vue GoPro", width: 4000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "fresque-anciennes",
    title: "Fresques — Anciennes Réalisations",
    section: "particuliers",
    year: 2018,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG_1286.webp", alt: "Fresque ancienne — vue 1", width: 3264, height: 2448 },
      { src: "/images/site communication/particuliers/IMG_1364.webp", alt: "Fresque ancienne — vue 2", width: 3264, height: 2448 },
      { src: "/images/site communication/particuliers/IMG_4165.webp", alt: "Fresque ancienne — vue 3", width: 3264, height: 2448 },
    ],
    cover: 0,
  },
  {
    id: "fresque-interieure-2021",
    title: "Fresque Intérieure 2021",
    section: "particuliers",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG_20211017_173438.webp", alt: "Fresque intérieure — vue d'ensemble", width: 3280, height: 2464 },
    ],
    cover: 0,
  },
  {
    id: "portrait-mural",
    title: "Portrait Mural",
    section: "particuliers",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG_20211218_105708.webp", alt: "Portrait mural — en cours de réalisation", width: 3280, height: 2464 },
      { src: "/images/site communication/particuliers/IMG_20211218_120301.webp", alt: "Portrait mural — avancement", width: 3280, height: 2464 },
      { src: "/images/site communication/particuliers/IMG_20211218_120647.webp", alt: "Portrait mural réaliste — résultat final", width: 3000, height: 4000 },
    ],
    cover: 2,
  },
  {
    id: "fresque-chambre-2022",
    title: "Fresque Chambre 2022",
    section: "particuliers",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG_20220718_153828.webp", alt: "Fresque chambre — vue 1", width: 3280, height: 2464 },
      { src: "/images/site communication/particuliers/IMG_20220720_144813.webp", alt: "Fresque chambre — vue 2", width: 3280, height: 2464 },
    ],
    cover: 0,
  },
  {
    id: "fresque-fleurs-2023",
    title: "Fresque Florale",
    section: "particuliers",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG_20230504_163658.webp", alt: "Fresque florale — vue 1", width: 2464, height: 2464 },
      { src: "/images/site communication/particuliers/IMG_20230504_163711.webp", alt: "Fresque florale — vue 2", width: 2464, height: 2464 },
      { src: "/images/site communication/particuliers/IMG_20230504_163729.webp", alt: "Fresque florale — résultat", width: 2464, height: 2464 },
    ],
    cover: 0,
  },
  {
    id: "fresque-tete-mort",
    title: "Fresque Tête de Mort",
    section: "particuliers",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG_20231102_132957.webp", alt: "Fresque tête de mort — vue d'ensemble", width: 3000, height: 3000 },
      { src: "/images/site communication/particuliers/IMG_20231102_165415.webp", alt: "Fresque tête de mort — détail", width: 3000, height: 3000 },
      { src: "/images/site communication/particuliers/IMG_20231102_165751.webp", alt: "Fresque tête de mort — résultat", width: 3000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "fresque-chambre-2024-mars",
    title: "Fresque Chambre — Mars 2024",
    section: "particuliers",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG_20240316_170528.webp", alt: "Fresque chambre mars 2024 — vue 1", width: 3000, height: 4000 },
      { src: "/images/site communication/particuliers/IMG_20240316_170539.webp", alt: "Fresque chambre mars 2024 — vue 2", width: 2464, height: 3280 },
    ],
    cover: 0,
  },
  {
    id: "fresque-avril-2024",
    title: "Fresque Avril 2024",
    section: "particuliers",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG_20240412_121039.webp", alt: "Fresque avril 2024 — vue 1", width: 4000, height: 3000 },
      { src: "/images/site communication/particuliers/IMG_20240412_121217.webp", alt: "Fresque avril 2024 — vue 2", width: 4000, height: 3000 },
      { src: "/images/site communication/particuliers/IMG_20240412_121318.webp", alt: "Fresque avril 2024 — vue 3", width: 4000, height: 3000 },
      { src: "/images/site communication/particuliers/IMG_20240412_121328.webp", alt: "Fresque avril 2024 — vue 4", width: 4000, height: 3000 },
      { src: "/images/site communication/particuliers/IMG_20240412_161607.webp", alt: "Fresque avril 2024 — résultat final", width: 4000, height: 3000 },
    ],
    cover: 4,
  },
  {
    id: "fresque-animaux-2024",
    title: "Fresque Animaux",
    section: "particuliers",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG_20240429_092018.webp", alt: "Fresque animaux — vue 1", width: 3000, height: 4000 },
      { src: "/images/site communication/particuliers/IMG_20240429_092023.webp", alt: "Fresque animaux — vue 2", width: 3000, height: 4000 },
    ],
    cover: 0,
  },
  {
    id: "fresque-mai-2025",
    title: "Fresque Mai 2025",
    section: "particuliers",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG_20250517_162730.webp", alt: "Fresque mai 2025 — vue 1", width: 4000, height: 3000 },
      { src: "/images/site communication/particuliers/IMG_20250517_163732.webp", alt: "Fresque mai 2025 — vue 2", width: 4000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "fresque-portrait-femme-2022",
    title: "Portrait Femme — Commande 2022",
    section: "particuliers",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG-20220219-WA0009.webp", alt: "Portrait femme — commande particulier", width: 1200, height: 1600 },
      { src: "/images/site communication/particuliers/IMG-20220224-WA0006.webp", alt: "Portrait femme — résultat final", width: 900, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "fresque-avril-2024-wa",
    title: "Fresque Intérieure — Avril 2024",
    section: "particuliers",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG-20240411-WA0018.webp", alt: "Fresque intérieure avril 2024 — vue 1", width: 1536, height: 2040 },
      { src: "/images/site communication/particuliers/IMG-20240412-WA0024.webp", alt: "Fresque intérieure avril 2024 — vue 2", width: 1536, height: 2040 },
    ],
    cover: 0,
  },
  {
    id: "fresque-visage-femme",
    title: "Fresque Visage Femme",
    section: "particuliers",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/WhatsApp Image 2023-07-05 at 12.33.40.webp", alt: "Fresque visage de femme — vue 1", width: 1500, height: 2000 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2023-07-05 at 12.33.42.webp", alt: "Fresque visage de femme — style pop art", width: 1500, height: 2000 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2023-07-05 at 12.33.45.webp", alt: "Fresque visage — vue d'ensemble", width: 2048, height: 2048 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2023-07-05 at 12.33.48.webp", alt: "Fresque visage — détail", width: 2048, height: 2048 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2023-07-05 at 12.34.10.webp", alt: "Fresque visage — carrée", width: 2048, height: 2048 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2023-07-05 at 12.34.12 (1).webp", alt: "Fresque intérieur — détail pop art", width: 1640, height: 1232 },
    ],
    cover: 1,
  },
  {
    id: "fresque-abstraite",
    title: "Fresque Abstraite",
    section: "particuliers",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_028794ac.webp", alt: "Fresque abstraite intérieur — couleurs vives", width: 1200, height: 1600 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_11a55126.webp", alt: "Fresque abstraite — vue complémentaire", width: 1200, height: 1600 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_2dfe4ffa.webp", alt: "Fresque abstraite — vue d'ensemble", width: 1200, height: 1600 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_2f1aa34c.webp", alt: "Fresque abstraite — détail", width: 1600, height: 1201 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_3543fe83.webp", alt: "Fresque abstraite — vue horizontale", width: 1600, height: 1201 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_46c9744e.webp", alt: "Fresque abstraite — détail couleur", width: 1200, height: 1600 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_be6338bd.webp", alt: "Fresque nature — vue complète", width: 1200, height: 1600 },
      { src: "/images/site communication/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_cdfcd652.webp", alt: "Fresque abstraite — résultat final", width: 1600, height: 1201 },
    ],
    cover: 0,
  },

  /* ═══════════════════════════════════════════════
     PARTICIPATIFS
     ═══════════════════════════════════════════════ */
  {
    id: "atelier-participatif-ecole-1",
    title: "Atelier Fresque — École",
    section: "participatifs",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/IMG_20220429_150032.webp", alt: "Atelier fresque participatif avec des élèves", width: 4000, height: 3000 },
      { src: "/images/site communication/participatif/IMG_20221221_122146.webp", alt: "Résultat atelier participatif — fresque collective école", width: 4000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "atelier-nov-2023",
    title: "Atelier Participatif — Novembre 2023",
    section: "participatifs",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/IMG_20231110_123531.webp", alt: "Atelier participatif novembre 2023", width: 4000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "atelier-participatif-noel",
    title: "Atelier Fresque de Noël",
    section: "participatifs",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/IMG_20231222_151117 - Copie.webp", alt: "Atelier fresque de Noël — enfants peignant", width: 3000, height: 4000 },
      { src: "/images/site communication/participatif/IMG_20231222_151117.webp", alt: "Atelier fresque de Noël — originale", width: 3000, height: 4000 },
    ],
    cover: 0,
  },
  {
    id: "atelier-janvier-2024",
    title: "Atelier Participatif — Janvier 2024",
    section: "participatifs",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/IMG_20240126_100630.webp", alt: "Atelier janvier 2024 — vue d'ensemble", width: 4000, height: 3000 },
      { src: "/images/site communication/participatif/IMG_20240126_100630 - Copie.webp", alt: "Atelier janvier 2024 — copie", width: 4000, height: 3000 },
      { src: "/images/site communication/participatif/IMG_20240126_145914.webp", alt: "Résultat atelier janvier 2024", width: 4000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "atelier-participatif-enfants",
    title: "Atelier Enfants — Peinture Libre",
    section: "participatifs",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/IMG_20240209_105109.webp", alt: "Atelier enfants — préparation", width: 2464, height: 2464 },
      { src: "/images/site communication/participatif/IMG_20240209_105120.webp", alt: "Atelier enfants — matériel", width: 2464, height: 2464 },
      { src: "/images/site communication/participatif/IMG_20240209_114816.webp", alt: "Atelier peinture enfants — créativité libre", width: 3280, height: 2464 },
      { src: "/images/site communication/participatif/IMG_20240209_115548.webp", alt: "Enfants peignant ensemble — atelier participatif", width: 4000, height: 3000 },
    ],
    cover: 3,
  },
  {
    id: "atelier-fevrier-2024",
    title: "Atelier Participatif — Février 2024",
    section: "participatifs",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/IMG_20240229_164858.webp", alt: "Atelier février 2024 — vue 1", width: 2464, height: 3280 },
      { src: "/images/site communication/participatif/IMG_20240229_164935.webp", alt: "Atelier février 2024 — vue 2", width: 3000, height: 4000 },
    ],
    cover: 0,
  },
  {
    id: "atelier-mars-2024",
    title: "Atelier Participatif — Mars 2024",
    section: "participatifs",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/IMG_20240325_102421.webp", alt: "Atelier mars 2024 — vue d'ensemble", width: 4000, height: 3000 },
      { src: "/images/site communication/participatif/IMG_20240325_105625.webp", alt: "Fresque participative enfants — résultat coloré", width: 3000, height: 4000 },
      { src: "/images/site communication/participatif/IMG_20240325_105628.webp", alt: "Atelier mars 2024 — fresque terminée", width: 3000, height: 4000 },
      { src: "/images/site communication/participatif/IMG_20240325_113715.webp", alt: "Atelier mars 2024 — détail", width: 3000, height: 4000 },
    ],
    cover: 1,
  },
  {
    id: "atelier-avril-2025",
    title: "Atelier Participatif — Avril 2025",
    section: "participatifs",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/IMG_20250404_161529.webp", alt: "Atelier participatif avril 2025", width: 3280, height: 2464 },
    ],
    cover: 0,
  },
  {
    id: "atelier-participatif-asso",
    title: "Fresque Associative",
    section: "participatifs",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/IMG-20230929-WA0008.webp", alt: "Fresque participative associative — en cours", width: 1500, height: 2000 },
      { src: "/images/site communication/participatif/IMG-20230929-WA0009.webp", alt: "Fresque associative — résultat final", width: 2000, height: 1500 },
    ],
    cover: 1,
  },
  {
    id: "participatif-groupe-1",
    title: "Atelier Collectif — Été 2023",
    section: "participatifs",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/WhatsApp Image 2023-07-05 at 12.34.12 (2).webp", alt: "Atelier collectif estival — préparation", width: 2000, height: 1500 },
      { src: "/images/site communication/participatif/WhatsApp Image 2023-07-05 at 12.34.12 (3).webp", alt: "Atelier collectif — peinture en groupe", width: 1640, height: 1232 },
      { src: "/images/site communication/participatif/WhatsApp Image 2023-07-05 at 12.34.13 (1).webp", alt: "Fresque collective — détail coloré", width: 1640, height: 1232 },
      { src: "/images/site communication/participatif/WhatsApp Image 2023-07-05 at 12.34.13 (2).webp", alt: "Fresque collective — autre vue", width: 1640, height: 1232 },
      { src: "/images/site communication/participatif/WhatsApp Image 2023-07-05 at 12.34.13.webp", alt: "Résultat fresque collective été", width: 2000, height: 1500 },
      { src: "/images/site communication/participatif/WhatsApp Image 2023-07-05 at 12.34.15.webp", alt: "Atelier collectif — vue de groupe", width: 2000, height: 1500 },
      { src: "/images/site communication/participatif/WhatsApp Image 2023-07-05 at 12.34.16 (1).webp", alt: "Atelier collectif — détail 1", width: 2000, height: 1500 },
      { src: "/images/site communication/participatif/WhatsApp Image 2023-07-05 at 12.34.16 (2).webp", alt: "Atelier collectif — détail 2", width: 2000, height: 1500 },
      { src: "/images/site communication/participatif/WhatsApp Image 2023-07-05 at 12.34.16 (3).webp", alt: "Atelier collectif — détail 3", width: 2000, height: 1500 },
      { src: "/images/site communication/participatif/WhatsApp Image 2023-07-05 at 12.34.16 (4).webp", alt: "Atelier collectif — résultat final", width: 2000, height: 1500 },
    ],
    cover: 0,
  },
  {
    id: "participatif-groupe-2",
    title: "Fresque Participative — Mur Collectif",
    section: "participatifs",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/WhatsApp Image 2025-09-11 à 13.58.36_07a0923c.webp", alt: "Fresque participative mur collectif — en cours", width: 1600, height: 1200 },
      { src: "/images/site communication/participatif/WhatsApp Image 2025-09-11 à 13.58.36_1167dfa5.webp", alt: "Fresque participative mur collectif — résultat", width: 1600, height: 1201 },
    ],
    cover: 0,
  },
  {
    id: "ateliers-camsp",
    title: "Ateliers CAMSP — Centre d'Action Médico-Social Précoce",
    section: "participatifs",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/participatif/ateliers camsp centre d'action médico social précoce/WhatsApp Image 2024-05-19 at 08.39.12.webp", alt: "Atelier CAMSP — vue 1", width: 1600, height: 1200 },
      { src: "/images/site communication/participatif/ateliers camsp centre d'action médico social précoce/WhatsApp Image 2024-05-19 at 08.39.13.webp", alt: "Atelier CAMSP — vue 2", width: 1600, height: 1200 },
      { src: "/images/site communication/participatif/ateliers camsp centre d'action médico social précoce/WhatsApp Image 2024-05-23 at 10.02.52.webp", alt: "Atelier CAMSP — résultat 1", width: 1600, height: 1200 },
      { src: "/images/site communication/participatif/ateliers camsp centre d'action médico social précoce/WhatsApp Image 2024-05-23 at 10.02.53.webp", alt: "Atelier CAMSP — résultat 2", width: 1600, height: 1201 },
      { src: "/images/site communication/participatif/ateliers camsp centre d'action médico social précoce/WhatsApp Image 2024-05-23 at 10.02.55.webp", alt: "Atelier CAMSP — résultat final", width: 1600, height: 1201 },
    ],
    cover: 0,
  },

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
      { src: "/images/site communication/événementiel expo/caserne millau 12 2021/caserne Millau 2021.webp", alt: "Fresque murale caserne de Millau — vue d'ensemble", width: 591, height: 443 },
      { src: "/images/site communication/événementiel expo/caserne millau 12 2021/IMG_3227.webp", alt: "Fresque caserne Millau — détail réalisation", width: 4032, height: 3024 },
    ],
    cover: 1,
  },
  {
    id: "expo-salles-gosses-mjc-onet",
    title: "Expo Salles Gosses — MJC Onet",
    section: "evenementiel",
    year: 2018,
    location: "Onet-le-Château (12)",
    images: [
      { src: "/images/site communication/événementiel expo/expo salles gosses MJC Onet 12 2018/20210303_163115.webp", alt: "Exposition Salles Gosses MJC Onet — vue d'ensemble", width: 1066, height: 650 },
      { src: "/images/site communication/événementiel expo/expo salles gosses MJC Onet 12 2018/20210303_163139.webp", alt: "Expo Salles Gosses — visiteurs et fresques", width: 1080, height: 543 },
      { src: "/images/site communication/événementiel expo/expo salles gosses MJC Onet 12 2018/20210303_163155.webp", alt: "Expo Salles Gosses — détail oeuvres exposées", width: 1080, height: 594 },
    ],
    cover: 0,
  },
  {
    id: "urban-fest-albi-event",
    title: "Urban Fest Albi",
    section: "evenementiel",
    year: 2021,
    location: "Albi (81)",
    images: [
      { src: "/images/site communication/événementiel expo/urban fest albi 2021/IMG_20210829_104235.webp", alt: "Urban Fest Albi — live painting en plein air", width: 2000, height: 1500 },
      { src: "/images/site communication/événementiel expo/urban fest albi 2021/urban fest albi 2021.webp", alt: "Urban Fest Albi — artiste muraliste en action", width: 562, height: 682 },
    ],
    cover: 0,
  },
  {
    id: "live-painting-kerea",
    title: "Live Painting KEREA",
    section: "evenementiel",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/Kerea reception-09.webp", alt: "Live painting KEREA — artiste en action lors de la réception", width: 4256, height: 2832 },
      { src: "/images/site communication/événementiel expo/Kerea reception-12.webp", alt: "Live painting KEREA — réalisation en direct", width: 4256, height: 2832 },
      { src: "/images/site communication/événementiel expo/Kerea reception-39.webp", alt: "Live painting KEREA — fresque en cours", width: 4256, height: 2832 },
      { src: "/images/site communication/événementiel expo/Kerea reception-41.webp", alt: "Live painting KEREA — résultat final", width: 4256, height: 2832 },
      { src: "/images/site communication/événementiel expo/Kerea arrivée-39.webp", alt: "Événement KEREA — arrivée et mise en place", width: 4256, height: 2832 },
    ],
    cover: 0,
  },
  {
    id: "atout-aveyron-event",
    title: "Atout Aveyron — Événement",
    section: "evenementiel",
    year: 2019,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/atout aveyron event 2019.webp", alt: "Événement Atout Aveyron — live painting", width: 768, height: 768 },
    ],
    cover: 0,
  },
  {
    id: "biggy-le-krill-event",
    title: "Biggy Le Krill — Concert Live Painting",
    section: "evenementiel",
    year: 2018,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/biggy le krill 12 2018.webp", alt: "Live painting lors du concert Biggy Le Krill", width: 4032, height: 1960 },
    ],
    cover: 0,
  },
  {
    id: "escape-game-agglobus",
    title: "Escape Game Agglobus — Rodez",
    section: "evenementiel",
    year: 2019,
    location: "Rodez (12)",
    images: [
      { src: "/images/site communication/événementiel expo/escape game agglobus rodez 2019.webp", alt: "Décor escape game Agglobus Rodez", width: 4000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "live-painting-2022-fevrier",
    title: "Live Painting — Février 2022",
    section: "evenementiel",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/IMG_20220206_075255.webp", alt: "Live painting février 2022", width: 2016, height: 2017 },
    ],
    cover: 0,
  },
  {
    id: "live-painting-soiree-2022",
    title: "Live Painting — Soirée 2022",
    section: "evenementiel",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/IMG_20220415_213936.webp", alt: "Live painting nocturne — performance artistique", width: 3000, height: 4000 },
      { src: "/images/site communication/événementiel expo/IMG_20220531_201948_962.webp", alt: "Live painting — mai 2022", width: 768, height: 768 },
      { src: "/images/site communication/événementiel expo/IMG_20220618_160655.webp", alt: "Live painting en soirée — fresque en cours de réalisation", width: 4000, height: 3000 },
      { src: "/images/site communication/événementiel expo/IMG_20220809_183526.webp", alt: "Live painting estival — artiste muraliste en plein air", width: 4000, height: 3000 },
    ],
    cover: 2,
  },
  {
    id: "live-painting-expo-2023",
    title: "Live Painting — Expo 2023",
    section: "evenementiel",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/IMG_20231129_203747.webp", alt: "Live painting lors d'une exposition — vue d'ensemble", width: 3000, height: 4000 },
      { src: "/images/site communication/événementiel expo/IMG_20231129_210153.webp", alt: "Live painting exposition — détail oeuvre en cours", width: 3280, height: 2464 },
    ],
    cover: 0,
  },
  {
    id: "live-painting-festival-2024",
    title: "Live Painting — Festival 2024",
    section: "evenementiel",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/IMG_20240503_164102.webp", alt: "Live painting festival — début de la fresque", width: 3000, height: 4000 },
      { src: "/images/site communication/événementiel expo/IMG_20240503_164107.webp", alt: "Live painting festival — progression", width: 3000, height: 4000 },
      { src: "/images/site communication/événementiel expo/IMG_20240503_164112.webp", alt: "Live painting festival — détails colorés", width: 3000, height: 4000 },
      { src: "/images/site communication/événementiel expo/IMG_20240503_164117.webp", alt: "Live painting festival — résultat final", width: 3000, height: 4000 },
    ],
    cover: 3,
  },
  {
    id: "snapseed-event",
    title: "Performance Live Painting",
    section: "evenementiel",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/Snapseed.webp", alt: "Performance live painting — portrait en cours", width: 2974, height: 3965 },
    ],
    cover: 0,
  },
  {
    id: "live-painting-evenements-2023",
    title: "Live Painting — Événements 2023",
    section: "evenementiel",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/WhatsApp Image 2023-07-05 at 12.33.15.webp", alt: "Live painting événement — vue carrée", width: 2048, height: 2048 },
      { src: "/images/site communication/événementiel expo/WhatsApp Image 2023-07-05 at 12.33.37.webp", alt: "Live painting — vue verticale", width: 1232, height: 1640 },
      { src: "/images/site communication/événementiel expo/WhatsApp Image 2023-07-05 at 12.33.54.webp", alt: "Live painting — portrait", width: 1440, height: 1800 },
      { src: "/images/site communication/événementiel expo/WhatsApp Image 2023-07-05 at 12.33.57.webp", alt: "Performance live painting lors d'un événement", width: 1440, height: 1802 },
    ],
    cover: 0,
  },
  {
    id: "kerea-reception-event",
    title: "Réception KEREA — Événement 2025",
    section: "evenementiel",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/WhatsApp Image 2025-09-10 à 14.30.01_401daddb.webp", alt: "Réception KEREA — vue 1", width: 1600, height: 1064 },
      { src: "/images/site communication/événementiel expo/WhatsApp Image 2025-09-10 à 14.30.02_679dc1ae.webp", alt: "Réception KEREA — vue 2", width: 1600, height: 1064 },
      { src: "/images/site communication/événementiel expo/WhatsApp Image 2025-09-10 à 14.30.03_60a2ef6d.webp", alt: "Réception KEREA — vue 3", width: 1600, height: 1064 },
    ],
    cover: 0,
  },
  {
    id: "expo-vernissage",
    title: "Vernissage — Exposition 2025",
    section: "evenementiel",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/WhatsApp Image 2025-09-12 à 13.35.41_f032a43e.webp", alt: "Vernissage exposition — mise en place", width: 1600, height: 1200 },
      { src: "/images/site communication/événementiel expo/WhatsApp Image 2025-09-12 à 13.35.44_8e71f5be.webp", alt: "Vernissage — visiteurs découvrant les fresques", width: 1200, height: 1600 },
      { src: "/images/site communication/événementiel expo/WhatsApp Image 2025-09-12 à 13.35.47_7f151ba7.webp", alt: "Vernissage — vue d'ensemble de l'exposition", width: 1200, height: 1600 },
      { src: "/images/site communication/événementiel expo/WhatsApp Image 2025-09-12 à 13.35.48_63af8f73.webp", alt: "Vernissage — détail oeuvres exposées", width: 1200, height: 1600 },
    ],
    cover: 0,
  },

  /* ═══════════════════════════════════════════════
     COUPS DE CŒUR
     (sélection de projets des autres catégories)
     ═══════════════════════════════════════════════ */
  {
    id: "coup-de-coeur-kerea",
    title: "Live Painting KEREA",
    section: "coups-de-coeur",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/événementiel expo/Kerea reception-41.webp", alt: "Live painting KEREA — résultat final", width: 4256, height: 2832 },
      { src: "/images/site communication/événementiel expo/Kerea reception-09.webp", alt: "Live painting KEREA — artiste en action", width: 4256, height: 2832 },
    ],
    cover: 0,
  },
  {
    id: "coup-de-coeur-skatepark",
    title: "Skate Parc Decazeville",
    section: "coups-de-coeur",
    year: 2024,
    location: "Decazeville (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-31.webp", alt: "Fresque skate parc Decazeville — vue large", width: 6000, height: 3375 },
      { src: "/images/site communication/entreprises collectivitées/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-4.webp", alt: "Skate parc Decazeville — vue d'ensemble", width: 3689, height: 2075 },
    ],
    cover: 0,
  },
  {
    id: "coup-de-coeur-cransac",
    title: "Révélation Cransac",
    section: "coups-de-coeur",
    year: 2021,
    location: "Cransac (12)",
    images: [
      { src: "/images/site communication/entreprises collectivitées/révélation cransac 12 2021/Cransac 12.webp", alt: "Fresque Révélation Cransac — vue d'ensemble", width: 4000, height: 3000 },
      { src: "/images/site communication/entreprises collectivitées/révélation cransac 12 2021/IMG_20211209_145441.webp", alt: "Fresque Cransac — vue finale", width: 4594, height: 2851 },
    ],
    cover: 0,
  },
  {
    id: "coup-de-coeur-tete-mort",
    title: "Fresque Tête de Mort",
    section: "coups-de-coeur",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/site communication/particuliers/IMG_20231102_165415.webp", alt: "Fresque tête de mort — détail", width: 3000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "coup-de-coeur-urban-fest",
    title: "Urban Fest Albi",
    section: "coups-de-coeur",
    year: 2021,
    location: "Albi (81)",
    images: [
      { src: "/images/site communication/événementiel expo/urban fest albi 2021/IMG_20210829_104235.webp", alt: "Urban Fest Albi — live painting", width: 2000, height: 1500 },
    ],
    cover: 0,
  },
];
