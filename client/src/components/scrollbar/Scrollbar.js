import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
//
import { StyledRootScrollbar, StyledScrollbar } from './styles';

// ----------------------------------------------------------------------
Scrollbar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};
function Scrollbar({ children, sx, ...other }) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }
  return (
    <StyledRootScrollbar>
      <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}
export default memo(Scrollbar);
