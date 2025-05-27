import React from 'react'
import { Box, IconButton, VStack } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { FiList, FiBriefcase, FiUsers, FiDollarSign } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../store'
import SidebarItem from './SidebarItem'

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true)
  const user = useAppSelector((state) => state.auth.user);
  const links = (
    <VStack align="start" spacing={3}>
      <SidebarItem
        icon={FiList}
        label="Deals"
        to="/dashboard/deals"
        isOpen={isSidebarOpen}
      />
      <SidebarItem
        icon={FiBriefcase}
        label="Projects"
        to="/projects"
        isOpen={isSidebarOpen}
      />
      {user?.role === 'Technician' && (
        <SidebarItem
          icon={FiList}
          label="Technician Allocation"
          to="/technician"
          isOpen={isSidebarOpen}
        />
      )}
      {user?.role === 'Admin' && (
        <>
          <SidebarItem
            icon={FiDollarSign}
            label="Accounts Payable"
            to="/accounts"
            isOpen={isSidebarOpen}
          />
          <SidebarItem
            icon={FiUsers}
            label="Users"
            to="/users"
            isOpen={isSidebarOpen}
          />
        </>
      )}
    </VStack>
  )

  return (
    <Box
      position="sticky"
      top={0}
      h="100vh"
      width={isSidebarOpen ? '220px' : '64px'}
      transition="width 0.3s ease"
      bg="white"
      borderRight="1px solid #E2E8F0"
      flexShrink={0}
    >
      <IconButton
        aria-label="Toggle sidebar"
        icon={
          <HamburgerIcon
            transform={isSidebarOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
            transition="transform 0.3s"
          />
        }
        size="sm"
        mt={4}
        ml={isSidebarOpen ? 3 : 1}
        variant="ghost"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      />
      <VStack spacing={4} align="stretch" px={isSidebarOpen ? 4 : 2} pt={6}>
        {links}
      </VStack>
    </Box>
  )
};

export default Sidebar;
