import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const authPrefix = '/dashboard';

const Layout: React.FC = () => {
  const location = useLocation();
  const showSidebar = location.pathname.startsWith(authPrefix);
  const disclosure = useDisclosure();

  return (
    <Flex h="100%">
      {showSidebar && (
        <Sidebar isOpen={disclosure.isOpen} onClose={disclosure.onClose} />
      )}
      <Box flex="1" display="flex" flexDirection="column">
        {showSidebar && <Navbar onOpen={disclosure.onOpen} />}
        <Box flex="1" overflowY="auto" bg="gray.50" p={6}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
