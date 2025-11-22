// @mui
import { useTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Container, Button } from '@mui/material';
import { paths } from 'src/routes/paths';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
// utils
import { bgBlur } from 'src/utils/cssStyles';
// config
import { HEADER } from 'src/config-global';
// components
import Logo from 'src/components/logo';
//
import { NavMobile, NavDesktop, navConfig } from '../nav';
import HeaderShadow from '../../components/HeaderShadow';

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
};

export default function Header({ headerOnDark }: Props) {
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

  const isOffset = useOffSetTop();

  return (
    <AppBar color="transparent" sx={{ boxShadow: 'none' }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ lineHeight: 0 }}>
            <Logo sx={{ width: 50, height: 50 }} />
          </Box>

          {isMdUp && <NavDesktop data={navConfig} />}
          
          {isMdUp && (
            <Button 
              variant="contained" 
              color="primary" 
              href={paths.michelProWood.contact}
              sx={{ 
                ml: { xs: 1, md: 2 },
                mr: { xs: 1, md: 0 },
                whiteSpace: 'nowrap'
              }}
            >
              Demander un devis
            </Button>
          )}

          {!isMdUp && <NavMobile data={navConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <HeaderShadow />}
    </AppBar>
  );
}
