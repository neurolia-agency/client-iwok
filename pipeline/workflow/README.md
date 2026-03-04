# Pipeline Workflow

Index des fichiers de documentation du workflow.

## Structure en 2 Phases

### Phase A : Architecture (Markdown uniquement)
```
A1-Init → A2-Brand → A3-Art Direction → A4-Structure → A5-Wireframes → A6-Design Tokens
```

### Phase B : Design / Vibe Coding (Code avec frontend-design)
```
B1-Layout → B2-Homepage → B3-Pages → B4-Polish → B5-Validate → B6-Deploy
```

## Fichiers

| Fichier | Contenu |
|---------|---------|
| `DESIGN_STACK.md` | Stack technique (Next.js, Tailwind, Motion, Lenis) |
| `DEPENDENCIES.md` | Matrice inputs/outputs par étape, règles de lecture |

## Source Unique

**Statut pipeline et flux de contexte** : voir `CLAUDE.md` (racine du projet)

## Exécuter une Étape

```bash
# Phase A (Architecture) - Production de documents Markdown
/apex -a -s exécuter étape [XX]-[nom] depuis stages/[XX]-[nom].md
```

## Phase B : Vibe Coding avec frontend-design

**OBLIGATOIRE** : Tout développement UI en Phase B doit utiliser `/frontend-design`.

```bash
# Pour chaque composant/section UI
/frontend-design
```

**Workflow** :
1. Lire le wireframe de la section
2. Invoquer `/frontend-design` avec le brief
3. Réviser visuellement (navigateur)
4. Itérer jusqu'à satisfaction
5. Passer au composant suivant

**Règle** : Ne jamais écrire de CSS/composants manuellement. Toujours passer par `/frontend-design`.

---

*Template Workflow v1.0*
