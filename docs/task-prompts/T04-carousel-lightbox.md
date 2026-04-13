# Brief T04 : Verification et fix du carousel lightbox

## Contexte
La lightbox du portfolio s'ouvre quand on clique sur une carte de projet (GalleryCard). Elle doit permettre de naviguer dans toutes les images d'un projet avec les fleches gauche/droite. Le probleme potentiel : quand on clique sur une image specifique d'un projet multi-images, la lightbox s'ouvre toujours a l'index 0 (premiere image) au lieu de l'image cliquee. Il faut verifier ce comportement et le corriger.

## Fichiers a modifier
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/pages/portfolio/Lightbox.tsx` (230 lignes)
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/pages/portfolio/SubcategoryGallery.tsx` (35 lignes)
- `/Users/jorisgustiez/Dev/Claude/neurolia-agency/client-iwok/components/pages/portfolio/GalleryCard.tsx` (113 lignes)

## Code actuel

### Lightbox.tsx (extraits cles)
```tsx
interface LightboxProps {
  project: PortfolioProject;
  initialIndex?: number;
  onClose: () => void;
}

export default function Lightbox({ project, initialIndex = 0, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [imgLoaded, setImgLoaded] = useState(false);
  const image = project.images[current];
  const total = project.images.length;
  const hasMultiple = total > 1;

  const goNext = useCallback(() => {
    setImgLoaded(false);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setImgLoaded(false);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasMultiple) goNext();
      if (e.key === "ArrowLeft" && hasMultiple) goPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev, hasMultiple]);
  // ...
}
```

### SubcategoryGallery.tsx (complet)
```tsx
"use client";

import { useState } from "react";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";
import type { PortfolioProject } from "@/data/portfolio-projects";

interface SubcategoryGalleryProps {
  projects: PortfolioProject[];
}

export default function SubcategoryGallery({ projects }: SubcategoryGalleryProps) {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  return (
    <>
      <div className="masonry-grid">
        {projects.map((project) => (
          <GalleryCard
            key={project.id}
            project={project}
            onClick={() => setActiveProject(project)}
          />
        ))}
      </div>

      {activeProject && (
        <Lightbox
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
```

### GalleryCard.tsx (extraits cles)
```tsx
interface GalleryCardProps {
  project: PortfolioProject;
  onClick?: () => void;
}

export default function GalleryCard({ project, onClick }: GalleryCardProps) {
  const coverImage = project.images[project.cover];
  const isPortrait = coverImage.height > coverImage.width;
  // ...
  return (
    <button type="button" className="group" onClick={onClick}
      aria-label={`Voir le projet : ${project.title}`}
      // ...
    >
      <Image src={coverImage.src} alt={coverImage.alt} /* ... */ />
      {/* Hover overlay with title, location, year, photo count */}
    </button>
  );
}
```

## Diagnostic du probleme

Dans `SubcategoryGallery.tsx`, quand on clique sur une GalleryCard, seul le `project` est passe a la lightbox, sans `initialIndex`. La lightbox utilise `initialIndex = 0` par defaut. Or la GalleryCard affiche `project.images[project.cover]` — si `project.cover !== 0`, la lightbox s'ouvre sur la mauvaise image.

Par ailleurs, le composant GalleryCard n'affiche qu'une seule image (la cover). Il n'y a donc pas de cas ou un utilisateur cliquerait sur une image specifique *autre que la cover* depuis la grille. Le fix doit passer `project.cover` comme `initialIndex`.

## Cible
La lightbox s'ouvre sur l'image cover du projet (pas toujours l'index 0). Le carousel navigue correctement dans toutes les images du projet.

## Instructions d'implementation

### Fix 1 : Passer initialIndex dans SubcategoryGallery

Dans `SubcategoryGallery.tsx`, modifier le state pour stocker aussi l'index initial, puis le passer a la Lightbox :

```tsx
export default function SubcategoryGallery({ projects }: SubcategoryGalleryProps) {
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  return (
    <>
      <div className="masonry-grid">
        {projects.map((project) => (
          <GalleryCard
            key={project.id}
            project={project}
            onClick={() => setActiveProject(project)}
          />
        ))}
      </div>

      {activeProject && (
        <Lightbox
          project={activeProject}
          initialIndex={activeProject.cover}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
```

### Fix 2 : Verifier le comportement du carousel

Dans Lightbox.tsx, verifier que :
1. `initialIndex` est bien utilise comme valeur initiale de `current`
2. `goNext` et `goPrev` font bien un wrap-around (modulo)
3. Les fleches s'affichent quand `hasMultiple` est true
4. Les touches clavier ArrowRight/ArrowLeft fonctionnent
5. L'image se charge correctement a chaque changement (onLoad reset imgLoaded)

=> Le code actuel du Lightbox est deja correct pour tous ces points. Le seul fix necessaire est dans SubcategoryGallery.

### Fix 3 : Verifier la gestion du state quand le projet change

Si l'utilisateur ferme la lightbox et clique sur un autre projet, le `current` state doit se reinitialiser. Actuellement, comme le composant Lightbox se demonte/remonte (conditionnel `{activeProject && ...}`), le state est bien reinitialise. OK, pas de fix necessaire ici.

### Verification supplementaire

Verifier dans les donnees que `project.cover` est toujours un index valide (< images.length). Parcourir `PORTFOLIO_PROJECTS` pour identifier les projets avec `cover !== 0` :
- `vestiaires-lycee-laroque` : cover: 3 (4 images)
- `soudhydro-rodez` : cover: 1 (2 images)
- `atelier-participatif-enfants` : cover: 2 (3 images)

Pour ces projets, la lightbox doit s'ouvrir sur l'image correspondante.

## Tokens CSS disponibles
Pas de changement CSS necessaire pour ce fix.

## Patterns a respecter
- Inline styles avec CSS variables (PAS de classes Tailwind utilitaires)
- Le Lightbox garde son pattern actuel (dialog modal, fleches, keyboard nav)
- Le state management reste dans SubcategoryGallery (pas de lifting vers le parent)

## Criteres d'acceptation
- [ ] La lightbox s'ouvre sur `project.images[project.cover]` (pas toujours index 0)
- [ ] Le carousel navigue dans toutes les images avec les fleches
- [ ] Les touches clavier ArrowRight/ArrowLeft fonctionnent
- [ ] Escape ferme la lightbox
- [ ] Le compteur (ex: "2/4") est correct et demarre au bon index
- [ ] Pas de regression : les projets avec cover: 0 fonctionnent toujours
- [ ] `npm run build` passe sans erreur

## Anti-patterns a eviter
- Ne PAS utiliser de classes Tailwind utilitaires
- Ne PAS stocker l'index dans un state separe (utiliser `project.cover`)
- Ne PAS modifier la logique de navigation du carousel (elle est correcte)
- Ne PAS changer les props de GalleryCard (elle ne gere que le clic, pas l'index)
