import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  useDisclosure
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { fetchProjects } from '../store/projectsSlice'
import { logout } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store'
import AddProjectModal from '../components/AddProjectModal'
import Sidebar from '../components/Sidebar'

const DashboardDeals: React.FC = () => {
  const dispatch = useAppDispatch()
  const projects = useAppSelector(state => state.projects.items)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleCreate = onOpen

  return (
    <Flex>
      <Sidebar />
      <Box px={{ base: 4, md: 8 }} py={6} flex="1">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading fontSize={{ base: '2xl', md: '3xl' }}>Deals Dashboard</Heading>
        <HStack>
          <Button onClick={handleLogout} colorScheme="red" variant="outline">
            Logout
          </Button>
          <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={handleCreate}>
            Add Project
          </Button>
        </HStack>
      </Flex>

      <Box height={4} />

      <Box bg="white" borderRadius="lg" boxShadow="md" overflowX="auto">
        <Table size="md" variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th>Homeowner</Th>
              <Th>Sale Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map(p => (
              <Tr key={p._id}>
                <Td>{p.homeowner}</Td>
                <Td>{p.saleDate}</Td>
                <Td>{p.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
        <AddProjectModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </Flex>
  )
}

export default DashboardDeals
