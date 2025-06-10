import React, { useState } from "react";
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
  // Using custom toast implementation
  const showToast = ({ title, status, duration = 2000 }: { title: string, status: string, duration?: number, isClosable?: boolean }) => {
    const toastId = `toast-${Date.now()}`;
    const toast = document.createElement("div");
    toast.id = toastId;

    // Apply different styles based on status
    let statusClasses = "";
    let iconPath = "";

    if (status === "success") {
      statusClasses = "bg-green-50 text-green-800";
      iconPath = "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z";
    } else if (status === "error") {
      statusClasses = "bg-red-50 text-red-800";
      iconPath = "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z";
    }

    toast.className = `fixed top-4 right-4 flex items-center p-4 mb-4 rounded-lg shadow transition-all duration-300 ${statusClasses}`;
    toast.innerHTML = `
      <div class="flex items-center">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="${iconPath}"/>
          </svg>
        </div>
        <div class="ml-3 text-sm font-normal">${title}</div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex h-8 w-8" onclick="document.getElementById('${toastId}').remove()">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
        </button>
      </div>
    `;
    document.body.appendChild(toast);

    // Auto-remove the toast after specified duration
    setTimeout(() => {
      const toastElement = document.getElementById(toastId);
      if (toastElement) {
        toastElement.classList.add("translate-x-full", "opacity-0");
        setTimeout(() => toastElement.remove(), 300);
      }
    }, duration);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handlePaid = async (id: string) => {
    try {
      await dispatch(markPaid(id)).unwrap();
      refetch();
      showToast({
        title: "Marked as paid",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch {
      showToast({
        title: "Error",
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
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by project or technician..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 text-sm placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            />
          </div>
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
