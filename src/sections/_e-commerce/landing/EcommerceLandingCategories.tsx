import { alpha } from '@mui/material/styles';
import { Box, Typography, Container, Stack } from '@mui/material';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

type Category = {
  id?: string;
  label: string;
  icon: string;
  path: string;
};

const DEFAULT_CATEGORIES: Category[] = [
  { label: 'Mobilier', icon: 'carbon:home', path: '#' },
  { label: 'Cuisine', icon: 'carbon:restaurant', path: '#' },
  { label: 'Salle de Bain', icon: 'carbon:clean', path: '#' },
  { label: 'Menuiserie', icon: 'mdi:door', path: '#' },
  { label: 'Parquet', icon: 'carbon:grid', path: '#' },
  { label: 'Décoration', icon: 'carbon:color-palette', path: '#' },
];

type Props = {
  categories?: Category[];
};

export default function EcommerceLandingCategories({ categories }: Props) {
  const items = categories && categories.length > 0 ? categories : DEFAULT_CATEGORIES;

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Typography variant="h3" sx={{ mb: 8, textAlign: { xs: 'center', md: 'unset' } }}>
        Nos Catégories
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(3, 1fr)',
          sm: 'repeat(4, 1fr)',
          md: 'repeat(6, 1fr)',
        }}
      >
        {items.map((category) => (
          <Stack
            key={category.label}
            alignItems="center"
            justifyContent="center"
            component="a"
            href={category.path}
            sx={{
              px: 1,
              py: 3,
              borderRadius: 2,
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'text.primary',
              border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z24,
              },
            }}
          >
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: '50%',
                bgcolor: 'background.neutral',
              }}
            >
              <Iconify icon={category.icon} width={24} />
            </Box>
            <TextMaxLine variant="subtitle2" line={1}>
              {category.label}
            </TextMaxLine>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
