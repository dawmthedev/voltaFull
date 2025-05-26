import React, { useRef } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { parseCSV, CSVRow } from '../utils/csv'

interface CSVUploadDropzoneProps {
  onParsed: (rows: CSVRow[]) => void
}

const CSVUploadDropzone: React.FC<CSVUploadDropzoneProps> = ({ onParsed }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return
    const text = await file.text()
    const rows = parseCSV(text)
    onParsed(rows)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }

  return (
    <Box onDrop={handleDrop} onDragOver={e => e.preventDefault()} display="inline-block">
      <input
        type="file"
        accept=".csv"
        hidden
        ref={inputRef}
        data-testid="csv-input"
        onChange={e => handleFiles(e.target.files)}
      />
      <Button onClick={() => inputRef.current?.click()}>Upload CSV</Button>
      <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
        or drop file here
      </Text>
    </Box>
  )
}

export default CSVUploadDropzone
