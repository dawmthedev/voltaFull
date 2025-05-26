import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
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
    <Box p={4}>
      <Button onClick={handleLogout} mb={4} colorScheme="red">
        Logout
      </Button>
      <Heading size="md" mb={2}>Projects</Heading>
      <HStack mb={4}>
        <Input
          placeholder="Homeowner"
          value={homeowner}
          onChange={e => setHomeowner(e.target.value)}
        />
        <Button onClick={handleCreate} colorScheme="teal">
          Add
        </Button>
      </HStack>
      <Table variant="simple">
        <Thead>
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
  )
}

export default DashboardDeals
