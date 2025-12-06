import { useState } from 'react';
import { add } from 'date-fns';
import NextLink from 'next/link';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
// @mui
import {
  Box,
  Stack,
  alpha,
  Button,
  Divider,
  Container,
  Typography,
  StackProps,
} from '@mui/material';
// components
import Image from 'src/components/image';
//
import { ProductColorPicker, ProductOptionPicker, ProductCountdownBlock } from '../components';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  { label: '#8B4513', value: 'chene' },
  { label: '#A0522D', value: 'noyer' },
  { label: '#CD853F', value: 'teck' },
  { label: '#DEB887', value: 'hetre' },
];

const MEMORY_OPTIONS = [
  { label: 'Brut', value: 'brut' },
  { label: 'Vernis', value: 'vernis' },
  { label: 'Huilé', value: 'huile' },
  { label: 'Laqué', value: 'laque' },
];

// ----------------------------------------------------------------------

export default function EcommerceLandingSpecialOffer() {
  const [color, setColor] = useState('chene');

  const [memory, setMemory] = useState('vernis');

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor((event.target as HTMLInputElement).value);
  };

  const handleChangeMemory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemory((event.target as HTMLInputElement).value);
  };

  return (
    <Container
      sx={{
        py: { xs: 5, md: 8 },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 8,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        Offre Spéciale
      </Typography>

      <Box
        gap={{ xs: 5, md: 8 }}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        <SpecialOfferCountdown
          label="Nouveau 2023"
          name="Ensemble Salle à Manger Premium"
          price="À partir de 450 000 FCFA"
          expired={add(new Date(), { days: 1, hours: 8 })}
        />

        <Box sx={{ borderRadius: 1.5, bgcolor: 'background.neutral', height: 1, overflow: 'hidden' }}>
          <Image
            src="/assets/images/michel-pro-wood/vente/table chaisse sale a manger.JPG"
            sx={{ height: 1, objectFit: 'cover' }}
          />
        </Box>

        <SpecialOfferBuyNow
          color={color}
          memory={memory}
          onChangeColor={handleChangeColor}
          onChangeMemory={handleChangeMemory}
        />
      </Box>


    </Container>
  );
}

// ----------------------------------------------------------------------

interface SpecialOfferCountdownProps extends StackProps {
  expired: Date;
  label: string;
  name: string;
  price: string;
}

function SpecialOfferCountdown({
  expired,
  label,
  name,
  price,
  sx,
  ...other
}: SpecialOfferCountdownProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 5,
        borderRadius: 2,
        textAlign: 'center',
        boxShadow: (theme) => theme.customShadows.z24,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="overline" sx={{ color: 'primary.main' }}>
        {label}
      </Typography>

      <Typography variant="h5" sx={{ mt: 1, mb: 3 }}>
        {name}
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          px: 2,
          py: 1,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }}
      >
        {price}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed', my: 3, width: 1 }} />

      <Typography variant="body2" sx={{ mb: 2 }}>
        L'offre se termine dans :
      </Typography>

      <ProductCountdownBlock
        expired={expired}
        sx={{
          '& .value': {
            color: 'text.primary',
            bgcolor: 'transparent',
            border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
          },
          '& .label': { color: 'text.secondary' },
          '& .separator': { color: 'inherit' },
        }}
      />
    </Stack>
  );
}

// ----------------------------------------------------------------------

interface SpecialOfferBuyNowProps extends StackProps {
  color: string;
  memory: string;
  onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMemory: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SpecialOfferBuyNow({
  color,
  memory,
  onChangeColor,
  onChangeMemory,
  sx,
  ...other
}: SpecialOfferBuyNowProps) {
  return (
    <Stack spacing={3} alignItems="flex-start" {...other}>
      <Stack spacing={1}>
        <Typography variant="h4">Ensemble Salle à Manger Premium</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Profitez de notre offre exceptionnelle sur cet ensemble salle à manger en bois massif.
          Design élégant, confort optimal et durabilité garantie pour vos repas en famille.
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="subtitle2">Essence de Bois</Typography>
        <ProductColorPicker value={color} onChange={onChangeColor} options={COLOR_OPTIONS} />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="subtitle2">Finition</Typography>
        <ProductOptionPicker value={memory} onChange={onChangeMemory} options={MEMORY_OPTIONS} />
      </Stack>

      <Button size="large" color="inherit" variant="contained">
        Acheter Maintenant
      </Button>
    </Stack>
  );
}
