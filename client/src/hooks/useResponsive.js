

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function useResponsive(query, start, end) {
  const theme = useTheme();

  const up = useMediaQuery(theme.breakpoints.up(start));
  const down = useMediaQuery(theme.breakpoints.down(start));
  const between = useMediaQuery(theme.breakpoints.between(start, end));
  const only = useMediaQuery(theme.breakpoints.only(start));

  if (query === 'up') return up;
  if (query === 'down') return down;
  if (query === 'between') return between;
  return only;
}

export function useWidth() {
  const theme = useTheme();

  // Call useMediaQuery for each breakpoint key.
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isXsUp = useMediaQuery(theme.breakpoints.up('xs'));

  if (isXlUp) return 'xl';
  if (isLgUp) return 'lg';
  if (isMdUp) return 'md';
  if (isSmUp) return 'sm';
  if (isXsUp) return 'xs';
  return 'xs';
}
