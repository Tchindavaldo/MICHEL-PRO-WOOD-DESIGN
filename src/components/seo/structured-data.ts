// ----------------------------------------------------------------------
// Données structurées Schema.org (JSON-LD) — MICHEL PRO WOOD DESIGN
// ----------------------------------------------------------------------

import {
  SITE_URL,
  SITE_NAME,
  BUSINESS,
  SOCIAL_LINKS,
  SITE_OG_IMAGE,
  SITE_DESCRIPTION,
  absoluteUrl,
} from 'src/config-seo';

// ----------------------------------------------------------------------

const LOGO_URL = absoluteUrl('/favicon/android-chrome-512x512.png');

// Organisation (identité globale de la marque).
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: BUSINESS.legalName,
  url: SITE_URL,
  logo: LOGO_URL,
  image: SITE_OG_IMAGE,
  email: BUSINESS.email,
  telephone: BUSINESS.phones[0],
  description: SITE_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    addressCountry: BUSINESS.address.country,
  },
  sameAs: SOCIAL_LINKS,
};

// Commerce local (SEO local — apparition Google Maps / pack local).
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  image: SITE_OG_IMAGE,
  email: BUSINESS.email,
  telephone: BUSINESS.phones[0],
  priceRange: BUSINESS.priceRange,
  description: SITE_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  areaServed: [
    { '@type': 'City', name: 'Bafoussam' },
    { '@type': 'Country', name: 'Cameroun' },
  ],
  openingHoursSpecification: BUSINESS.openingHours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: SOCIAL_LINKS,
};

// Site web + SearchAction (sitelinks searchbox potentiel).
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'fr-CM',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

// Fil d'Ariane générique.
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
