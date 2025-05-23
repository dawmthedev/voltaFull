import { alpha } from '@mui/material/styles';
import palette from './palette';

const color = palette.grey[500];

export default function customShadows() {
  const transparent = alpha(color, 0.16);
  return {
    z1: `0 1px 2px 0 ${transparent}`,
  };
}
