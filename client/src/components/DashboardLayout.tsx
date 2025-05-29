import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const DashboardLayout: React.FC = () => {
  const bg = useColorModeValue('gray.50', 'gray.900')
  return (
    <Box h="100vh" overflow="hidden" display="flex" bg={bg} color={useColorModeValue('gray.800','gray.100')}>
      <Sidebar />
      <Box as="main" flex="1" overflowY="auto">
        <Navbar />
        <Box px={{ base: 4, md: 8 }} py={6}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardLayout
