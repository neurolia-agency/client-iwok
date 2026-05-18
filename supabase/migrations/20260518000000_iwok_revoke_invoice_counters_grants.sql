-- Le rôle iwok_app n'a pas besoin d'accès direct à iwok_invoice_counters.
-- L'attribution du numéro de facture passe exclusivement par la fonction
-- SECURITY DEFINER public.assign_iwok_invoice_number(p_order_id uuid)
-- (owner postgres, search_path=public).
--
-- On retire les grants inutiles pour réduire la surface d'attaque côté rôle
-- applicatif (defense in depth). Appliquée en prod via MCP le 2026-05-18.
REVOKE INSERT, SELECT, UPDATE ON public.iwok_invoice_counters FROM iwok_app;
