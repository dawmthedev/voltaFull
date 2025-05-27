import React from 'react'
import { Box, IconButton, VStack } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { FiGrid, FiBriefcase, FiUsers, FiDollarSign, FiSettings } from 'react-icons/fi'
import { useAppSelector } from '../store'
import SidebarItem from './SidebarItem'

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)
  const user = useAppSelector((state) => state.auth.user)

  return (
    <Box
      position="sticky"
      top={0}
      h="100vh"
      width={{ base: isSidebarOpen ? '220px' : '64px', md: '220px' }}
      transition="width 0.3s"
      bg="white"
      borderRight="1px solid #E2E8F0"
      flexShrink={0}
    >
      <IconButton
        aria-label="Toggle sidebar"
        icon={<HamburgerIcon />}
        size="sm"
        m={2}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      />
      <VStack spacing={4} align="stretch" px={isSidebarOpen ? 4 : 2} pt={4}>
        <SidebarItem
          icon={FiGrid}
          label="Projects"
          to="/dashboard/projects"
          isOpen={isSidebarOpen}
        />
        {user?.role === 'Technician' && (
          <SidebarItem
            icon={FiSettings}
            label="Technician Allocation"
            to="/dashboard/technician"
            isOpen={isSidebarOpen}
          />
        )}
        {user?.role === 'Admin' && (
          <>
            <SidebarItem
              icon={FiDollarSign}
              label="Accounts Payable"
              to="/dashboard/accounts"
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon={FiUsers}
              label="Users"
              to="/dashboard/users"
              isOpen={isSidebarOpen}
            />
          </>
        )}
      </VStack>
    </Box>
  )
}

export default Sidebar
