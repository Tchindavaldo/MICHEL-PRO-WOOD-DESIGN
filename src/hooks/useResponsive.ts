// @mui
import { useTheme, Breakpoint } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

type ReturnType = boolean;

type Query = 'up' | 'down' | 'between' | 'only';

type Value = Breakpoint | number;

export default function useResponsive(query: Query, start?: Value, end?: Value): ReturnType {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  const mediaUp = useMediaQuery(theme.breakpoints.up(start as Value), {
    noSsr: true,
  });

  const mediaDown = useMediaQuery(theme.breakpoints.down(start as Value), {
    noSsr: true,
  });

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start as Value, end as Value), {
    noSsr: true,
  });

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start as Breakpoint), {
    noSsr: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return false during SSR to avoid hydration mismatch
  if (!mounted) {
    return false;
  }

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

// ----------------------------------------------------------------------

type BreakpointOrNull = Breakpoint | null;

export function useWidth() {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}
