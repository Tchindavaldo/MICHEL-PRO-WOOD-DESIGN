import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Stack, Button, Rating, Typography, TextField, Divider } from '@mui/material';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// routes
import { paths } from 'src/routes/paths';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
// context
import { useCart } from 'src/context/CartContext';
import { useSnackbar } from 'notistack';
//
import { ProductColorPicker, ProductOptionPicker, ProductPrice } from '../../components';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  { label: '#8B4513', value: 'chene' },
  { label: '#A0522D', value: 'noyer' },
  { label: '#CD853F', value: 'teck' },
  { label: '#DEB887', value: 'hetre' },
  { label: '#F5DEB3', value: 'pin' }, // Added Pin
];

const MEMORY_OPTIONS = [
  { label: 'Brut', value: 'brut' },
  { label: 'Vernis', value: 'vernis' },
  { label: 'Huilé', value: 'huile' },
  { label: 'Laqué', value: 'laque' },
];

// ----------------------------------------------------------------------

type Props = {
  id: string;
  name: string;
  price: number;
  rating: number;
  review: number;
  priceSale: number;
  caption: string;
  woodType?: string;
  finish?: string;
  coverUrl: string;
};

export default function EcommerceProductDetailsInfo({
  id,
  name,
  price,
  rating,
  review,
  priceSale,
  caption,
  woodType = 'Chêne',
  finish = 'Vernis',
  coverUrl,
}: Props) {
  const isMdUp = useResponsive('up', 'md');

  const { addToCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  // Normalize backend values to frontend keys
  const normalizeValue = (val: string) => {
    return val?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "";
  };

  const [color, setColor] = useState(normalizeValue(woodType));
  const [memory, setMemory] = useState(normalizeValue(finish));
  const [quantity, setQuantity] = useState(1);

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor((event.target as HTMLInputElement).value);
  };

  const handleChangeMemory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemory((event.target as HTMLInputElement).value);
  };

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddCart = () => {
    const newProduct = {
      id,
      name,
      price: priceSale > 0 ? priceSale : price,
      coverUrl,
      quantity,
      woodType: color,
      finish: memory,
    };
    try {
      const status = addToCart(newProduct);
      if (status === 'added') {
        enqueueSnackbar('Ajouté au panier avec succès !', { variant: 'success' });
      } else {
        enqueueSnackbar('Panier mis à jour avec succès !', { variant: 'info' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Erreur lors de l\'ajout au panier', { variant: 'error' });
    }
  };

  return (
    <>
      <Label color="success" sx={{ mb: 3 }}>
        En Stock
      </Label>

      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h4"> {name} </Typography>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Rating size="small" value={rating} readOnly precision={0.5} />

          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            ({review} avis)
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <ProductPrice price={price} priceSale={priceSale} sx={{ typography: 'h5' }} />

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {caption}
        </Typography>
      </Stack>

      <Stack spacing={3} sx={{ my: 5 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle2">Essence de Bois</Typography>
          <ProductColorPicker value={color} onChange={handleChangeColor} options={COLOR_OPTIONS} />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="subtitle2">Finition</Typography>
          <ProductOptionPicker
            value={memory}
            onChange={handleChangeMemory}
            options={MEMORY_OPTIONS}
          />
        </Stack>
      </Stack>

      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }}>
        <TextField
          select
          hiddenLabel
          SelectProps={{
            native: true,
          }}
          sx={{
            minWidth: 100,
          }}
          value={quantity}
          onChange={handleChangeQuantity}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth={!isMdUp}
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
            onClick={handleAddCart}
          >
            Ajouter au Panier
          </Button>

          <Button
            component={NextLink}
            href={paths.eCommerce.cart}
            fullWidth={!isMdUp}
            size="large"
            color="primary"
            variant="contained"
          >
            Acheter Maintenant
          </Button>
        </Stack>
      </Stack>

    </>
  );
}
