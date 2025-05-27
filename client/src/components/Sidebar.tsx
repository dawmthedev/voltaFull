import React from 'react'
import { Box, IconButton, VStack, HStack, Icon, Text } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { FiGrid, FiBriefcase, FiUsers, FiDollarSign, FiSettings, FiLogOut } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../store'
import { logout } from '../store/authSlice'
import SidebarItem from './SidebarItem'

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()

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
      display="flex"
      flexDirection="column"
    >
      <IconButton
        aria-label="Toggle sidebar"
        icon={<HamburgerIcon />}
        size="sm"
        m={2}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      />
      <VStack flex="1" spacing={4} align="stretch" px={isSidebarOpen ? 4 : 2} pt={4}>
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
      <Box mt="auto" px={isSidebarOpen ? 4 : 2} pb={4}>
        <HStack
          as="button"
          onClick={() => dispatch(logout())}
          px={2}
          py={2}
          spacing={2}
          _hover={{ bg: 'gray.100' }}
          w="full"
        >
          <Icon as={FiLogOut} boxSize={5} />
          {isSidebarOpen && <Text>Logout</Text>}
        </HStack>
      </Box>
    </Box>
  )
}

export default Sidebar
