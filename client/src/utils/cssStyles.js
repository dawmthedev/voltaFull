

// @mui
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------
export function bgBlur({ color = '#000000', blur = 6, opacity = 0.8, imgUrl } = {}) {
  const backdrop = {
    backgroundColor: alpha(color, opacity),
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
  };
  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        ...backdrop,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
      },
    };
  }

  return backdrop;
}

export function bgGradient({ direction = 'to bottom', startColor, endColor, color, imgUrl } = {}) {
  const gradient = `linear-gradient(${direction}, ${startColor || color}, ${endColor || color})`;
  return {
    background: imgUrl ? `${gradient}, url(${imgUrl})` : gradient,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  };
}

export function textGradient(value) {
  return {
    background: `-webkit-linear-gradient(${value})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
}

export function filterStyles(value) {
  return {
    filter: value,
    WebkitFilter: value,
    MozFilter: value,
  };
}

export const hideScrollbarY = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': { display: 'none' },
};

export const hideScrollbarX = {
  overflowX: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};
