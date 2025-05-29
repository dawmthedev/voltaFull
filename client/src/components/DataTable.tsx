import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, useColorModeValue } from "@chakra-ui/react";

export interface DataTableColumn {
  header: string;
  accessor: string;
  isNumeric?: boolean;
  displayBreakpoint?: "base" | "md" | "lg";
}

interface DataTableProps {
  columns: DataTableColumn[];
  data: Array<Record<string, any>>;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const getDisplay = (breakpoint?: "base" | "md" | "lg") =>
    breakpoint ? { base: "none", [breakpoint]: "table-cell" } : undefined;

  const bg = useColorModeValue('white', 'gray.800')
  const text = useColorModeValue('gray.800', 'white')
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <Table size="sm" variant="simple" bg={bg} color={text} borderColor={border}
      transition="background 0.2s, color 0.2s">
      <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
        <Tr>
          {columns.map((col) => (
            <Th
              key={col.accessor}
              isNumeric={col.isNumeric}
              p={2}
              display={getDisplay(col.displayBreakpoint)}
            >
              {col.header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, i) => (
          <Tr key={i} _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}>
            {columns.map((col) => {
              const value = row[col.accessor];
              return (
                <Td
                  key={col.accessor}
                  isNumeric={col.isNumeric}
                  p={2}
                  display={getDisplay(col.displayBreakpoint)}
                >
                  {Array.isArray(value) ? value.join(", ") : value}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DataTable;
