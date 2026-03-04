# Étape B3 : Pages Secondaires

> **Phase B : Design / Vibe Coding** - Pages Services, Portfolio, About, Contact.

## Invocation frontend-design

**OBLIGATOIRE** : Pour chaque section UI, utiliser le skill frontend-design :

```bash
/frontend-design
```

**Workflow vibe coding** :
1. Lire la section du wireframe de la page
2. Invoquer `/frontend-design` avec le brief
3. Réviser visuellement dans le navigateur
4. Itérer jusqu'à satisfaction
5. Passer à la section/page suivante

---

## Objectif

Créer les pages secondaires, chaque page utilisant **uniquement son wireframe**.

## Input

| Page | Wireframe |
|------|-----------|
| Services | `output/03.5-wireframes/services.md` |
| Portfolio | `output/03.5-wireframes/portfolio.md` |
| About | `output/03.5-wireframes/about.md` |
| Contact | `output/03.5-wireframes/contact.md` |

**Pattern "Lazy Context Loading"** :
1. Chaque page lit d'abord son wireframe
2. Résoudre les références `fichier.md > clé` vers `01-brand/` à la demande
3. **Exception** : Page Contact peut lire `about.md` pour les coordonnées

## Pages à Créer

### 1. Services (/services)

**Wireframe** : `output/03.5-wireframes/services.md`

**Sections typiques** :
- Hero page
- Grid services (tous les services)
- Process / Comment ça marche
- FAQ (optionnel)
- CTA final (réutiliser composant homepage)

**Brief frontend-design** (par section) :
```
Créer section [Nom] pour page Services

Brief (depuis wireframe) :
- [Contenu]
- Layout : [depuis wireframe]
- Interaction : [depuis wireframe]

Output : components/pages/services/[nom-section].tsx
```

### 2. Portfolio (/portfolio)

**Wireframe** : `output/03.5-wireframes/portfolio.md`

**Sections typiques** :
- Hero page
- Grid projets
- Étude de cas (1 projet détaillé)
- CTA final

### 3. About (/about)

**Wireframe** : `output/03.5-wireframes/about.md`

**Sections typiques** :
- Hero page
- Mission / Vision
- Valeurs
- Équipe (optionnel)
- Chiffres clés
- CTA final

### 4. Contact (/contact)

**Wireframe** : `output/03.5-wireframes/contact.md`

**Sections typiques** :
- Hero page
- Formulaire complet
- Coordonnées
- Carte (optionnel)

**Stack formulaire** :
```bash
npm install react-hook-form @hookform/resolvers zod sonner
npx shadcn@latest add input textarea select
```

## Structure Fichiers

```
app/
├── services/
│   └── page.tsx
├── portfolio/
│   └── page.tsx
├── about/
│   └── page.tsx
├── contact/
│   └── page.tsx
└── actions/
    └── contact.ts

components/
└── pages/
    ├── services/
    │   ├── services-hero.tsx
    │   ├── services-grid.tsx
    │   └── process.tsx
    ├── portfolio/
    │   ├── portfolio-hero.tsx
    │   ├── projects-grid.tsx
    │   └── case-study.tsx
    ├── about/
    │   ├── about-hero.tsx
    │   ├── mission.tsx
    │   └── values.tsx
    └── contact/
        ├── contact-hero.tsx
        ├── contact-form.tsx
        └── contact-info.tsx
```

## Pattern Page

```tsx
// app/services/page.tsx
import ServicesHero from '@/components/pages/services/services-hero'
import ServicesGrid from '@/components/pages/services/services-grid'
import Process from '@/components/pages/services/process'
import CtaFinal from '@/components/sections/cta-final'

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <Process />
      <CtaFinal />
    </>
  )
}
```

## Composants Réutilisables

Ces composants créés en B2 sont réutilisés :

| Composant | Usage |
|-----------|-------|
| `CtaFinal` | Toutes les pages (section finale) |
| `AnimatedSection` | Wrapper animations |

## Validation

- [ ] 4 pages créées (Services, Portfolio, About, Contact)
- [ ] Chaque page suit son wireframe
- [ ] Server/Client Components correctement séparés
- [ ] Formulaire Contact fonctionnel
- [ ] Composants réutilisés (CtaFinal, AnimatedSection)
- [ ] Responsive mobile-first
- [ ] Conforme à constraints.md

## Prochaine Étape

→ `stages/07-polish.md`

---

**Version** : 1.0
**Phase** : B3 (Design / Vibe Coding)
**Dépendances** : B1 (04-Layout), A5 (03.5-Wireframes)
**Produit pour** : B4 (07-Polish)
