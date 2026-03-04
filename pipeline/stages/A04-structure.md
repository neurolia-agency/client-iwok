# Étape A4 : Structure (Sitemap)

> **Phase A : Architecture** - Définition de l'architecture des pages.

## Objectif

Définir l'architecture des pages et la hiérarchie du contenu.

## Input

- `output/00-brief.md` (liste des pages)
- `output/01-brand/services.md` (pour structurer les services)

## Instructions

1. **Lire** le brief pour identifier les pages demandées
2. **Définir** la hiérarchie des pages
3. **Détailler** les sections de chaque page
4. **Spécifier** la navigation

## Output

Créer `output/03-sitemap.md` :

```markdown
# Sitemap - [Nom du Projet]

## Vue d'ensemble

```
[Nom du Site]
├── Accueil (/)
├── Services (/services)
├── Portfolio (/portfolio)
├── À Propos (/about)
├── Contact (/contact)
└── Mentions Légales (/mentions-legales)
```

## Pages Détaillées

### 1. Accueil (/)

**Objectif** : [Objectif principal de la page]

**Sections** :

1. **Hero**
   - Titre principal (positioning.md > tagline)
   - Sous-titre
   - CTA principal
   - [Élément visuel si applicable]

2. **Services** (aperçu)
   - Titre section
   - 3 services mis en avant
   - Lien "Voir tous les services"

3. **Avantages / Pourquoi nous**
   - 3 USPs (positioning.md)
   - Icônes ou illustrations

4. **Portfolio** (aperçu)
   - Titre section
   - 2-3 projets
   - Lien vers portfolio

5. **Témoignages** (optionnel)
   - 2-3 témoignages

6. **CTA Final**
   - Titre accrocheur
   - Bouton contact

### 2. Services (/services)

**Objectif** : Détailler l'offre

**Sections** :
1. Hero page
2. Grid services (tous les services)
3. Process / Comment ça marche
4. FAQ (optionnel)
5. CTA contact

### 3. Portfolio (/portfolio)

**Objectif** : Démontrer l'expertise

**Sections** :
1. Hero page
2. Grid projets
3. Étude de cas (1 projet détaillé)
4. CTA contact

### 4. À Propos (/about)

**Objectif** : Créer la confiance

**Sections** :
1. Hero page
2. Mission / Vision
3. Valeurs
4. Équipe (optionnel)
5. Chiffres clés
6. CTA contact

### 5. Contact (/contact)

**Objectif** : Faciliter la prise de contact

**Sections** :
1. Hero page
2. Formulaire de contact
3. Coordonnées
4. Carte (optionnel)

### 6. Mentions Légales (/mentions-legales)

**Objectif** : Conformité RGPD

**Sections** :
1. Éditeur du site
2. Hébergeur
3. Données personnelles
4. Cookies

## Navigation

### Header

**Structure Desktop** :
- Logo (lien → /)
- Menu : [Liens]
- CTA : [Texte] → /contact

**Structure Mobile** :
- Logo
- Hamburger menu

### Footer

**Colonnes** :
1. Navigation principale
2. Services
3. Contact
4. Légal

**Ligne du bas** :
- Copyright
- Réseaux sociaux (si applicable)

## Responsive

| Breakpoint | Navigation |
|------------|------------|
| Desktop (>1024px) | Menu horizontal |
| Tablet (768-1024px) | Menu hamburger |
| Mobile (<768px) | Menu hamburger |
```

## Validation

- [ ] Toutes les pages du brief sont couvertes
- [ ] Chaque page a un objectif défini
- [ ] Sections listées pour chaque page
- [ ] Navigation header/footer définie
- [ ] URLs définies (kebab-case)

## Prochaine Étape

Une fois `output/03-sitemap.md` créé → Passer à `stages/03.5-wireframes.md`

---

**Version** : 1.0
**Phase** : A4 (Architecture)
**Dépendances** : A1 (00-Init), A2 (01-Brand)
**Produit pour** : A5 (03.5-Wireframes), B1 (04-Layout)
