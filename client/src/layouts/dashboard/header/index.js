import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { Box, Button } from '@mui/material';
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
  background: theme.palette.common.white,
  zIndex: theme.zIndex.appBar,
}));

const StyledToolbar = styled(Box)(({ theme }) => ({
  display: 'flex',
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
          mr={1}
          color="gray.800"
          display={{ lg: 'none' }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />

        <Box flex="1" />

        <Button onClick={() => setUtilityBillModalOpen(true)} mr={2}>
          Upload Bill
        </Button>

        <IconButton mr={1}>
          <NotificationsPopover />
        </IconButton>
        <IconButton mr={1}>
          <LanguagePopover />
        </IconButton>
        <AccountPopover />
      </StyledToolbar>

      <UtilityBillUploadModal open={isUtilityBillModalOpen} setOpen={setUtilityBillModalOpen} />
    </StyledRoot>
  );
}
