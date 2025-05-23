import React, { useState } from 'react';
import { Input, IconButton, Slide, InputGroup, InputLeftElement, useOutsideClick } from '@chakra-ui/react';
import { Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
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
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  background: alpha(theme.palette.common.white, 0.2),
  backdropFilter: 'blur(6px)',
  boxShadow: theme.shadows[4],
  [theme.breakpoints.up('md')]: {
    height: `${HEADER_DESKTOP}px`,
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
  },
}));

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  useOutsideClick({ ref, handler: () => setOpen(false) });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box ref={ref} position="relative">
      {!open && (
        <IconButton onClick={handleOpen} color="gray.800">
          <Iconify icon="eva:search-fill" />
        </IconButton>
      )}
      <Slide direction="down" in={open} style={{ zIndex: 99 }}>
        <StyledSearchbar>
          <InputGroup mr={1} flex="1">
            <InputLeftElement pointerEvents="none">
              <Iconify icon="eva:search-fill" />
            </InputLeftElement>
            <Input autoFocus placeholder="Search…" />
          </InputGroup>
          <IconButton onClick={handleClose} ml={1}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </StyledSearchbar>
      </Slide>
    </Box>
  );
}
