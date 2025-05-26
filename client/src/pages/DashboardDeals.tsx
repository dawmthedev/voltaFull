import React, { useEffect, useRef } from 'react'
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
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { fetchProjects } from '../store/projectsSlice'
import { logout } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store'
import AddProjectModal from '../components/AddProjectModal'
import Sidebar from '../components/Sidebar'
import { baseURL } from '../apiConfig'

const DashboardDeals: React.FC = () => {
  const dispatch = useAppDispatch()
  const projects = useAppSelector(state => state.projects.items)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const toast = useToast()

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleCreate = onOpen

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const form = new FormData()
    form.append('file', file)
    const res = await fetch(`${baseURL}/projects/upload`, {
      method: 'POST',
      body: form
    })
    if (res.ok) {
      const json = await res.json()
      dispatch(fetchProjects())
      toast({
        title: `${json.data.length} Projects Uploaded Successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true
      })
    } else {
      toast({ title: 'Upload failed', status: 'error', duration: 3000, isClosable: true })
    }
    if (inputRef.current) inputRef.current.value = ''
  }

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
          <input
            type="file"
            accept=".csv"
            onChange={handleUpload}
            hidden
            ref={inputRef}
          />
          <Button onClick={() => inputRef.current?.click()}>Upload CSV</Button>
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
              <Th>Products</Th>
              <Th>Status</Th>
              <Th>Stage</Th>
              <Th isNumeric>Contract Amount</Th>
              <Th>System Size</Th>
              <Th>Installer</Th>
              <Th>Phone</Th>
              <Th>Sales Rep</Th>
              <Th>Address</Th>
              <Th>Utility Company</Th>
              <Th>PTO Status</Th>
              <Th>Project Manager</Th>
              <Th>Financing</Th>
              <Th>Source</Th>
              <Th>AHJ</Th>
              <Th>QC Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map(p => (
              <Tr key={p._id}>
                <Td>{p.homeowner}</Td>
                <Td>{p.saleDate}</Td>
                <Td>{p.products?.join(', ')}</Td>
                <Td>{p.status}</Td>
                <Td>{p.stage}</Td>
                <Td isNumeric>{p.contractAmount}</Td>
                <Td>{p.systemSize}</Td>
                <Td>{p.installer}</Td>
                <Td>{p.phone}</Td>
                <Td>{p.salesRep}</Td>
                <Td>{p.address}</Td>
                <Td>{p.utilityCompany}</Td>
                <Td>{p.ptoStatus}</Td>
                <Td>{p.projectManager}</Td>
                <Td>{p.financing}</Td>
                <Td>{p.source}</Td>
                <Td>{p.ahj}</Td>
                <Td>{p.qcStatus}</Td>
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
