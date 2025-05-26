import React, { useState } from 'react'
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
  Button
} from '@chakra-ui/react'

export interface CSVRow {
  [key: string]: string
}

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
  const headers = data.length > 0 ? Object.keys(data[0]) : []

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
      <ModalContent>
        <ModalHeader>Preview CSV</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table size="sm">
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
                      <Input
                        size="sm"
                        value={row[h]}
                        onChange={e => handleChange(i, h, e.target.value)}
                      />
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
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={() => onConfirm(data)}>
            Confirm Upload
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CSVPreviewModal
