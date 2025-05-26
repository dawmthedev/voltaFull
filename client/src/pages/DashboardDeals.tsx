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
  useToast,
  Stack
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { fetchProjects } from '../store/projectsSlice'
import { logout } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store'
import AddProjectModal from '../components/AddProjectModal'
import Sidebar from '../components/Sidebar'
import { baseURL } from '../apiConfig'
import DealCard from '../components/DealCard'

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
    <Flex className="h-screen overflow-hidden">
      <Sidebar />
      <Box
        px={{ base: 4, md: 8 }}
        py={6}
        flex="1"
        overflowY="auto"
        className="min-w-0"
      >
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        position="sticky"
        top="0"
        zIndex="10"
        bg="white"
        className="shadow-sm border-b py-3"
      >
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

      <Stack spacing={4} display={{ base: 'block', md: 'none' }}>
        {projects.map(p => (
          <DealCard key={p._id} project={p} />
        ))}
      </Stack>

      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        overflowX="auto"
        className="overflow-x-auto"
        display={{ base: 'none', md: 'block' }}
      >
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
              <Th display={{ base: 'none', lg: 'table-cell' }}>Sales Rep</Th>
              <Th display={{ base: 'none', lg: 'table-cell' }}>Address</Th>
              <Th display={{ base: 'none', lg: 'table-cell' }}>Utility Company</Th>
              <Th display={{ base: 'none', lg: 'table-cell' }}>PTO Status</Th>
              <Th display={{ base: 'none', lg: 'table-cell' }}>Project Manager</Th>
              <Th display={{ base: 'none', lg: 'table-cell' }}>Financing</Th>
              <Th display={{ base: 'none', lg: 'table-cell' }}>Source</Th>
              <Th display={{ base: 'none', lg: 'table-cell' }}>AHJ</Th>
              <Th display={{ base: 'none', lg: 'table-cell' }}>QC Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map(p => (
              <Tr key={p._id} _hover={{ bg: 'gray.50' }}>
                <Td fontWeight="semibold">{p.homeowner}</Td>
                <Td>{p.saleDate}</Td>
                <Td>{p.products?.join(', ')}</Td>
                <Td>{p.status}</Td>
                <Td>{p.stage}</Td>
                <Td isNumeric>{p.contractAmount}</Td>
                <Td>{p.systemSize}</Td>
                <Td>{p.installer}</Td>
                <Td>{p.phone}</Td>
                <Td display={{ base: 'none', lg: 'table-cell' }}>{p.salesRep}</Td>
                <Td display={{ base: 'none', lg: 'table-cell' }}>{p.address}</Td>
                <Td display={{ base: 'none', lg: 'table-cell' }}>{p.utilityCompany}</Td>
                <Td display={{ base: 'none', lg: 'table-cell' }}>{p.ptoStatus}</Td>
                <Td display={{ base: 'none', lg: 'table-cell' }}>{p.projectManager}</Td>
                <Td display={{ base: 'none', lg: 'table-cell' }}>{p.financing}</Td>
                <Td display={{ base: 'none', lg: 'table-cell' }}>{p.source}</Td>
                <Td display={{ base: 'none', lg: 'table-cell' }}>{p.ahj}</Td>
                <Td display={{ base: 'none', lg: 'table-cell' }}>{p.qcStatus}</Td>
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
