import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
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
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
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
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={() => setUtilityBillModalOpen(true)} sx={{ mr: 2 }}>
          Upload Bill
        </Button>
        <AccountPopover />
      </StyledToolbar>
      <UtilityBillUploadModal open={isUtilityBillModalOpen} setOpen={setUtilityBillModalOpen} />
    </StyledRoot>
  );
}
