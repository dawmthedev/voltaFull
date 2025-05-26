import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  Button,
  VStack,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  Icon
} from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import { Select as ChakraSelect } from 'chakra-react-select'
import axios from 'axios'
import { useAppDispatch } from '../store'
import { createProject } from '../store/projectsSlice'
import { baseURL } from '../apiConfig'
import UserDropdown, { UserOption } from './UserDropdown'

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch()
  const [homeowner, setHomeowner] = useState('')
  const [saleDate, setSaleDate] = useState('')
  const [products, setProducts] = useState<string[]>([])
  const [contractAmount, setContractAmount] = useState('')
  const [status, setStatus] = useState('')
  const [stage, setStage] = useState('')
  const [salesRepId, setSalesRepId] = useState('')
  const [technicians, setTechnicians] = useState<string[]>([])
  const [salesReps, setSalesReps] = useState<UserOption[]>([])
  const [techUsers, setTechUsers] = useState<UserOption[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    axios
      .get<UserOption[]>(`${baseURL}/users`)
      .then(res => {
        const all = res.data
        setSalesReps(all.filter(u => u.role === 'sales'))
        setTechUsers(all.filter(u => u.role === 'tech'))
      })
      .catch(() => {
        setSalesReps([])
        setTechUsers([])
      })
  }, [isOpen])

  const handleSubmit = async () => {
    setLoading(true)
    await dispatch(
      createProject({
        homeowner,
        saleDate,
        products,
        contractAmount: Number(contractAmount),
        status,
        stage,
        salesRepId,
        technicians
      })
    )
    setLoading(false)
    onClose()
    setHomeowner('')
    setSaleDate('')
    setProducts([])
    setContractAmount('')
    setStatus('')
    setStage('')
    setSalesRepId('')
    setTechnicians([])
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Input
              placeholder="Homeowner"
              value={homeowner}
              onChange={e => setHomeowner(e.target.value)}
            />
            <InputGroup>
              <Input
                id="saleDate"
                aria-label="Sale Date"
                type="date"
                placeholder="Sale Date"
                value={saleDate}
                onChange={e => setSaleDate(e.target.value)}
              />
              <InputRightElement pointerEvents="none">
                <Icon as={CalendarIcon} />
              </InputRightElement>
            </InputGroup>
            <ChakraSelect
              isMulti
              options={[
                { label: 'Solar', value: 'Solar' },
                { label: 'Battery', value: 'Battery' },
                { label: 'Service', value: 'Service' },
                { label: 'Roofing', value: 'Roofing' },
                { label: 'EV Charger', value: 'EV Charger' },
                { label: 'HVAC', value: 'HVAC' }
              ]}
              placeholder="Products"
              value={products.map(p => ({ label: p, value: p }))}
              onChange={vals => setProducts(vals.map(v => v.value))}
            />
            <Input
              id="contractAmount"
              aria-label="Contract Amount"
              placeholder="Contract Amount"
              value={contractAmount}
              onChange={e => setContractAmount(e.target.value)}
            />
            <Select
              placeholder="Status"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Hold">Hold</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
            <Select
              placeholder="Stage"
              value={stage}
              onChange={e => setStage(e.target.value)}
            >
              <option value="NTP">NTP</option>
              <option value="Voltaic Check">Voltaic Check</option>
              <option value="Install Scheduled">Install Scheduled</option>
            </Select>
            <Select
              placeholder="Sales Rep"
              value={salesRepId}
              onChange={e => setSalesRepId(e.target.value)}
            >
              {salesReps.map(rep => (
                <option key={rep._id} value={rep._id}>
                  {rep.name} - ({rep.region || rep.org})
                </option>
              ))}
            </Select>
            <ChakraSelect
              isMulti
              placeholder="Assign Technician"
              options={techUsers.map(t => ({
                label: `${t.name} (${t.role})`,
                value: t._id
              }))}
              value={techUsers
                .filter(t => technicians.includes(t._id))
                .map(t => ({ label: `${t.name} (${t.role})`, value: t._id }))}
              onChange={vals => setTechnicians(vals.slice(0, 3).map(v => v.value))}
            />
          </VStack>
          <pre className="mt-4 text-xs bg-gray-100 p-2 rounded">
            {JSON.stringify({ homeowner, saleDate, products, contractAmount, status, stage, salesRepId, technicians }, null, 2)}
          </pre>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
            disabled={!homeowner || !salesRepId || products.length === 0}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddProjectModal
