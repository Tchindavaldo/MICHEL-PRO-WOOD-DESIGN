// ----------------------------------------------------------------------
// Configuration SEO centrale — MICHEL PRO WOOD DESIGN
// Menuiserie / ébénisterie professionnelle à Bafoussam, Cameroun.
// ----------------------------------------------------------------------

// URL de production. Surchargeable via NEXT_PUBLIC_SITE_URL sans trailing slash.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://michelprowooddesign.com').replace(
  /\/$/,
  ''
);

export const SITE_NAME = 'MICHEL PRO WOOD DESIGN';

// Langue principale du site.
export const SITE_LOCALE = 'fr_CM';
export const SITE_LANG = 'fr';

// Couleur de marque (thème PWA / navigateur).
export const BRAND_COLOR = '#FA541C';

// Description par défaut (accueil). ~155 caractères, riche en mots-clés locaux.
export const SITE_DESCRIPTION =
  "MICHEL PRO WOOD DESIGN — menuiserie et ébénisterie professionnelle à Bafoussam, Cameroun. " +
  "Fabrication sur mesure de meubles en bois, portes, portails, cuisines, dressings, terrasses et agencement. Devis gratuit.";

// Mots-clés métier & locaux (utilisés en meta keywords + inspiration contenu).
export const SITE_KEYWORDS = [
  'menuiserie Bafoussam',
  'ébénisterie Cameroun',
  'meuble bois sur mesure Bafoussam',
  'menuisier Bafoussam',
  'fabrication meuble bois Cameroun',
  'porte bois Bafoussam',
  'portail bois Cameroun',
  'cuisine équipée bois Bafoussam',
  'dressing sur mesure Cameroun',
  'terrasse bois Bafoussam',
  'agencement intérieur bois',
  'MICHEL PRO WOOD DESIGN',
].join(', ');

// Image de partage social par défaut (Open Graph / Twitter). 1200x630 recommandé.
export const SITE_OG_IMAGE = `${SITE_URL}/assets/og/og-image.jpg`;
export const SITE_OG_IMAGE_ALT = 'Réalisations en bois de MICHEL PRO WOOD DESIGN à Bafoussam';

// Coordonnées de l'entreprise (données structurées LocalBusiness).
export const BUSINESS = {
  legalName: 'MICHEL PRO WOOD DESIGN',
  email: 'contact@michelprowood.com',
  phones: ['+237696503439', '+237650343996'],
  address: {
    locality: 'Bafoussam',
    region: 'Ouest',
    country: 'CM',
    countryName: 'Cameroun',
  },
  // Coordonnées géographiques de Bafoussam (centre-ville) — affiner si besoin.
  geo: { latitude: 5.4778, longitude: 10.4174 },
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '14:00' },
  ],
  priceRange: 'XAF',
};

// Réseaux sociaux (sameAs) — compléter avec les vraies URLs.
export const SOCIAL_LINKS: string[] = [
  // 'https://www.facebook.com/...',
  // 'https://www.instagram.com/...',
];

// ----------------------------------------------------------------------
// Pages RÉELLES du site (celles à indexer). Le reste (template ZONE :
// marketing, travel, career, e-learning, e-commerce, components, auth demos)
// est explicitement exclu de l'indexation.
// ----------------------------------------------------------------------

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: number;
};

export const INDEXED_PAGES: SeoPage[] = [
  {
    path: '/',
    title: 'Menuiserie & Ébénisterie sur mesure à Bafoussam',
    description: SITE_DESCRIPTION,
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/a-propos',
    title: 'À propos — Notre atelier de menuiserie à Bafoussam',
    description:
      "Découvrez MICHEL PRO WOOD DESIGN : notre savoir-faire en menuiserie et ébénisterie à Bafoussam, notre équipe, nos valeurs et notre engagement qualité au Cameroun.",
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/services',
    title: 'Nos services de menuiserie sur mesure',
    description:
      "Meubles sur mesure, portes, portails, cuisines équipées, dressings, terrasses et agencement bois. Services de menuiserie professionnelle à Bafoussam, Cameroun.",
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/realisations',
    title: 'Nos réalisations en bois — Portfolio',
    description:
      "Parcourez nos réalisations en bois : mobilier, aménagements, portails et projets sur mesure réalisés par MICHEL PRO WOOD DESIGN à Bafoussam et au Cameroun.",
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/boutique',
    title: 'Boutique — Meubles et créations en bois',
    description:
      "Achetez des meubles et créations en bois de qualité : armoires, chaises, lits, tables, portails et plus. Boutique en ligne de MICHEL PRO WOOD DESIGN, Bafoussam.",
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/contact',
    title: 'Contact & Devis gratuit',
    description:
      "Contactez MICHEL PRO WOOD DESIGN à Bafoussam pour un devis gratuit. Téléphone, email et adresse de notre atelier de menuiserie au Cameroun.",
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/inscriptions/formation-professionnelle',
    title: 'Formation professionnelle en menuiserie',
    description:
      "Inscrivez-vous à notre formation professionnelle en menuiserie et ébénisterie à Bafoussam. Apprenez le métier du bois avec MICHEL PRO WOOD DESIGN.",
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/inscriptions/stage-vacances',
    title: 'Stage de vacances — Initiation au travail du bois',
    description:
      "Stage de vacances d'initiation au travail du bois à Bafoussam. Une expérience pratique en menuiserie proposée par MICHEL PRO WOOD DESIGN.",
    changefreq: 'monthly',
    priority: 0.6,
  },
];

// next.config.js utilise trailingSlash: true — refléter la même forme d'URL
// pour que canonical, Open Graph et sitemap soient parfaitement cohérents.
export const withTrailingSlash = (path = '/') => {
  if (path === '/') return '/';
  const clean = path.startsWith('/') ? path : `/${path}`;
  return clean.endsWith('/') ? clean : `${clean}/`;
};

// Helper : URL absolue canonique (avec trailing slash) à partir d'un chemin.
export const absoluteUrl = (path = '/') => `${SITE_URL}${withTrailingSlash(path)}`;
