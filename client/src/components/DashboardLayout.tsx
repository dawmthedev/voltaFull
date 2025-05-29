import React from 'react'
import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true)
  const bg = useColorModeValue('white', 'gray.800')
  const text = useColorModeValue('gray.800', 'white')
  return (
    <Flex
      h="100vh"
      overflow="hidden"
      bg={bg}
      color={text}
      transition="background 0.2s, color 0.2s, width 0.2s"
    >
      {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />}
      <Box flex="1" transition="width 0.2s">
        <Navbar />
        <Box flex="1" overflowY="auto" bg={bg} transition="background 0.2s, color 0.2s">
          <Box px={{ base: 4, md: 8 }} py={6}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default DashboardLayout
