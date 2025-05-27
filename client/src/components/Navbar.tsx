import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

const Navbar: React.FC = () => (
  <Flex
    position="sticky"
    top={0}
    zIndex={50}
    px={4}
    py={2}
    bg="white"
    justify="start"
    align="center"
    boxShadow="sm"
  >
    <Heading size="md">Volta CRM</Heading>
  </Flex>
)

export default Navbar
