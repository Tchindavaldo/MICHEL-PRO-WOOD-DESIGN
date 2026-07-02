// ----------------------------------------------------------------------
// Génération du sitemap.xml — MICHEL PRO WOOD DESIGN
// Exécuté automatiquement avant `next build` (voir package.json > prebuild).
// Seules les pages RÉELLES du site sont incluses (pas les démos du template).
// ----------------------------------------------------------------------

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://michelprowooddesign.com').replace(
  /\/$/,
  ''
);

// Doit rester synchronisé avec src/config-seo.ts > INDEXED_PAGES.
const PAGES = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/services', changefreq: 'monthly', priority: 0.9 },
  { path: '/realisations', changefreq: 'weekly', priority: 0.9 },
  { path: '/boutique', changefreq: 'weekly', priority: 0.9 },
  { path: '/a-propos', changefreq: 'monthly', priority: 0.8 },
  { path: '/contact', changefreq: 'monthly', priority: 0.8 },
  { path: '/inscriptions/formation-professionnelle', changefreq: 'monthly', priority: 0.7 },
  { path: '/inscriptions/stage-vacances', changefreq: 'monthly', priority: 0.6 },
];

const lastmod = new Date().toISOString().split('T')[0];

// next.config.js utilise trailingSlash: true → refléter la même forme d'URL.
const withTrailingSlash = (p) => (p === '/' ? '/' : p.endsWith('/') ? p : `${p}/`);

const urls = PAGES.map((page) => {
  const loc = `${SITE_URL}${withTrailingSlash(page.path)}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`✓ sitemap.xml généré (${PAGES.length} URLs) → ${outPath}`);
