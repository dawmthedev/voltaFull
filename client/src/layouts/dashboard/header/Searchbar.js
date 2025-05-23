import React, { useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/material';



import Iconify from '../../../components/iconify';

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;


const StyledSearchbar = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',

  height: `${HEADER_MOBILE}px`,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  backdropFilter: 'blur(6px)',
  boxShadow: theme.shadows[3],
  '@media (min-width: 48em)': {
    height: `${HEADER_DESKTOP}px`,
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),


  },
}));

export default function Searchbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box position="relative">
        {!open && (
          <IconButton onClick={handleOpen} color="inherit">
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}
        <Slide direction="down" in={open} style={{ zIndex: 99 }}>
          <StyledSearchbar>
            <TextField
              autoFocus
              placeholder="Search…"
              sx={{ flex: 1, mr: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton onClick={handleClose} sx={{ ml: 1 }}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </StyledSearchbar>
        </Slide>
      </Box>
    </ClickAwayListener>
  );
}
