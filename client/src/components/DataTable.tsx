import React, { ReactNode, useMemo, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  renderCell?: (item: T) => ReactNode;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  pagination?: Pagination;
  renderMobileRow?: (item: T) => ReactNode;
}

function DataTable<T>({ columns, data, pagination, renderMobileRow }: DataTableProps<T>) {
  const [virtualStart, setVirtualStart] = useState(0);

  const items = useMemo(() => {
    if (data.length > 100) {
      return data.slice(virtualStart, virtualStart + 100);
    }
    return data;
  }, [data, virtualStart]);

  const pageCount = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 0;

  return (
    <div className="overflow-auto">
      <div className="hidden md:block">
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              {columns.map((col) => (
                <Th key={col.key}>{col.header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, rowIdx) => (
              <Tr key={rowIdx}>
                {columns.map((col) => (
                  <Td key={col.key}>
                    {col.renderCell ? col.renderCell(item) : (item as any)[col.key]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
      {renderMobileRow && (
        <div className="md:hidden">
          {data.map((item, idx) => (
            <React.Fragment key={idx}>{renderMobileRow(item)}</React.Fragment>
          ))}
        </div>
      )}
      {pagination && (
        <div className="flex items-center justify-between p-2 gap-2">
          <div>
            <label className="mr-2">Page</label>
            <select
              value={pagination.page}
              onChange={(e) => pagination.onPageChange(Number(e.target.value))}
            >
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mr-2">Rows</label>
            <select
              value={pagination.pageSize}
              onChange={(e) => {
                pagination.onPageSizeChange(Number(e.target.value));
                setVirtualStart(0);
              }}
            >
              {[10, 20, 50, 100].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
export type { DataTableProps };
