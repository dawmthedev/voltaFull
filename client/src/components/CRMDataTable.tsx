import React, { useMemo, useState } from 'react';

export interface CRMUserRecord {
  name: string;
  email: string;
  role: string;
  phone?: string;
}

interface CRMDataTableProps {
  data: CRMUserRecord[];
}

const CRMDataTable: React.FC<CRMDataTableProps> = ({ data }) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter(
      (d) =>
        d.name.toLowerCase().includes(q) || d.email.toLowerCase().includes(q)
    );
  }, [data, query]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const goto = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="w-full">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-2 py-1 w-full md:w-60"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-2 font-medium">Name</th>
              <th className="p-2 font-medium">Email</th>
              <th className="p-2 font-medium">Role</th>
              <th className="p-2 font-medium">Phone</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((u, i) => (
              <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-2 whitespace-nowrap">{u.name}</td>
                <td className="p-2 whitespace-nowrap">{u.email}</td>
                <td className="p-2 whitespace-nowrap">{u.role}</td>
                <td className="p-2 whitespace-nowrap">{u.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="space-x-1">
          <button
            className="px-2 py-1 border rounded"
            disabled={page === 1}
            onClick={() => goto(page - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((n) => (
            <button
              key={n}
              className={`px-2 py-1 border rounded ${n === page ? 'bg-gray-200' : ''}`}
              onClick={() => goto(n)}
            >
              {n}
            </button>
          ))}
          <button
            className="px-2 py-1 border rounded"
            disabled={page === totalPages}
            onClick={() => goto(page + 1)}
          >
            Next
          </button>
        </div>
        <select
          className="border rounded p-1"
          value={pageSize}
          onChange={(e) => {
            setPageSize(parseInt(e.target.value));
            setPage(1);
          }}
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}/page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CRMDataTable;
