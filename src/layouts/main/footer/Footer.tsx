// next
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Link,
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  IconButton,
  Unstable_Grid2 as Grid,
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
      <Divider />

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
                <Logo />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  MICHEL PRO WOOD DESIGN est une entreprise spécialisée dans la menuiserie, l'ébénisterie, la construction bois et l'usinage CNC. Nous formons également la prochaine génération d'artisans.
                </Typography>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6">Suivez-nous</Typography>
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
                <Typography variant="h6">Menu</Typography>
                <Link href={paths.michelProWood.home} color="inherit" variant="body2" sx={{ display: 'block' }}>
                  Home
                </Link>
                <Link href={paths.michelProWood.about} color="inherit" variant="body2" sx={{ display: 'block' }}>
                  À Propos
                </Link>
                <Link href={paths.michelProWood.services} color="inherit" variant="body2" sx={{ display: 'block' }}>
                  Services
                </Link>
                <Link href={paths.michelProWood.realizations} color="inherit" variant="body2" sx={{ display: 'block' }}>
                  Réalisations
                </Link>
                <Link href={paths.michelProWood.shop} color="inherit" variant="body2" sx={{ display: 'block' }}>
                  Boutique
                </Link>
                <Link href={paths.michelProWood.contact} color="inherit" variant="body2" sx={{ display: 'block' }}>
                  Contact
                </Link>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6">Contact</Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Bafoussam (Foyer Lagouenne, Ouest Cameroun)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    michelprowooddesign@gmail.com
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    696 10 36 72 / 683 69 64 62
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6">Horaires</Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lundi - Vendredi : 8h00 - 18h00
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Samedi : 8h00 - 14h00
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Dimanche : Fermé
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © 2025 MICHEL PRO WOOD DESIGN. Tous droits réservés.
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Politique de confidentialité
            </Link>

            <Link variant="caption" sx={{ color: 'text.secondary' }}>
              Conditions d'utilisation
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return <footer>{mainFooter}</footer>;
}
