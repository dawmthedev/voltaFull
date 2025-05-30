import React from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useAppDispatch } from "../store";
import { markPaid } from "../store/accountsPayableSlice";
import { PayrollRecord, useGetAllPayrollQuery } from "../services/api";
import { StatusChip } from "../components/StatusChip";

const AccountsPayablePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: records = [], refetch } = useGetAllPayrollQuery();
  const toast = useToast();

  const handlePaid = async (id: string) => {
    try {
      await dispatch(markPaid(id)).unwrap();
      refetch();
      toast({
        title: "Marked as paid",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Failed to mark paid",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Header */}
      <div className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Accounts Payable
          </h1>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Project
                </th>
                <th scope="col" className="px-6 py-3">
                  Technician
                </th>
                <th scope="col" className="px-6 py-3">
                  Allocation %
                </th>
                <th scope="col" className="px-6 py-3">
                  Payout
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((r: PayrollRecord) => (
                <tr
                  key={r._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{r.projectName}</td>
                  <td className="px-6 py-4">{r.technicianName}</td>
                  <td className="px-6 py-4">{r.percentage}%</td>
                  <td className="px-6 py-4">${r.amountDue.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <StatusChip stage={r.projectStage} paid={r.paid} />
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr className="bg-white dark:bg-gray-800">
                  <td colSpan={5} className="px-6 py-4 text-center">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountsPayablePage;
