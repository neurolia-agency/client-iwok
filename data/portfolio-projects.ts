/* ─── Portfolio Projects — IWOK Muraliste ─────────────── */
/* Source de vérité : pipeline/output/04-portfolio-categories.md */

export type PortfolioSectionSlug =
  | "projets-a-la-une"
  | "interieur"
  | "exterieur"
  | "coups-de-coeur";

export type FeaturedSubcategory = "Entreprises" | "Particuliers" | "Participatifs";

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
  subcategory?: FeaturedSubcategory;
  year: number;
  location: string;
  images: ProjectImage[];
  cover: number;
}

export interface PortfolioSection {
  slug: PortfolioSectionSlug;
  title: string;
  description: string;
  subcategories?: FeaturedSubcategory[];
}

export const SECTIONS: PortfolioSection[] = [
  {
    slug: "projets-a-la-une",
    title: "Projets à la une",
    description: "Les réalisations phares, sélectionnées pour leur envergure et leur impact visuel.",
    subcategories: ["Entreprises", "Particuliers", "Participatifs"],
  },
  {
    slug: "interieur",
    title: "Intérieur",
    description: "Fresques et décorations murales en intérieur — chambres, restaurants, bureaux.",
  },
  {
    slug: "exterieur",
    title: "Extérieur",
    description: "Façades, murs et espaces urbains transformés par la peinture.",
  },
  {
    slug: "coups-de-coeur",
    title: "Coups de cœur",
    description: "Moments forts et pièces marquantes — la sélection de l'artiste.",
  },
];

/* ─── Featured Slider Data ──────────────────────────── */

export interface FeaturedSlide {
  subcategory: FeaturedSubcategory;
  background: string;
  preview1: string;
  preview2: string;
}

export const SUBCATEGORY_SLUGS: Record<FeaturedSubcategory, string> = {
  Entreprises: "entreprises",
  Particuliers: "particuliers",
  Participatifs: "participatifs",
};

export const FEATURED_SLIDES: FeaturedSlide[] = [
  {
    subcategory: "Entreprises",
    background: "/images/selection-projets/intermarcher 12 2021/inter.jpeg",
    preview1: "/images/selection-projets/restaurant-bichette/WhatsApp Image 2025-09-04 à 13.47.04_e2b04b2c.jpg",
    preview2: "/images/selection-projets/controle-technique/IMG_20210827_131400.jpg",
  },
  {
    subcategory: "Particuliers",
    background: "/images/interieur/WhatsApp Image 2025-09-04 à 11.06.45_2f1aa34c.jpg",
    preview1: "/images/interieur/WhatsApp Image 2025-09-04 à 11.06.45_be6338bd.jpg",
    preview2: "/images/interieur/WhatsApp Image 2025-09-04 à 11.06.45_2dfe4ffa.jpg",
  },
  {
    subcategory: "Participatifs",
    background: "/images/participatif/WhatsApp Image 2023-07-05 at 12.34.13.jpeg",
    preview1: "/images/participatif/IMG_20231222_151117 - Copie.jpg",
    preview2: "/images/participatif/IMG_20240209_115548.jpg",
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  /* ═══════════════════════════════════════════════
     PROJETS À LA UNE — ENTREPRISES
     ═══════════════════════════════════════════════ */
  {
    id: "skate-parc-decazeville",
    title: "Skate Parc Decazeville",
    section: "projets-a-la-une",
    subcategory: "Entreprises",
    year: 2024,
    location: "Decazeville (12)",
    images: [
      { src: "/images/selection-projets/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-4.jpg", alt: "Vue d'ensemble du skate parc de Decazeville avec fresques murales colorées", width: 1600, height: 1200 },
      { src: "/images/selection-projets/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-23.jpg", alt: "Détail fresque skate parc Decazeville — personnage stylisé", width: 1600, height: 1200 },
      { src: "/images/selection-projets/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-27.jpg", alt: "Fresque latérale skate parc Decazeville", width: 1600, height: 1200 },
      { src: "/images/selection-projets/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-31.jpg", alt: "Skate parc Decazeville — vue rampe et fresque", width: 1600, height: 1200 },
      { src: "/images/selection-projets/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-40.jpg", alt: "Fresque murale abstraite skate parc Decazeville", width: 1600, height: 1200 },
      { src: "/images/selection-projets/skate parc decazeville 12 2024/Skate Park Decaze - Guillaume 2024-41.jpg", alt: "Finition fresque skate parc Decazeville — couleurs vives", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "kerea-centre-tri",
    title: "Centre de Tri KEREA",
    section: "projets-a-la-une",
    subcategory: "Entreprises",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/selection-projets/kerea/Kerea arrivée-39.jpg", alt: "Inauguration fresque KEREA — vue d'ensemble", width: 1600, height: 1067 },
      { src: "/images/selection-projets/kerea/Kerea reception-09.jpg", alt: "Réception KEREA — fresque grand format", width: 1600, height: 1067 },
      { src: "/images/selection-projets/kerea/Kerea reception-12.jpg", alt: "Détail fresque KEREA — portrait coloré", width: 1600, height: 1067 },
      { src: "/images/selection-projets/kerea/Kerea reception-39.jpg", alt: "Fresque KEREA — visiteurs devant l'œuvre", width: 1600, height: 1067 },
      { src: "/images/selection-projets/kerea/Kerea reception-41.jpg", alt: "Fresque KEREA — vue latérale", width: 1600, height: 1067 },
      { src: "/images/selection-projets/kerea/WhatsApp Image 2025-09-10 à 14.30.02_679dc1ae.jpg", alt: "Fresque murale KEREA en cours de réalisation", width: 1200, height: 1600 },
      { src: "/images/selection-projets/kerea/WhatsApp Image 2025-09-10 à 14.30.03_789d1e0c.jpg", alt: "Détail technique fresque KEREA", width: 1200, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "ecole-tremouilles-facade",
    title: "École Trémouilles — Façade",
    section: "projets-a-la-une",
    subcategory: "Entreprises",
    year: 2021,
    location: "Trémouilles (12)",
    images: [
      { src: "/images/selection-projets/ecole trémouilles façade 2021/DJI_0892-2.jpg", alt: "Vue aérienne fresque école Trémouilles", width: 1600, height: 1200 },
      { src: "/images/selection-projets/ecole trémouilles façade 2021/DJI_0946-2.jpg", alt: "Fresque façade école Trémouilles — vue drone", width: 1600, height: 1200 },
      { src: "/images/selection-projets/ecole trémouilles façade 2021/DJI_0960-2.jpg", alt: "École Trémouilles — fresque complète vue aérienne", width: 1600, height: 1200 },
      { src: "/images/selection-projets/ecole trémouilles façade 2021/IMG_20220725_161735.jpg", alt: "Fresque école Trémouilles — vue depuis la rue", width: 1600, height: 1200 },
      { src: "/images/selection-projets/ecole trémouilles façade 2021/IMG_20230301_125751.jpg", alt: "Fresque école Trémouilles — détail", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "vestiaires-lycee-laroque",
    title: "Vestiaires Lycée Laroque",
    section: "projets-a-la-une",
    subcategory: "Entreprises",
    year: 2019,
    location: "Onet-le-Château (12)",
    images: [
      { src: "/images/selection-projets/vestiaires Lycée Laroque 12 2019/20200710_142600.jpg", alt: "Fresque vestiaires Lycée Laroque — vue d'ensemble", width: 1600, height: 1200 },
      { src: "/images/selection-projets/vestiaires Lycée Laroque 12 2019/20200715_114329.jpg", alt: "Détail fresque vestiaires sportifs Lycée Laroque", width: 1600, height: 1200 },
      { src: "/images/selection-projets/vestiaires Lycée Laroque 12 2019/20200715_211511.jpg", alt: "Fresque vestiaires Laroque — personnage sportif", width: 1200, height: 1600 },
      { src: "/images/selection-projets/vestiaires Lycée Laroque 12 2019/20200716_175558.jpg", alt: "Fresque vestiaires Laroque — couleurs vives", width: 1600, height: 1200 },
      { src: "/images/selection-projets/vestiaires Lycée Laroque 12 2019/vestiaire laroque.jpg", alt: "Résultat final vestiaires Lycée Laroque", width: 1600, height: 1200 },
    ],
    cover: 4,
  },
  {
    id: "soudhydro-rodez",
    title: "Soudhydro",
    section: "projets-a-la-une",
    subcategory: "Entreprises",
    year: 2018,
    location: "Rodez (12)",
    images: [
      { src: "/images/selection-projets/soudhydro Rodez 12 2018/IMG-20191220-WA0007.jpg", alt: "Fresque industrielle Soudhydro Rodez", width: 1600, height: 1200 },
      { src: "/images/selection-projets/soudhydro Rodez 12 2018/IMG-20191220-WA0022.jpg", alt: "Détail fresque Soudhydro — soudeur", width: 1600, height: 1200 },
      { src: "/images/selection-projets/soudhydro Rodez 12 2018/IMG-20191220-WA0026.jpg", alt: "Fresque Soudhydro — vue latérale", width: 1600, height: 1200 },
      { src: "/images/selection-projets/soudhydro Rodez 12 2018/IMG-20191220-WA0032.jpg", alt: "Soudhydro Rodez — fresque extérieure terminée", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "monastere-facade",
    title: "Façade Le Monastère",
    section: "projets-a-la-une",
    subcategory: "Entreprises",
    year: 2024,
    location: "Le Monastère (12)",
    images: [
      { src: "/images/selection-projets/le monastère 12 Façade 2024/WhatsApp Image 2026-01-16 at 14.17..jpeg", alt: "Fresque façade Le Monastère — vue d'ensemble", width: 1600, height: 1200 },
      { src: "/images/selection-projets/le monastère 12 Façade 2024/WhatsApp Image 2026-01-16 at 14.17.3.jpeg", alt: "Détail fresque façade Le Monastère", width: 1600, height: 1200 },
      { src: "/images/selection-projets/le monastère 12 Façade 2024/WhatsApp Image 2026-01-16 at 14.17.36.jpeg", alt: "Fresque Le Monastère — personnages colorés", width: 1600, height: 1200 },
      { src: "/images/selection-projets/le monastère 12 Façade 2024/WhatsApp Image 2026-01-16.jpeg", alt: "Vue d'ensemble façade Le Monastère après fresque", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "restaurant-bichette",
    title: "Restaurant Bichette",
    section: "projets-a-la-une",
    subcategory: "Entreprises",
    year: 2025,
    location: "Rodez (12)",
    images: [
      { src: "/images/selection-projets/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-04 à 13.47.04_40479fa7.jpg", alt: "Fresque WC restaurant Bichette — détail", width: 1200, height: 1600 },
      { src: "/images/selection-projets/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-04 à 13.47.04_e2b04b2c.jpg", alt: "Fresque restaurant Bichette — vue d'ensemble", width: 1200, height: 1600 },
      { src: "/images/selection-projets/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-04 à 13.47.05_bc59e8f0.jpg", alt: "Décoration murale Bichette Rodez", width: 1200, height: 1600 },
      { src: "/images/selection-projets/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-09-04 à 13.48.00_4dde2e50.jpg", alt: "Fresque murale Bichette — style graphique", width: 1600, height: 1200 },
      { src: "/images/selection-projets/restaurant Bichette rodez 12 wc 2025/WhatsApp Image 2025-10-23 à 16.17.13_ef7b8194.jpg", alt: "Résultat final fresque Bichette Rodez", width: 1200, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "petits-chevaux-tremouilles",
    title: "Petits Chevaux — École Trémouilles",
    section: "projets-a-la-une",
    subcategory: "Entreprises",
    year: 2025,
    location: "Trémouilles (12)",
    images: [
      { src: "/images/selection-projets/petits chevaux sol ecole trémouilles 2025/WhatsApp Image 2025-09-12 à 13.35.45_4eea7229.jpg", alt: "Peinture au sol petits chevaux école Trémouilles", width: 1200, height: 1600 },
      { src: "/images/selection-projets/petits chevaux sol ecole trémouilles 2025/WhatsApp Image 2025-09-12 à 13.35.45_51bfea78.jpg", alt: "Jeu de petits chevaux peint au sol — détail", width: 1200, height: 1600 },
      { src: "/images/selection-projets/petits chevaux sol ecole trémouilles 2025/WhatsApp Image 2025-10-24 à 16.10.57_e1ebf6f7.jpg", alt: "Résultat final petits chevaux école Trémouilles", width: 1600, height: 1200 },
      { src: "/images/selection-projets/petits chevaux sol ecole trémouilles 2025/WhatsApp Image 2025-10-24 à 16.10.58_d7a67ef2.jpg", alt: "Vue d'ensemble jeu au sol école Trémouilles", width: 1600, height: 1200 },
    ],
    cover: 2,
  },
  {
    id: "club-tennis-caussade",
    title: "Club de Tennis Caussade",
    section: "projets-a-la-une",
    subcategory: "Entreprises",
    year: 2021,
    location: "Caussade (82)",
    images: [
      { src: "/images/selection-projets/club tennis caussade 2021/20210422_204728.jpg", alt: "Fresque club de tennis Caussade — raquette géante", width: 1200, height: 1600 },
      { src: "/images/selection-projets/club tennis caussade 2021/20210423_082428.jpg", alt: "Détail fresque tennis Caussade", width: 1600, height: 1200 },
      { src: "/images/selection-projets/club tennis caussade 2021/20210423_082444.jpg", alt: "Fresque club tennis Caussade — résultat final", width: 1600, height: 1200 },
    ],
    cover: 1,
  },
  {
    id: "controle-technique-pampelonne",
    title: "Contrôle Technique Pampelonne",
    section: "projets-a-la-une",
    subcategory: "Entreprises",
    year: 2021,
    location: "Pampelonne (81)",
    images: [
      { src: "/images/selection-projets/Controle technique pampelonne 81 2021/IMG_20210827_131333.jpg", alt: "Fresque contrôle technique Pampelonne — façade", width: 1600, height: 1200 },
      { src: "/images/selection-projets/Controle technique pampelonne 81 2021/IMG_20210827_131400.jpg", alt: "Détail fresque automobile Pampelonne", width: 1600, height: 1200 },
      { src: "/images/selection-projets/Controle technique pampelonne 81 2021/IMG_20210827_131604.jpg", alt: "Fresque contrôle technique — vue d'ensemble", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "intermarche",
    title: "Intermarché",
    section: "projets-a-la-une",
    subcategory: "Entreprises",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/selection-projets/intermarcher 12 2021/IMG_20210729_131459.jpg", alt: "Fresque Intermarché — rayon fruits et légumes", width: 1600, height: 1200 },
      { src: "/images/selection-projets/intermarcher 12 2021/inter.jpeg", alt: "Fresque murale Intermarché — vue d'ensemble", width: 1600, height: 1200 },
      { src: "/images/selection-projets/intermarcher 12 2021/WhatsApp Image 2021-09-21 at 10.25.14.jpeg", alt: "Résultat final fresque Intermarché", width: 1200, height: 1600 },
    ],
    cover: 1,
  },

  /* ═══════════════════════════════════════════════
     PROJETS À LA UNE — PARTICULIERS
     ═══════════════════════════════════════════════ */
  {
    id: "particulier-interieur-3",
    title: "Fresque Abstraite",
    section: "projets-a-la-une",
    subcategory: "Particuliers",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/interieur/WhatsApp Image 2025-09-04 à 11.06.45_028794ac.jpg", alt: "Fresque abstraite intérieur — couleurs vives", width: 1200, height: 1600 },
      { src: "/images/interieur/WhatsApp Image 2025-09-04 à 11.06.45_11a55126.jpg", alt: "Détail fresque abstraite particulier", width: 1200, height: 1600 },
      { src: "/images/interieur/WhatsApp Image 2025-09-04 à 11.06.45_2dfe4ffa.jpg", alt: "Fresque abstraite — vue d'ensemble", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "particulier-interieur-4",
    title: "Fresque Nature",
    section: "projets-a-la-une",
    subcategory: "Particuliers",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/interieur/WhatsApp Image 2025-09-04 à 11.06.45_3543fe83.jpg", alt: "Fresque murale nature — forêt et animaux", width: 1600, height: 1200 },
      { src: "/images/interieur/WhatsApp Image 2025-09-04 à 11.06.45_46c9744e.jpg", alt: "Détail fresque nature — feuillage", width: 1200, height: 1600 },
      { src: "/images/interieur/WhatsApp Image 2025-09-04 à 11.06.45_be6338bd.jpg", alt: "Fresque nature — vue complète", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "oneshot-particulier-2",
    title: "Fresque Visage Femme",
    section: "projets-a-la-une",
    subcategory: "Particuliers",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/selection-oneshot/WhatsApp Image 2023-07-05 at 12.33.42.jpeg", alt: "Fresque visage de femme — style pop art", width: 1200, height: 1600 },
      { src: "/images/selection-oneshot/WhatsApp Image 2023-07-05 at 12.34.12 (1).jpeg", alt: "Fresque intérieur — détail pop art", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "gui-on-scope-portrait-1",
    title: "Portrait Live — Franck Tourneret",
    section: "projets-a-la-une",
    subcategory: "Particuliers",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/selection-gui-on-scope/003_GuiHome Décoration © Franck Tourneret.jpg", alt: "Guillaume Jeanjean en action — photo Franck Tourneret", width: 1200, height: 1600 },
      { src: "/images/selection-gui-on-scope/007_GuiHome Décoration © Franck Tourneret.jpg", alt: "Artiste peignant une fresque — portrait professionnel", width: 1200, height: 1600 },
      { src: "/images/selection-gui-on-scope/015_GuiHome Décoration © Franck Tourneret.jpg", alt: "GuiHome Décoration au travail — série Franck Tourneret", width: 1200, height: 1600 },
    ],
    cover: 0,
  },

  /* ═══════════════════════════════════════════════
     PROJETS À LA UNE — PARTICIPATIFS
     ═══════════════════════════════════════════════ */
  {
    id: "atelier-participatif-ecole-1",
    title: "Atelier Fresque — École",
    section: "projets-a-la-une",
    subcategory: "Participatifs",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/participatif/IMG_20220429_150032.jpg", alt: "Atelier fresque participatif avec des élèves", width: 1600, height: 1200 },
      { src: "/images/participatif/IMG_20221221_122146.jpg", alt: "Résultat atelier participatif — fresque collective école", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "atelier-participatif-noel",
    title: "Atelier Fresque de Noël",
    section: "projets-a-la-une",
    subcategory: "Participatifs",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/participatif/IMG_20231222_151117 - Copie.jpg", alt: "Atelier fresque de Noël — enfants peignant", width: 1600, height: 1200 },
      { src: "/images/participatif/IMG_20240126_145914.jpg", alt: "Résultat atelier Noël — fresque terminée", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "atelier-participatif-enfants",
    title: "Atelier Enfants — Peinture Libre",
    section: "projets-a-la-une",
    subcategory: "Participatifs",
    year: 2024,
    location: "Aveyron (12)",
    images: [
      { src: "/images/participatif/IMG_20240209_114816.jpg", alt: "Atelier peinture enfants — créativité libre", width: 1600, height: 1200 },
      { src: "/images/participatif/IMG_20240209_115548.jpg", alt: "Enfants peignant ensemble — atelier participatif", width: 1600, height: 1200 },
      { src: "/images/participatif/IMG_20240325_105625.jpg", alt: "Fresque participative enfants — résultat coloré", width: 1600, height: 1200 },
    ],
    cover: 2,
  },
  {
    id: "atelier-participatif-asso",
    title: "Fresque Associative",
    section: "projets-a-la-une",
    subcategory: "Participatifs",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/participatif/IMG-20230929-WA0008.jpg", alt: "Fresque participative associative — en cours", width: 1600, height: 1200 },
      { src: "/images/participatif/IMG-20230929-WA0009.jpg", alt: "Fresque associative — résultat final", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "participatif-groupe-1",
    title: "Atelier Collectif — Été",
    section: "projets-a-la-une",
    subcategory: "Participatifs",
    year: 2023,
    location: "Aveyron (12)",
    images: [
      { src: "/images/participatif/WhatsApp Image 2023-07-05 at 12.34.12 (2).jpeg", alt: "Atelier collectif estival — préparation", width: 1600, height: 1200 },
      { src: "/images/participatif/WhatsApp Image 2023-07-05 at 12.34.12 (3).jpeg", alt: "Atelier collectif — peinture en groupe", width: 1600, height: 1200 },
      { src: "/images/participatif/WhatsApp Image 2023-07-05 at 12.34.13 (1).jpeg", alt: "Fresque collective — détail coloré", width: 1200, height: 1600 },
      { src: "/images/participatif/WhatsApp Image 2023-07-05 at 12.34.13.jpeg", alt: "Résultat fresque collective été", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "participatif-groupe-2",
    title: "Fresque Participative — Mur Collectif",
    section: "projets-a-la-une",
    subcategory: "Participatifs",
    year: 2025,
    location: "Aveyron (12)",
    images: [
      { src: "/images/participatif/WhatsApp Image 2025-09-11 à 13.58.36_07a0923c.jpg", alt: "Fresque participative mur collectif — en cours", width: 1200, height: 1600 },
      { src: "/images/participatif/WhatsApp Image 2025-09-11 à 13.58.36_1167dfa5.jpg", alt: "Fresque participative mur collectif — résultat", width: 1600, height: 1200 },
    ],
    cover: 0,
  },

  /* ═══════════════════════════════════════════════
     INTÉRIEUR
     ═══════════════════════════════════════════════ */
  {
    id: "fresque-surf",
    title: "Fresque Surf",
    section: "interieur",
    year: 2020,
    location: "Aveyron (12)",
    images: [
      { src: "/images/interieur/SURF.jpg", alt: "Fresque murale surf — chambre particulier", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "fresque-marvel",
    title: "Fresque Marvel",
    section: "interieur",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/interieur/marvel.jpg", alt: "Fresque murale Marvel — Iron Man chambre enfant", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "fresque-simon",
    title: "Chambre Simon",
    section: "interieur",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/interieur/simon.jpg", alt: "Fresque personnalisée chambre enfant Simon", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "fresque-lion",
    title: "Fresque Lion Réaliste",
    section: "interieur",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/interieur/286760592_593764265670510_6938627902755638076_n.jpg", alt: "Fresque murale lion réaliste — intérieur particulier", width: 1200, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "decoration-interieur-1",
    title: "Décoration Intérieure",
    section: "interieur",
    year: 2020,
    location: "Aveyron (12)",
    images: [
      { src: "/images/interieur/20200502_110339.jpg", alt: "Décoration murale intérieure — salon particulier", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "decoration-interieur-2",
    title: "Fresque Chambre",
    section: "interieur",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/interieur/20210118_171900.jpg", alt: "Fresque murale chambre — univers coloré", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "portrait-mural",
    title: "Portrait Mural",
    section: "interieur",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/interieur/IMG_20211218_120647.jpg", alt: "Portrait mural réaliste — commande particulier", width: 1200, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "fresque-personnage",
    title: "Personnage Style BD",
    section: "interieur",
    year: 2019,
    location: "Aveyron (12)",
    images: [
      { src: "/images/interieur/28752404_176937463112664_3180297642009690112_n - Copie.jpg", alt: "Fresque personnage style bande dessinée — intérieur", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "particulier-deco-marshmallow",
    title: "Fresque Daft Punk",
    section: "interieur",
    year: 2026,
    location: "Aveyron (12)",
    images: [
      { src: "/images/interieur/lv_0_20260203204313.jpg", alt: "Fresque Daft Punk — timelapse", width: 1200, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "oneshot-particulier-1",
    title: "Décoration Murale Personnalisée",
    section: "interieur",
    year: 2019,
    location: "Aveyron (12)",
    images: [
      { src: "/images/selection-oneshot/20190305_114501.jpg", alt: "Décoration murale personnalisée — particulier", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "oneshot-wine",
    title: "Fresque Vin — Intérieur",
    section: "interieur",
    year: 2022,
    location: "Aveyron (12)",
    images: [
      { src: "/images/selection-oneshot/wine.png", alt: "Fresque murale réaliste — mains portant des verres de vin", width: 1600, height: 2100 },
    ],
    cover: 0,
  },
  {
    id: "cabinet-ophtalmologie",
    title: "Cabinet d'Ophtalmologie",
    section: "interieur",
    year: 2024,
    location: "Rodez (12)",
    images: [
      { src: "/images/selection-oneshot/WhatsApp Image 2025-05-13 à 20.24.36_6b369a59 - Copie.jpg", alt: "Fresque cabinet ophtalmologie Rodez — portrait lunettes colorées", width: 1200, height: 1600 },
    ],
    cover: 0,
  },
  {
    id: "restaurant-bellevue",
    title: "Restaurant Bellevue",
    section: "interieur",
    year: 2023,
    location: "Salles-Curan (12)",
    images: [
      { src: "/images/selection-oneshot/IMG_20230723_122905.jpg", alt: "Décoration murale restaurant Bellevue Salles-Curan", width: 1600, height: 1200 },
    ],
    cover: 0,
  },

  /* ═══════════════════════════════════════════════
     EXTÉRIEUR
     ═══════════════════════════════════════════════ */
  {
    id: "salle-fetes-albi",
    title: "Salle des Fêtes Albi",
    section: "exterieur",
    year: 2021,
    location: "Albi (81)",
    images: [
      { src: "/images/selection-oneshot/salle des fêtes Albi 81.jpg", alt: "Fresque murale salle des fêtes d'Albi", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "salle-fetes-tremouilles",
    title: "Salle des Fêtes Trémouilles",
    section: "exterieur",
    year: 2021,
    location: "Trémouilles (12)",
    images: [
      { src: "/images/selection-oneshot/IMG_20220722_194800.jpg", alt: "Fresque salle des fêtes Trémouilles", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "camping-terrasses-viaur",
    title: "Camping Les Terrasses du Viaur",
    section: "exterieur",
    year: 2021,
    location: "Tarn (81)",
    images: [
      { src: "/images/selection-oneshot/IMG-20210319-WA0008.jpg", alt: "Fresque piscine camping Les Terrasses du Viaur", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "urban-fest-albi",
    title: "Urban Fest Albi",
    section: "exterieur",
    year: 2021,
    location: "Albi (81)",
    images: [
      { src: "/images/selection-gui-on-scope/urban fest albi 2021.jpg", alt: "Live painting Urban Fest Albi — artiste en action", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "escape-game-agglobus",
    title: "Escape Game Agglobus",
    section: "exterieur",
    year: 2019,
    location: "Rodez (12)",
    images: [
      { src: "/images/selection-oneshot/escape game agglobus rodez 2019.JPG", alt: "Décor escape game Agglobus Rodez", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
  {
    id: "biggy-le-krill",
    title: "Biggy Le Krill — Live Painting",
    section: "exterieur",
    year: 2018,
    location: "Aveyron (12)",
    images: [
      { src: "/images/selection-oneshot/biggy le krill 12 2018.jpg", alt: "Live painting Biggy Le Krill — performance artistique", width: 1600, height: 1200 },
    ],
    cover: 0,
  },

  /* ═══════════════════════════════════════════════
     COUPS DE CŒUR
     ═══════════════════════════════════════════════ */
  {
    id: "gui-on-scope-live",
    title: "Live Painting — En Action",
    section: "coups-de-coeur",
    year: 2021,
    location: "Aveyron (12)",
    images: [
      { src: "/images/selection-gui-on-scope/08122021-2.jpg", alt: "Live painting — artiste muraliste au travail", width: 1600, height: 1200 },
      { src: "/images/selection-gui-on-scope/08122021-3.jpg", alt: "Fresque en cours de réalisation — live", width: 1600, height: 1200 },
      { src: "/images/selection-gui-on-scope/IMG_20220722_193057.jpg", alt: "Artiste muraliste — peinture en direct", width: 1600, height: 1200 },
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
      { src: "/images/selection-gui-on-scope/WhatsApp Image 2023-07-05 at 12.33.57.jpeg", alt: "Performance live painting lors d'un événement", width: 1600, height: 1200 },
    ],
    cover: 0,
  },
];
