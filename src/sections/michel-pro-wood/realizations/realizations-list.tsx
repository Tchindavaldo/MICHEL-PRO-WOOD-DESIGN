import { useState } from 'react';
// @mui
import {
  Box,
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
// data
import {
  REALIZATIONS_DATA,
  REALIZATION_CATEGORIES,
  REALIZATION_CLIENTS,
} from 'src/assets/data/michel-pro-wood/realizations-data';

// ----------------------------------------------------------------------

const ITEMS_PER_PAGE = 6;

export default function RealizationsList() {
  const [category, setCategory] = useState('Tous');
  const [clientType, setClientType] = useState('Tous');
  const [page, setPage] = useState(1);

  // Filter realizations
  const filteredRealizations = REALIZATIONS_DATA.filter((item) => {
    const matchCategory = category === 'Tous' || item.category === category;
    const matchClient = clientType === 'Tous' || item.client === clientType;
    return matchCategory && matchClient;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRealizations.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedRealizations = filteredRealizations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleCategoryChange = (event: React.MouseEvent<HTMLElement>, newCategory: string) => {
    if (newCategory !== null) {
      setCategory(newCategory);
      setPage(1);
    }
  };

  const handleClientChange = (event: React.MouseEvent<HTMLElement>, newClient: string) => {
    if (newClient !== null) {
      setClientType(newClient);
      setPage(1);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container sx={{ py: { xs: 8, md: 10 } }}>
      <Stack spacing={5}>
        {/* Header */}
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography variant="h3">Notre Portfolio</Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: 600 }}>
            {filteredRealizations.length} projet{filteredRealizations.length > 1 ? 's' : ''}{' '}
            {category !== 'Tous' && `en ${category}`}
          </Typography>
        </Stack>

        {/* Filters */}
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle2" sx={{ minWidth: 100 }}>
              Catégorie:
            </Typography>
            <ToggleButtonGroup
              value={category}
              exclusive
              onChange={handleCategoryChange}
              sx={{
                flexWrap: 'wrap',
                justifyContent: 'center',
                '& .MuiToggleButton-root': {
                  px: 3,
                  py: 1,
                  border: 1,
                  borderColor: 'divider',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                },
              }}
            >
              {REALIZATION_CATEGORIES.map((cat) => (
                <ToggleButton key={cat} value={cat}>
                  {cat}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="subtitle2" sx={{ minWidth: 100 }}>
              Type de client:
            </Typography>
            <ToggleButtonGroup
              value={clientType}
              exclusive
              onChange={handleClientChange}
              sx={{
                flexWrap: 'wrap',
                justifyContent: 'center',
                '& .MuiToggleButton-root': {
                  px: 3,
                  py: 1,
                  border: 1,
                  borderColor: 'divider',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                },
              }}
            >
              {REALIZATION_CLIENTS.map((client) => (
                <ToggleButton key={client} value={client}>
                  {client}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        {/* Grid */}
        <Grid container spacing={3}>
          {paginatedRealizations.map((realization) => (
            <Grid key={realization.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => theme.customShadows.z24,
                  },
                }}
              >
                <Box sx={{ position: 'relative', paddingTop: '75%' }}>
                  <Image
                    src={realization.coverUrl}
                    alt={realization.title}
                    ratio="4/3"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      width: 1,
                      height: 1,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: (theme) => alpha(theme.palette.common.black, 0.7),
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: 'common.white', fontWeight: 600 }}>
                      {realization.category}
                    </Typography>
                  </Box>
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {realization.title}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {realization.description}
                  </Typography>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Iconify icon="solar:calendar-bold" width={16} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {realization.year}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Iconify icon="solar:user-bold" width={16} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {realization.client}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Button
                    variant="outlined"
                    color="inherit"
                    endIcon={<Iconify icon="solar:arrow-right-outline" />}
                    sx={{ mt: 1 }}
                  >
                    Voir détails
                  </Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredRealizations.length === 0 && (
          <Stack alignItems="center" spacing={2} sx={{ py: 10 }}>
            <Iconify icon="solar:folder-open-bold-duotone" width={80} sx={{ color: 'text.disabled' }} />
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Aucune réalisation trouvée
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                setCategory('Tous');
                setClientType('Tous');
              }}
            >
              Réinitialiser les filtres
            </Button>
          </Stack>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Stack alignItems="center" sx={{ pt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
