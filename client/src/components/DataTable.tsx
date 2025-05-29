import React, { ReactNode } from "react";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  renderCell?: (item: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  renderMobileRow?: (item: T) => ReactNode;
}

function DataTable<T>({
  columns,
  data,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  renderMobileRow,
}: DataTableProps<T>) {
  const fontClass =
    pageSize > 50 ? "text-sm" : pageSize > 20 ? "text-base" : "text-lg";

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full h-full">
      <div className="hidden md:block">
        <div className="w-full h-full max-h-screen overflow-auto bg-white dark:bg-gray-800">
          <table
            className={`${fontClass} leading-tight w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
          >
            <thead className="bg-gray-100 dark:bg-gray-900 sticky top-0 z-10">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left p-1 text-gray-900 dark:text-gray-100"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-b bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="p-1 text-gray-900 dark:text-gray-100"
                    >
                      {col.renderCell ? col.renderCell(item) : (item as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={columns.length} className="p-0">
                  <div className="flex items-center justify-end p-2 border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
                    <label className="mr-2">Rows</label>
                    <select
                      value={pageSize}
                      onChange={(e) => onPageSizeChange(+e.target.value)}
                      className="border rounded p-1"
                    >
                      {[10, 20, 50, 100].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <span className="ml-4">
                      Page {page} of {totalPages}
                    </span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {renderMobileRow && (
        <div className="md:hidden flex flex-col items-center bg-white dark:bg-gray-800">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-lg p-4 shadow mb-4 text-gray-900 dark:text-gray-100"
            >
              {renderMobileRow(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DataTable;
export type { DataTableProps };
