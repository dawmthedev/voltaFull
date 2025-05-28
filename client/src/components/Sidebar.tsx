import React from "react";
import { Box, VStack, Button, Icon } from "@chakra-ui/react";
import { MdDashboard, MdWork, MdGroup, MdSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../store";
import { logout } from "../store/authSlice";
import UserAvatar from "./UserAvatar";

const tabs = [
  { label: 'Dashboard', icon: MdDashboard, path: '/dashboard' },
  { label: 'Projects', icon: MdWork, path: '/projects' },
  { label: 'Teams', icon: MdGroup, path: '/teams' },
  { label: 'Settings', icon: MdSettings, path: '/settings' }
];

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="220px"
      h="100vh"
      bg="white"
      borderRight="1px solid #E2E8F0"
      p={4}
    >
      <VStack align="stretch" spacing={4}>
        <UserAvatar />
        {tabs.map(tab => (
          <Button
            key={tab.path}
            as={NavLink}
            to={tab.path}
            leftIcon={<Icon as={tab.icon} />}
            justifyContent="flex-start"
            variant="ghost"
            _activeLink={{ bg: 'gray.100' }}
          >
            {tab.label}
          </Button>
        ))}
        <Button
          onClick={() => dispatch(logout())}
          justifyContent="flex-start"
          variant="ghost"
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
