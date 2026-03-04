# Étape B6 : Déploiement

> **Phase B : Design / Vibe Coding** - Mise en production.

## Prérequis

- `output/08-validation.md` avec status **PASS**
- Accès au compte hébergeur (Vercel recommandé)
- Nom de domaine configuré (si applicable)

## Déploiement sur Vercel

### 1. Connexion Repository

```bash
# Si pas encore fait, push sur GitHub/GitLab
git add .
git commit -m "Ready for production"
git push origin main
```

### 2. Import sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. "Add New Project"
3. Importer le repository
4. Configurer les variables d'environnement (si nécessaire)
5. Deploy

### 3. Configuration Domaine

1. Dans Vercel : Settings > Domains
2. Ajouter le domaine personnalisé
3. Configurer les DNS chez le registrar :
   - Type A : `76.76.21.21`
   - Type CNAME : `cname.vercel-dns.com`

## Variables d'Environnement

Si le projet utilise des services externes :

```env
# .env.local (NE PAS COMMIT)

# Email service (ex: Resend)
RESEND_API_KEY=re_xxxxx

# Analytics (ex: Vercel Analytics)
NEXT_PUBLIC_ANALYTICS_ID=xxxxx

# Autres services
# ...
```

## Checklist Post-Déploiement

### Fonctionnel
- [ ] Site accessible sur le domaine
- [ ] HTTPS activé
- [ ] Toutes les pages chargent
- [ ] Formulaire contact fonctionne
- [ ] Emails reçus

### SEO
- [ ] Indexation Google (Search Console)
- [ ] Sitemap.xml accessible
- [ ] robots.txt correct
- [ ] Open Graph tags fonctionnels

### Analytics
- [ ] Analytics configuré (Vercel Analytics, Google Analytics, ou autre)
- [ ] Events tracking configuré (si applicable)

### Monitoring
- [ ] Alertes erreurs configurées
- [ ] Monitoring uptime (optionnel)

## Output

Créer `output/09-deploy.md` :

```markdown
# Rapport de Déploiement

**Date** : [DATE]
**Environnement** : Production

## URLs

- **Production** : https://[domaine.com]
- **Vercel** : https://[projet].vercel.app

## Configuration

- **Hébergeur** : Vercel
- **Region** : [ex: cdg1 (Paris)]
- **Framework** : Next.js [version]

## DNS

| Type | Nom | Valeur |
|------|-----|--------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

## Variables d'Environnement

| Variable | Configurée |
|----------|-----------|
| [VAR_1] | ✅ |
| [VAR_2] | ✅ |

## Services Connectés

- [ ] Email : [Service] - ✅ Configuré
- [ ] Analytics : [Service] - ✅ Configuré
- [ ] Monitoring : [Service] - ✅ Configuré

## Validation Post-Deploy

- [x] Site accessible
- [x] HTTPS actif
- [x] Formulaire fonctionnel
- [x] Analytics tracking
- [x] Performance OK

## Notes

[Notes additionnelles, problèmes rencontrés, etc.]
```

## Livraison Client

### Documentation à fournir

1. **Accès**
   - URL du site
   - Accès Vercel (si client veut gérer)
   - Accès repository (si applicable)

2. **Guide d'utilisation**
   - Comment modifier le contenu (si CMS)
   - Contacts support

3. **Technique**
   - Stack utilisée
   - Variables d'environnement nécessaires
   - Procédure de mise à jour

## Validation Finale

- [ ] Site en production accessible
- [ ] HTTPS actif
- [ ] Domaine configuré
- [ ] Formulaires fonctionnels
- [ ] Analytics actif
- [ ] Documentation livrée
- [ ] Client informé

---

## 🎉 Projet Terminé

Le workflow est complet. Le site est en production.

**Prochaines actions possibles** :
- Monitoring et maintenance
- Itérations design (nouveau cycle Phase B)
- Ajout de fonctionnalités (blog, etc.)

---

**Version** : 1.0
**Phase** : B6 (Design / Vibe Coding - Finale)
**Dépendances** : B5 (08-Validate)
**Produit pour** : Client / Production
