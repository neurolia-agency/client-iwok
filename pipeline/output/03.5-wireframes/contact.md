# Contact — Wireframe

**Route** : /contact
**Objectif** : Faciliter la demande de devis, accompagner le visiteur pas à pas

> Dérive de : `03-sitemap.md > Contact`, `01-brand/positioning.md`, `02-art-direction/constraints.md`
> Page de conversion principale — chaque élément sert le KPI devis

---

## Section 1 : Header Page

**Fond** : `visual-vocabulary.md > couleurs > fond immersif` (#1C1917)

**Contenu** :
- Titre H1 : "Demander un devis" — `visual-vocabulary.md > typographie > typo massive`, couleur Craie
- Sous-titre : `positioning.md > messages > contact` — `visual-vocabulary.md > typographie > corps large`, couleur Craie 70%
- Badge de réassurance : "Devis gratuit — Réponse sous 48h" — fond Ocre Artiste opacity 15%, texte Ocre Artiste, `visual-vocabulary.md > formes > radius pill`, `visual-vocabulary.md > typographie > texte discret` uppercase + letter-spacing

**Layout** : Centré, min-height 35vh, `visual-vocabulary.md > espacements > padding section`

**Interaction** :
- H1 : `visual-vocabulary.md > transitions > split-text reveal` au load
- Badge + sous-titre : `visual-vocabulary.md > transitions > apparition rapide` staggeré

**Ref design** : Header sobre, focus sur la conversion — pas d'image pour ne pas distraire

---

## Section 2 : Formulaire de Demande de Devis

**Fond** : `visual-vocabulary.md > couleurs > fond principal` (#FAFAF7)

**Contenu** :
Formulaire progressif en 2 colonnes (desktop) / 1 colonne (mobile) :

### Colonne gauche (champs projet — 70% largeur)

**Groupe 1 : Le projet**
- `Type de projet` *(select)* : "Fresque intérieure" / "Fresque extérieure" / "Design mural sur mesure" / "Support atypique (véhicule, container...)" / "Animation événementielle" / "Atelier participatif" / "Autre"
- `Surface estimée` *(select)* : "< 5m²" / "5-20m²" / "20-50m²" / "> 50m²" / "Je ne sais pas encore"
- `Lieu du projet` *(text)* : placeholder "Ville, département"

**Groupe 2 : Votre idée**
- `Description du projet` *(textarea, 4 lignes min)* : placeholder "Racontez votre projet, vos envies, vos contraintes, le style souhaité..."

**Groupe 3 : Vos coordonnées**
- `Votre nom` *(text)* : placeholder "Prénom Nom"
- `Votre email` *(email)* : placeholder "votre@email.fr"
- `Votre téléphone` *(tel, optionnel)* : placeholder "+33 6 XX XX XX XX" + label "(optionnel)"

**CTA soumission** :
- Bouton `Envoyer ma demande` — Ocre Artiste plein, pleine largeur, `visual-vocabulary.md > typographie > titre card`, `visual-vocabulary.md > formes > radius standard`
- Texte dessous : "En soumettant ce formulaire, vous acceptez notre politique de confidentialité" — `visual-vocabulary.md > typographie > texte micro`, couleur `visual-vocabulary.md > couleurs > texte secondaire`

**Message de confirmation** (après soumission réussie) :
- Remplace le formulaire
- Fond `visual-vocabulary.md > couleurs > fond alternatif`
- Titre : "Votre projet est entre de bonnes mains." — `visual-vocabulary.md > typographie > sous-titre`, Syne 700
- Texte : "On revient vers vous sous 48h." — `visual-vocabulary.md > typographie > corps confortable`
- Icône : checkmark simple, couleur Ocre Artiste

### Colonne droite (réassurance — 30% largeur, desktop seulement)

- Bloc réassurance sticky :
  - "Pourquoi nous faire confiance ?" — `visual-vocabulary.md > typographie > texte discret` uppercase
  - 3 USPs courts : `positioning.md > usps[0-2]` (résumés en 1 ligne chacun)
  - Séparateur `visual-vocabulary.md > couleurs > bordure subtile`
  - Temps de réponse : "Réponse garantie sous 48h ouvrées"
  - Contact direct (si renseigné) : email + téléphone

**Layout** :
- Conteneur form : max-width 900px, centré, `visual-vocabulary.md > espacements > padding section`
- Inputs : fond `visual-vocabulary.md > couleurs > surface card`, bordure `visual-vocabulary.md > couleurs > bordure subtile`, `visual-vocabulary.md > formes > radius input`, padding 14px 16px
- Labels : `visual-vocabulary.md > typographie > texte discret`, uppercase, `visual-vocabulary.md > typographie > letter-spacing caps`, couleur Encre
- Focus input : bordure Ocre Artiste 2px, sans glow
- Erreur input : bordure rouge-terre oklch(0.52 0.15 30) + message d'erreur rouge-terre dessous
- `visual-vocabulary.md > espacements > gap serré` entre label et input
- `visual-vocabulary.md > espacements > espace respiration` entre groupes de champs

**Interaction** :
- Formulaire complet : `visual-vocabulary.md > transitions > apparition douce` au load (section entière)
- Select : dropdown natif amélioré CSS (pas de librairie JS complexe — compatibilité mobile)
- Textarea : auto-resize au typing (JS minimal)
- Validation inline : à la perte de focus (blur), pas au typing — feedback non-intrusif
- Soumission : Next.js Server Action — désactiver le bouton + spinner pendant l'envoi
- Transition form → confirmation : `visual-vocabulary.md > transitions > apparition douce` (fade out form, fade in confirmation)

**Implémentation** : Server Action Next.js (envoi email via Resend ou Nodemailer)

**Ref design** : Formulaire de devis propre style fourmula.ai (labels clairs, espacement généreux, focus Ocre)

---

## Section 3 : Coordonnées

**Fond** : `visual-vocabulary.md > couleurs > fond alternatif` (#F5F2ED)

**Contenu** :
- Titre : "Vous pouvez aussi nous joindre directement" — `visual-vocabulary.md > typographie > sous-titre`, couleur Encre
- Adresse : 15 rue Bellevue, 12510 Olemps (Aveyron) — `visual-vocabulary.md > typographie > corps confortable`
- Email : (placeholder — À confirmer avec le client) — lien mailto
- Téléphone : (placeholder — À confirmer avec le client) — lien tel:
- Instagram : @guihomefresquesmurales — lien externe, icône Instagram

**Layout** : 3 colonnes desktop (adresse / email+tél / instagram) / 1 colonne mobile, `visual-vocabulary.md > espacements > padding section` réduit (80px)

**Interaction** :
- Reveal : `visual-vocabulary.md > transitions > apparition douce` au scroll
- Liens hover : couleur Ocre Artiste, `visual-vocabulary.md > transitions > transition standard`
