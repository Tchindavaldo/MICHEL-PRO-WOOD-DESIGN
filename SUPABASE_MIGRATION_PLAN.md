# Plan de Migration Supabase - Frontend

## 📊 État Actuel

### ✅ Déjà Migré
- **Page d'accueil** (`src/pages/index.tsx`) : Services récupérés depuis Supabase avec fallback
- **Composant HomeServices** : Accepte les services en props avec fallback sur données par défaut

### 🔄 À Migrer

#### 1. **Page Services** (`src/pages/services.tsx`)
- Récupérer les services depuis Supabase
- Passer les données au composant `ServicesView`
- Fallback sur données mockées si BD vide

#### 2. **Page Réalisations** (`src/pages/realisations.tsx`)
- Récupérer les réalisations depuis Supabase
- Récupérer les catégories de réalisations
- Passer les données au composant `RealizationsView`
- Fallback sur données mockées

#### 3. **Page Boutique** (`src/pages/boutique.tsx`)
- Récupérer les produits depuis Supabase
- Récupérer les catégories de produits
- Passer les données au composant `ShopView`
- Fallback sur données mockées

#### 4. **Composants de la Page d'Accueil**

##### a. `HomeTestimonials` (home-testimonials.tsx)
- Récupérer les témoignages depuis Supabase
- Fallback sur données mockées (actuellement hardcodées)

##### b. `HomeRealizations` (home-realizations.tsx)
- Récupérer les réalisations depuis Supabase
- Fallback sur données mockées

##### c. `HomeShop` (home-shop.tsx)
- Récupérer les produits depuis Supabase
- Fallback sur données mockées

##### d. `HomeLatestPosts` (home-latest-posts.tsx)
- Récupérer les articles de blog depuis Supabase
- Fallback sur données mockées

##### e. `HomePricing` (home-pricing.tsx)
- Récupérer les plans tarifaires depuis Supabase
- Fallback sur données mockées

##### f. `HomeJobs` (home-jobs.tsx)
- Récupérer les offres d'emploi depuis Supabase
- Fallback sur données mockées

##### g. `OurClientsMarketing` (utilisé dans home-view.tsx)
- Récupérer les partenaires depuis Supabase
- Fallback sur `_brands` mockées

#### 5. **Page À Propos** (`src/pages/a-propos.tsx`)
- Récupérer le contenu de la page depuis Supabase
- Récupérer les partenaires depuis Supabase
- Fallback sur données mockées

#### 6. **Page Contact** (`src/pages/contact.tsx`)
- Récupérer les informations de contact depuis Supabase
- Fallback sur données mockées

## 🎯 Stratégie de Migration

### Principe de Fallback
Chaque composant doit suivre ce pattern :

```typescript
export const getStaticProps = async () => {
  // 1. Récupérer les données de Supabase
  const supabaseData = await getDataFromSupabase();
  
  // 2. Fallback sur données mockées si vide
  const finalData = supabaseData && supabaseData.length > 0 
    ? supabaseData 
    : MOCK_DATA;
  
  // 3. Mapper les données au format attendu par le composant
  const mappedData = finalData.map(item => ({
    // Mapping des champs
  }));
  
  return {
    props: { data: mappedData },
    revalidate: 60, // Revalidation toutes les 60 secondes
  };
};
```

### Ordre de Migration Recommandé

1. ✅ **Services** (déjà fait)
2. **Témoignages** (simple, peu de dépendances)
3. **Partenaires/Clients** (simple)
4. **Réalisations** (avec catégories)
5. **Produits** (avec catégories)
6. **Articles de blog**
7. **Offres d'emploi**
8. **Plans tarifaires**
9. **Contenu des pages statiques**
10. **Informations de contact**

## 📝 Mapping des Données

### Services
```typescript
// Supabase → Composant
{
  name: service.name,
  content: service.description,
  path: paths.michelProWood.services,
  icon: service.icon_url || '/assets/icons/default.svg',
  color: service.color || 'primary',
}
```

### Témoignages
```typescript
// Supabase → Composant
{
  id: testimonial.id,
  name: testimonial.author_name,
  role: testimonial.author_role,
  avatar: testimonial.author_avatar_url || _mock.image.avatar(index),
  content: testimonial.content,
  rating: testimonial.rating || 5,
}
```

### Réalisations
```typescript
// Supabase → Composant
{
  id: realization.id,
  title: realization.title,
  slug: realization.slug,
  category: realization.wood_realization_categories?.name,
  description: realization.description,
  coverUrl: realization.cover_image_url,
  featured: realization.is_featured,
}
```

### Produits
```typescript
// Supabase → Composant
{
  id: product.id,
  name: product.name,
  slug: product.slug,
  category: product.wood_product_categories?.name,
  description: product.description,
  price: product.price,
  coverUrl: product.cover_image_url,
  inStock: product.in_stock,
}
```

### Articles de Blog
```typescript
// Supabase → Composant
{
  id: post.id,
  title: post.title,
  slug: post.slug,
  description: post.excerpt,
  coverUrl: post.cover_image_url,
  publishedAt: post.published_at,
  author: post.author_name,
}
```

## 🔧 Fonctions Supabase Disponibles

Toutes ces fonctions sont déjà disponibles dans `src/lib/supabaseData.ts` :

- `getServices()` ✅
- `getRealizations()`
- `getRealizationBySlug(slug)`
- `getRealizationCategories()`
- `getProducts()`
- `getProductBySlug(slug)`
- `getProductCategories()`
- `getBlogPosts()`
- `getBlogPostBySlug(slug)`
- `getTestimonials()`
- `getPartners()`
- `getHeroSlides()`
- `getPageContent(pageKey)`
- `getContactInfo()`
- `getJobs()`
- `getPricingPlans()`

## ⚠️ Points d'Attention

1. **Toujours garder les données mockées** comme fallback
2. **Mapper correctement** les champs Supabase vers le format attendu
3. **Gérer les erreurs** : toutes les fonctions Supabase retournent `[]` ou `null` en cas d'erreur
4. **Utiliser `getStaticProps`** pour Next.js avec `revalidate` pour ISR
5. **Tester chaque migration** avant de passer à la suivante
6. **Vérifier les types TypeScript** pour éviter les erreurs

## 🚀 Prochaines Étapes

1. Migrer les témoignages
2. Migrer les partenaires
3. Migrer les réalisations
4. Migrer les produits
5. Migrer les articles de blog
6. Tester l'ensemble
