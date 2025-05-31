import React, { useState } from "react";
import {
  Box,
  InputGroup,
  Input,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch } from "../store";
import { markPaid } from "../store/accountsPayableSlice";
import { PayrollRecord, useGetAllPayrollQuery } from "../services/api";
import { StatusChip } from "../components/StatusChip";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";

const AccountsPayablePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: records = [], refetch } = useGetAllPayrollQuery();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredRecords = records.filter((record) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      record.projectName?.toLowerCase().includes(searchLower) ||
      record.technicianName?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <PageContainer>
      <PageHeader title="Accounts Payable" />

      {/* Search and filters section */}
      <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div className="w-full sm:w-72">
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <BiSearch className="text-gray-400" />
            </InputLeftElement>
            <Input
              placeholder="Search by project or technician..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </InputGroup>
        </div>
      </div>

      {/* Mobile-optimized table */}
      <div
        className="overflow-hidden rounded-t-2xl sm:rounded-xl shadow-lg 
        bg-white dark:bg-gray-900 transition-all duration-300"
      >
        <div className="overflow-x-auto">
          <div className="min-w-max sm:min-w-full">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Technician
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {filteredRecords.map((r: PayrollRecord) => (
                  <tr
                    key={r._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {/* Mobile-optimized cells */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {getProjectName(r)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 sm:ml-2">
                          {r.percentage}%
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">
                        {getTechnicianName(r)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        ${r.amountDue.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusChip stage={r.projectStage} paid={r.paid} />
                    </td>
                  </tr>
                ))}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      {searchQuery
                        ? "No matching records found"
                        : "No data available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Loading skeleton */}
      {records.length === 0 && (
        <div className="space-y-4 animate-pulse p-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
};

export default AccountsPayablePage;
