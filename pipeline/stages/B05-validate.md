# Étape B5 : Validation

> **Phase B : Design / Vibe Coding** - Contrôle qualité avant déploiement.

## Objectif

Valider que le site répond aux critères de qualité définis avant mise en production.

## Input

- Site assemblé complet
- Tous les fichiers `output/`
- `output/01.5-art-direction/constraints.md`

## Tests à Effectuer

### 1. Tests Fonctionnels

```markdown
## Fonctionnalités

### Navigation
- [ ] Tous les liens fonctionnent
- [ ] Navigation mobile fonctionne
- [ ] Logo ramène à l'accueil
- [ ] CTA header fonctionne

### Formulaires
- [ ] Formulaire contact envoie les données
- [ ] Validation client fonctionne
- [ ] Validation serveur fonctionne
- [ ] Messages d'erreur affichés
- [ ] Message de succès affiché
- [ ] Email reçu (si configuré)

### Pages
- [ ] Homepage charge correctement
- [ ] Services charge correctement
- [ ] Portfolio charge correctement
- [ ] About charge correctement
- [ ] Contact charge correctement
- [ ] 404 personnalisée (si créée)
```

### 2. Tests Responsive

```markdown
## Responsive

### Mobile (375px)
- [ ] Header : hamburger visible
- [ ] Menu mobile fonctionne
- [ ] Textes lisibles
- [ ] Images adaptées
- [ ] Formulaires utilisables
- [ ] Touch targets >= 44px

### Tablet (768px)
- [ ] Layout adapté
- [ ] Navigation appropriée

### Desktop (1440px)
- [ ] Layout optimal
- [ ] Pas de débordement horizontal
- [ ] Grids correctes
```

### 3. Tests Performance (Lighthouse)

```bash
# Exécuter Lighthouse sur chaque page
npx lighthouse http://localhost:3000 --view
npx lighthouse http://localhost:3000/services --view
# ... pour chaque page
```

**Seuils minimum** :

| Métrique | Minimum | Objectif |
|----------|---------|----------|
| Performance | 90 | 95+ |
| Accessibility | 90 | 100 |
| Best Practices | 90 | 100 |
| SEO | 90 | 100 |

### 4. Tests Accessibilité

```markdown
## Accessibilité (WCAG AA)

### Navigation clavier
- [ ] Tab navigue dans l'ordre logique
- [ ] Focus visible sur tous les éléments
- [ ] Skip to content fonctionne
- [ ] Escape ferme les modals/menus

### Lecteurs d'écran
- [ ] Structure headings logique (h1 > h2 > h3)
- [ ] Images ont des alt pertinents
- [ ] Formulaires ont des labels
- [ ] ARIA labels présents

### Contrastes
- [ ] Texte/fond >= 4.5:1 (normal)
- [ ] Texte/fond >= 3:1 (large)
```

### 5. Tests Cross-Browser

```markdown
## Navigateurs

### Desktop
- [ ] Chrome (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (dernière version)
- [ ] Edge (dernière version)

### Mobile
- [ ] Safari iOS
- [ ] Chrome Android
```

### 6. Validation Design

```markdown
## Conformité Direction Artistique

### Test "Est-ce [NOM_PROJET] ?"
[Copier depuis constraints.md]

- [ ] [Critère 1] ?
- [ ] [Critère 2] ?
- [ ] [Critère 3] ?
- [ ] [Critère 4] ?
- [ ] [Critère 5] ?

→ 5/5 = Conforme | < 4/5 = Corriger avant déploiement
```

### 7. Vérifications Légales

```markdown
## Légal

- [ ] Mentions légales présentes
- [ ] Politique de confidentialité (si données collectées)
- [ ] Banner cookies (si cookies analytics)
- [ ] RGPD conforme (formulaires)
```

## Output

Créer `output/08-validation.md` :

```markdown
# Rapport de Validation

**Date** : [DATE]
**Validateur** : [NOM]

## Résumé

| Catégorie | Status |
|-----------|--------|
| Fonctionnel | ✅ PASS / ❌ FAIL |
| Responsive | ✅ PASS / ❌ FAIL |
| Performance | ✅ PASS / ❌ FAIL |
| Accessibilité | ✅ PASS / ❌ FAIL |
| Cross-browser | ✅ PASS / ❌ FAIL |
| Design | ✅ PASS / ❌ FAIL |
| Légal | ✅ PASS / ❌ FAIL |

## Scores Lighthouse

| Page | Perf | A11y | BP | SEO |
|------|------|------|----|----|
| Homepage | XX | XX | XX | XX |
| Services | XX | XX | XX | XX |
| Portfolio | XX | XX | XX | XX |
| About | XX | XX | XX | XX |
| Contact | XX | XX | XX | XX |

## Issues Identifiées

### Critiques (bloquent déploiement)
- [Issue 1]
- [Issue 2]

### Mineures (peuvent attendre)
- [Issue 1]
- [Issue 2]

## Décision

- [ ] ✅ **PASS** : Prêt pour déploiement
- [ ] ❌ **FAIL** : Corrections requises avant déploiement

**Commentaires** :
[Notes additionnelles]
```

## Validation

- [ ] Tous les tests fonctionnels passent
- [ ] Responsive OK sur mobile, tablet, desktop
- [ ] Lighthouse > 90 sur toutes les métriques
- [ ] Accessibilité WCAG AA respectée
- [ ] Cross-browser testé
- [ ] Design conforme à constraints.md
- [ ] Vérifications légales OK

## Prochaine Étape

Si **PASS** → `stages/09-deploy.md`
Si **FAIL** → Corriger les issues puis re-valider

---

**Version** : 1.0
**Phase** : B5 (Design / Vibe Coding)
**Dépendances** : B4 (07-Polish)
**Produit pour** : B6 (09-Deploy)
