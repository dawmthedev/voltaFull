import React from 'react'
import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true)
  const toggleRef = React.useRef<HTMLButtonElement>(null)

  const bg = useColorModeValue('white', 'gray.800')
  const text = useColorModeValue('gray.800', 'white')

  const handleToggle = () => setSidebarOpen((open) => !open)
  const handleClose = () => {
    setSidebarOpen(false)
    toggleRef.current?.focus()
  }

  return (
    <Flex
      h="100vh"
      overflow="hidden"
      bg={bg}
      color={text}
      transition="background 0.2s, color 0.2s"
    >
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} onClose={handleClose} toggleRef={toggleRef} />
      )}
      <Box flex="1">
        <Navbar onToggleSidebar={handleToggle} toggleRef={toggleRef} />
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
