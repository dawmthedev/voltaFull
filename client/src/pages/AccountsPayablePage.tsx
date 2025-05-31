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

  const getProjectName = (record: PayrollRecord): string => {
    return record.projectName || "Project Not Found";
  };

  const getTechnicianName = (record: PayrollRecord): string => {
    return record.technicianName || "Technician Not Found";
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50 dark:bg-gray-800">
      <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Accounts Payable
          </h1>
        </div>

        <div className="w-full overflow-x-auto rounded-lg shadow-md bg-white dark:bg-gray-900">
          <div className="min-w-full">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Project
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Technician
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Allocation %
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Payout
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {records.map((r: PayrollRecord) => (
                  <tr
                    key={r._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {getProjectName(r)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {getTechnicianName(r)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {r.percentage}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      ${r.amountDue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusChip stage={r.projectStage} paid={r.paid} />
                    </td>
                  </tr>
                ))}
                {records.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountsPayablePage;
