import React from "react";
import {
  Box,
  VStack,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Slide,
} from "@chakra-ui/react";
import {
  FiGrid,
  FiUsers,
  FiDollarSign,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/authSlice";
import SidebarItem from "./SidebarItem";
import ThemeToggle from "./ThemeToggle";
import { useLayout } from "./Layout";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  toggleRef?: React.RefObject<HTMLButtonElement>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onClose,
  toggleRef,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { closeSidebar } = useLayout();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const handleClose = () => {
    onClose?.();
    toggleRef?.current?.focus();
  };

  const content = (
    <Box
      w={{ base: "full", md: "240px" }}
      h="100vh"
      bg={bg}
      borderRight="1px solid"
      borderColor={borderColor}
      display="flex"
      flexDirection="column"
      className="shadow-lg transform transition-all duration-300 ease-in-out 
        backdrop-blur-sm bg-white/90 dark:bg-gray-800/90
        md:translate-x-0 touch-pan-y overscroll-none"
    >
      <VStack flex="1" spacing={4} align="stretch" px={6} pt={6}>
        <Box className="mb-8 flex items-center justify-between">
          <Text
            className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 
            bg-clip-text text-transparent"
          >
            Volta
          </Text>
          <button
            onClick={onClose}
            className="md:hidden rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700
              active:scale-95 transition-transform"
          >
            ×
          </button>
        </Box>

        {/* Mobile-optimized navigation items */}
        <div className="space-y-1">
          <SidebarItem
            icon={FiGrid}
            label="Projects"
            to="/dashboard/projects"
            isOpen={true}
            onNavigate={closeSidebar}
          />
          {user?.role === "Technician" && (
            <SidebarItem
              icon={FiSettings}
              label="Technician Allocation"
              to="/dashboard/technician"
              isOpen={true}
              onNavigate={closeSidebar}
            />
          )}
          {user?.role === "Admin" && (
            <>
              <SidebarItem
                icon={FiDollarSign}
                label="Accounts Payable"
                to="/dashboard/accounts"
                isOpen={true}
                onNavigate={closeSidebar}
              />
              <SidebarItem
                icon={FiUsers}
                label="Users"
                to="/dashboard/users"
                isOpen={true}
                onNavigate={closeSidebar}
              />
            </>
          )}
          <SidebarItem
            icon={FiUsers} // Changed from FiUser to FiUsers for profile
            label="Profile"
            to="/dashboard/profile"
            isOpen={true}
            onNavigate={closeSidebar}
          />
        </div>
      </VStack>

      <Box
        mt="auto"
        px={6}
        pb={6}
        borderTop="1px solid"
        borderColor={borderColor}
        className="backdrop-blur-sm bg-gray-50/50 dark:bg-gray-800/50"
      >
        <HStack spacing={3} mb={4} justify="space-between" className="py-4">
          <Text className="text-gray-600 dark:text-gray-400 font-medium">
            Settings
          </Text>
          <ThemeToggle size="sm" />
        </HStack>
        <button
          onClick={() => dispatch(logout())}
          className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2 group"
        >
          <Icon
            as={FiLogOut}
            className="transform group-hover:-translate-x-1 transition-transform"
          />
          <Text>Logout</Text>
        </button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer with touch gestures */}
      {isOpen && (
        <Box className="touch-pan-y overscroll-none md:hidden">
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={handleClose}
            finalFocusRef={toggleRef}
          >
            <DrawerOverlay backdropFilter="blur(4px)" />
            <DrawerContent maxW="85%">{content}</DrawerContent>
          </Drawer>
        </Box>
      )}

      {/* Desktop slide */}
      <Slide direction="left" in={isOpen} style={{ zIndex: 20 }} unmountOnExit>
        <Box className="hidden md:block h-screen flex-shrink-0">{content}</Box>
      </Slide>
    </>
  );
};

export default Sidebar;
