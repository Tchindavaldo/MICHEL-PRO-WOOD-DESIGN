import { useState, useRef } from 'react';
import NextLink from 'next/link';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
// @mui
import { useTheme } from '@mui/material/styles';
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
import Markdown from 'src/components/markdown';
import Carousel, { CarouselArrows } from 'src/components/carousel';

import { fCurrency } from 'src/utils/formatNumber';
import { ProductColorPicker, ProductOptionPicker, ProductCountdownBlock, ProductPrice } from '../components';
// types
import { IShopProduct, IShopPageContent } from 'src/types/shop';


// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  { label: '#8B4513', value: 'chene' },
  { label: '#A0522D', value: 'noyer' },
  { label: '#CD853F', value: 'teck' },
  { label: '#DEB887', value: 'hetre' },
];

const FINISH_OPTIONS = [
  { label: 'Brut', value: 'brut' },
  { label: 'Vernis', value: 'vernis' },
  { label: 'Huilé', value: 'huile' },
  { label: 'Laqué', value: 'laque' },
];

// ----------------------------------------------------------------------

type Props = {
  products: IShopProduct[];
  content?: IShopPageContent;
};

export default function EcommerceLandingSpecialOffer({ products, content }: Props) {
  const theme = useTheme();
  const carouselRef = useRef<Carousel | null>(null);

  const [color, setColor] = useState('chene');
  const [finish, setFinish] = useState('vernis');

  const carouselSettings = {
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    rtl: Boolean(theme.direction === 'rtl'),
  };

  return (
    <Container sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 8 }}>
        <Typography variant="h3">{content?.title || 'Offre Spéciale'}</Typography>

        {products.length > 1 && (
          <CarouselArrows
            onNext={() => carouselRef.current?.slickNext()}
            onPrev={() => carouselRef.current?.slickPrev()}
          />
        )}
      </Box>

      <Carousel ref={carouselRef} {...carouselSettings}>
        {products.map((product) => (
          <Box key={product.id}>
            <Box
              gap={{ xs: 5, md: 8 }}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
            >
              <SpecialOfferCountdown
                label={product.special_offer_label || 'Offre Limitée'}
                name={product.name}
                price={product.price}
                priceSale={product.priceSale}
                expired={new Date(product.hot_deal_expires_at || Date.now() + 86400000)}
              />


              <Box sx={{ borderRadius: 1.5, bgcolor: 'background.neutral', height: 1, maxHeight: 400, overflow: 'hidden' }}>
                <Image
                  src={product.coverImg}
                  sx={{ height: 1, objectFit: 'cover' }}
                />
              </Box>

              <SpecialOfferBuyNow
                name={product.name}
                description={product.description}
                color={color}
                finish={finish}
                onChangeColor={(e) => setColor(e.target.value)}
                onChangeFinish={(e) => setFinish(e.target.value)}
                path={`/e-commerce/product/${product.id}`}
              />
            </Box>

          </Box>
        ))}
      </Carousel>
    </Container>
  );
}

// ─── Sub-components ───

interface SpecialOfferCountdownProps extends StackProps {
  expired: Date;
  label: string;
  name: string;
  price: number;
  priceSale?: number;
}

function SpecialOfferCountdown({ expired, label, name, price, priceSale, sx, ...other }: SpecialOfferCountdownProps) {
  const isExpired = expired.getTime() <= Date.now();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ p: 5, borderRadius: 2, textAlign: 'center', boxShadow: (theme) => theme.customShadows.z24, ...sx }}
      {...other}
    >
      <Typography variant="overline" sx={{ color: 'primary.main' }}>{label}</Typography>
      <Typography variant="h5" sx={{ mt: 1, mb: 3 }}>{name}</Typography>
      
      <Box sx={{ px: 2, py: 1, borderRadius: 1, border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}` }}>
        <ProductPrice price={price} priceSale={priceSale} expiresAt={expired} sx={{ typography: 'subtitle1' }} />
      </Box>

      {!isExpired && (
        <>
          <Divider sx={{ borderStyle: 'dashed', my: 3, width: 1 }} />
          <Typography variant="body2" sx={{ mb: 2 }}>{`L'offre se termine dans :`}</Typography>
          <ProductCountdownBlock
            expired={expired}
            sx={{
              '& .value': { color: 'text.primary', bgcolor: 'transparent', border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.32)}` },
              '& .label': { color: 'text.secondary' },
              '& .separator': { color: 'inherit' },
            }}
          />
        </>
      )}
    </Stack>
  );
}

interface SpecialOfferBuyNowProps extends StackProps {
  color: string;
  finish: string;
  name: string;
  description: string;
  path: string;
  onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFinish: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SpecialOfferBuyNow({ name, description, color, finish, path, onChangeColor, onChangeFinish, sx, ...other }: SpecialOfferBuyNowProps) {
  return (
    <Stack spacing={3} alignItems="flex-start" {...other}>
      <Stack spacing={1}>
        <Typography variant="h4">{name}</Typography>
        <Markdown content={description} sx={{ color: 'text.secondary', '& p': { typography: 'body2' } }} />
      </Stack>


      <Stack spacing={2}>
        <Typography variant="subtitle2">Essence de Bois</Typography>
        <ProductColorPicker value={color} onChange={onChangeColor} options={COLOR_OPTIONS} />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="subtitle2">Finition</Typography>
        <ProductOptionPicker value={finish} onChange={onChangeFinish} options={FINISH_OPTIONS} />
      </Stack>

      <Button component={NextLink} href={path} size="large" color="inherit" variant="contained">
        Acheter Maintenant
      </Button>
    </Stack>
  );
}
