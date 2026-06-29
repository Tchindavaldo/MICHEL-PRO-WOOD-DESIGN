// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import Head from 'next/head';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// theme
import ThemeProvider from 'src/theme';
// utils
import createEmotionCache from 'src/utils/createEmotionCache';
// components
import ProgressBar from 'src/components/progress-bar';
import { ThemeSettings, SettingsProvider } from 'src/components/settings';
import { SnackbarProvider } from 'notistack';
import MotionLazyContainer from 'src/components/animate/MotionLazyContainer';
import { CartProvider } from 'src/context/CartContext';
import DomainExpiredPage from 'src/components/DomainExpiredPage';

// ----------------------------------------------------------------------

// Mettre à false pour réactiver le site une fois un nom de domaine acheté.
const BLOCK_SITE = true;

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  if (BLOCK_SITE) {
    return (
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Site indisponible — URL Vercel expirée</title>
          <meta name="robots" content="noindex" />
        </Head>
        <DomainExpiredPage />
      </CacheProvider>
    );
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <ThemeProvider>
            <ThemeSettings>
              <MotionLazyContainer>
                <CartProvider>
                  <SnackbarProvider>
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </SnackbarProvider>
                </CartProvider>
              </MotionLazyContainer>
            </ThemeSettings>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}
