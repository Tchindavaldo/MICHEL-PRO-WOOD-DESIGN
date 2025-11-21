// @mui
import { Typography, Container, Box } from '@mui/material';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const SERVICES = [
  {
    title: 'Menuiserie & Ébénisterie',
    description: 'Meubles sur mesure, portes en bois massif, placards, cuisines modernes et mobilier haut de gamme.',
    icon: '/assets/icons/ic_statistics.svg',
  },
  {
    title: 'Aménagements Intérieurs',
    description: 'Conception complète d\'espaces intérieurs : lambris, frises, parquets, dressings et solutions sur mesure.',
    icon: '/assets/icons/ic_checklist.svg',
  },
  {
    title: 'Vente de Bois & Dérivés',
    description: 'Distribution de bois massif, panneaux mélaminés, formica, stratifiés et tous dérivés du bois.',
    icon: '/assets/icons/ic_report.svg',
  },
  {
    title: 'Quincaillerie & Finitions',
    description: 'Quincaillerie générale de menuiserie, produits de finition, vernis, lasures et accessoires.',
    icon: '/assets/icons/ic_file.svg',
  },
  {
    title: 'Tapisserie & Mousses',
    description: 'Vente de mousses, matelas, tissus d\'ameublement et accessoires de tapisserie de qualité.',
    icon: '/assets/icons/ic_social_media.svg',
  },
  {
    title: 'Construction Bois',
    description: 'Charpentes, ossatures légères, maisons en bois et constructions bois complètes. Vente partout dans le monde.',
    icon: '/assets/icons/ic_real_time.svg',
  },
];

// ----------------------------------------------------------------------

export default function MarketingServicesInclude() {
  return (
    <Container
      sx={{
        textAlign: 'center',
        pt: { xs: 5, md: 10 },
        pb: { xs: 10, md: 15 },
      }}
    >
      <Typography variant="h2">Nos Services</Typography>

      <Typography
        sx={{
          mt: 3,
          mx: 'auto',
          maxWidth: 480,
          color: 'text.secondary',
          mb: { xs: 8, md: 10 },
        }}
      >
        De la conception à la réalisation, nous offrons une gamme complète de services 
        alliant savoir-faire artisanal et technologie moderne.
      </Typography>

      <Box
        sx={{
          rowGap: 8,
          columnGap: 10,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {SERVICES.map((value) => (
          <div key={value.title}>
            <SvgColor
              src={value.icon}
              color="info"
              sx={{ width: 64, height: 64, mx: 'auto', bgcolor: 'primary.main' }}
            />

            <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
              {value.title}
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}> {value.description} </Typography>
          </div>
        ))}
      </Box>
    </Container>
  );
}
