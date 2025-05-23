import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    onClose();
    if (onLogout) onLogout();
    navigate('/login', { replace: true });
  };

  return (
    <Menu isOpen={isOpen} onClose={onClose} placement="bottom-end">
      <MenuButton as={IconButton} onClick={onOpen} p={0}>
        <Avatar src={account.photoURL} alt="account" />
      </MenuButton>
      <MenuList p={0} mt={1.5} ml={0.75} w="180px">
        <Box my={1.5} px={2.5}>
          <Text fontWeight="semibold" noOfLines={1}>
            {account.displayName}
          </Text>
          <Text fontSize="sm" color="gray.500" noOfLines={1}>
            {account.email}
          </Text>
        </Box>
        <Divider borderStyle="dashed" />
        <Stack p={1}>
          <MenuOption label="Profile" onClick={() => navigate('/dashboard/app')} />
        </Stack>
        <Divider borderStyle="dashed" />
        <MenuItem onClick={handleLogout} m={1}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

AccountPopover.propTypes = {
  onLogout: PropTypes.func,
};
