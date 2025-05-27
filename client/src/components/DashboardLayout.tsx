import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const DashboardLayout: React.FC = () => (
  <Box overflowX="hidden" minH="100vh">
    <Navbar />
    <Flex pt={16} className="overflow-x-hidden">
      <Sidebar />
      <Box flex="1" px={{ base: 4, md: 8 }} py={6} overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  </Box>
)

export default DashboardLayout
