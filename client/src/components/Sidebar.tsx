import React from 'react'
import {
  Box,
  IconButton,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  HStack,
  Icon,
  Text
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { FaUsers } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../store'

const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [collapsed, setCollapsed] = React.useState(false)
  const user = useAppSelector(state => state.auth.user)
  const linkProps = { px: 4, py: 2, gap: 2, _hover: { bg: 'gray.100' } }
  const links = (
    <VStack align="start" spacing={3}>
      <NavLink to="/dashboard/deals">
        <HStack {...linkProps}>
          <span>Deals</span>
        </HStack>
      </NavLink>
      <NavLink to="/projects">
        <HStack {...linkProps}>
          <span>Projects</span>
        </HStack>
      </NavLink>
      {user?.role === 'Technician' && (
        <NavLink to="/technician">
          <HStack {...linkProps}>
            <span>Technician Allocation</span>
          </HStack>
        </NavLink>
      )}
      {user?.role === 'Admin' && (
        <>
          <NavLink to="/accounts">
            <HStack {...linkProps}>
              <span>Accounts Payable</span>
            </HStack>
          </NavLink>
          <NavLink to="/users">
            <HStack {...linkProps}>
              <Icon as={FaUsers} />
              <Text display={collapsed ? 'none' : 'block'}>Users</Text>
            </HStack>
          </NavLink>
        </>
      )}
    </VStack>
  )

  return (
    <>
      <IconButton
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        display={{ base: 'block', md: 'none' }}
        m={2}
      />
      <Box
        as="nav"
        bg="gray.50"
        p={4}
        w={collapsed ? '60px' : '200px'}
        display={{ base: 'none', md: 'block' }}
        position="sticky"
        top="0"
        left="0"
        className="h-screen overflow-y-auto"
        flexShrink={0}
      >
        <IconButton
          aria-label="Toggle"
          size="sm"
          mb={4}
          icon={<HamburgerIcon />}
          onClick={() => setCollapsed(!collapsed)}
        />
        {!collapsed && links}
      </Box>

      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent bg="gray.50">
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>{links}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Sidebar
