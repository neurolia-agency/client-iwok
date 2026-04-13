# Brief T09 : Fusion services + processus

## Contexte
La page services a 6 blocs de services avec un accordeon "En savoir plus" pour chaque. Le client veut simplifier : fusionner "Fresques Murales Interieures" et "Fresques Murales Exterieures" en un seul bloc "Fresques Murales", supprimer l'accordeon pour montrer le contenu directement, renommer la section processus, et ajouter une mention legale sur la protection des supports.

## Fichiers a modifier
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/sections/ServicesContent.tsx` (1060 lignes)
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/sections/ServicesPreview.tsx` (362 lignes) — eventuellement mettre a jour si le nombre de services affecte l'apercu

## Code actuel — DEFAULT_SERVICES (lignes 26-127)

```tsx
const DEFAULT_SERVICES: Service[] = [
  {
    id: "fresques-interieures",
    title: "Fresques Murales Intérieures",
    tagline: "L\u2019intérieur qui raconte votre histoire",
    tag: "Intérieur",
    description:
      "Création de fresques peintes pour vos espaces intérieurs — chambres d\u2019enfants, salons, halls d\u2019accueil, restaurants, commerces. Chaque fresque est conçue sur mesure après une phase d\u2019écoute et de proposition créative.",
    includes: [
      "Visite sur site et prise de mesures",
      "Proposition créative (croquis/maquette)",
      "Réalisation complète de la fresque",
      "Finitions et protection adaptées au support",
    ],
    image: "/images/section-grid-animate/wine.webp",
    imageAlt: "Fresque murale intérieure — mains tenant des verres de vin, style réaliste",
  },
  {
    id: "fresques-exterieures",
    title: "Fresques Murales Extérieures",
    tagline: "Donner une âme à vos façades",
    tag: "Extérieur",
    description:
      "Fresques et peintures murales pour façades, murs extérieurs, bâtiments publics, structures urbaines. Peintures techniques résistantes aux intempéries et aux UV.",
    includes: [
      "Étude du support et des contraintes techniques",
      "Maquette créative adaptée à l\u2019environnement",
      "Réalisation avec peintures techniques extérieures",
      "Finition anti-UV et protection longue durée",
    ],
    image: "/images/section-grid-animate/fire.webp",
    imageAlt: "Fresque murale extérieure — pompier en action, couleurs vibrantes",
  },
  {
    id: "design-mural",
    title: "Design Mural Sur Mesure",
    tagline: "Votre vision, notre trait",
    tag: "Sur mesure",
    description:
      "Conception et réalisation de design mural personnalisé pour tout type d\u2019espace. Du brief créatif au dernier coup de pinceau, chaque étape est pensée en collaboration avec le client.",
    includes: [
      "Brief créatif et recueil de vos envies",
      "Recherches graphiques et propositions",
      "Réalisation et mise en peinture",
    ],
    image: "/images/section-grid-animate/african-wife.webp",
    imageAlt: "Portrait mural sur mesure — femme africaine, couleurs vives et détails réalistes",
  },
  {
    id: "tous-supports",
    title: "Décoration Tous Supports",
    tagline: "Pas seulement les murs",
    tag: "Tous supports",
    description:
      "Peinture artistique sur supports atypiques — véhicules, containers, sols, mobilier, structures métalliques. La même exigence créative, adaptée à des surfaces non-conventionnelles.",
    includes: [
      "Étude du support et traitement de surface",
      "Proposition créative",
      "Réalisation avec peintures adaptées",
    ],
    image: "/images/section-grid-animate/beer-cow.webp",
    imageAlt: "Fresque pop art sur support atypique — deux vaches colorées aux lunettes de soleil",
  },
  {
    id: "animation-evenementielle",
    title: "Animation Événementielle",
    tagline: "L\u2019art en direct, devant vos yeux",
    tag: "Événementiel",
    description:
      "Live painting lors d\u2019événements et démonstrations artistiques. Créez un moment fort avec la réalisation d\u2019une fresque en direct — de la toile blanche à l\u2019\u0153uvre finie sous les yeux du public.",
    includes: [
      "Préparation de la performance (thème, support, durée)",
      "Matériel de peinture",
      "Réalisation live devant le public",
      "L\u2019\u0153uvre finale (offerte ou sur arrangement)",
    ],
    image: "/images/section-grid-animate/kerea.webp",
    imageAlt: "Live painting au centre KEREA — artiste peignant un portrait coloré en direct",
  },
  {
    id: "ateliers-participatifs",
    title: "Ateliers Participatifs",
    tagline: "Créer ensemble, peindre ensemble",
    tag: "Participatif",
    description:
      "Ateliers de création murale participatifs encadrés par un artiste professionnel. Idéal pour fédérer un groupe — écoles, centres sociaux, entreprises, festivals.",
    includes: [
      "Conception du projet participatif",
      "Encadrement artistique et technique",
      "Matériel de peinture",
      "Fresque collective finalisée",
    ],
    image: "/images/section-grid-animate/colors.webp",
    imageAlt: "Atelier participatif — fresque géométrique multicolore, vue aérienne",
  },
];
```

## Code actuel — ServiceBlock avec accordeon (lignes 220-533)

Le composant ServiceBlock contient :
- Un tag pill (badge categorie)
- Un titre h2
- Une tagline en italique
- Un separateur ocre
- Une description
- Un bouton "En savoir plus" (accordeon toggle)
- Un AccordionPanel avec la liste "Inclus dans la prestation"

Extraits cles du bouton accordeon et du contenu :
```tsx
{/* Accordion toggle */}
<button
  onClick={onToggle}
  aria-expanded={isExpanded}
  style={{
    display: "inline-flex",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: "0.5rem",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--font-size-small)",
    fontWeight: 500,
    color: "var(--primary)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.375rem 0",
    transition: "color var(--transition-standard)",
  }}
>
  {isExpanded ? "Réduire" : "En savoir plus"}
  <ChevronDown isOpen={isExpanded} />
</button>

{/* Accordion content — "Inclus" */}
<AccordionPanel isOpen={isExpanded}>
  <div style={{ paddingBlock: "0.75rem 0.5rem" }}>
    <p style={{
      fontFamily: "var(--font-sans)", fontSize: "0.6875rem", fontWeight: 600,
      color: "var(--foreground-subtitle)", letterSpacing: "0.1em", textTransform: "uppercase",
      marginBottom: "0.75rem", maxWidth: "none",
    }}>
      Inclus dans la prestation
    </p>
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {service.includes.map((item) => (
        <li key={item} style={{
          display: "flex", alignItems: "baseline", gap: "0.75rem",
          fontFamily: "var(--font-sans)", fontSize: "var(--font-size-body)", lineHeight: 1.6,
          color: "var(--foreground-subtitle)",
        }}>
          <span aria-hidden="true" style={{
            display: "inline-block", width: 5, height: 5, borderRadius: "50%",
            backgroundColor: "var(--primary)", flexShrink: 0, transform: "translateY(-2px)",
          }} />
          {item}
        </li>
      ))}
    </ul>
    <p style={{
      fontFamily: "var(--font-sans)", fontSize: "var(--font-size-small)", fontStyle: "italic",
      color: "var(--muted-foreground)", marginTop: "1rem", maxWidth: "none",
    }}>
      Tarif sur devis — selon surface, complexité et lieu d&apos;intervention
    </p>
  </div>
</AccordionPanel>
```

## Code actuel — ProcessSection (lignes 539-799)

Titre actuel : "De l'idee a la fresque"
```tsx
<h2 style={{ /* ... */ }}>
  De l&apos;idée à la fresque
</h2>
```

Etapes actuelles :
```tsx
const DEFAULT_PROCESS_STEPS = [
  { number: "01", title: "Prise de contact", description: "Échange sur votre projet, vos envies, vos contraintes." },
  { number: "02", title: "Proposition créative", description: "Visite sur site, croquis et maquette sur mesure." },
  { number: "03", title: "Réalisation", description: "La fresque prend vie sur votre mur, sous vos yeux." },
  { number: "04", title: "Livraison", description: "Finitions, protection, remise du support." },
];
```

## Code actuel — Main ServicesContent (lignes 889-1059)

State de l'accordeon :
```tsx
const [expandedId, setExpandedId] = useState<string | null>(null);
```

Rendu des ServiceBlock :
```tsx
{services.map((service, index) => (
  <ServiceBlock
    key={service.id}
    service={service}
    index={index}
    isExpanded={expandedId === service.id}
    onToggle={() =>
      setExpandedId((prev) =>
        prev === service.id ? null : service.id
      )
    }
  />
))}
```

## Cible
4 modifications specifiques sur la page services.

## Instructions d'implementation

### Modification 1 : Fusionner Interieures + Exterieures

Remplacer les 2 premiers services par un seul :

```tsx
{
  id: "fresques-murales",
  title: "Fresques Murales",
  tagline: "Intérieur, extérieur — vos murs prennent vie",
  tag: "Fresques",
  description:
    "Création de fresques peintes pour tous vos espaces, intérieurs comme extérieurs. Chambres d\u2019enfants, salons, halls d\u2019accueil, façades, bâtiments publics. Chaque fresque est conçue sur mesure après une phase d\u2019écoute et de proposition créative. Peintures techniques adaptées au support et aux conditions (UV, intempéries, usure).",
  includes: [
    "Visite sur site et prise de mesures",
    "Proposition créative (croquis/maquette)",
    "Réalisation complète de la fresque",
    "Finitions et protection adaptées au support",
    "Peintures techniques extérieures si nécessaire (anti-UV, intempéries)",
  ],
  image: "/images/section-grid-animate/wine.webp",
  imageAlt: "Fresque murale — mains tenant des verres de vin, style réaliste",
},
```

Le DEFAULT_SERVICES passe donc de 6 a 5 entrees.

### Modification 2 : Supprimer l'accordeon, afficher le contenu directement

Dans le composant `ServiceBlock`, supprimer :
- Le bouton "En savoir plus" / "Reduire"
- Le composant `AccordionPanel`
- Les props `isExpanded` et `onToggle`

A la place, afficher directement le contenu "Inclus dans la prestation" apres la description, sans accordeon :

```tsx
{/* Contenu "Inclus" — affiche directement (plus d'accordeon) */}
<div style={{ paddingTop: "0.75rem" }}>
  <p style={{
    fontFamily: "var(--font-sans)", fontSize: "0.6875rem", fontWeight: 600,
    color: "var(--foreground-subtitle)", letterSpacing: "0.1em", textTransform: "uppercase",
    marginBottom: "0.75rem", maxWidth: "none",
  }}>
    Inclus dans la prestation
  </p>
  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    {service.includes.map((item) => (
      <li key={item} style={{
        display: "flex", alignItems: "baseline", gap: "0.75rem",
        fontFamily: "var(--font-sans)", fontSize: "var(--font-size-body)", lineHeight: 1.6,
        color: "var(--foreground-subtitle)",
      }}>
        <span aria-hidden="true" style={{
          display: "inline-block", width: 5, height: 5, borderRadius: "50%",
          backgroundColor: "var(--primary)", flexShrink: 0, transform: "translateY(-2px)",
        }} />
        {item}
      </li>
    ))}
  </ul>
  <p style={{
    fontFamily: "var(--font-sans)", fontSize: "var(--font-size-small)", fontStyle: "italic",
    color: "var(--muted-foreground)", marginTop: "1rem", maxWidth: "none",
  }}>
    Tarif sur devis — selon surface, complexité et lieu d&apos;intervention
  </p>
</div>
```

Consequence : supprimer aussi dans ServicesContent :
- Le state `expandedId`
- Les props `isExpanded` / `onToggle` dans le rendu des ServiceBlock
- Les composants `AccordionPanel` et `ChevronDown` (plus utilises)

### Modification 3 : Renommer la section processus

Changer le titre de la ProcessSection :
- Ancien : "De l'idee a la fresque"
- Nouveau : "De vos envies a la realisation"

Dans le JSX de ProcessSection, remplacer :
```tsx
<h2 style={{ /* ... */ }}>
  De l&apos;idée à la fresque
</h2>
```
par :
```tsx
<h2 style={{ /* ... */ }}>
  De vos envies à la réalisation
</h2>
```

### Modification 4 : Ajouter mention protection du support

Ajouter une note apres l'etape 04 "Livraison" dans DEFAULT_PROCESS_STEPS. Modifier la description de l'etape 04 :

```tsx
{
  number: "04",
  title: "Livraison",
  description: "Finitions, nettoyage, remise du support. La protection (vernis, anti-UV) est proposée en option selon le support et l\u2019usage.",
},
```

L'information cle : "la protection du support n'est pas systematique" — elle est proposee en option.

## Tokens CSS disponibles
- Memes tokens que ceux deja utilises dans ServicesContent (voir globals.css)
- Pas de nouveau token necessaire

## Patterns a respecter
- Inline styles avec CSS variables (PAS de classes Tailwind utilitaires, sauf les classes utilitaires custom du site)
- GSAP ScrollTrigger pour les animations des blocs
- Zig-zag layout alterne (index pair/impair)
- Font-heading pour les titres, font-sans pour les textes, font-body pour les taglines

## Criteres d'acceptation
- [ ] DEFAULT_SERVICES contient 5 entrees (pas 6) — "Fresques Murales" unique
- [ ] L'accordeon "En savoir plus" est supprime — le contenu "Inclus" est visible directement
- [ ] Les composants AccordionPanel et ChevronDown sont supprimes (code mort)
- [ ] Le state `expandedId` est supprime dans ServicesContent
- [ ] La section processus est titree "De vos envies a la realisation"
- [ ] L'etape 04 mentionne que la protection est en option
- [ ] Le zig-zag layout fonctionne correctement avec 5 blocs
- [ ] Les animations GSAP sont preservees
- [ ] `npm run build` passe sans erreur

## Anti-patterns a eviter
- Ne PAS utiliser de classes Tailwind utilitaires
- Ne PAS garder de code mort (AccordionPanel, ChevronDown, expandedId)
- Ne PAS modifier le hero de la page services
- Ne PAS modifier la section ContactCta en bas
- Ne PAS changer les images des services
- Ne PAS modifier ServicesPreview.tsx (l'apercu homepage reste avec 3 services)
