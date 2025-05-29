import React from "react";
import {
  Box,
  IconButton,
  VStack,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  FiGrid,
  FiBriefcase,
  FiUsers,
  FiDollarSign,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../store/authSlice";
import SidebarItem from "./SidebarItem";
import ThemeToggle from "./ThemeToggle";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      position={{ base: "fixed", md: "sticky" }}
      top={0}
      left={0}
      h="100vh"
      transform={{ base: isSidebarOpen ? "translateX(0)" : "translateX(-100%)", md: "none" }}
      transition="transform 0.3s"
      width="220px"
      bg={bg}
      borderRight="1px solid"
      borderColor={borderColor}
      flexShrink={0}
      display="flex"
      flexDirection="column"
      zIndex={50}
    >
      <IconButton
        aria-label="Toggle sidebar"
        icon={<HamburgerIcon />}
        size="sm"
        m={2}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      />
      <VStack
        flex="1"
        spacing={4}
        align="stretch"
        px={isSidebarOpen ? 4 : 2}
        pt={4}
      >
        <Box onClick={() => setSidebarOpen(false)}>
          <SidebarItem
            icon={FiGrid}
            label="Projects"
            to="/dashboard/projects"
            isOpen={isSidebarOpen}
          />
        </Box>
        {user?.role === "Technician" && (
          <Box onClick={() => setSidebarOpen(false)}>
            <SidebarItem
              icon={FiSettings}
              label="Technician Allocation"
              to="/dashboard/technician"
              isOpen={isSidebarOpen}
            />
          </Box>
        )}
        {user?.role === "Admin" && (
          <>
            <Box onClick={() => setSidebarOpen(false)}>
              <SidebarItem
                icon={FiDollarSign}
                label="Accounts Payable"
                to="/dashboard/accounts"
                isOpen={isSidebarOpen}
              />
            </Box>
            <Box onClick={() => setSidebarOpen(false)}>
              <SidebarItem
                icon={FiUsers}
                label="Users"
                to="/dashboard/users"
                isOpen={isSidebarOpen}
              />
            </Box>
          </>
        )}
      </VStack>
      <Box mt="auto" px={isSidebarOpen ? 4 : 2} pb={4}>
        <HStack spacing={2} mb={2} justify={isSidebarOpen ? 'space-between' : 'center'}>
          {isSidebarOpen && <Text color={useColorModeValue('gray.600','gray.300')}>Settings</Text>}
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
          {isSidebarOpen && <Text>Logout</Text>}
        </HStack>
      </Box>
    </Box>
  );
};

export default Sidebar;
