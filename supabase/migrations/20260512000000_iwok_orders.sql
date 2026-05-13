-- ---------------------------------------------------------------------------
-- T10 — Shop e-commerce IWOK : tables commandes + frais de port produits
-- ---------------------------------------------------------------------------
-- Applique via SQL Editor Supabase (project partagé MGF/IWOK).
-- Idempotent : utilise CREATE TABLE IF NOT EXISTS + ADD COLUMN IF NOT EXISTS.
-- ---------------------------------------------------------------------------

-- 0. Ajouter la colonne frais de port sur les produits
--    (shipping_cost_cents : frais refacturés au client, saisis par Guillaume par produit)
ALTER TABLE public.iwok_shop_products
  ADD COLUMN IF NOT EXISTS shipping_cost_cents INTEGER NOT NULL DEFAULT 0;

-- ---------------------------------------------------------------------------
-- 1. Table des commandes
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.iwok_orders (
  id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Client (commande invitée, pas de compte)
  customer_email          TEXT        NOT NULL,
  customer_name           TEXT        NOT NULL,
  customer_phone          TEXT,
  -- Adresse de livraison (collectée par Stripe Checkout)
  shipping_line1          TEXT        NOT NULL,
  shipping_line2          TEXT,
  shipping_postal_code    TEXT        NOT NULL,
  shipping_city           TEXT        NOT NULL,
  shipping_country        TEXT        NOT NULL DEFAULT 'FR',
  -- Prix
  subtotal_cents          INTEGER     NOT NULL,
  shipping_cost_cents     INTEGER     NOT NULL DEFAULT 0,
  total_cents             INTEGER     NOT NULL,
  currency                TEXT        NOT NULL DEFAULT 'EUR',
  -- Stripe
  stripe_session_id       TEXT        UNIQUE,
  stripe_payment_intent_id TEXT,
  -- Statut
  status                  TEXT        NOT NULL DEFAULT 'pending'
    CHECK (status IN (
      'pending',     -- session Stripe ouverte, paiement pas encore confirmé
      'paid',        -- paiement confirmé par webhook Stripe
      'preparing',   -- Guillaume prépare le colis
      'shipped',     -- expédié, numéro de suivi renseigné
      'delivered',   -- livré
      'cancelled',   -- annulé
      'refunded'     -- remboursé via Stripe
    )),
  -- Livraison
  shipping_carrier        TEXT,
  shipping_tracking_number TEXT,
  shipping_tracking_url   TEXT,
  notes                   TEXT,
  -- Timestamps
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at                 TIMESTAMPTZ,
  shipped_at              TIMESTAMPTZ,
  delivered_at            TIMESTAMPTZ
);

-- ---------------------------------------------------------------------------
-- 2. Table des lignes de commande (snapshot produit au moment de l'achat)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.iwok_order_items (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID    NOT NULL REFERENCES public.iwok_orders(id) ON DELETE CASCADE,
  product_id  UUID    REFERENCES public.iwok_shop_products(id) ON DELETE SET NULL,
  -- Snapshot : garde le prix/titre même si Guillaume modifie le produit ensuite
  title       TEXT    NOT NULL,
  slug        TEXT    NOT NULL,
  price_cents INTEGER NOT NULL,
  quantity    INTEGER NOT NULL DEFAULT 1,
  image_url   TEXT
);

-- ---------------------------------------------------------------------------
-- 3. Index utiles
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS iwok_orders_status_idx
  ON public.iwok_orders (status, created_at DESC);

CREATE INDEX IF NOT EXISTS iwok_orders_email_idx
  ON public.iwok_orders (customer_email);

CREATE INDEX IF NOT EXISTS iwok_order_items_order_idx
  ON public.iwok_order_items (order_id);

-- ---------------------------------------------------------------------------
-- 4. RLS (obligatoire — cohérent avec les autres tables iwok_*)
-- ---------------------------------------------------------------------------
ALTER TABLE public.iwok_orders      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iwok_order_items ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- 5. GRANTs au rôle iwok_app + policies
--    Le rôle iwok_app est créé par la migration côté client-iwok.
--    Ce bloc est idempotent (DROP POLICY IF EXISTS avant CREATE).
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_roles WHERE rolname = 'iwok_app') THEN
    -- iwok_orders
    EXECUTE 'GRANT SELECT, INSERT, UPDATE ON public.iwok_orders TO iwok_app';
    EXECUTE 'DROP POLICY IF EXISTS iwok_app_full_access ON public.iwok_orders';
    EXECUTE 'CREATE POLICY iwok_app_full_access ON public.iwok_orders '
            'FOR ALL TO iwok_app USING (true) WITH CHECK (true)';

    -- iwok_order_items
    EXECUTE 'GRANT SELECT, INSERT, UPDATE ON public.iwok_order_items TO iwok_app';
    EXECUTE 'DROP POLICY IF EXISTS iwok_app_full_access ON public.iwok_order_items';
    EXECUTE 'CREATE POLICY iwok_app_full_access ON public.iwok_order_items '
            'FOR ALL TO iwok_app USING (true) WITH CHECK (true)';

    -- Frais de port sur les produits (colonne déjà accordée via iwok_shop_products)
    -- Pas besoin de GRANT supplémentaire : le GRANT SELECT/INSERT/UPDATE/DELETE
    -- sur iwok_shop_products existe déjà (migration 057_iwok_shop_products).
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- 6. Commentaires
-- ---------------------------------------------------------------------------
COMMENT ON TABLE public.iwok_orders IS
  'Commandes e-commerce IWOK. Créées au moment du checkout Stripe (status=pending), '
  'passées à paid via webhook. Guillaume gère le suivi depuis /portal/commandes.';

COMMENT ON TABLE public.iwok_order_items IS
  'Lignes de commande IWOK. Snapshot du produit (titre, prix) au moment de l''achat '
  'pour que la facture reste exacte même après modification du catalogue.';

COMMENT ON COLUMN public.iwok_shop_products.shipping_cost_cents IS
  'Frais de port refacturés au client pour ce produit (en centimes). '
  'Guillaume saisit ce montant dans le dashboard selon le format/poids de la pièce. '
  '0 = livraison offerte ou sur devis.';

-- ---------------------------------------------------------------------------
-- Vérification (à exécuter manuellement après la migration)
-- ---------------------------------------------------------------------------
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public' AND table_name LIKE 'iwok_%'
-- ORDER BY table_name;
