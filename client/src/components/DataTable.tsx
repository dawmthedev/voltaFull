import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

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

  return (
    <Table size="sm" variant="simple">
      <Thead bg="gray.50">
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
          <Tr key={i} _hover={{ bg: "gray.50" }}>
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
