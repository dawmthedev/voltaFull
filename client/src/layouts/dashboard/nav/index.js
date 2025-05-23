import PropTypes from 'prop-types';
import { useEffect } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Avatar,
  Text,
  Link,
  Button,
  chakra,
} from '@chakra-ui/react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import useResponsive from '../../../hooks/useResponsive';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import AdminNavSection from '../../../components/admin-navsection';
import navConfig from './config';
import AdminConfig from './AdminConfig';
import { useAppSelector } from '../../../hooks/hooks';
import { authSelector } from '../../../redux/slice/authSlice';
import account from '../../../_mock/account';

const NAV_WIDTH = 280;

const StyledAccount = chakra('div', {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    p: 2,
    borderRadius: 'md',
    bg: (theme) => alpha(theme.palette.grey[500], 0.12),
  },
});

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const { data } = useAppSelector(authSelector);
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box px={2.5} py={3} display="flex" justifyContent="flex-start" alignItems="center">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/iconImages/logo.png`}
          alt="Voltaic CRM Logo"
          style={{ maxWidth: '150px', maxHeight: '150px', width: 'auto', height: 'auto', objectFit: 'contain' }}
        />
      </Box>
      <Box mb={5} mx={2.5}>
        <Link textDecoration="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box ml={2}>
              <Text fontWeight="semibold" color="gray.800">
                {account.displayName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {account.role}
              </Text>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      {data.role === 'Mentor' ? <AdminNavSection data={AdminConfig} /> : <NavSection data={navConfig} />}
      <Box flexGrow={1} />
      <Box px={2.5} pb={3} mt={10}>
        <Button href="/login" colorScheme="blue">
          Log out
        </Button>
      </Box>
    </Scrollbar>
  );

  return (
    <Box as="nav" flexShrink={{ lg: 0 }} w={{ lg: NAV_WIDTH }}>
      {isDesktop ? (
        <Box w={NAV_WIDTH} bg="gray.50" borderRight="1px dashed" borderColor="gray.200">
          {renderContent}
        </Box>
      ) : (
        <Drawer isOpen={openNav} onClose={onCloseNav} placement="left">
          <DrawerOverlay />
          <DrawerContent w={NAV_WIDTH}>
            <DrawerBody p={0}>{renderContent}</DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
}
