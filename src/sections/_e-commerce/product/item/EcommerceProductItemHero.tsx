// next
import NextLink from 'next/link';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Button, Unstable_Grid2 as Grid } from '@mui/material';
// utils
import { filterStyles } from 'src/utils/cssStyles';
// components
import Image from 'src/components/image';
import Markdown from 'src/components/markdown';
import Iconify from 'src/components/iconify';

import Label from 'src/components/label';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

type Props = {
  product: {
    id: string;
    title: string;
    caption: string;
    label: string;
    coverImg: string;
    btnText?: string;
    btnLink?: string;
  };
};

export default function EcommerceProductItemHero({ product }: Props) {
  const theme = useTheme();

  const { label, title, caption, coverImg, btnText, btnLink } = product;

  return (
    <Grid
      container
      rowSpacing={{
        xs: 5,
        md: 0,
      }}
      sx={{
        py: 10,
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid xs={12} md={6}>
        <Box
          sx={{
            maxWidth: { md: 440 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          {label && (
            <Label color="warning" sx={{ mb: 2 }}>
              {label}
            </Label>
          )}

          <TextMaxLine variant="h3" sx={{ mb: 2 }}>
            {title}
          </TextMaxLine>

          {caption && (
            <Markdown 
              content={caption} 
              sx={{ mb: 5, color: 'text.secondary', '& p': { typography: 'body2' } }} 
            />
          )}


          <Button
            component={NextLink}
            href={btnLink || '#'}
            size="large"
            color="inherit"
            variant="contained"
            endIcon={<Iconify icon="carbon:chevron-right" />}
          >
            {btnText || 'Acheter Maintenant'}
          </Button>
        </Box>
      </Grid>

      <Grid xs={12} md={6}>
        <Image
          ratio="1/1"
          src={coverImg}
          sx={{
            ...filterStyles(
              `drop-shadow(20px 20px 24px ${alpha(theme.palette.common.black, 0.16)})`
            ),
            maxWidth: 400,
            ml: 'auto',
            mr: { xs: 'auto', md: 'unset' },
          }}
        />
      </Grid>
    </Grid>
  );
}
