import { memo } from 'react';
// next
import NextLink from 'next/link';
import Image from 'next/image';
// @mui
import { Box, BoxProps, Link } from '@mui/material';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
}

function Logo({ single = false, sx }: LogoProps) {
  return (
    <Link
      component={NextLink}
      href="/"
      color="inherit"
      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
    >
      <Box
        sx={{
          width: single ? 64 : 150,
          height: single ? 64 : 60,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          position: 'relative',
          ...sx,
        }}
      >
        <Image
          src="/favicon/android-chrome-512x512.png"
          alt="Michel Pro Wood Design"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    </Link>
  );
}

export default memo(Logo);
