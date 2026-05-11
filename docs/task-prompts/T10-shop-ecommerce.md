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

## Décisions à prendre avec le client (Guillaume) AVANT de coder

1. **Provider de paiement**
   - **Recommandé : Stripe Checkout** (pré-built UI, Apple Pay/Google Pay/CB, ~1.4% + 0.25€ EU, dashboard solide)
   - Alternatives FR : SumUp, Mollie. Stripe est mieux documenté côté webhooks et le plus mature.
   - Question Guillaume : a-t-il déjà un compte Stripe ? IBAN où recevoir les fonds ?

2. **Catalogue : panier ou achat direct ?**
   - **Option A — Achat direct** (pas de panier) : depuis la page produit, "Acheter maintenant" → Stripe Checkout (1 produit / commande). Plus simple, suffit pour des œuvres uniques.
   - **Option B — Panier** : "Ajouter au panier" + page /panier + checkout multi-items.
   - Pour un artiste qui vend surtout des pièces uniques (toiles, originaux), **option A** suffit largement. Option B utile seulement si vente fréquente de prints + stickers ensemble.

3. **Livraison**
   - Phase 1 — **Manuel** : Guillaume saisit transporteur + n° de suivi dans son dashboard quand il expédie. Email auto envoyé au client avec le lien de suivi.
   - Phase 2 (plus tard) — Intégration Mondial Relay / Colissimo (calcul auto des frais selon poids/zone, étiquette PDF générée).
   - Pour démarrer : frais de port = forfait simple par produit (champ `shipping_cost_cents` sur produits) ou globalement (setting `shop_shipping_cost_cents`).

4. **Stock**
   - Le champ `stock` existe déjà (NULL = illimité). Quand commande payée → décrément. Quand stock à 0 → produit auto-dépublié OU affiché "Indisponible".

5. **Conditions de vente / RGPD**
   - Page `/cgv` à créer (Guillaume doit fournir les CGV ou utiliser un template type Beaubourg/legal-by-design).
   - Cookie consent à ajouter ? (déjà ajouté ? — vérifier `app/layout.tsx`)

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

**Avant tout coder** : poser ces 5 questions à Guillaume et avoir des réponses fermes :
1. Tu as un compte Stripe ? Sinon, on en crée un ensemble.
2. IBAN où recevoir les paiements ?
3. Tu envoies via quel transporteur principal (Colissimo, Mondial Relay) ?
4. Frais de port : forfait fixe par commande (genre 12€) ou variable selon produit ?
5. Tu as des CGV ou on utilise un template ?

Puis on commence par la migration SQL + une page produit basique + un seul scénario d'achat de bout en bout. Le reste se construit par-dessus une fois ce squelette validé.

## Prompt direct pour la session suivante

```
Continue T10 — shop e-commerce complet (voir docs/task-prompts/T10-shop-ecommerce.md).

Démarre par :
1. Lire le doc T10 entièrement
2. Lire CLAUDE.md pour l'état actuel
3. Poser les 5 questions au client (ou je te donne les réponses si je les ai)
4. Une fois les décisions prises, attaquer la migration SQL puis la page /shop/[slug]

Ne pas pousser sur main avant que la migration SQL ne soit appliquée
sur Supabase (sinon le build casse en prod). Travailler sur une branche
`feature/shop-ecommerce` que je merge quand tout est testé.
```
