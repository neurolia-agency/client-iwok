# Sitemap — IWOK / GuiHome Décoration

> Produit par l'étape A04-Structure — 2026-02-23 (v1)
> Dérive de : `00-brief.md`, `01-brand/services.md`, `01-brand/positioning.md`, `02-art-direction/emotion-map.md`

---

## Vue d'ensemble

```
IWOK — GuiHome Décoration
├── Accueil (/)
├── Portfolio (/portfolio)
├── Services (/services)
├── À Propos (/a-propos)
├── Contact (/contact)
└── Mentions Légales (/mentions-legales)
```

> **Ordre de navigation** : Portfolio avant Services — le portfolio EST l'argument de vente pour un artiste muraliste. On montre les réalisations avant d'expliquer les prestations.

---

## Pages Détaillées

### 1. Accueil (/)

**Objectif** : Créer l'émerveillement, qualifier le visiteur, générer des demandes de devis

**Message principal** : "Du mur blanc à l'oeuvre unique."

**Sections** :

1. **Hero** *(émotion : émerveillement)*
   - Fond plein écran : fresque la plus spectaculaire du portfolio (extérieure ou grande surface)
   - Titre : `Du mur blanc à l'oeuvre unique.` (Syne 800, blanc sur fond sombre)
   - Sous-titre : `Designer mural et fresquiste professionnel — plus de 15 ans de créations sur mesure en Occitanie.`
   - CTA principal : `Demander un devis` → `/contact`
   - CTA secondaire : `Voir les réalisations` → `/portfolio`
   - **Animation signature** : Clip-path reveal — le lettrage IWOK s'ouvre sur la fresque (gsap-clipmask-scrolltrigger)

2. **Portfolio Aperçu** *(émotion : confiance + projection)*
   - Titre section : `Plus de 100 fresques, chacune unique`
   - Grille masonry : 4-6 photos sélectionnées (1 par catégorie minimum)
   - Filtres visibles : Entreprises · Événementiel · Particuliers · Participatif
   - CTA : `Voir toutes les réalisations` → `/portfolio`
   - **Animation** : Colonnes d'images scrollant en sens inverse (reverse-scrolling-column)

3. **Services Aperçu** *(émotion : réassurance)*
   - Titre section : `Votre projet, du premier trait au dernier coup de pinceau`
   - 3 services mis en avant (cards) :
     - Fresques murales (intérieur + extérieur)
     - Design mural sur mesure
     - Animation événementielle
   - Fond : Craie/Sable (moment de respiration dans le parcours immersif)
   - CTA : `Découvrir tous les services` → `/services`

4. **Témoignages** *(émotion : validation sociale)*
   - Titre section : `Ils ont transformé leurs murs`
   - 2-3 témoignages clients (à renseigner)
   - Format : citation + nom + type de projet + ville
   - Fond Sable, guillemets en Terracotta

5. **CTA Final** *(émotion : passage à l'action)*
   - Fond : Noir Mural (plein écran, immersif)
   - Titre : `Racontez-nous votre mur, on lui donne vie`
   - Sous-titre : `Devis gratuit — Réponse sous 48h`
   - CTA : `Demander un devis` → `/contact` (bouton Ocre Artiste)

---

### 2. Portfolio (/portfolio)

**Objectif** : Démontrer l'expertise par les réalisations, créer la projection, convertir en demande de devis

**Message principal** : "Plus de 100 fresques, chacune unique"

**Sections** :

1. **Hero Page** *(sobre, fonctionnel)*
   - Titre : `Réalisations`
   - Sous-titre : `Plus de 100 fresques murales depuis 2008 — entreprises, collectivités, particuliers, événementiel`
   - Pas d'image héro ici — l'entrée dans la galerie est immédiate

2. **Galerie Filtrable** *(cœur de la page)*
   - **Filtres par catégorie** :
     - `Tous` (par défaut)
     - `Entreprises & Collectivités`
     - `Événementiel`
     - `Particuliers`
     - `Participatif`
   - Layout : Masonry responsive (colonnes adaptatives)
   - Interaction : clic sur une photo → Lightbox plein écran
   - Lightbox : photo HD + titre projet + année + lieu + navigation (← →)
   - **Animation** : GSAP Flip pour la transition entre filtres (fluidité des reordonnements)
   - **Performance** : Lazy loading obligatoire (>100 photos)
   - Filtres actifs : couleur Terracotta
   - Indicateur de scroll : barre Ocre sur le côté

3. **CTA Contextuel**
   - Texte : `Un projet similaire en tête ?`
   - Sous-texte : `Chaque fresque est unique — racontez-nous votre idée`
   - CTA : `Demander un devis` → `/contact`

---

### 3. Services (/services)

**Objectif** : Détailler l'offre, rassurer sur le process, orienter vers la conversion

**Message principal** : "Votre projet, du premier trait au dernier coup de pinceau"

**Sections** :

1. **Hero Page**
   - Titre : `Services`
   - Sous-titre : `Fresques murales, design sur mesure, animation événementielle — sur tous les supports, pour tous les projets`

2. **Grille des Services**
   - 6 cards de services (depuis `01-brand/services.md`) :
     1. **Fresques Murales Intérieures** — "L'intérieur qui raconte votre histoire"
     2. **Fresques Murales Extérieures** — "Donner une âme à vos façades"
     3. **Design Mural Sur Mesure** — "Votre vision, notre trait"
     4. **Décoration Tous Supports** — "Pas seulement les murs"
     5. **Animation Événementielle** — "L'art en direct, devant vos yeux"
     6. **Ateliers Participatifs** — "Créer ensemble, peindre ensemble"
   - Chaque card : tagline + description courte + photo d'illustration + lien "En savoir plus" (accordéon ou anchor)
   - Fond : Craie/Sable alternant

3. **Process / Comment ça marche**
   - Titre : `De l'idée à la fresque — 4 étapes`
   - Étapes :
     1. **Prise de contact** — Échange sur votre projet (téléphone ou email)
     2. **Proposition créative** — Visite sur site + croquis/maquette
     3. **Réalisation** — La fresque prend vie sur votre mur
     4. **Livraison** — Finitions, protection, remise du support
   - Format : Timeline horizontale (desktop) / Verticale (mobile)

4. **CTA Contact**
   - Texte : `Discutons de votre projet`
   - CTA : `Demander un devis` → `/contact`

---

### 4. À Propos (/a-propos)

**Objectif** : Créer la connexion humaine, raconter le parcours, renforcer la confiance

**Message principal** : "Du graffiti au design mural — 15 ans de murs dans les mains"

**Sections** :

1. **Hero Page + Portrait**
   - Titre : `Guillaume Jeanjean — IWOK`
   - Sous-titre : `Du graffiti au design mural — 15 ans de murs dans les mains`
   - Photo : portrait artiste (depuis `pipeline/input/assets/portrait/`)
   - L'artiste en action (en train de peindre) plutôt que posé devant ses œuvres

2. **Storytelling Parcours** *(scroll narratif)*
   - Format : Sticky sections + images reveal au scroll (gsap-scroll-trigger)
   - Chapitres :
     1. **Les débuts** — Le graffiti, les premières bombes, la rue comme terrain de jeu
     2. **La professionnalisation** — La transition vers le design mural pro
     3. **L'expansion** — Entreprises, collectivités, événementiel, tous les supports
     4. **Aujourd'hui** — IWOK, l'artiste et la marque
   - Photos d'archives et actuelles mélangées

3. **Chiffres Clés**
   - `+15 ans` d'expérience
   - `+100 projets` réalisés
   - `4 types` de clientèle (particuliers, pros, collectivités, événementiel)
   - `Tous supports` (murs, façades, sols, véhicules, containers)
   - Style : typographie Syne massive, fond sombre

4. **CTA Final**
   - Texte : `Racontez-nous votre mur, on lui donne vie`
   - CTA : `Demander un devis` → `/contact`

---

### 5. Contact (/contact)

**Objectif** : Faciliter la demande de devis, accompagner le visiteur pas à pas

**Message principal** : "Racontez-nous votre mur, on lui donne vie"

**Sections** :

1. **Header Page**
   - Titre : `Demander un devis`
   - Sous-titre : `Racontez-nous votre mur, on lui donne vie`
   - Message de réassurance : `Devis gratuit — Réponse sous 48h`

2. **Formulaire de Demande de Devis** *(cœur de la page)*
   - Champs (progressifs, dans l'ordre logique) :
     1. **Type de projet** *(select)* : Fresque intérieure / Fresque extérieure / Design mural / Support atypique / Animation événementielle / Atelier participatif / Autre
     2. **Surface estimée** *(select ou libre)* : < 5m² / 5-20m² / 20-50m² / > 50m² / Je ne sais pas
     3. **Lieu du projet** *(texte)* : Ville, département
     4. **Description du projet** *(textarea)* : Racontez votre projet, vos envies, contraintes…
     5. **Votre nom** *(texte)*
     6. **Votre email** *(email)*
     7. **Votre téléphone** *(tel, optionnel)*
   - CTA : `Envoyer ma demande` (bouton Ocre Artiste — seul élément coloré fort)
   - Message de confirmation : `Votre projet est entre de bonnes mains. On revient vers vous sous 48h.`
   - Implémentation : Server Action Next.js (envoi email)

3. **Coordonnées**
   - Adresse : 15 rue Bellevue, 12510 Olemps (Aveyron)
   - Email : [À confirmer avec le client]
   - Téléphone : [À confirmer avec le client]
   - Instagram : @guihomefresquesmurales

---

### 6. Mentions Légales (/mentions-legales)

**Objectif** : Conformité RGPD — page utilitaire

**Sections** :

1. **Éditeur du site**
   - GuiHome Décoration — Guillaume Jeanjean
   - SIRET : 812 130 086 00018
   - Adresse : 15 rue Bellevue, 12510 Olemps
   - Email : [À confirmer]

2. **Hébergeur**
   - Vercel Inc.

3. **Propriété intellectuelle**
   - Toutes les œuvres et photographies sont la propriété de Guillaume Jeanjean / GuiHome Décoration

4. **Données personnelles (RGPD)**
   - Données collectées via le formulaire de contact
   - Finalité : réponse aux demandes de devis
   - Durée de conservation
   - Droits d'accès, rectification, suppression

5. **Cookies**
   - Site sans tracking tiers (à confirmer selon les outils analytics retenus)

---

## Navigation

### Header

**Structure Desktop** :
- Logo IWOK (lien → `/`)
- Menu : `Portfolio` · `Services` · `À Propos` · `Contact`
- CTA : `Demander un devis` → `/contact` (bouton Ocre Artiste)

**Structure Mobile** :
- Logo IWOK
- Bouton hamburger (ouvre menu fullscreen)
- Menu fullscreen : liens + CTA devis

> **Inspiration menu** : Style navbar fourmula.ai (élégant, sobre) + menu fullscreen siemprericc.com

### Footer

**Colonnes** :
1. **Identité** : Logo + baseline + réseaux sociaux (Instagram)
2. **Navigation** : Accueil · Portfolio · Services · À Propos · Contact
3. **Services** : Fresques intérieures · Fresques extérieures · Design mural · Animation événementielle
4. **Contact** : Adresse · Email · Téléphone

**Ligne du bas** :
- `© 2026 GuiHome Décoration — IWOK. Tous droits réservés.`
- Lien Mentions légales

---

## Responsive

| Breakpoint | Navigation | Portfolio |
|------------|------------|-----------|
| Desktop (>1024px) | Menu horizontal + CTA | Masonry 3-4 colonnes |
| Tablet (768-1024px) | Menu hamburger fullscreen | Masonry 2 colonnes |
| Mobile (<768px) | Menu hamburger fullscreen | 1 colonne (scroll vertical) |

> **Mobile-first impératif** : Le trafic arrive principalement d'Instagram → smartphones. La galerie portfolio est pensée pour le scroll vertical et le swipe. Lazy loading obligatoire sur mobile.

---

## URLs & SEO

| Page | URL | Title SEO | Description SEO |
|------|-----|-----------|-----------------|
| Accueil | `/` | `IWOK — Fresques murales sur mesure en Occitanie` | `Designer mural professionnel, +15 ans d'expérience. Fresques intérieures, extérieures, tous supports. Devis gratuit.` |
| Portfolio | `/portfolio` | `Portfolio — IWOK Fresques Murales` | `+100 réalisations : entreprises, collectivités, particuliers, événementiel. Galerie filtrable.` |
| Services | `/services` | `Services — Fresques Murales IWOK` | `Fresques intérieures et extérieures, design mural sur mesure, animation événementielle. Devis gratuit.` |
| À Propos | `/a-propos` | `À Propos — Guillaume Jeanjean, Artiste Muraliste IWOK` | `Graffeur devenu designer mural professionnel depuis 2008. +15 ans de créations en Occitanie.` |
| Contact | `/contact` | `Demander un devis — IWOK Fresques Murales` | `Formulaire de demande de devis gratuit. Réponse sous 48h.` |
| Mentions légales | `/mentions-legales` | `Mentions Légales — IWOK` | `` |

---

## Validation A04-Structure

- [x] Toutes les pages du brief sont couvertes (6 pages)
- [x] Chaque page a un objectif défini
- [x] Sections listées pour chaque page avec contenu spécifique IWOK
- [x] Navigation header/footer définie
- [x] URLs définies (kebab-case)
- [x] Messages de positioning.md intégrés par section
- [x] Éléments de l'emotion-map.md intégrés (animations, couleurs dominantes)
- [x] Services.md (6 services) intégrés dans la page Services
- [x] Formulaire de devis spécifié (champs, implémentation)
- [x] Galerie filtrable spécifiée (4 catégories, lightbox)
- [x] SEO local intégré (titles, descriptions)

## Prochaine Étape

Une fois validé → Passer à `stages/A05-wireframes.md`
