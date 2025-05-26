import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  FormControl,
  Button,
  Box
} from '@chakra-ui/react'

import { CSVRow } from '../utils/csv'

interface CSVPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  rows: CSVRow[]
  onConfirm: (rows: CSVRow[]) => void
}

const CSVPreviewModal: React.FC<CSVPreviewModalProps> = ({
  isOpen,
  onClose,
  rows,
  onConfirm
}) => {
  const [data, setData] = useState(rows)
  useEffect(() => {
    setData(rows)
  }, [rows])
  const headers = data.length > 0 ? Object.keys(data[0]) : []
  const required = ['Homeowner', 'Sale Date']
  const isRowValid = (row: CSVRow) =>
    required.every(f => row[f] && row[f].trim() !== '')
  const allValid = data.every(isRowValid)

  const handleChange = (rowIndex: number, key: string, value: string) => {
    const copy = [...data]
    copy[rowIndex][key] = value
    setData(copy)
  }

  const removeRow = (rowIndex: number) => {
    setData(data.filter((_, i) => i !== rowIndex))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxH="90vh" overflowY="auto">
        <ModalHeader>Preview CSV</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box overflowX="auto" maxW="100%">
          <Table size="sm" whiteSpace="nowrap">
            <Thead>
              <Tr>
                {headers.map(h => (
                  <Th key={h}>{h}</Th>
                ))}
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, i) => (
                <Tr key={i}>
                  {headers.map(h => (
                    <Td key={h}>
                      <FormControl isInvalid={required.includes(h) && !row[h]}> 
                        <Input
                          size="sm"
                          value={row[h]}
                          onChange={e => handleChange(i, h, e.target.value)}
                        />
                      </FormControl>
                    </Td>
                  ))}
                  <Td>
                    <Button size="xs" onClick={() => removeRow(i)}>
                      Remove
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            mr={3}
            onClick={() => onConfirm(data)}
            isDisabled={!allValid || data.length === 0}
          >
            Confirm Upload
          </Button>
          <Button mr={3} onClick={() => setData([])}>
            Clear All
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CSVPreviewModal
