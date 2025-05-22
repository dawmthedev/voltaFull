import React from 'react';

export interface Column {
  key: string;
  header: string;
}

export interface CustomTableProps {
  columns: Column[];
  data: Array<Record<string, any>>;
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>{c.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((c) => (
              <td key={c.key}>{row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
