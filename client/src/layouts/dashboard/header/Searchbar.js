import React, { useState } from 'react';
import { chakra, Input, IconButton, Slide, Box, InputGroup, InputLeftElement, useOutsideClick } from '@chakra-ui/react';
import { transparentize } from '@chakra-ui/theme-tools';
import Iconify from '../../../components/iconify';

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = chakra('div', {
  baseStyle: {
    top: 0,
    left: 0,
    zIndex: 99,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    height: `${HEADER_MOBILE}px`,
    px: 3,
    bg: (theme) => transparentize(theme.colors.white, 0.2),
    backdropFilter: 'blur(6px)',
    boxShadow: 'md',
    '@media (min-width: 48em)': {
      height: `${HEADER_DESKTOP}px`,
      px: 5,
    },
  },
});

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
