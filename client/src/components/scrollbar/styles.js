const { styled, alpha } = require('@mui/material/styles');
const SimpleBar = require('simplebar-react');

const StyledRootScrollbar = styled('div')({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
});

const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar:before': {
    backgroundColor: alpha(theme.palette?.grey?.[600] || '#000', 0.48),
  },
  '& .simplebar-scrollbar.simplebar-visible:before': {
    opacity: 1,
  },
  '& .simplebar-track.simplebar-vertical': { width: 10 },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': { height: 6 },
  '& .simplebar-mask': { zIndex: 'inherit' },
}));

module.exports = { StyledRootScrollbar, StyledScrollbar };
