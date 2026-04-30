# Isolation Supabase IWOK — Procédure d'application

**Status** : Code prêt, à appliquer manuellement
**Stratégie retenue** : Rôle Postgres dédié `iwok_app` + JWT custom (Option 1, gratuit)
**Date** : 2026-04-30

---

## Contexte

Le projet Supabase actuel héberge à la fois IWOK (`iwok_*`) et MGF (`clients`, `leads`, `invoices`, `quotes`, `gmail_tokens`, etc.). Le site IWOK utilisait jusqu'ici la clé `SUPABASE_SERVICE_ROLE_KEY` qui bypass toutes les RLS du projet — donc également les tables MGF. Si cette clé fuite, **tout le projet est exposé**.

Cette migration crée un rôle Postgres `iwok_app` qui n'a accès **qu'aux tables `iwok_*`** et à la RPC `increment_project_likes`. L'app IWOK utilise un JWT signé avec ce rôle. Si ce JWT fuite, l'attaquant n'a accès qu'aux 7 tables IWOK ; les données MGF restent protégées.

---

## Ce qui a déjà été préparé dans le repo

- `supabase/migrations/20260430000000_iwok_app_role.sql` — création du rôle, GRANTs, politiques RLS dédiées
- `scripts/generate-iwok-jwt.mjs` — génère le JWT longue durée signé avec `role: iwok_app`
- `lib/supabase.ts` — refactoré pour utiliser `IWOK_DB_KEY` au lieu de `SUPABASE_SERVICE_ROLE_KEY`
- `.env.example` — documente les variables

## Procédure pas-à-pas

### 1. Appliquer la migration SQL sur Supabase

1. Ouvrir le **SQL Editor** du projet Supabase MGF/IWOK actuel
2. Coller le contenu de `supabase/migrations/20260430000000_iwok_app_role.sql`
3. Exécuter
4. Vérifier (toujours dans le SQL Editor) que le rôle a bien les bonnes permissions :
   ```sql
   SELECT table_schema, table_name, privilege_type
   FROM information_schema.role_table_grants
   WHERE grantee = 'iwok_app'
   ORDER BY table_name, privilege_type;
   ```
   On doit voir `SELECT, INSERT, UPDATE, DELETE` sur les 7 tables `iwok_*` (ni plus, ni moins).

### 2. Récupérer le JWT_SECRET du projet

Supabase Dashboard → **Project Settings** → **API** → section **JWT Settings** → copier la valeur **JWT Secret**.

> ⚠️ Ce secret est différent de la clé `service_role`. Le garder strictement confidentiel.

### 3. Générer le JWT IWOK

Dans le repo IWOK :

```bash
SUPABASE_JWT_SECRET="<le-secret-de-l-etape-2>" node scripts/generate-iwok-jwt.mjs
```

Le script affiche un JWT de la forme `eyJhbGciOi...`. C'est ta nouvelle clé d'app.

### 4. Mettre à jour les env vars

**Local** (`.env.local`) :

```env
SUPABASE_URL=https://xxxxxxxx.supabase.co
IWOK_DB_KEY=<le-jwt-genere-en-3>
REVALIDATE_SECRET=<inchangé>
```

Tu peux supprimer `SUPABASE_SERVICE_ROLE_KEY` de `.env.local`.

**Vercel** → Project IWOK → Settings → Environment Variables :
- Ajouter `IWOK_DB_KEY` avec la valeur du JWT
- Garder temporairement `SUPABASE_SERVICE_ROLE_KEY` (rollback possible)

### 5. Tester en local

```bash
npm run dev
```

Naviguer sur la home, le portfolio, les pages services/à-propos. Toutes les données dynamiques (projets, témoignages, services, sections CMS) doivent s'afficher comme avant.

Si une requête échoue avec `permission denied for table xxx`, c'est que la table n'a pas été couverte par le `GRANT` (cf. SQL migration : la boucle traite tout `iwok_*`). Vérifier que la table commence bien par `iwok_`.

### 6. Déployer

Push sur main (ou créer une PR). Tester sur le preview Vercel avant de merger.

### 7. Une fois validé en prod

- Supprimer la variable `SUPABASE_SERVICE_ROLE_KEY` côté Vercel IWOK
- **Régénérer la clé `service_role` côté Supabase** (Settings → API → "Reset service_role key") puisqu'elle a été exposée à l'environnement IWOK auparavant. Mettre à jour les autres apps qui l'utilisent (dashboard MGF) avec la nouvelle clé.

---

## Rollback

Si quelque chose se passe mal en prod :

1. Restaurer `SUPABASE_SERVICE_ROLE_KEY` dans Vercel
2. Modifier temporairement `lib/supabase.ts` pour repointer sur `SUPABASE_SERVICE_ROLE_KEY`
3. Re-déployer

Pour réverter complètement la migration SQL :

```sql
DROP OWNED BY iwok_app;
DROP ROLE IF EXISTS iwok_app;
```

> Attention : `DROP OWNED BY` retire les politiques `iwok_app_full_access` créées sur les tables. Les RLS restent activées sans politique (état d'origine). Aucune donnée perdue.

---

## Limitations connues

- L'isolation est **logique** (au niveau Postgres roles), pas **physique**. Un incident global Supabase ou une compromission du compte agence Supabase impacte les deux clients.
- La rotation du JWT IWOK nécessite de regénérer le token (script) et de mettre à jour Vercel. Pas de rotation automatique.
- Si on ajoute de nouvelles tables `iwok_*` ou de nouvelles RPC, il faut leur ajouter les `GRANT` correspondants. La migration peut être rejouée (idempotente) pour les tables ; pour les RPC il faut éditer le SQL.

---

## Pour aller plus loin (futur)

Le jour où le budget le permet, créer un projet Supabase distinct pour IWOK reste l'option la plus propre (isolation physique, quotas séparés, blast radius minimal). Voir l'historique de ce document pour la procédure de séparation en 2 projets.
