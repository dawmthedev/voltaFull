import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../../../components/iconify';
import { bgBlur } from '../../../utils/cssStyles';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import UtilityBillUploadModal from '../../../components/modals/Utility';

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  const [isUtilityBillModalOpen, setUtilityBillModalOpen] = useState(false);

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />

        <Box sx={{ flexGrow: 1 }} />

        <Button onClick={() => setUtilityBillModalOpen(true)} sx={{ mr: 2 }}>
          Upload Bill
        </Button>

        <IconButton sx={{ mr: 1 }}>
          <NotificationsPopover />
        </IconButton>
        <IconButton sx={{ mr: 1 }}>
          <LanguagePopover />
        </IconButton>
        <AccountPopover />
      </StyledToolbar>

      <UtilityBillUploadModal open={isUtilityBillModalOpen} setOpen={setUtilityBillModalOpen} />
    </StyledRoot>
  );
}
