import * as React from 'react';
// next
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from 'next/document';
import { AppType } from 'next/app';
// emotion
import createEmotionServer from '@emotion/server/create-instance';
// utils
import createEmotionCache from 'src/utils/createEmotionCache';
// theme
import { primaryFont } from 'src/theme/typography';
// seo
import { BRAND_COLOR, SITE_NAME, SITE_LANG } from 'src/config-seo';
import {
  organizationJsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
} from 'src/components/seo/structured-data';
//
import { MyAppProps } from './_app';

// ----------------------------------------------------------------------

const Favicon = () => (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
    <link rel="shortcut icon" href="/favicon/favicon.ico" />
    <link rel="manifest" href="/manifest.webmanifest" />
  </>
);

const Meta = () => (
  <>
    {/* Couleur de marque (barre navigateur / PWA) */}
    <meta name="theme-color" content={BRAND_COLOR} />
    <meta name="author" content={SITE_NAME} />
    <meta name="publisher" content={SITE_NAME} />
    <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
    <meta name="application-name" content={SITE_NAME} />
    <meta name="format-detection" content="telephone=no" />
    {/* Performance : préconnexion aux polices Google */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  </>
);

// Données structurées globales (présentes sur toutes les pages).
const GlobalJsonLd = () => (
  <>
    {[organizationJsonLd, localBusinessJsonLd, websiteJsonLd].map((data, i) => (
      <script
        key={`global-jsonld-${i}`}
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    ))}
  </>
);

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang={SITE_LANG} className={primaryFont.className}>
      <Head>
        <Favicon />
        <Meta />
        <GlobalJsonLd />
        {/* Emotion */}
        <meta name="emotion-insertion-point" content="" />
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
