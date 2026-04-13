export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  imageAlt: string;
  category: "toile" | "print" | "sticker" | "custom";
}

export const PRODUCTS: Product[] = [
  {
    id: "toile-portrait-custom",
    name: "Toile Portrait Sur Mesure",
    description:
      "Portrait peint a la main sur toile, d\u2019apres photo ou commande. Format au choix.",
    price: "A partir de 250\u20AC",
    image: "/images/section-grid-animate/african-wife.webp",
    imageAlt: "Portrait sur toile \u2014 style muraliste",
    category: "toile",
  },
  {
    id: "toile-pop-art",
    name: "Toile Pop Art",
    description:
      "Oeuvre originale style pop art sur toile. Couleurs vibrantes, formats vari\u00E9s.",
    price: "A partir de 180\u20AC",
    image: "/images/section-grid-animate/wine.webp",
    imageAlt: "Toile pop art \u2014 style muraliste",
    category: "toile",
  },
  {
    id: "print-limited",
    name: "Print Edition Limit\u00E9e",
    description:
      "Reproduction num\u00E9rot\u00E9e et sign\u00E9e sur papier fine art. Tirage limit\u00E9 a 50 exemplaires.",
    price: "A partir de 45\u20AC",
    image: "/images/selection-gui-on-scope/08122021-2.webp",
    imageAlt: "Print edition limit\u00E9e \u2014 reproduction d\u2019oeuvre",
    category: "print",
  },
  {
    id: "sticker-pack",
    name: "Pack Stickers IWOK",
    description:
      "Lot de 5 stickers vinyle haute qualit\u00E9. Designs exclusifs inspir\u00E9s des fresques.",
    price: "15\u20AC",
    image: "/images/section-grid-animate/kerea.webp",
    imageAlt: "Pack stickers IWOK \u2014 designs exclusifs",
    category: "sticker",
  },
  {
    id: "fresque-miniature",
    name: "Fresque Miniature",
    description:
      "Mini fresque peinte a la main sur panneau bois (30x40cm). Pi\u00E8ce unique.",
    price: "A partir de 120\u20AC",
    image: "/images/section-grid-animate/fire.webp",
    imageAlt: "Fresque miniature sur panneau bois",
    category: "custom",
  },
  {
    id: "commande-speciale",
    name: "Commande Sp\u00E9ciale",
    description:
      "Un projet unique ? Toile grand format, support atypique, objet personnalis\u00E9. Tout est possible.",
    price: "Sur devis",
    image: "/images/section-grid-animate/beer-cow.webp",
    imageAlt: "Commande sp\u00E9ciale \u2014 projet sur mesure",
    category: "custom",
  },
];
