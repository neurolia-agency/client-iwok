# T10 — Shop e-commerce complet (commande, paiement, livraison, emails)

## Objectif

Transformer le shop actuel (vitrine + lead via `/contact?from=shop`) en un
vrai parcours d'achat de bout en bout : un client choisit une œuvre, la
paie en ligne, reçoit un email de confirmation, suit la livraison, reçoit
un email à l'expédition. Guillaume voit les commandes dans son portail,
saisit le numéro de suivi quand il expédie.

## Contexte (à lire avant tout)

- Repo site : `/Users/dorian.gz/dev/Neurolia Agency/client-iwok`
- Repo dashboard : `/Users/dorian.gz/dev/Neurolia Agency/neurolia-dashboard`
- Sites en prod : `guihomedecoration.com` (front), portail Guillaume = `/portal/editeur` dans neurolia-dashboard
- Stack site : Next.js 15 App Router + Supabase + Vercel + Brevo (emails) + Cloudflare (DNS)
- Isolation Supabase : rôle `iwok_app` (cf. `docs/supabase-isolation-migration.md`)
- Shop actuel : Supabase `iwok_shop_products`, géré 100% depuis le portail Guillaume
- Pas encore de Stripe / commandes / panier

## État actuel du shop

| Élément | Statut |
|---|---|
| Table `iwok_shop_products` | ✅ existe (id, slug, title, description, price_cents, image_url, stock, published, ...) |
| Dashboard CRUD produits + upload image | ✅ /portal/editeur onglet Shop |
| Toggle global "Publier le shop" | ✅ setting `shop_visibility.enabled` |
| Page `/shop` lit Supabase | ✅ filtre `published = true` |
| Bouton "Commander" actuel | ➜ `/contact?from=shop&product={slug}` (juste un lead) |
| Paiement / panier / orders | ❌ Rien |
| Email transactionnel | ✅ Brevo configuré (form contact), réutilisable |

## Décisions client — RÉPONSES de Guillaume (2026-05-11)

| # | Question | Réponse | Implication |
|---|---|---|---|
| 1 | Compte Stripe ? | **À créer ensemble** | Première étape : créer compte Stripe avec SIRET 812 130 086 00018 + email contact@guihome-art.com. Activer le mode test pendant le dev, switch en live au moment du go-live. |
| 2 | IBAN où recevoir | **Joris donnera plus tard** | Pas bloquant : Stripe accepte de créer le compte avec IBAN renseigné après. À demander à Guillaume avant le passage en live. |
| 3 | Transporteur | **Le plus rentable, comparer** | Voir section "Choix transporteur" ci-dessous. Recommandation à présenter avant intégration. |
| 4 | Frais de port | **Variable** | Pas de forfait global. 2 options : (a) `shipping_cost_cents` par produit (simple, Guillaume estime à la main par pièce) ou (b) calcul par poids/zone (plus juste mais nécessite carrier API). On démarre par (a). |
| 5 | CGV | **À créer** | Template + adaptation au cas IWOK. Voir section "CGV à rédiger" ci-dessous. |

### Choix transporteur (à présenter au client)

Pour des œuvres d'art (toiles, prints, originaux) en France :

| Transporteur | Tarif indicatif | Pour | Contre |
|---|---|---|---|
| **Mondial Relay** | 4-8€ point relais | Le moins cher, suivi correct | Client doit aller en relais, pas de domicile, fragile mal indiqué |
| **Colissimo** | 7-12€ domicile | Marque reconnue La Poste, livraison domicile, assurance simple | Plus cher, peut être lent |
| **Chronopost** | 15-25€ | Express 24h, suivi fin, manipulation soignée | Très cher, sur-dimensionné pour la plupart des œuvres |
| **GLS** | 8-14€ | Bon compromis pour œuvres fragiles | Moins répandu côté grand public |

**Recommandation** : démarrer avec **Colissimo** (domicile, marque, assurance jusqu'à 23€ inclus, possibilité d'envoyer en relais aussi via "Colissimo retour"). Frais variables par produit (Guillaume saisit le coût en fonction de la pièce). Plus tard, intégrer l'API Boxtal qui agrège plusieurs carriers (devis multi-transporteurs auto).

### CGV à rédiger

À créer dans `app/cgv/page.tsx`. Contenu minimum requis (CGV B2C en France) :

1. **Identité du vendeur** : Guillaume Jeanjean, SIRET 812 130 086 00018, 15 rue Bellevue 12510 Olemps
2. **Produits** : œuvres d'art originales, prints, stickers
3. **Prix** : TTC en euros, frais de port en supplément, mode de calcul
4. **Commande** : process, validation par paiement
5. **Paiement** : Stripe (CB, Apple Pay, Google Pay), 3-D Secure
6. **Livraison** : transporteur, délais 5-10 jours ouvrés, zone France métropolitaine (préciser si UE/monde)
7. **Droit de rétractation** : 14 jours, sauf œuvres personnalisées sur commande (article L221-28 du Code de la consommation)
8. **Garanties** : conformité, vices cachés
9. **SAV** : email contact@guihome-art.com
10. **Litiges** : droit français, médiation conso (FEVAD ou autre)
11. **Données personnelles** : RGPD, finalités, conservation, droits

Template à utiliser pour gagner du temps :
- https://www.donnees-rgpd.fr/cgv-generator (gratuit, template français)
- Ou rédigeons-le manuellement à partir de la liste ci-dessus + revue rapide.

### Autres décisions (faites par défaut, à valider en passant)

- **Panier ou achat direct ?** → **Achat direct** (1 produit = 1 commande). Plus simple, suffit pour des œuvres uniques. Si Guillaume veut vendre des packs (sticker + print ensemble), on basculera plus tard.
- **Stock concurrence** : sur paiement Stripe, on vérifie stock avant de marquer payé. Si rupture détectée pendant le checkout, on refund automatiquement et on informe le client.
- **Cookie consent** : Stripe Checkout est hébergé chez eux (checkout.stripe.com), pas de cookies tiers chez nous. Pas besoin de banner pour le shop seul. À vérifier si on ajoute Google Analytics plus tard.

## Architecture proposée

### Côté DB (nouvelles tables Supabase)

```sql
-- Migration : supabase/migrations/20260512000000_iwok_orders.sql

CREATE TABLE iwok_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Référence client (compte ou commande invité)
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  -- Adresse livraison
  shipping_line1 TEXT NOT NULL,
  shipping_line2 TEXT,
  shipping_postal_code TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_country TEXT NOT NULL DEFAULT 'FR',
  -- Pricing
  subtotal_cents INTEGER NOT NULL,
  shipping_cost_cents INTEGER NOT NULL DEFAULT 0,
  total_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  -- Stripe
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  -- État
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending',      -- créé, paiement en attente (Stripe Checkout ouvert)
    'paid',         -- paiement confirmé (webhook Stripe)
    'preparing',    -- Guillaume prépare
    'shipped',      -- expédié + tracking renseigné
    'delivered',    -- livré (auto via carrier API ou manuel)
    'cancelled',    -- annulé (rembourser via Stripe à part)
    'refunded'      -- remboursé
  )),
  -- Livraison
  shipping_carrier TEXT,        -- "Colissimo", "Mondial Relay", "Chronopost"...
  shipping_tracking_number TEXT,
  shipping_tracking_url TEXT,   -- URL directe de tracking (carrier ou laposte)
  notes TEXT,                   -- mémo interne Guillaume
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);

CREATE TABLE iwok_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES iwok_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES iwok_shop_products(id) ON DELETE SET NULL,
  -- Snapshot (pour que la facture reste correcte même si Guillaume modifie le produit ensuite)
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  image_url TEXT
);

-- GRANTs au rôle iwok_app
GRANT SELECT, INSERT, UPDATE ON iwok_orders TO iwok_app;
GRANT SELECT, INSERT, UPDATE ON iwok_order_items TO iwok_app;
ALTER TABLE iwok_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE iwok_order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY iwok_app_full_access ON iwok_orders FOR ALL TO iwok_app USING (true) WITH CHECK (true);
CREATE POLICY iwok_app_full_access ON iwok_order_items FOR ALL TO iwok_app USING (true) WITH CHECK (true);
```

### Côté site (`client-iwok`)

**Nouvelles pages** :
- `app/shop/[slug]/page.tsx` — page produit (galerie + description + bouton acheter)
- `app/shop/commande/[id]/page.tsx` — confirmation après paiement (lit par `stripe_session_id`)

**Nouvelles routes API** :
- `POST /api/shop/checkout` — crée la session Stripe Checkout, retourne URL de redirect
- `POST /api/shop/webhook-stripe` — webhook Stripe `checkout.session.completed` → marque order `paid`, décrémente stock, envoie email confirmation, notifie Guillaume
- (optionnel) `POST /api/shop/webhook-carrier` — webhook carrier pour passage à `delivered`

**Env vars à ajouter (Vercel)** :
- `STRIPE_SECRET_KEY` — clé secrète Stripe
- `STRIPE_WEBHOOK_SECRET` — secret signature webhook
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — clé publique pour la page produit

### Côté dashboard (`neurolia-dashboard`)

**Nouvelles pages** :
- `app/portal/commandes/page.tsx` — liste des commandes (badge statut, total, date, action)
- `app/portal/commandes/[id]/page.tsx` — détail commande (items, adresse, statut, formulaire tracking)
- + alias /dashboard/iwok/commandes côté agence

**Actions** :
- `markOrderAsShipped(orderId, carrier, trackingNumber, trackingUrl)` — passe status à `shipped`, déclenche email expédition au client
- `markOrderAsDelivered(orderId)` — manuel ou auto

### Emails Brevo (templates HTML à créer)

1. **Confirmation commande** (déclenché par webhook Stripe)
   - Au client : récap commande + N° + délai annoncé
   - À Guillaume : notification nouvelle commande + lien vers /portal/commandes
2. **Expédition** (déclenché par Guillaume dans dashboard)
   - Au client : colis envoyé via X, N° de suivi cliquable
3. **Livraison** (manuel ou auto carrier)
   - Au client : "Votre colis est arrivé, on espère qu'il vous plaît !" + invitation à laisser un avis

## Pages et flow utilisateur

### Parcours achat

```
1. Client browse /shop → voit les produits publiés
2. Clique sur un produit → /shop/[slug] (page détail : galerie, description, prix, "Acheter")
3. Clique "Acheter" → /api/shop/checkout crée la session Stripe → redirige vers checkout.stripe.com
4. Client saisit infos paiement + adresse de livraison (Stripe gère)
5. Paiement OK → Stripe redirige vers /shop/commande/[id]?session_id=cs_xxx
6. Page commande affiche "Merci, commande #1234 confirmée"
7. Stripe webhook → notre /api/shop/webhook-stripe → order status=paid, email confirmation envoyé
8. Plus tard : Guillaume voit commande dans /portal/commandes, prépare, expédie, ajoute tracking → email expédition envoyé
```

### Côté Guillaume

```
1. /portal/commandes → liste des commandes avec filtre par statut
2. Clic sur une commande → détail (items, adresse, total, paiement)
3. Bouton "Marquer comme expédié" → modal demande transporteur + n° suivi → enregistre + envoie email auto
4. Stat dashboard : CA mensuel, nb commandes, panier moyen, top produits
```

## Étapes d'implémentation (ordre recommandé)

1. **Décisions client** (Guillaume) — Stripe ? Frais de port ? CGV ?
2. **Migration SQL** — tables `iwok_orders`, `iwok_order_items` + GRANTs (`supabase/migrations/20260512000000_iwok_orders.sql`)
3. **Page produit** `/shop/[slug]/page.tsx` — galerie photo (multi-images à ajouter à `iwok_shop_products` si besoin), bouton Acheter
4. **Setup Stripe** — compte + Connect (pour les fonds), webhook endpoint
5. **API checkout** `/api/shop/checkout` — crée Stripe Session avec line_items, return_url
6. **API webhook** `/api/shop/webhook-stripe` — vérifie signature, marque order paid, envoie email, décrémente stock
7. **Page confirmation** `/shop/commande/[id]/page.tsx`
8. **Email templates Brevo** (3) — confirmation, expédition, livraison
9. **Dashboard commandes** — `/portal/commandes` (liste + détail + actions)
10. **Tests e2e** : passer une commande de bout en bout avec carte test Stripe `4242 4242 4242 4242`

## Pièges anticipés

- **CSP** : le site a une CSP stricte. Stripe Checkout redirige sur `checkout.stripe.com` mais charge aussi `js.stripe.com` côté nous. Ajouter ces domaines dans la CSP `script-src`, `frame-src`, `connect-src`.
- **Webhook Stripe** : vérifier la signature avec `stripe.webhooks.constructEvent`. Sinon n'importe qui peut faire un POST et marquer une commande payée.
- **Idempotence** : Stripe peut réenvoyer un webhook plusieurs fois. Stocker `stripe_session_id` en UNIQUE + check si déjà `paid` avant de re-déclencher email.
- **Email confirmation à Guillaume** : utiliser `CONTACT_TO_EMAIL` (déjà configuré) ou nouvelle env `ORDERS_NOTIFICATION_EMAIL`.
- **Stock concurrence** : si 2 clients achètent en même temps le dernier exemplaire, l'un des 2 doit échouer. Gérer via la query SQL (update conditionnel).
- **GDPR** : page CGV + mentions données perso. Stripe est conforme côté lui, mais on stocke email + adresse en clair dans `iwok_orders`.
- **Cookie consent** : si Stripe injecte des cookies tiers (analytics Stripe), il faut un consent banner. À vérifier.

## Premier focus de la prochaine session

Les décisions client sont prises (voir tableau plus haut). On démarre directement :

### Étape 1 — Setup Stripe (~30 min, avec Joris)

1. Créer compte Stripe sur https://dashboard.stripe.com/register avec email `contact@guihome-art.com`
2. Renseigner SIRET `812 130 086 00018` et identité Guillaume Jeanjean
3. Laisser IBAN vide pour l'instant (Joris fournira plus tard) — Stripe accepte
4. Activer le **mode Test** (toggle en haut à droite du dashboard)
5. Récupérer 3 clés à mettre dans Vercel :
   - `STRIPE_SECRET_KEY` (sk_test_...) côté server
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_test_...) côté browser
   - `STRIPE_WEBHOOK_SECRET` (whsec_...) — généré quand on enregistre l'endpoint webhook (étape 4)

### Étape 2 — Migration SQL (Supabase)

Créer `supabase/migrations/20260512000000_iwok_orders.sql` avec :
- Table `iwok_orders` (cf. section "Côté DB")
- Table `iwok_order_items`
- GRANTs au rôle `iwok_app`
- RLS + policies

Appliquer manuellement via SQL Editor Supabase. Vérifier les permissions avec la query info_schema.

### Étape 3 — Page produit + checkout

1. Brancher `app/shop/[slug]/page.tsx` (galerie + titre + prix + bouton Acheter)
2. Créer `app/api/shop/checkout/route.ts` qui crée la Stripe Session avec frais de port variables
3. Tester en local avec `4242 4242 4242 4242` (carte test Stripe)

### Étape 4 — Webhook + emails

1. Créer `app/api/shop/webhook-stripe/route.ts` (vérifier signature, marquer paid, décrément stock)
2. Côté Stripe : Dashboard → Developers → Webhooks → Add endpoint → URL `https://guihomedecoration.com/api/shop/webhook-stripe` → event `checkout.session.completed`
3. Récupérer le webhook secret → l'ajouter dans Vercel env vars
4. Templates Brevo : confirmation client + notif Guillaume

### Étape 5 — Dashboard portail

Onglet "Commandes" dans `/portal/editeur` : liste + détail + bouton "Marquer comme expédié" (modal carrier + tracking).

### Étape 6 — CGV + go-live

1. Créer `app/cgv/page.tsx` avec contenu CGV (cf. section "CGV à rédiger")
2. Lien CGV dans le footer + checkbox d'acceptation au moment du checkout
3. Switch Stripe Mode → Live
4. Mettre les vraies clés (sk_live_, pk_live_, whsec_) dans Vercel
5. Test final en prod avec une vraie petite commande

## Prompt direct pour la session suivante

```
Continue T10 — shop e-commerce complet (voir docs/task-prompts/T10-shop-ecommerce.md).

Les 5 décisions client sont prises (voir tableau dans T10).
Démarre par :
1. Lire entièrement docs/task-prompts/T10-shop-ecommerce.md
2. Lire CLAUDE.md pour l'état actuel
3. M'aider à créer le compte Stripe (étape 1 du "Premier focus")
4. Une fois les 3 clés Stripe récupérées et mises dans Vercel,
   appliquer la migration SQL (étape 2)
5. Coder la page produit + checkout (étape 3)

Branche : feature/shop-ecommerce (ne pas push sur main avant validation).
Mode Stripe : test au début, switch en live à la toute fin.
```
