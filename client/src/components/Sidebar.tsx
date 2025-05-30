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

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose, toggleRef }) => {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const { closeSidebar } = useLayout()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  const handleClose = () => {
    onClose?.()
    toggleRef?.current?.focus()
  }

  const content = (
    <Box
      w="220px"
      h="100vh"
      bg={bg}
      borderRight="1px solid"
      borderColor={borderColor}
      display="flex"
      flexDirection="column"
      transition="background 0.2s, color 0.2s"
    >
      <VStack flex="1" spacing={4} align="stretch" px={4} pt={4}>
        <SidebarItem icon={FiGrid} label="Projects" to="/dashboard/projects" isOpen={true} onNavigate={closeSidebar} />
        {user?.role === 'Technician' && (
          <SidebarItem icon={FiSettings} label="Technician Allocation" to="/dashboard/technician" isOpen={true} onNavigate={closeSidebar} />
        )}
        {user?.role === 'Admin' && (
          <>
            <SidebarItem icon={FiDollarSign} label="Accounts Payable" to="/dashboard/accounts" isOpen={true} onNavigate={closeSidebar} />
            <SidebarItem icon={FiUsers} label="Users" to="/dashboard/users" isOpen={true} onNavigate={closeSidebar} />
          </>
        )}
      </VStack>
      <Box mt="auto" px={4} pb={4}
        borderTop="1px solid" borderColor={borderColor}
        transition="background 0.2s, color 0.2s">
        <HStack spacing={2} mb={2} justify="space-between">
          <Text color={useColorModeValue('gray.600', 'gray.300')}>Settings</Text>
          <ThemeToggle size="sm" />
        </HStack>
        <HStack
          as="button"
          onClick={() => dispatch(logout())}
          px={2}
          py={2}
          spacing={2}
          _hover={{ bg: hoverBg }}
          w="full"
        >
          <Icon as={FiLogOut} boxSize={5} />
          <Text>Logout</Text>
        </HStack>
      </Box>
    </Box>
  )

  return (
    <>
      {/* Mobile drawer */}
      {isOpen && (
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={handleClose}
          finalFocusRef={toggleRef}
        >
          <DrawerOverlay />
          <DrawerContent>{content}</DrawerContent>
        </Drawer>
      )}

      {/* Desktop slide */}
      <Slide direction="left" in={isOpen} style={{ zIndex: 20 }} unmountOnExit>
        <Box className="hidden md:block h-screen flex-shrink-0">
          {content}
        </Box>
      </Slide>
    </>
  )
};

export default Sidebar;
