import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Avatar,
  Divider,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { Box, Typography } from '@mui/material';


import { useNavigate } from 'react-router-dom';
import account from '../../../_mock/account';

function MenuOption({ label, onClick }) {
  return (
    <MenuItem onClick={onClick}>
      {label}
    </MenuItem>
  );
}

MenuOption.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default function AccountPopover({ onLogout }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    if (onLogout) onLogout();
    navigate('/login', { replace: true });
  };

  const open = Boolean(anchorEl);

  return (
    <>


      <IconButton onClick={handleOpen} p={0}>

        <Avatar src={account.photoURL} alt="account" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}


        open={Boolean(anchorEl)}


        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { p: 0, mt: 1.5, ml: 0.75, width: 180 } }}
      >


        <Box my={1.5} px={2.5}>
          <Typography sx={{ fontWeight: 600 }} noWrap>

            {account.displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {account.email}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack p={1}>
          <MenuOption label="Profile" onClick={() => {
            handleClose();
            navigate('/dashboard/app');
          }} />

        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

AccountPopover.propTypes = {
  onLogout: PropTypes.func,
};
