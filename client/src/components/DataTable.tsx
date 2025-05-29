import React, { ReactNode, useMemo, useState } from "react";

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
}

function DataTable<T>({
  columns,
  data,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((item) =>
      Object.values(item as any)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [data, query]);

  const pageData = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize]
  );
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onPageChange(1);
  };

  const handlePageChange = (p: number) => onPageChange(p);
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    onPageSizeChange(+e.target.value);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-start mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-1/2 lg:w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <div className="flex flex-col overflow-y-auto h-full">
        <div className="w-full overflow-x-auto">
          <div className="inline-block min-w-max">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="sticky top-0 z-10 bg-gray-50 text-xs text-gray-700 uppercase h-6 transition-all ease-in-out">
                <tr>
                  {columns.map((col) => (
                    <th key={col.key} className="px-2 2xl:px-6 py-3 bg-gray-200">
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="select-none">
                {pageData.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-6 py-1.5 whitespace-nowrap text-sm text-gray-900"
                      >
                        {col.renderCell ? col.renderCell(item) : (item as any)[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-3">
        <div>
          <label className="mr-2 text-sm text-gray-700">Rows per page:</label>
          <select
            className="border border-gray-300 rounded p-1"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DataTable);
