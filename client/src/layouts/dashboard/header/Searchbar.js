import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, IconButton, ClickAwayListener, Slide } from '@mui/material';
import Iconify from '../../../components/iconify';

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(6px)',
  boxShadow: theme.shadows[3],
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function Searchbar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen} sx={{ color: 'text.primary' }}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}
        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <InputBase
              autoFocus
              fullWidth
              placeholder="Search…"
              startAdornment={<Iconify icon="eva:search-fill" sx={{ mr: 1 }} />}
              sx={{ mr: 1 }}
            />
            <IconButton onClick={handleClose}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
