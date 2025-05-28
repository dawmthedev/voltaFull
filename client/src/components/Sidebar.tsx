import React from 'react';
import {
  Box,
  VStack,
  Button,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from '@chakra-ui/react';
import { MdDashboard, MdWork, MdGroup, MdSettings } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/authSlice';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const adminLinks = [
    { label: 'Dashboard', icon: MdDashboard, path: '/dashboard' },
    { label: 'Projects', icon: MdWork, path: '/dashboard/projects' },
    { label: 'Teams', icon: MdGroup, path: '/dashboard/teams' },
    { label: 'Settings', icon: MdSettings, path: '/dashboard/settings' },
  ];

  const userLinks = [{ label: 'My Projects', icon: MdWork, path: '/dashboard/projects' }];

  const links = user?.role === 'Admin' ? adminLinks : userLinks;

  const content = (
    <VStack align="stretch" spacing={2}>
      {links.map((tab) => (
        <Button
          key={tab.path}
          as={NavLink}
          to={tab.path}
          leftIcon={<Icon as={tab.icon} />}
          justifyContent="flex-start"
          variant="ghost"
          _activeLink={{ bg: 'gray.100' }}
          onClick={onClose}
        >
          {tab.label}
        </Button>
      ))}
      <Button onClick={() => dispatch(logout())} justifyContent="flex-start" variant="ghost" color="red.500">
        Logout
      </Button>
    </VStack>
  );

  return (
    <>
      <Box
        as="nav"
        role="complementary"
        aria-label="Sidebar"
        w="240px"
        flexShrink={0}
        bg="white"
        p={4}
        borderRightWidth="1px"
        display={{ base: 'none', md: 'block' }}
      >
        {content}
      </Box>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody p={4}>{content}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
