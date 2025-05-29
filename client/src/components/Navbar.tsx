import React from 'react'
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import UserAvatar from './UserAvatar'

const Navbar: React.FC = () => {
  const bg = useColorModeValue('white', 'gray.800')
  const text = useColorModeValue('gray.800', 'white')
  return (
    <Flex
      position="sticky"
      top={0}
      zIndex={50}
      px={4}
      py={2}
      bg={bg}
      color={text}
      justify="space-between"
      align="center"
      boxShadow="sm"
      transition="background 0.2s, color 0.2s"
    >
      <Heading size="md">Volta CRM</Heading>
      <UserAvatar />
    </Flex>
  )
}

export default Navbar
