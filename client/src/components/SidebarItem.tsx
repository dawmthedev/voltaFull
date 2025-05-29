import React from 'react'
import { HStack, Icon, Text, Tooltip } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  to: string
  isOpen: boolean
  onNavigate?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, isOpen, onNavigate }) => (
  <NavLink to={to} onClick={onNavigate}>
    <Tooltip label={label} isDisabled={isOpen} placement="right">
      <HStack px={2} py={2} spacing={2} _hover={{ bg: 'gray.100' }}>
        <Icon as={icon} boxSize={5} />
        {isOpen && <Text>{label}</Text>}
      </HStack>
    </Tooltip>
  </NavLink>
)

export default SidebarItem
