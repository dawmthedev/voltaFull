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
  VStack
} from '@chakra-ui/react'
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
  const [products, setProducts] = useState('')
  const [contractAmount, setContractAmount] = useState('')
  const [status, setStatus] = useState('')
  const [stage, setStage] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [users, setUsers] = useState<UserOption[]>([])

  useEffect(() => {
    if (isOpen) {
      axios
        .get<UserOption[]>(`${baseURL}/users`)
        .then(res => setUsers(res.data))
        .catch(() => setUsers([]))
    }
  }, [isOpen])

  const handleSubmit = () => {
    dispatch(
      createProject({
        homeowner,
        saleDate,
        products: products ? [products] : [],
        contractAmount: Number(contractAmount),
        status,
        stage,
        assignedTo
      })
    )
    onClose()
    setHomeowner('')
    setSaleDate('')
    setProducts('')
    setContractAmount('')
    setStatus('')
    setStage('')
    setAssignedTo('')
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
            <Input
              type="date"
              placeholder="Sale Date"
              value={saleDate}
              onChange={e => setSaleDate(e.target.value)}
            />
            <Select
              placeholder="Select Product"
              value={products}
              onChange={e => setProducts(e.target.value)}
            >
              <option value="Solar">Solar</option>
              <option value="Battery">Battery</option>
              <option value="Quiet Cool">Quiet Cool</option>
              <option value="EV Charger">EV Charger</option>
              <option value="Service">Service</option>
            </Select>
            <Input
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
            <UserDropdown users={users} value={assignedTo} onChange={setAssignedTo} />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddProjectModal
