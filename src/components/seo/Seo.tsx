import Head from 'next/head';
import { useRouter } from 'next/router';
//
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOCALE,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  absoluteUrl,
} from 'src/config-seo';

// ----------------------------------------------------------------------

export type SeoProps = {
  /** Titre de la page (sans le nom du site — il est ajouté automatiquement). */
  title?: string;
  /** Meta description spécifique à la page. */
  description?: string;
  /** Mots-clés spécifiques (sinon les mots-clés globaux). */
  keywords?: string;
  /** Chemin canonique. Par défaut : le chemin courant (sans query). */
  canonical?: string;
  /** Image de partage social (URL absolue). */
  image?: string;
  /** Type Open Graph. */
  ogType?: 'website' | 'article' | 'product';
  /** Empêcher l'indexation de cette page. */
  noindex?: boolean;
  /** Données structurées JSON-LD supplémentaires (objet ou tableau). */
  jsonLd?: Record<string, any> | Record<string, any>[];
};

// ----------------------------------------------------------------------

export default function Seo({
  title,
  description = SITE_DESCRIPTION,
  keywords = SITE_KEYWORDS,
  canonical,
  image = SITE_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) {
  const router = useRouter();

  const pathname = (router?.asPath || '/').split('?')[0].split('#')[0];
  const canonicalUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : absoluteUrl(canonical)
    : absoluteUrl(pathname);

  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Indexation */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={SITE_OG_IMAGE_ALT} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={SITE_OG_IMAGE_ALT} />

      {/* hreflang (site francophone Cameroun) */}
      <link rel="alternate" hrefLang="fr" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* JSON-LD spécifique à la page */}
      {jsonLdArray.map((data, i) => (
        <script
          key={`jsonld-${i}`}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Head>
  );
}

// ----------------------------------------------------------------------

export { SITE_URL };
