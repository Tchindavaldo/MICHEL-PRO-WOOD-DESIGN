# Guide d'Intégration Supabase - Site Vitrine

## 📋 Étapes d'Installation

### 1. Installer Supabase
```bash
npm install @supabase/supabase-js
```

### 2. Fichiers Créés
- ✅ `.env.local` - Configuration Supabase
- ✅ `src/lib/supabase.ts` - Client Supabase
- ✅ `src/lib/supabaseData.ts` - Fonctions de récupération de données

## 🔧 Comment Utiliser

### Exemple : Remplacer les données mockées par Supabase

#### Avant (avec données mockées)
```typescript
import { _services } from 'src/_mock';

export default function ServicesPage() {
  const services = _services;
  
  return (
    // Affichage des services
  );
}
```

#### Après (avec Supabase)
```typescript
import { getServices } from 'src/lib/supabaseData';
import { _services } from 'src/_mock'; // Garde comme fallback

export default async function ServicesPage() {
  // Récupère les données de Supabase
  const supabaseServices = await getServices();
  
  // Utilise Supabase si disponible, sinon fallback sur mock
  const services = supabaseServices.length > 0 ? supabaseServices : _services;
  
  return (
    // Affichage des services
  );
}
```

## 📚 Fonctions Disponibles

### Services
- `getServices()` - Récupère tous les services actifs

### Réalisations
- `getRealizations()` - Récupère toutes les réalisations actives
- `getRealizationBySlug(slug)` - Récupère une réalisation par son slug
- `getRealizationCategories()` - Récupère les catégories de réalisations

### Produits
- `getProducts()` - Récupère tous les produits actifs
- `getProductBySlug(slug)` - Récupère un produit par son slug
- `getProductCategories()` - Récupère les catégories de produits

### Blog
- `getBlogPosts()` - Récupère tous les articles publiés
- `getBlogPostBySlug(slug)` - Récupère un article par son slug

### Autres
- `getTestimonials()` - Récupère les témoignages
- `getPartners()` - Récupère les partenaires
- `getHeroSlides()` - Récupère les slides du hero
- `getPageContent(pageKey)` - Récupère le contenu d'une page
- `getContactInfo()` - Récupère les informations de contact
- `getJobs()` - Récupère les offres d'emploi
- `getPricingPlans()` - Récupère les plans tarifaires

## 🎯 Stratégie de Migration

### Option 1 : Migration Progressive (Recommandé)
Migrez page par page pour tester :

1. **Page Services** (`src/sections/services/...`)
2. **Page Réalisations** (`src/sections/realizations/...`)
3. **Page Produits** (`src/sections/products/...`)
4. **Page Blog** (`src/sections/blog/...`)
5. **Page d'accueil** (`src/sections/home/...`)

### Option 2 : Migration Complète
Remplacez tous les imports de `_mock` par les fonctions Supabase.

## 📝 Exemple Complet : Page Services

```typescript
// src/app/services/page.tsx
import { getServices } from 'src/lib/supabaseData';
import { _services } from 'src/_mock'; // Fallback
import ServicesView from 'src/sections/services/view/services-view';

export default async function ServicesPage() {
  // Récupère les données de Supabase
  const supabaseServices = await getServices();
  
  // Utilise Supabase si disponible, sinon fallback
  const services = supabaseServices.length > 0 
    ? supabaseServices.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        icon: service.icon_url,
        color: service.color,
      }))
    : _services;
  
  return <ServicesView services={services} />;
}
```

## 🔍 Mapping des Données

### Structure Supabase → Structure Mock

#### Services
```typescript
// Supabase
{
  id: string,
  name: string,
  slug: string,
  description: string,
  icon_url: string,
  color: string,
  display_order: number,
  is_active: boolean
}

// Mock (adapter si nécessaire)
{
  id: string,
  name: string,
  description: string,
  icon: string,
  color: string
}
```

#### Réalisations
```typescript
// Supabase
{
  id: string,
  title: string,
  slug: string,
  category_id: string,
  description: string,
  cover_image_url: string,
  display_order: number,
  is_featured: boolean,
  is_active: boolean,
  wood_realization_categories: {
    id: string,
    name: string,
    slug: string
  }
}
```

## ⚠️ Points Importants

1. **Fallback automatique** : Si Supabase ne retourne pas de données, utilisez les mocks
2. **Gestion d'erreurs** : Toutes les fonctions gèrent les erreurs et retournent `[]` ou `null`
3. **TypeScript** : Ajoutez des types si nécessaire
4. **Performance** : Next.js met en cache les données automatiquement
5. **Redémarrage** : Redémarrez le serveur après avoir modifié `.env.local`

## 🚀 Prochaines Étapes

1. ✅ Installer `@supabase/supabase-js`
2. ✅ Vérifier que `.env.local` est bien configuré
3. 🔄 Identifier les pages à migrer
4. 🔄 Remplacer les imports `_mock` par les fonctions Supabase
5. 🔄 Tester chaque page
6. 🔄 Adapter le mapping des données si nécessaire

## 📞 Support

Si vous rencontrez des problèmes :
- Vérifiez que Supabase est bien configuré
- Vérifiez les logs de la console
- Vérifiez que les tables existent dans Supabase
- Vérifiez que les RLS policies sont correctes
