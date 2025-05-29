import React from 'react'
import { Flex, Heading, IconButton, useColorModeValue } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import UserAvatar from './UserAvatar'

interface NavbarProps {
  onToggleSidebar: () => void
  toggleRef: React.RefObject<HTMLButtonElement>
}
const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, toggleRef }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const text = useColorModeValue('gray.800', 'white')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  return (
    <Flex
      position="sticky"
      top={0}
      zIndex="sticky"
      px={4}
      py={2}
      bg={bg}
      color={text}
      justify="space-between"
      align="center"
      borderBottom="1px solid"
      borderColor={borderColor}
      transition="background 0.2s, color 0.2s"
    >
      <Flex align="center" gap={2}>
        <IconButton
          ref={toggleRef}
          aria-label="Toggle sidebar"
          icon={<FiMenu />}
          variant="ghost"
          onClick={onToggleSidebar}
        />
        <Heading size="md">Volta CRM</Heading>
      </Flex>
      <UserAvatar />
    </Flex>
  )
}

export default Navbar
