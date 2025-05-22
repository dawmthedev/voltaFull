import React from 'react';

export interface CsvTableProps {
  rows: Array<Record<string, string>>;
}

const CsvTable: React.FC<CsvTableProps> = ({ rows }) => {
  return (
    <table>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {Object.values(row).map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CsvTable;
