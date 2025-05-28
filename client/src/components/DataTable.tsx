import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

export interface DataColumn {
  header: string
  accessor: string
  isNumeric?: boolean
  displayBreakpoint?: 'base' | 'md' | 'lg'
}

export interface DataTableProps {
  columns: DataColumn[]
  data: Array<Record<string, any>>
}

const getDisplay = (
  bp?: 'base' | 'md' | 'lg'
): { [key: string]: string } | undefined => {
  if (!bp || bp === 'base') return undefined
  if (bp === 'md') return { base: 'none', md: 'table-cell' }
  if (bp === 'lg') return { base: 'none', md: 'none', lg: 'table-cell' }
  return undefined
}

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  return (
    <Table size="sm" variant="simple">
      <Thead bg="gray.50">
        <Tr>
          {columns.map(col => (
            <Th
              key={col.accessor}
              isNumeric={col.isNumeric}
              px={2}
              py={1}
              display={getDisplay(col.displayBreakpoint) as any}
            >
              {col.header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, i) => (
          <Tr key={i} _hover={{ bg: 'gray.50' }}>
            {columns.map(col => {
              const value = row[col.accessor]
              const displayVal = Array.isArray(value) ? value.join(', ') : value
              return (
                <Td
                  key={col.accessor}
                  isNumeric={col.isNumeric}
                  px={2}
                  py={1}
                  display={getDisplay(col.displayBreakpoint) as any}
                >
                  {displayVal}
                </Td>
              )
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default DataTable
