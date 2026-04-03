/* ─── Portfolio Projects — IWOK Muraliste ─────────────── */
/* Source de vérité : pipeline/output/04-portfolio-categories.md */

export type PortfolioSectionSlug =
  | "particuliers"
  | "entreprises"
  | "participatifs"
  | "coups-de-coeur";

export type CategoryName = "Particuliers" | "Entreprises et Collectivités" | "Participatifs" | "Coups de cœur";

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
  "Coups de cœur": "coups-de-coeur",
};

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
      { src: "/images/entreprises/Skate Park Decaze - Guillaume 2024-4.webp", alt: "Vue d'ensemble du skate parc de Decazeville avec fresques murales colorées", width: 3689, height: 2075 },
      { src: "/images/entreprises/Skate Park Decaze - Guillaume 2024-40.webp", alt: "Fresque murale abstraite skate parc Decazeville", width: 4032, height: 3024 },
    ],
    cover: 0,
  },
  {
    id: "kerea-centre-tri",
    title: "Centre de Tri KEREA",
    section: "entreprises",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/entreprises/Kerea reception-41.webp", alt: "Fresque KEREA — vue d'ensemble réception", width: 4256, height: 2832 },
      { src: "/images/entreprises/kerea.webp", alt: "Fresque murale KEREA — détail portrait coloré", width: 1251, height: 971 },
      { src: "/images/entreprises/WhatsApp Image 2025-09-10 à 14.40.55_bc4be19a.webp", alt: "Fresque KEREA en cours de réalisation", width: 1600, height: 1201 },
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
      { src: "/images/entreprises/DJI_0946-2.webp", alt: "Fresque façade école Trémouilles — vue drone", width: 8000, height: 6000 },
    ],
    cover: 0,
  },
  {
    id: "vestiaires-lycee-laroque",
    title: "Vestiaires Lycée Laroque",
    section: "entreprises",
    year: 2020,
    location: "Onet-le-Château (12)",
    images: [
      { src: "/images/entreprises/20200710_142600.webp", alt: "Fresque vestiaires Lycée Laroque — vue d'ensemble", width: 2407, height: 1753 },
      { src: "/images/entreprises/20200716_175558.webp", alt: "Fresque vestiaires Laroque — couleurs vives", width: 4032, height: 1960 },
      { src: "/images/entreprises/20200720_140134.webp", alt: "Détail fresque vestiaires sportifs Lycée Laroque", width: 4032, height: 1960 },
      { src: "/images/entreprises/vestiaire laroque.webp", alt: "Résultat final vestiaires Lycée Laroque", width: 3977, height: 1933 },
    ],
    cover: 3,
  },
  {
    id: "club-tennis-caussade",
    title: "Club de Tennis Caussade",
    section: "entreprises",
    year: 2021,
    location: "Caussade (82)",
    images: [
      { src: "/images/entreprises/20210423_082428.webp", alt: "Détail fresque tennis Caussade", width: 4032, height: 1960 },
      { src: "/images/entreprises/20210423_082444.webp", alt: "Fresque club tennis Caussade — résultat final", width: 4032, height: 1960 },
    ],
    cover: 0,
  },
  {
    id: "soudhydro-rodez",
    title: "Soudhydro",
    section: "entreprises",
    year: 2019,
    location: "Rodez (12)",
    images: [
      { src: "/images/entreprises/IMG-20191220-WA0026.webp", alt: "Fresque Soudhydro — vue latérale", width: 1200, height: 1600 },
      { src: "/images/entreprises/IMG-20191220-WA0032.webp", alt: "Soudhydro Rodez — fresque extérieure terminée", width: 1600, height: 1200 },
    ],
    cover: 1,
  },
  {
    id: "restaurant-bichette",
    title: "Restaurant Bichette",
    section: "entreprises",
    year: 2025,
    location: "Rodez (12)",
    images: [
      { src: "/images/entreprises/WhatsApp Image 2025-09-04 à 13.47.04_e2b04b2c.webp", alt: "Fresque restaurant Bichette — vue d'ensemble", width: 1068, height: 1600 },
      { src: "/images/entreprises/WhatsApp Image 2025-09-04 à 13.47.05_bc59e8f0.webp", alt: "Décoration murale Bichette Rodez", width: 1066, height: 1600 },
      { src: "/images/entreprises/WhatsApp Image 2025-09-04 à 13.48.00_622e5da2.webp", alt: "Fresque murale Bichette — style graphique", width: 1536, height: 2048 },
      { src: "/images/entreprises/WhatsApp Image 2025-10-23 à 16.17.13_ef7b8194.webp", alt: "Résultat final fresque Bichette Rodez", width: 1600, height: 1600 },
      { src: "/images/entreprises/WhatsApp Image 2025-10-23 à 16.17.14_b6af5275.webp", alt: "Détail fresque Bichette — finitions", width: 1600, height: 1600 },
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
      { src: "/images/entreprises/WhatsApp Image 2025-10-24 à 16.10.57_e1ebf6f7.webp", alt: "Résultat final petits chevaux école Trémouilles", width: 1600, height: 900 },
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
      { src: "/images/entreprises/WhatsApp Image 2026-01-16 at 14.17.webp", alt: "Fresque façade Le Monastère — vue d'ensemble", width: 1600, height: 904 },
    ],
    cover: 0,
  },
  {
    id: "controle-technique-pampelonne",
    title: "Contrôle Technique Pampelonne",
    section: "entreprises",
    year: 2021,
    location: "Pampelonne (81)",
    images: [
      { src: "/images/entreprises/IMG_20210827_131400.webp", alt: "Fresque contrôle technique Pampelonne", width: 3000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "salle-fetes-albi",
    title: "Salle des Fêtes Albi",
    section: "entreprises",
    year: 2021,
    location: "Albi (81)",
    images: [
      { src: "/images/entreprises/salle des fêtes Albi 81.webp", alt: "Fresque murale salle des fêtes d'Albi", width: 3000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "escape-game-agglobus",
    title: "Escape Game Agglobus",
    section: "entreprises",
    year: 2019,
    location: "Rodez (12)",
    images: [
      { src: "/images/entreprises/escape game agglobus rodez 2019.webp", alt: "Décor escape game Agglobus Rodez", width: 4000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "fresque-pompier",
    title: "Fresque Pompier",
    section: "entreprises",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/entreprises/fire.webp", alt: "Fresque murale caserne pompiers", width: 591, height: 443 },
    ],
    cover: 0,
  },
  {
    id: "buron-sistre",
    title: "Buron de la Sistre",
    section: "entreprises",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/entreprises/bureau-sistre.webp", alt: "Graffiti mural coloré Buron de la Sistre", width: 2000, height: 1464 },
    ],
    cover: 0,
  },
  {
    id: "fresque-vaches-pop-art",
    title: "Fresque Vaches Pop Art",
    section: "entreprises",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/entreprises/beer-cow.webp", alt: "Fresque murale pop art avec deux vaches portant des lunettes de soleil", width: 1200, height: 1246 },
    ],
    cover: 0,
  },
  {
    id: "atelier-geometrique",
    title: "Atelier Géométrique Coloré",
    section: "entreprises",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/entreprises/colors.webp", alt: "Vue aérienne d'un atelier participatif avec fresque géométrique multicolore", width: 4032, height: 2488 },
    ],
    cover: 0,
  },
  {
    id: "animation-entreprise",
    title: "Animation Entreprise",
    section: "entreprises",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/entreprises/anim-entreprise-1.webp", alt: "Animation live painting pour événement entreprise", width: 1068, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "cabinet-ophtalmologie",
    title: "Cabinet d'Ophtalmologie",
    section: "entreprises",
    year: 2024,
    location: "Rodez (12)",
    images: [
      { src: "/images/entreprises/WhatsApp Image 2025-05-13 à 20.24.36_6b369a59 - Copie.webp", alt: "Fresque cabinet ophtalmologie — portrait lunettes colorées", width: 1201, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "fresque-vin-entreprise",
    title: "Fresque Vin",
    section: "entreprises",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/entreprises/wine.webp", alt: "Fresque murale réaliste — mains portant des verres de vin", width: 4772, height: 6310 },
    ],
    cover: 0,
  },
  {
    id: "camping-piscine",
    title: "Camping — Fresque Piscine",
    section: "entreprises",
    year: 2021,
    location: "Tarn (81)",
    images: [
      { src: "/images/entreprises/IMG-20210313-WA0001.webp", alt: "Fresque piscine camping — décoration aquatique", width: 884, height: 988 },
    ],
    cover: 0,
  },
  {
    id: "commerce-decoration",
    title: "Décoration Commerciale",
    section: "entreprises",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/entreprises/IMG_20230723_122905.webp", alt: "Décoration murale pour commerce — vue d'ensemble", width: 4000, height: 3000 },
      { src: "/images/entreprises/IMG_20230723_122948.webp", alt: "Décoration murale pour commerce — détail", width: 2464, height: 2464 },
    ],
    cover: 0,
  },
  {
    id: "exposition-peinture",
    title: "Exposition Peinture",
    section: "entreprises",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/entreprises/WhatsApp Image 2025-09-12 à 13.35.44_8e71f5be.webp", alt: "Exposition artiste muraliste — vue d'ensemble", width: 1200, height: 1600 },
      { src: "/images/entreprises/WhatsApp Image 2025-09-12 à 13.35.47_7f151ba7.webp", alt: "Vernissage exposition — visiteurs", width: 1200, height: 1600 },
    ],
    cover: 0,
  },

  /* ═══════════════════════════════════════════════
     PARTICULIERS
     ═══════════════════════════════════════════════ */
  {
    id: "fresque-daft-punk",
    title: "Fresque Daft Punk",
    section: "particuliers",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/daft-punk.webp", alt: "Fresque murale Daft Punk avec casques iconiques et couleurs vives", width: 4080, height: 3072 },
    ],
    cover: 0,
  },
  {
    id: "fresque-marvel",
    title: "Fresque Marvel",
    section: "particuliers",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/marvel.webp", alt: "Fresque murale Iron Man style Marvel — chambre enfant", width: 2400, height: 1851 },
    ],
    cover: 0,
  },
  {
    id: "fresque-simba",
    title: "Fresque Lion Simba",
    section: "particuliers",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/simba.webp", alt: "Fresque murale du lion Simba avec feuilles vertes et détails aquarelle", width: 1440, height: 1081 },
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
      { src: "/images/particuliers/286760592_593764265670510_6938627902755638076_n.webp", alt: "Fresque murale lion réaliste — intérieur particulier", width: 1440, height: 1082 },
    ],
    cover: 0,
  },
  {
    id: "portrait-femme-africaine",
    title: "Portrait Femme Africaine",
    section: "particuliers",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/african-wife.webp", alt: "Portrait stylisé de femme africaine avec couleurs vives et détails réalistes", width: 3000, height: 4000 },
    ],
    cover: 0,
  },
  {
    id: "fresque-bonne-soeur",
    title: "Fresque Bonne Sœur",
    section: "particuliers",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/bonne-soeur.webp", alt: "Fresque murale représentant une bonne sœur avec style street art coloré", width: 1200, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "fresque-basketball",
    title: "Fresque Basketball",
    section: "particuliers",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/basket.webp", alt: "Fresque murale sur thème basketball avec joueur en action", width: 2044, height: 1615 },
    ],
    cover: 0,
  },
  {
    id: "fresque-ble",
    title: "Fresque Champ de Blé",
    section: "particuliers",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/ble.webp", alt: "Fresque murale champêtre avec champ de blé doré", width: 3000, height: 3000 },
    ],
    cover: 0,
  },
  {
    id: "fresque-surf",
    title: "Fresque Surf",
    section: "particuliers",
    year: 2020,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/SURF.webp", alt: "Fresque murale surf — chambre particulier", width: 960, height: 540 },
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
      { src: "/images/particuliers/simon.webp", alt: "Fresque personnalisée chambre enfant Simon", width: 960, height: 712 },
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
      { src: "/images/particuliers/IMG_20211218_120647.webp", alt: "Portrait mural réaliste — commande particulier", width: 3000, height: 4000 },
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
      { src: "/images/particuliers/28752404_176937463112664_3180297642009690112_n - Copie.webp", alt: "Fresque personnage style bande dessinée — intérieur", width: 1080, height: 1075 },
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
      { src: "/images/particuliers/20190305_114501.webp", alt: "Décoration murale extérieure — particulier", width: 4032, height: 1960 },
    ],
    cover: 0,
  },
  {
    id: "fresque-chambre-coloree",
    title: "Fresque Chambre",
    section: "particuliers",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/20210118_171900.webp", alt: "Fresque murale chambre — univers coloré", width: 3024, height: 3024 },
    ],
    cover: 0,
  },
  {
    id: "live-painting-mains",
    title: "Live Painting Mains",
    section: "particuliers",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/hand.webp", alt: "Fresque murale de mains liées style réaliste", width: 1536, height: 1536 },
    ],
    cover: 0,
  },
  {
    id: "portrait-cap",
    title: "Portrait au Béret",
    section: "particuliers",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/portrait-cap.webp", alt: "Graffiti portrait d'homme au béret sur fond rouge", width: 3008, height: 2825 },
    ],
    cover: 0,
  },
  {
    id: "cabinet-ophtalmologie-particulier",
    title: "Cabinet d'Ophtalmologie",
    section: "particuliers",
    year: 2024,
    location: "Rodez (12)",
    images: [
      { src: "/images/particuliers/ophtalmo-femme.webp", alt: "Fresque cabinet ophtalmologie — portrait lunettes colorées", width: 1201, height: 1600 },
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
      { src: "/images/particuliers/WhatsApp Image 2023-07-05 at 12.33.42.webp", alt: "Fresque visage de femme — style pop art", width: 1500, height: 2000 },
      { src: "/images/particuliers/WhatsApp Image 2023-07-05 at 12.34.12 (1).webp", alt: "Fresque intérieur — détail pop art", width: 1640, height: 1232 },
    ],
    cover: 0,
  },
  {
    id: "fresque-abstraite",
    title: "Fresque Abstraite",
    section: "particuliers",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_028794ac.webp", alt: "Fresque abstraite intérieur — couleurs vives", width: 1200, height: 1600 },
      { src: "/images/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_2dfe4ffa.webp", alt: "Fresque abstraite — vue d'ensemble", width: 1200, height: 1600 },
      { src: "/images/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_2f1aa34c.webp", alt: "Fresque abstraite — détail", width: 1600, height: 1201 },
      { src: "/images/particuliers/WhatsApp Image 2025-09-04 à 11.06.45_be6338bd.webp", alt: "Fresque nature — vue complète", width: 1200, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "fresque-camping",
    title: "Fresque Camping — Piscine",
    section: "particuliers",
    year: 2021,
    location: "Tarn (81)",
    images: [
      { src: "/images/particuliers/IMG-20210319-WA0008.webp", alt: "Fresque piscine camping — décoration aquatique", width: 1600, height: 1046 },
    ],
    cover: 0,
  },
  {
    id: "biggy-le-krill",
    title: "Biggy Le Krill — Live Painting",
    section: "particuliers",
    year: 2018,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/biggy le krill 12 2018.webp", alt: "Live painting Biggy Le Krill — performance artistique", width: 4032, height: 1960 },
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
      { src: "/images/participatif/IMG_20220429_150032.webp", alt: "Atelier fresque participatif avec des élèves", width: 1600, height: 1200 },
      { src: "/images/participatif/IMG_20221221_122146.webp", alt: "Résultat atelier participatif — fresque collective école", width: 1600, height: 1200 },
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
      { src: "/images/participatif/IMG_20231222_151117 - Copie.webp", alt: "Atelier fresque de Noël — enfants peignant", width: 1600, height: 1200 },
      { src: "/images/participatif/IMG_20240126_145914.webp", alt: "Résultat atelier Noël — fresque terminée", width: 1600, height: 1200 },
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
      { src: "/images/participatif/IMG_20240209_114816.webp", alt: "Atelier peinture enfants — créativité libre", width: 1600, height: 1200 },
      { src: "/images/participatif/IMG_20240209_115548.webp", alt: "Enfants peignant ensemble — atelier participatif", width: 1600, height: 1200 },
      { src: "/images/participatif/IMG_20240325_105625.webp", alt: "Fresque participative enfants — résultat coloré", width: 1600, height: 1200 },
    ],
    cover: 2,
  },
  {
    id: "atelier-participatif-asso",
    title: "Fresque Associative",
    section: "participatifs",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/participatif/IMG-20230929-WA0008.webp", alt: "Fresque participative associative — en cours", width: 1600, height: 1200 },
      { src: "/images/participatif/IMG-20230929-WA0009.webp", alt: "Fresque associative — résultat final", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "participatif-groupe-1",
    title: "Atelier Collectif — Été",
    section: "participatifs",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/participatif/WhatsApp Image 2023-07-05 at 12.34.12 (2).webp", alt: "Atelier collectif estival — préparation", width: 1600, height: 1200 },
      { src: "/images/participatif/WhatsApp Image 2023-07-05 at 12.34.12 (3).webp", alt: "Atelier collectif — peinture en groupe", width: 1600, height: 1200 },
      { src: "/images/participatif/WhatsApp Image 2023-07-05 at 12.34.13 (1).webp", alt: "Fresque collective — détail coloré", width: 1200, height: 1600 },
      { src: "/images/participatif/WhatsApp Image 2023-07-05 at 12.34.13.webp", alt: "Résultat fresque collective été", width: 1600, height: 1200 },
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
      { src: "/images/participatif/WhatsApp Image 2025-09-11 à 13.58.36_07a0923c.webp", alt: "Fresque participative mur collectif — en cours", width: 1200, height: 1600 },
      { src: "/images/participatif/WhatsApp Image 2025-09-11 à 13.58.36_1167dfa5.webp", alt: "Fresque participative mur collectif — résultat", width: 1600, height: 1200 },
    ],
    cover: 0,
  },

  /* ═══════════════════════════════════════════════
     COUPS DE CŒUR
     ═══════════════════════════════════════════════ */
  {
    id: "urban-fest-albi",
    title: "Urban Fest Albi",
    section: "coups-de-coeur",
    year: 2021,
    location: "Albi (81)",
    images: [
      { src: "/images/selection-gui-on-scope/urban fest albi 2021.webp", alt: "Live painting Urban Fest Albi — artiste en action", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "biggy-le-krill-coeur",
    title: "Biggy Le Krill — Live Painting",
    section: "coups-de-coeur",
    year: 2018,
    location: "Aveyron (12)",
    images: [
      { src: "/images/particuliers/biggy le krill 12 2018.webp", alt: "Live painting Biggy Le Krill — performance artistique", width: 4032, height: 1960 },
    ],
    cover: 0,
  },
  {
    id: "gui-on-scope-live",
    title: "Live Painting — En Action",
    section: "coups-de-coeur",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/selection-gui-on-scope/08122021-2.webp", alt: "Live painting — artiste muraliste au travail", width: 1600, height: 1200 },
      { src: "/images/selection-gui-on-scope/08122021-3.webp", alt: "Fresque en cours de réalisation — live", width: 1600, height: 1200 },
      { src: "/images/selection-gui-on-scope/IMG_20220722_193057.webp", alt: "Artiste muraliste — peinture en direct", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "evenement-expo-1",
    title: "Exposition — Kerea Réception",
    section: "coups-de-coeur",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/selection-oneshot/WhatsApp Image 2025-09-12 à 13.35.44_8e71f5be.jpg", alt: "Exposition artiste muraliste — vue d'ensemble", width: 1600, height: 1200 },
      { src: "/images/selection-oneshot/WhatsApp Image 2025-09-12 à 13.35.47_7f151ba7.jpg", alt: "Vernissage exposition — visiteurs", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "evenement-live-painting",
    title: "Live Painting",
    section: "coups-de-coeur",
    year: 2023,
    location: "Rodez (12)",
    images: [
      { src: "/images/selection-gui-on-scope/WhatsApp Image 2023-07-05 at 12.33.57.webp", alt: "Performance live painting lors d'un événement", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
];
