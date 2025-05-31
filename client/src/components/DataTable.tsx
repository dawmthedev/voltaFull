import React, { ReactNode, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { VirtualItem as TanstackVirtualItem } from "@tanstack/react-virtual";

// Update interface to match Tanstack's VirtualItem
interface VirtualItem extends TanstackVirtualItem {
  index: number;
}

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
  allowSelection?: boolean;
  actions?: {
    label: string;
    items: { label: string; action: (selected: T[]) => void }[];
  };
  className?: string; // Add this line
}

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  allowSelection = false,
  actions,
  className, // Destructure className
}: DataTableProps<T>): JSX.Element {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);

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

  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    overscan: 5,
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onPageChange(1);
  };

  const handlePageChange = (p: number) => onPageChange(p);
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    onPageSizeChange(+e.target.value);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelected: Record<string, boolean> = {};
    if (e.target.checked) {
      rowVirtualizer.getVirtualItems().forEach((virtualRow) => {
        newSelected[virtualRow.index.toString()] = true;
      });
    }
    setSelected(newSelected);
  };

  const handleSelect = (idx: string) => {
    setSelected((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleAction = () => {
    if (!selectedAction) return;
    const selectedVirtualItems = rowVirtualizer
      .getVirtualItems()
      .filter((virtualRow) => selected[virtualRow.index]);
    const selectedData = selectedVirtualItems.map(
      (virtual) => filtered[virtual.index]
    );

    const action = actions?.items.find((i) => i.label === selectedAction);
    if (action) {
      action.action(selectedData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className={className}>
      {" "}
      {/* Apply className here */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-start mb-4"></div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
            {allowSelection && actions && (
              <div className="flex items-center gap-2">
                <button
                  id="dropdownActionButton"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => setSelectedAction(null)}
                >
                  {selectedAction || actions.label}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {selectedAction && (
                  <button
                    onClick={handleAction}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700"
                  >
                    Start
                  </button>
                )}
                {showSuccess && (
                  <span className="text-green-500 text-sm">
                    Action completed successfully!
                  </span>
                )}
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                value={query}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="relative">
            <div ref={parentRef} className="overflow-auto h-[600px]">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {allowSelection && (
                      <th className="px-6 py-3 w-12">
                        <input
                          type="checkbox"
                          checked={
                            Object.keys(selected).length === filtered.length
                          }
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 dark:border-gray-600"
                        />
                      </th>
                    )}
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        {col.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const item = filtered[virtualRow.index];
                    return (
                      <tr
                        key={virtualRow.index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        {allowSelection && (
                          <td className="px-6 py-4 whitespace-nowrap w-12">
                            <input
                              type="checkbox"
                              checked={!!selected[virtualRow.index]}
                              onChange={() =>
                                handleSelect(virtualRow.index.toString())
                              }
                              className="rounded border-gray-300 dark:border-gray-600"
                            />
                          </td>
                        )}
                        {columns.map((col) => (
                          <td
                            key={col.key}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                          >
                            {col.renderCell
                              ? col.renderCell(item)
                              : item[col.key]}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Add loading skeleton */}
            {false && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                Loading...
              </div>
            )}
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
    </div>
  );
}

export default DataTable as <T>(props: DataTableProps<T>) => JSX.Element;
