import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Box, Drawer, Avatar, Typography, Link, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
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

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: alpha(theme.palette.grey[500], 0.12),
}));

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
      <Box sx={{ px: 2.5, py: 3, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/iconImages/logo.png`}
          alt="Voltaic CRM Logo"
          style={{ maxWidth: '150px', maxHeight: '150px', width: 'auto', height: 'auto', objectFit: 'contain' }}
        />
      </Box>
      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography fontWeight="fontWeightSemibold" color="grey.800">
                {account.displayName}
              </Typography>
              <Typography variant="body2" color="grey.500">
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      {data.role === 'Mentor' ? <AdminNavSection data={AdminConfig} /> : <NavSection data={navConfig} />}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Button href="/login" variant="contained" color="primary">
          Log out
        </Button>
      </Box>
    </Scrollbar>
  );

  return (
    <Box component="nav" sx={{ flexShrink: { lg: 0 }, width: { lg: NAV_WIDTH } }}>
      {isDesktop ? (
        <Box sx={{ width: NAV_WIDTH, bgcolor: 'grey.50', borderRight: '1px dashed', borderColor: 'grey.200' }}>
          {renderContent}
        </Box>
      ) : (
        <Drawer anchor="left" open={openNav} onClose={onCloseNav} PaperProps={{ sx: { width: NAV_WIDTH } }}>
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
