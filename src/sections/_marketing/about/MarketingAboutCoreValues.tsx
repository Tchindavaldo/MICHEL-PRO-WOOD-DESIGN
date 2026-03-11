// @mui
import { Typography, Container, Box } from '@mui/material';
// components
import SvgColor from 'src/components/svg-color';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

// Default fallback values with verified existing SVG icons
const CORE_VALUES = [
  {
    title: 'Excellence Artisanale',
    description: 'Fabrication de haute précision avec bois sélectionné premium et finitions irréprochables.',
    icon: '/assets/icons/ic_agreement.svg',
  },
  {
    title: 'Innovation Technologique',
    description: 'CFAO, modélisation 3D et usinage CNC pour des réalisations modernes et précises.',
    icon: '/assets/icons/ic_transparency.svg',
  },
  {
    title: 'Personnalisation Totale',
    description: 'Chaque projet est unique et adapté aux besoins spécifiques de nos clients.',
    icon: '/assets/icons/ic_reputation.svg',
  },
  {
    title: 'Formation & Transmission',
    description: 'Former la nouvelle génération d\'artisans qualifiés pour l\'avenir du secteur bois.',
    icon: '/assets/icons/ic_popularity.svg',
  },
];

// Verified list of SVG icons that actually exist in /public/assets/icons/
const VALID_LOCAL_SVGS = new Set([
  'ic_accounting', 'ic_agreement', 'ic_analysis', 'ic_banking_currency', 'ic_banking',
  'ic_checklist', 'ic_chip', 'ic_creativity', 'ic_customer_service', 'ic_email_inbox',
  'ic_email_sent', 'ic_figma_outline', 'ic_file', 'ic_google', 'ic_health_care',
  'ic_lock_password', 'ic_marketing_bullhorn', 'ic_money', 'ic_newsletter',
  'ic_optimization', 'ic_popularity', 'ic_qrcode', 'ic_real_time', 'ic_report',
  'ic_reputation', 'ic_resume_job', 'ic_search_job', 'ic_search', 'ic_secure_payment',
  'ic_signup_job', 'ic_sketch_design', 'ic_social_media', 'ic_software_development',
  'ic_statistics', 'ic_stethoscope', 'ic_transparency', 'ic_web_programming',
]);

/**
 * Resolve the icon to use. Rules:
 * 1. If it's a full URL (http/https) → use as-is (image)
 * 2. If it contains ':' → Iconify name (e.g. carbon:trophy)
 * 3. If it ends with .svg → extract name and check if it's in the valid list
 * 4. If none of the above or invalid → use the default icon for this position
 */
function resolveIcon(rawIcon: string | undefined | null, fallback: string): string {
  const icon = rawIcon?.trim();
  if (!icon) return fallback;
  // Full remote URL – let it through (will render as Image)
  if (icon.startsWith('http://') || icon.startsWith('https://')) return icon;
  // Iconify format
  if (icon.includes(':')) return icon;
  // Local SVG – validate the filename exists
  if (icon.endsWith('.svg') || icon.includes('/assets/icons/')) {
    // Extract just the filename without extension and path
    const filename = icon.split('/').pop()?.replace('.svg', '') || '';
    if (VALID_LOCAL_SVGS.has(filename)) return `/assets/icons/${filename}.svg`;
    // File not in verified list → use fallback
    return fallback;
  }
  // Local image (jpg, png, webp) uploaded via the media manager → trust it
  if (icon.startsWith('/')) return icon;
  return fallback;
}

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  description?: string;
  values?: {
    title: string;
    description: string;
    icon_url?: string;
    icon?: string;
  }[];
};

export default function MarketingAboutCoreValues({ title, description, values }: Props) {
  const displayValues = values && values.length > 0 ? values : CORE_VALUES;

  return (
    <Container
      sx={{
        textAlign: 'center',
        pt: { xs: 5, md: 10 },
        pb: { xs: 5, md: 15 },
      }}
    >
      <Typography variant="h2" sx={{ mb: 2 }}>
        {title || 'Nos Valeurs Fondamentales'}
      </Typography>

      {description && (
        <Typography 
          sx={{ 
            color: 'text.secondary', 
            maxWidth: 640, 
            mx: 'auto', 
            mb: { xs: 8, md: 10 },
            whiteSpace: 'pre-line' 
          }}
        >
          {description}
        </Typography>
      )}

      <Box
        sx={{
          display: 'grid',
          gap: 8,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {displayValues.map((value, index) => {
          const fallback = CORE_VALUES[index % CORE_VALUES.length].icon;
          const icon = resolveIcon((value as any).icon_url || (value as any).icon, fallback);

          // Order matters: check remote URL first (before Iconify which also uses ':')
          const isRemote = icon.startsWith('http://') || icon.startsWith('https://');
          // Iconify format: "namespace:iconname" (no slashes, not a URL)
          const isIconify = !isRemote && icon.includes(':') && !icon.includes('/');
          // Local SVG
          const isSvg = !isRemote && !isIconify && icon.endsWith('.svg');
          // Local image (jpg, png, webp, etc.)

          return (
            <Box key={`${value.title}-${index}`}>
              {isIconify ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Iconify icon={icon} width={64} sx={{ color: 'primary.main' }} />
                </Box>
              ) : isSvg ? (
                <SvgColor
                  src={icon}
                  sx={{ width: 64, height: 64, mx: 'auto', color: 'primary.main', display: 'block' }}
                />
              ) : (
                /* Remote URL or local uploaded image */
                <Box sx={{ width: 64, height: 64, mx: 'auto' }}>
                  <Image alt={value.title} src={icon} ratio="1/1" />
                </Box>
              )}

              <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                {value.title}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }}>{value.description}</Typography>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
