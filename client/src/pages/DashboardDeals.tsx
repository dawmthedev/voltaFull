import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useDisclosure,
  useToast,
  Stack
} from '@chakra-ui/react'
import { fetchProjects, createProject } from '../store/projectsSlice'
import { logout } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store'
import AddProjectModal from '../components/AddProjectModal'
import CSVPreviewModal from '../components/CSVPreviewModal'
import CSVUploadDropzone from '../components/CSVUploadDropzone'
import { CSVRow, parseCSV } from '../utils/csv'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import DealCard from '../components/DealCard'

const DashboardDeals: React.FC = () => {
  const dispatch = useAppDispatch()
  const projects = useAppSelector(state => state.projects.items)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: previewOpen,
    onOpen: openPreview,
    onClose: closePreview
  } = useDisclosure()
  const [csvQueue, setCsvQueue] = useState<CSVRow[]>([])
  const toast = useToast()

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleCreate = onOpen


  const transformCSVToProject = (row: CSVRow) => ({
    homeowner: row['Homeowner'],
    saleDate: row['Sale Date'],
    products: row['Products'] ? row['Products'].split(';') : [],
    status: row['Solar Install - Status'] || row['Status'],
    stage: row['Stage'],
    contractAmount:
      parseFloat((row['Contract Amount Final'] || '').replace(/[^0-9.]/g, '')) ||
      0,
    systemSize: row['Final System Size (Watts)'] || row['Sold System Size (Watts)'],

    phone: row['Phone'],
    address: row['Address'],
    installer: row['Installer'],
    utilityCompany: row['Utility Company Text'],
    salesRep: row['Sales Rep'],
    projectManager: row['Project Manager'],
    financing: row['Financing'],
    source: row['Source'],
    ahj: row['AHJ'],
    qcStatus: row['QC Check - Status'],
    ptoStatus: row['PTO - Status'],

    assignedTo: row['email1']?.toLowerCase() || null,
    duration: row['Project Duration']
  })


  const handleConfirm = async (rows: CSVRow[]) => {
    for (const r of rows) {
      await dispatch(createProject(transformCSVToProject(r)))
    }
    closePreview()
    setCsvQueue([])
    dispatch(fetchProjects())
    toast({
      title: `${rows.length} Projects Uploaded`,
      status: 'success',
      duration: 3000,
      isClosable: true
    })
  }

  return (
    <Box overflowX="hidden" minH="100vh">
      <Navbar
        onLogout={handleLogout}
        onCSVChange={handleUpload}
        onAddProject={handleCreate}
      />
      <Flex className="overflow-x-hidden" pt={16}>
        <Sidebar />
        <Box
          px={{ base: 4, md: 8 }}
          py={6}
          flex="1"
          overflowY="auto"
          className="min-w-0 overflow-x-hidden"
        >
        <Heading fontSize={{ base: 'sm', md: 'lg' }} className="text-balance" mb={6}>
          Deals Dashboard
        </Heading>

        <Flex flexWrap="wrap" gap="2">
          <Button
            onClick={handleLogout}
            colorScheme="red"
            variant="outline"
            className="whitespace-nowrap"
          >
            Logout
          </Button>
          <CSVUploadDropzone onParsed={rows => {
            setCsvQueue(rows)
            openPreview()
          }} />
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={handleCreate}
            className="whitespace-nowrap"
          >
            Add Project
          </Button>
        </Flex>
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
                <Td>
                  <Flex flexWrap="wrap" gap="1">
                    {p.products?.map(prod => (
                      <Badge
                        key={prod}
                        variant="solid"
                        colorScheme="teal"
                        className="whitespace-nowrap"
                      >
                        {prod}
                      </Badge>
                    ))}
                  </Flex>
                </Td>
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
        <CSVPreviewModal
          isOpen={previewOpen}
          onClose={closePreview}
          rows={csvQueue}
          onConfirm={handleConfirm}
        />
      </Box>
    </Flex>
    </Box>
  )
}

export default DashboardDeals
