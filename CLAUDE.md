# IWOK - Site Muraliste

Site vitrine pour IWOK (GuiHome Décoration), artiste muraliste / designer mural professionnel.

## Statut

| Champ | Valeur |
|-------|--------|
| **Priorité** | P2 |
| **Type** | Site vitrine artiste / portfolio |
| **Pipeline** | B02-Homepage (prochaine) |
| **Client** | Guillaume Jeanjean — IWOK / GuiHome Décoration |

## Identité Client

**IWOK / GuiHome Décoration**
- **Artiste** : Guillaume Jeanjean
- **Métier** : Designer mural / Graffeur professionnel (+15 ans)
- **Localisation** : 15 rue Bellevue, 12510 Olemps (Aveyron) — aussi référencé à Clohars-Fouesnant (29950)
- **SIRET** : 812 130 086 00018
- **Site actuel** : guihomedecoration.com
- **Instagram** : @guihomefresquesmurales / @guihomedesignmural (749 abonnés)

## Services

- Fresques murales intérieures et extérieures
- Design mural sur mesure
- Décoration peinte (tous supports)
- Animation événementielle (live painting)
- Peinture sur véhicules, containers, supports atypiques

## Clientèle

Particuliers, professionnels, clubs sportifs, associations, municipalités, collectivités, campings, aéroports, salles de spectacle.

## Assets Disponibles

```
pipeline/input/assets/
├── entreprises collectivitées/  # Photos projets entreprises/collectivités
├── événementiel expo/           # Photos événementiel et expositions
├── participatif/                # Photos projets participatifs
├── particuliers/                # Photos projets particuliers
└── portrait/                    # Photos portrait artiste
```

## Éléments Manquants (À Confirmer)

| Élément | Statut |
|---------|--------|
| Logo / fichiers sources (AI, SVG, PNG HD) | À confirmer |
| Charte graphique / couleurs de marque | À confirmer |
| Ton éditorial (tutoiement/vouvoiement) | À confirmer |
| Photos HD portfolio | Dossiers existants, qualité à vérifier |
| Textes de présentation validés | À confirmer |
| Témoignages clients | À confirmer |
| Vidéos (timelapse, etc.) | À confirmer |
| Nom de domaine (guihomedecoration.com) | Existant, accès registrar à confirmer |
| Sites d'inspiration | À confirmer |

## Pipeline

| Étape | Stage | Status | Output |
|-------|-------|--------|--------|
| A01 | Init | ✅ | `pipeline/output/00-brief.md` |
| A02 | Brand | ✅ | `pipeline/output/01-brand/` |
| A03 | Art Direction | ✅ | `pipeline/output/02-art-direction/` |
| A04 | Structure | ✅ | `pipeline/output/03-sitemap.md` |
| A05 | Wireframes | ✅ | `pipeline/output/03.5-wireframes/` |
| A06 | Design Tokens | ✅ | `app/globals.css` |
| B01 | Layout | ✅ | `components/layout/` |
| B02 | Homepage | ✅ | `components/sections/` + `app/page.tsx` |
| B03 | Pages | ✅ | `app/[pages]/` (portfolio, services, shop, a-propos, contact) |
| B04 | Polish | ✅ | Animations + SEO + a11y + sécurité headers |
| B05 | Validate | ✅ | Tests prod, isolation Supabase |
| B06 | Deploy | ✅ | guihomedecoration.com en prod |
| B07 | CMS | ✅ | 100% des sections éditables depuis le portail Guillaume |
| B08 | Shop e-commerce | ⬜ | Cf. `docs/task-prompts/T10-shop-ecommerce.md` |

## Architecture e-commerce (état actuel)

**Côté DB** (Supabase, projet partagé avec MGF, rôle `iwok_app` isolé) :
- `iwok_shop_products` — products with `published`, `price_cents`, `image_url`, etc.
- `iwok_settings.shop_visibility` — toggle global du shop sur le site
- ⚠️ Pas encore de table orders, customers, line_items

**Côté site (`client-iwok`)** :
- `/shop` lit `iwok_shop_products WHERE published = true`
- Bouton "Commander" actuellement → `/contact?from=shop&product={slug}` (juste un lead, pas un achat)
- Pas de checkout, pas de Stripe, pas de panier

**Côté dashboard (`neurolia-dashboard`)** :
- `/portal/editeur` onglet Shop : CRUD complet sur produits + toggle Publier/Masquer
- Pas d'onglet Commandes/Orders

## Intégrations en place

- **Supabase** : DB + Storage (images shop uploadées via dashboard)
- **Brevo** : email transactionnel (formulaire contact). `BREVO_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- **Vercel** : hébergement + ISR + cron via revalidate
- **Cloudflare** : DNS + email routing pour `contact@guihome-art.com`

**Pas encore** : Stripe / SumUp / PayPal, intégration carrier (Colissimo / Mondial Relay)

## Conventions UI

### Bouton principal : `.cta-primary`
La classe `.cta-primary` (définie dans `globals.css`) est le **bouton standard** du site. Il DOIT être utilisé pour toute action principale : navbar, hero, CTA de section, formulaires de contact/devis. Ne jamais créer de bouton primaire avec des styles inline — toujours utiliser `.cta-primary`.

## Commandes

```bash
/apex -a -s exécuter A01-init depuis pipeline/stages/A01-init.md
/apex -a -s exécuter A02-brand depuis pipeline/stages/A02-brand.md
/apex -a -s exécuter A03-art-direction depuis pipeline/stages/A03-art-direction.md
```

## Contexte Stratégique

- **Enjeu** : Portfolio immersif mettant en valeur 15 ans de créations murales
- **Approche** : Mobile-first (trafic venant des réseaux sociaux)
- **KPI** : Génération de leads (demandes de devis)
- **Différenciation** : Storytelling du parcours graffiti → design mural pro

---

*Dernière mise à jour : 2026-05-11 (site en prod, 100% éditable via portail, prochaine étape : shop e-commerce — cf. `docs/task-prompts/T10-shop-ecommerce.md`)*
