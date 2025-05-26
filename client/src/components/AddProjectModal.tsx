import React, { useState } from 'react'
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
import { useAppDispatch } from '../store'
import { createProject } from '../store/projectsSlice'

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
  const [duration, setDuration] = useState('')
  const [systemSize, setSystemSize] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  const handleSubmit = () => {
    dispatch(
      createProject({
        homeowner,
        saleDate,
        products: products
          .split(',')
          .map(p => p.trim())
          .filter(p => p),
        contractAmount: Number(contractAmount),
        status,
        stage,
        duration,
        systemSize,
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
    setDuration('')
    setSystemSize('')
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
            <Input
              placeholder="Products (comma separated)"
              value={products}
              onChange={e => setProducts(e.target.value)}
            />
            <Input
              placeholder="Contract Amount"
              value={contractAmount}
              onChange={e => setContractAmount(e.target.value)}
            />
            <Select
              placeholder="Select Status"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option>Unscheduled</option>
              <option>Active</option>
            </Select>
            <Select
              placeholder="Select Stage"
              value={stage}
              onChange={e => setStage(e.target.value)}
            >
              <option>NTP</option>
              <option>Voltaic Check</option>
            </Select>
            <Input
              type="number"
              placeholder="Duration (days)"
              value={duration}
              onChange={e => setDuration(e.target.value)}
            />
            <Input
              type="number"
              placeholder="System Size (Watts)"
              value={systemSize}
              onChange={e => setSystemSize(e.target.value)}
            />
            <Input
              placeholder="Assigned To (email)"
              value={assignedTo}
              onChange={e => setAssignedTo(e.target.value)}
            />
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
