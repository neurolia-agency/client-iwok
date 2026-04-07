# TODO — IWOK

<!-- neurolia-sync -->
<!-- project: client-iwok -->

> IWOK — Site Muraliste (Guillaume Jeanjean / GuiHome Decoration)
> Derniere mise a jour : 2026-04-07

---

## Phase A — Architecture
<!-- workstream: phase-a-architecture -->

<!-- programme: Pipeline -->
- [x] A01 Init — Brief client restructure <!-- p:normal a:joris -->
- [x] A02 Brand — Plateforme de marque (diagnostic, strategie, expression verbale et visuelle) <!-- p:normal a:joris -->
- [x] A03 Art Direction — Direction artistique (moodboard, vocabulaire visuel, contraintes, emotions) <!-- p:normal a:joris -->
- [x] A04 Structure — Sitemap et architecture de pages <!-- p:normal a:joris -->
- [x] A05 Wireframes — Maquettes et contenu par page <!-- p:normal a:joris -->
- [x] A06 Design Tokens — Variables CSS dans globals.css <!-- p:normal a:joris -->

---

## Phase B — Design et Developpement
<!-- workstream: phase-b-design-dev -->

<!-- programme: B01 Layout -->
- [x] Header avec navigation desktop et logo <!-- p:normal a:joris -->
- [x] Footer avec liens, services, contact <!-- p:normal a:joris -->
- [x] Menu mobile <!-- p:normal a:joris -->
- [x] Layout principal (layout.tsx, fonts, meta) <!-- p:normal a:joris -->

<!-- programme: B02 Homepage -->
- [x] HeroSection avec image plein ecran et CTA <!-- p:urgent a:joris -->
- [x] PortfolioPreview — colonnes defilantes avec GSAP ScrollTrigger <!-- p:urgent a:joris -->
- [x] ServicesPreview — 3 services avec icones SVG custom <!-- p:normal a:joris -->
- [x] TestimonialsSection — temoignages clients <!-- p:normal a:joris -->
- [x] CtaFinal — section conversion <!-- p:normal a:joris -->
- [x] LogoIntro — animation d'entree <!-- p:low a:joris -->

<!-- programme: B03 Pages -->
- [x] Page /portfolio — galerie filtrable par categorie avec lightbox <!-- p:urgent a:joris -->
- [x] Page /portfolio/[subcategory] — sous-pages par categorie <!-- p:urgent a:joris -->
- [x] FeaturedSlider — slider WebGL Three.js avec transitions displacement <!-- p:normal a:joris -->
- [x] Page /services — 6 services en zig-zag + section processus + CTA <!-- p:normal a:joris -->
- [x] Page /contact — formulaire de demande de devis <!-- p:urgent a:joris -->
- [x] Page /a-propos — histoire de Guillaume <!-- p:normal a:joris -->
- [ ] Page /mentions-legales <!-- p:low a:joris -->
- [ ] Page /shop — boutique (amorcee, a completer) <!-- p:low a:joris -->

<!-- programme: B04 Polish -->
- [ ] Optimisation responsive mobile/tablette <!-- p:normal a:joris -->
- [ ] Animations scroll et micro-interactions <!-- p:normal a:joris -->
- [ ] SEO — meta tags, structured data, sitemap.xml <!-- p:normal a:joris -->
- [ ] Performance — optimisation images, lazy loading, Core Web Vitals <!-- p:normal a:joris -->

<!-- programme: B05 Validate -->
- [ ] Audit Lighthouse (performance, accessibilite, SEO) <!-- p:normal a:joris -->
- [ ] Tests cross-browser (Chrome, Firefox, Safari) <!-- p:normal a:joris -->
- [ ] Validation client — presentation et retours <!-- p:urgent a:joris -->

<!-- programme: B06 Deploy -->
- [ ] Configuration Vercel production <!-- p:urgent a:joris -->
- [ ] Migration domaine guihomedecoration.com <!-- p:urgent a:joris -->
- [ ] Monitoring post-lancement <!-- p:normal a:joris -->

---

## Dashboard CMS
<!-- workstream: dashboard-cms -->

<!-- programme: Editeur visuel -->
- [x] Schema Supabase (tables iwok_projects, iwok_services, iwok_testimonials, iwok_about_chapters, iwok_settings) <!-- p:urgent a:joris -->
- [x] Editeur visuel dans neurolia-dashboard (6 sections : hero, services, portfolio, temoignages, a propos, contact) <!-- p:urgent a:joris -->
- [x] Endpoint /api/revalidate pour mise a jour ISR <!-- p:normal a:joris -->
- [x] CRUD projets avec gestion images et tri <!-- p:normal a:joris -->
- [x] Systeme de likes (RPC Supabase + endpoint API) <!-- p:low a:joris -->
- [x] Fix images cassees dans le dashboard (services + about) — resolution chemins relatifs <!-- p:urgent a:joris -->
- [ ] Formulaire contact — integration envoi email (actuellement console.log) <!-- p:normal a:joris -->
- [ ] Peupler Supabase avec le portfolio complet depuis les donnees locales <!-- p:normal a:joris -->

---

## Assets et Contenu Client
<!-- workstream: assets-contenu -->

<!-- programme: En attente du client -->
- [ ] Logo HD — fichiers sources (AI, SVG, PNG) <!-- p:normal a:joris -->
- [ ] Charte graphique officielle validee <!-- p:normal a:joris -->
- [ ] Ton editorial confirme (tutoiement / vouvoiement) <!-- p:normal a:joris -->
- [ ] Temoignages clients reels <!-- p:normal a:joris -->
- [ ] Videos timelapse (si disponibles) <!-- p:low a:joris -->
- [ ] Acces registrar domaine guihomedecoration.com <!-- p:urgent a:joris -->
- [ ] Email et telephone de contact a publier <!-- p:normal a:joris -->
