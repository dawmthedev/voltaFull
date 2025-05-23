import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Iconify from '../iconify';

export default function Icon({ checked, whiteColor, sx, ...other }) {
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
        transition: (theme) => theme.transitions.create('all', { duration: theme.transitions.duration.shortest }),
        ...(whiteColor && {
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          boxShadow: (theme) => `4px 4px 8px 0 ${alpha(theme.palette.grey[500], 0.24)}`,
          transform: 'scale(1.4)',
        }),
        ...sx,
      }}
      {...other}
    >
      {checked && (
        <Box
          sx={{
            width: 1,
            height: 1,
            opacity: 0.48,
            borderRadius: '50%',
            position: 'absolute',
            boxShadow: '4px 4px 8px 0 currentColor',
          }}
        />
      )}
      {checked && <Iconify icon="eva:checkmark-fill" />}
    </Box>
  );
}

Icon.propTypes = {
  sx: PropTypes.object,
  checked: PropTypes.bool,
  whiteColor: PropTypes.bool,
};
