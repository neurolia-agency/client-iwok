-- ---------------------------------------------------------------------------
-- Rôle Postgres dédié IWOK
-- ---------------------------------------------------------------------------
-- But : isoler l'app IWOK des autres tables hébergées sur le même projet
-- Supabase (notamment celles du dashboard MGF). Cette migration crée un rôle
-- `iwok_app` qui n'a accès QU'AUX tables `iwok_*` et à la fonction RPC
-- `increment_project_likes`.
--
-- L'app IWOK utilisera un JWT signé avec ce rôle, à la place de la clé
-- service_role globale. Si ce JWT fuite, l'attaquant n'aura accès qu'aux
-- 7 tables IWOK — les données MGF restent protégées.
--
-- À exécuter UNE FOIS via le SQL Editor du projet Supabase.
-- ---------------------------------------------------------------------------

-- 1. Création du rôle (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'iwok_app') THEN
    CREATE ROLE iwok_app NOLOGIN;
  END IF;
END $$;

-- 2. Le rôle doit être assumable par PostgREST via JWT
GRANT iwok_app TO authenticator;

-- 3. Permissions au niveau schéma
GRANT USAGE ON SCHEMA public TO iwok_app;

-- 4. Permissions sur les tables iwok_* (CRUD complet) + politiques RLS
--    Comme RLS est activée sans politique sur ces tables, on doit créer une
--    politique permissive pour le rôle iwok_app afin qu'il puisse lire/écrire.
--    Le rôle ne pouvant accéder qu'aux tables iwok_*, l'isolation reste totale.
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
      AND tablename LIKE 'iwok_%'
  LOOP
    -- GRANTs au niveau table
    EXECUTE format(
      'GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO iwok_app',
      r.tablename
    );

    -- Drop la politique si elle existe déjà (rejoue idempotent)
    EXECUTE format(
      'DROP POLICY IF EXISTS iwok_app_full_access ON public.%I',
      r.tablename
    );

    -- Politique permissive scoped au rôle iwok_app uniquement
    EXECUTE format(
      'CREATE POLICY iwok_app_full_access ON public.%I '
      || 'FOR ALL TO iwok_app USING (true) WITH CHECK (true)',
      r.tablename
    );
  END LOOP;
END $$;

-- 5. Permissions sur les séquences iwok_* (pour les INSERT avec id auto-incrémenté)
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT sequence_name
    FROM information_schema.sequences
    WHERE sequence_schema = 'public'
      AND sequence_name LIKE 'iwok_%'
  LOOP
    EXECUTE format(
      'GRANT USAGE, SELECT, UPDATE ON public.%I TO iwok_app',
      r.sequence_name
    );
  END LOOP;
END $$;

-- 6. Permission sur la RPC `increment_project_likes`
--    Si la fonction porte plusieurs signatures, ajuster en spécifiant les types.
GRANT EXECUTE ON FUNCTION public.increment_project_likes TO iwok_app;

-- 7. Vérification : lister ce qui est accessible au rôle iwok_app
--    (à exécuter manuellement après la migration pour valider)
-- SELECT table_schema, table_name, privilege_type
-- FROM information_schema.role_table_grants
-- WHERE grantee = 'iwok_app'
-- ORDER BY table_name;

COMMENT ON ROLE iwok_app IS
  'Rôle dédié à l''app site vitrine IWOK. Accès limité aux tables iwok_* '
  'et à la RPC increment_project_likes. Utilisé via JWT signé avec '
  'role: "iwok_app". Voir docs/supabase-isolation-migration.md.';
