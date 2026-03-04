# Étape B2 : Homepage

> **Phase B : Design / Vibe Coding** - Page d'accueil.

## Invocation frontend-design

**OBLIGATOIRE** : Pour chaque section UI, utiliser le skill frontend-design :

```bash
/frontend-design
```

**Workflow vibe coding** :
1. Lire la section du wireframe
2. Invoquer `/frontend-design` avec le brief
3. Réviser visuellement dans le navigateur
4. Itérer jusqu'à satisfaction
5. Passer à la section suivante

---

## Objectif

Créer la page d'accueil **section par section**, chaque section utilisant uniquement sa partie du wireframe.

## Input

| Fichier | Usage |
|---------|-------|
| `output/03.5-wireframes/homepage.md` | **SEUL fichier de contenu** |
| `app/globals.css` | Design tokens (source unique) |

**Pattern "Lazy Context Loading"** :
1. Lire d'abord le wireframe (seul fichier de contenu)
2. Résoudre les références `fichier.md > clé` vers `01-brand/` à la demande
3. Ne pas pré-charger tout le dossier brand/

## Server vs Client Components

| Section | Type | Raison |
|---------|------|--------|
| Hero | Server | SEO critique |
| ServicesPreview | Server | Liste statique |
| PortfolioPreview | Server | Images statiques |
| Testimonials | Server | Contenu statique |
| ContactMini | Client | Form interactif |
| CtaFinal | Server | Contenu statique |
| AnimatedSection | Client | Wrapper animations |

## Workflow : Section par Section

Pour **chaque section** du wireframe `homepage.md` :

1. **Lire** uniquement la section concernée du wireframe
2. **Résoudre** les références (`positioning.md > clé`) en lisant le fichier brand/
3. **Déterminer** si Server ou Client Component
4. **Invoquer** `/frontend-design` avec le brief
5. **Créer** le composant React
6. **Valider** contre constraints.md

## Sections à Créer

### Section 1 : Hero

**Type** : Server Component (+ wrapper AnimatedSection)

**Brief frontend-design** :
```
Créer section Hero (Next.js 15+)

Brief (depuis wireframe) :
- H1 : [tagline]
- Baseline : [baseline]
- CTA : [texte CTA] → /contact
- Layout : [depuis wireframe]
- Interaction : [depuis wireframe]
- Ref design : [depuis wireframe]

Architecture :
- Server Component
- Utiliser AnimatedSection wrapper pour animations

Contraintes :
- Respecter constraints.md
- Classes Tailwind uniquement

Output : components/sections/hero.tsx
```

### Section 2 : Services (aperçu)

**Type** : Server Component

**Brief frontend-design** :
```
Créer section Services aperçu

Brief (depuis wireframe) :
- Titre : [message services]
- 3 cards : [services 1-3]
- Lien : [texte lien] → /services
- Layout : [depuis wireframe]
- Interaction : [depuis wireframe]

Output : components/sections/services-preview.tsx
```

### Section 3-N : [Autres sections]

Répéter le pattern pour chaque section du wireframe.

### Contact Mini (si présent)

**Type** : Client Component

**Stack formulaire** :
```bash
npm install react-hook-form @hookform/resolvers zod sonner
npx shadcn@latest add input textarea
```

**Fichiers** :
- `components/sections/contact-mini.tsx` (Client Component)
- `app/actions/contact.ts` (Server Action)

## Assemblage Page

`app/page.tsx` :

```tsx
import Hero from '@/components/sections/hero'
import ServicesPreview from '@/components/sections/services-preview'
import PortfolioPreview from '@/components/sections/portfolio-preview'
import Testimonials from '@/components/sections/testimonials'
import ContactMini from '@/components/sections/contact-mini'
import CtaFinal from '@/components/sections/cta-final'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <PortfolioPreview />
      <Testimonials />
      <ContactMini />
      <CtaFinal />
    </>
  )
}
```

## Output

```
app/
├── page.tsx
└── actions/
    └── contact.ts

components/
├── sections/
│   ├── hero.tsx
│   ├── services-preview.tsx
│   ├── portfolio-preview.tsx
│   ├── testimonials.tsx
│   ├── contact-mini.tsx
│   └── cta-final.tsx
└── ui/
    └── animated-section.tsx
```

## Validation

- [ ] Chaque section créée individuellement
- [ ] Wireframe respecté (contenu, layout, interactions)
- [ ] Server/Client Components correctement séparés
- [ ] Animations via AnimatedSection wrapper
- [ ] Responsive mobile-first
- [ ] Conforme à constraints.md
- [ ] Accessibilité : labels, aria-invalid sur inputs

## Prochaine Étape

→ `stages/06-pages.md`

---

**Version** : 1.0
**Phase** : B2 (Design / Vibe Coding)
**Dépendances** : B1 (04-Layout), A5 (03.5-Wireframes)
**Produit pour** : B4 (07-Polish)
