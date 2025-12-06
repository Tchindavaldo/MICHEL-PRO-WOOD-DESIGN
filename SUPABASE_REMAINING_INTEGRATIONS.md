# Plan d'intégration Supabase - Sections restantes

## ✅ Sections déjà intégrées (Page d'accueil)
1. Hero (`wood_hero_slides`) ✅
2. Partenaires/Clients (`wood_partners`) ✅
3. Services (`wood_services`) ✅
4. Réalisations (`wood_realizations`) ✅
5. Produits/Boutique (`wood_products`) ✅
6. Témoignages (`wood_testimonials`) ✅
7. Articles de Blog (`wood_posts`) ✅
8. Offres d'Emploi (`wood_jobs`) ✅
9. Plans Tarifaires (`wood_pricing_plans`) ✅
10. Processus (`wood_process_steps`) ✅

## 🔄 Sections à intégrer (Page d'accueil)

### 1. Video Carousel (`HomeVideoCarousel`)
- **Table**: `wood_video_slides`
- **Fonction**: `getVideoSlides()` ✅ (créée)
- **Composant**: `src/sections/michel-pro-wood/home/home-video-carousel.tsx`
- **Champs**: title, description, video_url, cta_text, cta_link

### 2. About Section (`HomeAbout`)
- **Table**: `wood_page_content` (page_slug='home', section_key='about')
- **Fonction**: `getPageContent(pageSlug, sectionKey)`
- **Composant**: `src/sections/michel-pro-wood/home/home-about.tsx`
- **Champs**: title, subtitle, content, image_url

### 3. Get Quote (`HomeGetQuote`)
- **Table**: `wood_contact_info` ou contenu statique
- **Pas de migration nécessaire** (formulaire statique)

## 📄 Pages dédiées à migrer

### Page Services (`/services`)
- `wood_services` ✅ (déjà disponible)
- `wood_service_includes`
- `wood_service_benefits`
- `wood_pricing_plans` ✅ (déjà disponible)
- `wood_process_steps` ✅ (déjà disponible)

### Page Réalisations (`/realisations`)
- `wood_realizations` ✅ (déjà disponible)
- `wood_realization_categories` (déjà utilisé)
- `wood_realization_images`
- `wood_realization_features`

### Page Boutique (`/boutique`)
- `wood_products` ✅ (déjà disponible)
- `wood_product_categories` (déjà utilisé)
- `wood_product_images`
- `wood_special_offers`
- `wood_brands`

### Page À Propos (`/a-propos`)
- `wood_page_content` (page_slug='about')
- `wood_values`
- `wood_partners` ✅ (déjà disponible)

### Page Contact (`/contact`)
- `wood_contact_info`
- `wood_page_content` (page_slug='contact')

## 🎯 Ordre d'implémentation recommandé

1. ✅ Video Carousel (fonction créée)
2. Page Content (fonction générique)
3. Contact Info
4. Values
5. Service Includes & Benefits
6. Special Offers & Brands
7. Realization Images & Features
8. Product Images

## 📝 Notes
- Toutes les fonctions doivent inclure un fallback vers les données mockées
- Utiliser `getStaticProps` avec `revalidate: 60` pour ISR
- Ajouter des logs de debug pour chaque nouvelle intégration
