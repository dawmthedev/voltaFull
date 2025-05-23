import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Box, IconButton, Button, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Iconify from '../../../components/iconify';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import UtilityBillUploadModal from '../../../components/modals/Utility';

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledRoot = styled('header')(({ theme }) => ({
  position: 'sticky',
  top: 0,
  width: '100%',
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  backgroundColor: 'white',
  zIndex: theme.zIndex.appBar,
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
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
          sx={{ mr: 0.5, color: 'grey.800', display: { lg: 'none' } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />

        <Box sx={{ flexGrow: 1 }} />

        <Button onClick={() => setUtilityBillModalOpen(true)} sx={{ mr: 1 }}>
          Upload Bill
        </Button>


        <IconButton sx={{ mr: 0.5 }}>
          <NotificationsPopover />
        </IconButton>
        <IconButton sx={{ mr: 0.5 }}>
          <LanguagePopover />
        </IconButton>

        <AccountPopover />
      </StyledToolbar>

      <UtilityBillUploadModal open={isUtilityBillModalOpen} setOpen={setUtilityBillModalOpen} />
    </StyledRoot>
  );
}
