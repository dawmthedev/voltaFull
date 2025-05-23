import { alpha } from '@mui/material/styles';

const GREY = {
  0: '#FFFFFF',
  500: '#919EAB',
  600: '#637381',
  800: '#212B36',
};

const palette = {
  common: { black: '#000', white: '#fff' },
  grey: GREY,
  primary: { main: '#2065D1' },
  text: { primary: GREY[800], secondary: GREY[600] },
  divider: alpha(GREY[500], 0.24),
  background: { paper: '#fff', default: GREY[0] },
  action: { hover: alpha(GREY[500], 0.08) },
};

export default palette;
