import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Box } from '@mui/material';

import Iconify from '../iconify';

// ----------------------------------------------------------------------
Icon.propTypes = {
  sx: PropTypes.object,
  checked: PropTypes.bool,
  whiteColor: PropTypes.bool,
};

export default function Icon({ checked, whiteColor, sx, ...other }) {
  const shadowSx = {
    width: 1,
    height: 1,
    opacity: 0.48,
    borderRadius: '50%',
    position: 'absolute',
    boxShadow: '4px 4px 8px 0 currentColor',
  };

  const iconSx = {
    width: 12,
    height: 12,
    opacity: 0,
    ...(checked && {
      opacity: 1,
      color: 'common.white',
      ...(whiteColor && { color: 'common.black' }),
    }),
  };

  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'currentColor',
        transition: (theme) =>
          theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
          }),
        ...(whiteColor && {
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          boxShadow: (theme) =>
            `4px 4px 8px 0 ${alpha(theme.palette.grey[500], 0.24)}`,
          transform: 'scale(1.4)',
        }),
        ...sx,
      }}
      {...other}
    >
      {checked && <Box sx={shadowSx} />}
      <Iconify icon="eva:checkmark-fill" sx={iconSx} />
    </Box>
  );
}
