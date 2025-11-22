// next
import { useRouter } from 'next/router';
// @mui
import {
  Link,
  Stack,
  Divider,
  Container,
  Typography,
  IconButton,
  Unstable_Grid2 as Grid,
  Box,
} from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _socials } from 'src/_mock';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function Footer() {
  const isMdUp = useResponsive('up', 'md');

  const { pathname } = useRouter();

  const isHome = pathname === '/';

  const mainFooter = (
    <>
      <Container
        sx={{
          overflow: 'hidden',
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack alignItems="flex-start" spacing={3}>
                <Logo sx={{ width: 50, height: 50 }} />
                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                  MICHEL PRO WOOD DESIGN est une entreprise spécialisée dans la menuiserie, l&apos;ébénisterie, la construction bois et l&apos;usinage CNC. Nous formons également la prochaine génération d&apos;artisans.
                </Typography>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6" sx={{ color: 'common.white' }}>Suivez-nous</Typography>
                <Stack direction="row" alignItems="center">
                  {_socials.map((social) => (
                    <IconButton key={social.value} color="primary">
                      <Iconify icon={social.icon} />
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ color: 'common.white' }}>Menu</Typography>
                <Link href={paths.michelProWood.home} color="grey.400" variant="body2" sx={{ display: 'block', '&:hover': { color: 'primary.main' } }}>
                  Home
                </Link>
                <Link href={paths.michelProWood.about} color="grey.400" variant="body2" sx={{ display: 'block', '&:hover': { color: 'primary.main' } }}>
                  À Propos
                </Link>
                <Link href={paths.michelProWood.services} color="grey.400" variant="body2" sx={{ display: 'block', '&:hover': { color: 'primary.main' } }}>
                  Services
                </Link>
                <Link href={paths.michelProWood.realizations} color="grey.400" variant="body2" sx={{ display: 'block', '&:hover': { color: 'primary.main' } }}>
                  Réalisations
                </Link>
                <Link href={paths.michelProWood.shop} color="grey.400" variant="body2" sx={{ display: 'block', '&:hover': { color: 'primary.main' } }}>
                  Boutique
                </Link>
                <Link href={paths.michelProWood.contact} color="grey.400" variant="body2" sx={{ display: 'block', '&:hover': { color: 'primary.main' } }}>
                  Contact
                </Link>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6" sx={{ color: 'common.white' }}>Contact</Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    Bafoussam (Foyer Lagouenne, Ouest Cameroun)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    michelprowooddesign@gmail.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    696 10 36 72 / 683 69 64 62
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6" sx={{ color: 'common.white' }}>Horaires</Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    Lundi - Vendredi : 8h00 - 18h00
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    Samedi : 8h00 - 14h00
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    Dimanche : Fermé
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ borderColor: 'grey.800' }} />

      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'grey.500' }}>
            © 2025 MICHEL PRO WOOD DESIGN. Tous droits réservés.
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="caption" sx={{ color: 'grey.500', '&:hover': { color: 'primary.main' } }}>
              Politique de confidentialité
            </Link>

            <Link variant="caption" sx={{ color: 'grey.500', '&:hover': { color: 'primary.main' } }}>
              Conditions d&apos;utilisation
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return (
    <Box component="footer" sx={{ bgcolor: '#1A1A1A' }}>
      {mainFooter}
    </Box>
  );
}
