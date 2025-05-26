import React, { useEffect, useState } from 'react'
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
  Input,
  HStack
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { fetchProjects, createProject } from '../store/projectsSlice'
import { logout } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store'

const DashboardDeals: React.FC = () => {
  const dispatch = useAppDispatch()
  const projects = useAppSelector(state => state.projects.items)
  const [homeowner, setHomeowner] = useState('')

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleCreate = () => {
    if (homeowner) {
      dispatch(createProject({ homeowner }))
      setHomeowner('')
    }
  }

  return (
    <Box px={{ base: 4, md: 8 }} py={6}>
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

      <Box
        position="sticky"
        top="0"
        bg="white"
        zIndex="1"
        py={2}
        mb={4}
        boxShadow="sm"
      >
        <HStack spacing={4} flexWrap="wrap">
          <Input
            placeholder="Homeowner"
            value={homeowner}
            onChange={e => setHomeowner(e.target.value)}
            maxW="sm"
          />
        </HStack>
      </Box>

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
    </Box>
  )
}

export default DashboardDeals
