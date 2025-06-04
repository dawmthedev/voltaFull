import React, { useEffect, useState } from 'react';
import Modal from './ui/Modal'; // Default import - path seems correct
import Button from './ui/Button'; // Adjusted path - Default import
import Input from './ui/Input';   // Adjusted path - Default import
import { CSVRow } from '../utils/csv';
import { cn } from '../utils/cn'; // Path seems correct

interface CSVPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  rows: CSVRow[]
  onConfirm: (rows: CSVRow[]) => void
}

const CSVPreviewModal: React.FC<CSVPreviewModalProps> = ({
  isOpen,
  onClose,
  rows,
  onConfirm,
}) => {
  const [data, setData] = useState(rows);
  useEffect(() => {
    setData(rows);
  }, [rows]);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const requiredFields = ['Homeowner', 'Sale Date']; // Renamed for clarity

  const isRowValid = (row: CSVRow) =>
    requiredFields.every(field => row[field] && String(row[field]).trim() !== '');

  const allValid = data.every(isRowValid);

  const handleChange = (rowIndex: number, key: string, value: string) => {
    const copy = [...data];
    copy[rowIndex][key] = value;
    setData(copy);
  };

  const removeRow = (rowIndex: number) => {
    setData(data.filter((_, i) => i !== rowIndex));
  };

  const modalFooterContent = (
    <>
      <Button
        variant="primary"
        onClick={() => onConfirm(data)}
        disabled={!allValid || data.length === 0}
        className="mr-3"
      >
        Confirm Upload
      </Button>
      <Button variant="outline" onClick={() => setData([])} className="mr-3">
        Clear All
      </Button>
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Preview CSV Data"
      size="xl"
      footer={modalFooterContent}
    >
      {data.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No data to preview. Please upload a CSV file.
        </p>
      ) : (
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {headers.map(header => (
                  <th
                    key={header}
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
                <th scope="col" className="relative px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className={cn(!isRowValid(row) && 'bg-error-50 dark:bg-error-900/20')}>
                  {headers.map(header => {
                    const isInvalid = requiredFields.includes(header) && (!row[header] || String(row[header]).trim() === '');
                    return (
                      <td key={header} className="px-4 py-2 whitespace-nowrap text-sm">
                        <Input
                          type="text"
                          value={String(row[header] ?? '')}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(rowIndex, header, e.target.value)}
                          error={isInvalid ? 'Required field' : undefined}
                          className="w-full text-xs p-1"
                          placeholder={`Enter ${header}`}
                        />
                      </td>
                    );
                  })}
                  <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => removeRow(rowIndex)}
                      className="text-error-600 hover:text-error-800 dark:text-error-400 dark:hover:text-error-300"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!allValid && data.length > 0 && (
        <p className="mt-3 text-sm text-error-600 dark:text-error-400">
          Some rows have missing required fields (highlighted in red). Please correct them before confirming.
        </p>
      )}
    </Modal>
  );
};

export default CSVPreviewModal
