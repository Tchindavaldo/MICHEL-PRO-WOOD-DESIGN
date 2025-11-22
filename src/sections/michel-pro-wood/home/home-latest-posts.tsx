import { useRef } from 'react';
import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Stack, Button, Link, Avatar } from '@mui/material';
// utils
import { fDate } from 'src/utils/formatTime';
import { bgGradient } from 'src/utils/cssStyles';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Carousel, { CarouselArrows, CarouselDots } from 'src/components/carousel';
import { varHover, varTranHover } from 'src/components/animate';
import PostTimeBlock from 'src/sections/blog/components/PostTimeBlock';

// ----------------------------------------------------------------------

const POSTS = [
  {
    id: '1',
    title: 'Lancement de la nouvelle session de formation 2025',
    duration: '5 min read',
    coverImg: '/assets/images/marketing/marketing_1.jpg',
    author: {
      name: 'MICHEL PRO WOOD DESIGN',
      picture: '/favicon/logo.png',
    },
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '2',
    title: 'Nos étudiants réalisent des meubles pour un hôtel de luxe',
    duration: '3 min read',
    coverImg: '/assets/images/marketing/marketing_2.jpg',
    author: {
      name: 'MICHEL PRO WOOD DESIGN',
      picture: '/favicon/logo.png',
    },
    createdAt: new Date('2025-02-10'),
  },
  {
    id: '3',
    title: 'Recrutement : Rejoignez notre équipe de menuisiers',
    duration: '2 min read',
    coverImg: '/assets/images/marketing/marketing_3.jpg',
    author: {
      name: 'MICHEL PRO WOOD DESIGN',
      picture: '/favicon/logo.png',
    },
    createdAt: new Date('2025-03-05'),
  },
  {
    id: '4',
    title: 'Portes ouvertes : Venez découvrir nos ateliers',
    duration: '4 min read',
    coverImg: '/assets/images/marketing/marketing_4.jpg',
    author: {
      name: 'MICHEL PRO WOOD DESIGN',
      picture: '/favicon/logo.png',
    },
    createdAt: new Date('2025-03-20'),
  },
];

// ----------------------------------------------------------------------

export default function HomeLatestPosts() {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots(),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
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
    <Container
      sx={{
        overflow: 'hidden',
        py: { xs: 8, md: 15 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: 'center', md: 'space-between' }}
      >
        <Typography variant="h3">Actualités et Nouveautés</Typography>

        <Button
          component={NextLink}
          href="#"
          color="inherit"
          endIcon={<Iconify icon="carbon:chevron-right" />}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          Voir tout
        </Button>
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows
          onNext={handleNext}
          onPrev={handlePrev}
          leftButtonProps={{ sx: { left: { xs: 0, md: -40 } } }}
          rightButtonProps={{ sx: { right: { xs: 0, md: -40 } } }}
        >
          <Carousel ref={carouselRef} {...carouselSettings}>
            {POSTS.map((post) => (
              <Box
                key={post.id}
                sx={{
                  px: 2,
                  py: { xs: 8, md: 10 },
                }}
              >
                <PostItem post={post} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>

      <Stack alignItems="center" sx={{ mt: 8, display: { xs: 'flex', md: 'none' } }}>
        <Button
          component={NextLink}
          href="#"
          color="inherit"
          endIcon={<Iconify icon="carbon:chevron-right" />}
        >
          Voir tout
        </Button>
      </Stack>
    </Container>
  );
}

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    direction: 'to top',
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

type PostItemProps = {
  post: {
    id: string;
    title: string;
    duration: string;
    coverImg: string;
    author: {
      name: string;
      picture: string;
    };
    createdAt: Date;
  };
};


function PostItem({ post }: PostItemProps) {
  const { title, duration, coverImg, author, createdAt } = post;
  const isMdUp = useResponsive('up', 'md');

  return (
    <Stack
      component={m.div}
      whileHover={isMdUp ? 'hover' : undefined}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: (theme) => theme.customShadows.z12,
      }}
    >
      <m.div variants={isMdUp ? varHover(1.25) : undefined} transition={isMdUp ? varTranHover() : undefined}>
        <Image src={coverImg} alt={title} ratio="3/4" />
      </m.div>

      <Stack
        justifyContent="space-between"
        sx={{
          p: 5,
          width: 1,
          height: 1,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Stack spacing={2}>
          <PostTimeBlock
            createdAt={fDate(createdAt)}
            duration={duration}
            sx={{ color: 'inherit', opacity: 0.72 }}
          />

          <Link
            component={NextLink}
            href="#"
            variant="h4"
            color="inherit"
            underline="none"
          >
            {title}
          </Link>
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Avatar src={author.picture} sx={{ mr: 1 }} />
          {author.name}
        </Stack>
      </Stack>

      <StyledOverlay />
    </Stack>
  );
}
