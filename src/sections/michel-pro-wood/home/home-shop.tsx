import { useRef, useState, useEffect } from 'react';
import { m } from 'framer-motion';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Stack, Unstable_Grid2 as Grid, IconButton, Button } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import useBoundingClientRect from 'src/hooks/useBoundingClientRect';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
import { varHover, varTranHover } from 'src/components/animate';
// assets
import { PRODUCT_IMAGES } from 'src/assets/data/michel-pro-wood/products-link';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  padding: theme.spacing(10, 0),
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    position: 'relative',
    padding: theme.spacing(20, 0),
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    left: 0,
    right: 0,
    marginBottom: 0,
    position: 'absolute',
    height: 'calc(100% - 320px)',
  },
}));

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  transform: 'scale(1.02)', // Fix for sub-pixel gaps
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
  '&:hover': { opacity: 1 },
  [theme.breakpoints.up('md')]: {
    opacity: 0,
  },
  [theme.breakpoints.down('md')]: {
    opacity: 1,
    ...bgGradient({
      startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
      endColor: `${alpha(theme.palette.common.black, 0.25)} 75%`,
    }),
  },
}));

// ----------------------------------------------------------------------

const PRODUCTS = [
  { name: 'Armoire', image: PRODUCT_IMAGES[0] },
  { name: 'Chaise Premium en Bois', image: PRODUCT_IMAGES[1] },
  { name: 'Lit Double', image: PRODUCT_IMAGES[2] },
  { name: 'Portail Bois Premium', image: PRODUCT_IMAGES[3] },
  { name: 'Portail Premium', image: PRODUCT_IMAGES[5] },
  { name: 'Ensemble Salle à Manger', image: PRODUCT_IMAGES[6] },
  { name: 'Table de Salon', image: PRODUCT_IMAGES[7] },
  { name: 'Terrasse Bois Premium', image: PRODUCT_IMAGES[8] },
];

// ----------------------------------------------------------------------

export default function HomeShop() {
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');

  const carouselRef = useRef<Carousel | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container?.left;

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        mt: 8,
        display: { md: 'none' },
      },
    }),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <StyledRoot>
      <StyledContainer>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid xs={12} md={4}>
            <Stack spacing={3} sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
              <Typography variant="overline" sx={{ color: 'grey.600' }}>
                Boutique
              </Typography>

              <Typography variant="h2" sx={{ color: 'primary.main' }}>
                Nos Produits
              </Typography>

              <Typography sx={{ color: 'common.white' }}>
                Découvrez nos créations uniques disponibles à l'achat immédiat. Qualité artisanale et design élégant pour votre intérieur.
              </Typography>
            </Stack>
          </Grid>

          <Grid xs={12} md={7}>
            <Box ref={containerRef} />
          </Grid>
        </Grid>

        {isMdUp && (
          <CarouselArrows
            spacing={2}
            onNext={handleNext}
            onPrev={handlePrev}
            leftButtonProps={{ color: 'primary', sx: { color: 'primary.main', opacity: 1 } }}
            rightButtonProps={{ color: 'primary', sx: { color: 'primary.main', opacity: 1 } }}
            sx={{ position: 'absolute', bottom: 0 }}
          />
        )}
      </StyledContainer>

      <Box
        sx={{
          pl: `${offsetLeft}px`,
          width: { md: `calc(100% + 120px)` },
        }}
      >
        <Carousel ref={carouselRef} {...carouselSettings}>
          {PRODUCTS.map((product, index) => (
            <Box
              key={index}
              sx={{
                ml: '-1px',
                pl: { xs: 2, md: 4 },
                pr: { xs: 2, md: 0 },
                color: 'common.white',
              }}
            >
              <ShopProduct product={product} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

type ShopProductProps = {
  product: {
    name: string;
    image: string;
  };
};

function ShopProduct({ product }: ShopProductProps) {
  const { name, image } = product;
  const [price, setPrice] = useState(0);
  const isMdUp = useResponsive('up', 'md');

  useEffect(() => {
    setPrice(Math.floor(Math.random() * (500000 - 50000 + 1)) + 50000);
  }, []);

  return (
    <Stack>
      <Box
        component={m.div}
        whileHover={isMdUp ? 'hover' : undefined}
        variants={isMdUp ? varHover(0.95) : undefined}
        transition={isMdUp ? varTranHover() : undefined}
        sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}
      >
        <StyledOverlay>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 1, zIndex: 9, bottom: 24, position: 'absolute' }}
          >
            <Button variant="contained" color="primary">
              Acheter
            </Button>
          </Stack>
        </StyledOverlay>

        <m.div variants={isMdUp ? varHover(1.15) : undefined} transition={isMdUp ? varTranHover() : undefined}>
          <Image src={image} alt={name} ratio="3/4" />
        </m.div>
      </Box>

      <Stack spacing={0.5} sx={{ mt: 2.5, textAlign: 'center' }}>
        <Typography variant="h6">{name}</Typography>

        <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          {price.toLocaleString('fr-FR')} FCFA
        </Typography>
      </Stack>
    </Stack>
  );
}
