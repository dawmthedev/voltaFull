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
    <div className="w-full h-full max-h-screen overflow-auto">
      <div className="hidden md:block">
        <table className={`${fontClass} w-full`}>
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-left p-2">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIdx) => (
              <tr key={rowIdx} className="even:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="p-2">
                    {col.renderCell ? col.renderCell(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={columns.length} className="p-0">
                <div className="flex items-center justify-end p-2 border-t">
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
      {renderMobileRow && (
        <div className="md:hidden">
          {data.map((item, idx) => (
            <React.Fragment key={idx}>{renderMobileRow(item)}</React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default DataTable;
export type { DataTableProps };
