import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Select,
  Input,
  Text,
  Button,
  Spinner,
  SimpleGrid,
  InputGroup,
  InputRightAddon,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchProjectById, Project } from "../store/projectsSlice";
import { fetchUsers } from "../store/usersSlice";
import { useAddPayrollMutation } from "../services/api";
import PercentageInput from "../components/PercentageInput";

interface Allocation {
  userId: string;
  allocationPercent: number;
}

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.projects.current);
  const projectStatus = useAppSelector((s) => s.projects.currentStatus);
  const users = useAppSelector((s) => s.users.items);
  const techUsers = useMemo(
    () => users.filter((u) => u.role === "Technician"),
    [users]
  );
  const [assignedTechIds, setAssignedTechIds] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [percents, setPercents] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [piecemealPercent, setPiecemealPercent] = useState<number | null>(10);

  const toast = useToast();

  useEffect(() => {
    if (!projectId) {
      setError("Invalid project ID");
      return;
    }
    dispatch(fetchProjectById(projectId))
      .unwrap()
      .catch(() => setError("Failed to load project"));
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [projectId, dispatch, users.length]);

  useEffect(() => {
    if (project) {
      // Remove payroll initialization since it's not included in project response
      setAssignedTechIds((prev) => Array(4).fill(""));
      setPercents((prev) => Array(4).fill(0));
    }
  }, [project]);

  const handleTechChange = (idx: number, val: string) => {
    setAssignedTechIds((prev) => {
      const arr = [...prev];
      arr[idx] = val;
      return arr;
    });
  };

  // Update the handlePercentChange function signature
  const handlePercentChange = (idx: number, val: number | null) => {
    setPercents((prev) => {
      const arr = [...prev];
      arr[idx] = val;
      return arr;
    });
  };

  // Add this new function
  const distributePercentages = () => {
    const activeCount = assignedTechIds.filter((id) => id).length;
    if (activeCount > 0) {
      const evenShare = 100 / activeCount;
      setPercents((prev) =>
        prev.map((p, i) => (assignedTechIds[i] ? evenShare : null))
      );
    }
  };

  // Format currency consistently
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate remaining percentage for each technician
  const getRemainingPercent = (currentIndex: number): number => {
    const otherTotal = percents.reduce(
      (sum: number, p: number | null, idx: number) =>
        idx !== currentIndex && p != null ? sum + p : sum,
      0
    );
    // Ensure we always return a number
    return Math.max(0, 100 - otherTotal);
  };

  const totalAllocation = useMemo(() => {
    if (!project?.contractAmount || piecemealPercent == null) return 0;
    // Convert to cents to avoid floating point issues
    return Math.floor((project.contractAmount * piecemealPercent) / 100);
  }, [project?.contractAmount, piecemealPercent]);

  // Move allocations definition before it's used
  const allocations: Allocation[] = assignedTechIds
    .map((techId, i) => ({
      userId: techId,
      allocationPercent: percents[i] ?? 0,
    }))
    .filter((a) => a.userId);

  const payrollEntries = allocations.map((allocation: Allocation) => {
    const tech = techUsers.find((t) => t._id === allocation.userId);
    // Convert to cents for calculation to avoid floating point issues
    const techAmount = Math.floor(
      (totalAllocation * allocation.allocationPercent) / 100
    );

    // const techAmount = 1;

    // alert(
    //   `Technician: ${tech?.name || "Unknown"}, Amount: ${formatCurrency(
    //     techAmount
    //   )}, Percentage: ${allocation.allocationPercent}%`
    // );

    return {
      technicianId: allocation.userId,
      technicianName: tech?.name || "",
      projectName: project?.homeowner || "",
      percentage: allocation.allocationPercent,
      amountDue: techAmount, // This should now be correct
      paid: false,
    };
  });

  // Remove the separate totals calculation and use the amounts from payrollEntries
  const totals = payrollEntries.map((entry) => entry.amountDue);

  const disableSave =
    allocations.length === 0 ||
    allocations.reduce((s, a) => s + a.allocationPercent, 0) > 100;

  const [addPayroll] = useAddPayrollMutation();

  const handleSave = async () => {
    if (!projectId || !project?.homeowner) {
      toast({
        title: "Error",
        description: "Project information is missing",
        status: "error",
        duration: 5000,
      });
      return;
    }

    // Step 3: Send to API

    console.log("Step 3 - Preparing to save payroll...");
    console.log("Project ID:", projectId);
    console.log("Payroll Entries:", payrollEntries);
    // alert("Saving here");

    try {
      console.log("Step 3 - Payload:", {
        projectId,
        payroll: payrollEntries,
      });

      await addPayroll({
        projectId,
        payroll: payrollEntries,
      }).unwrap();

      // Show success toasts for each allocation
      payrollEntries.forEach((entry) => {
        const toastId = `toast-${entry.technicianId}-${Date.now()}`;
        const toast = document.createElement('div');
        toast.id = toastId;
        toast.className = 'fixed top-4 right-4 z-50 w-80 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg shadow-lg transform transition-all duration-300 translate-x-0';
        toast.innerHTML = `
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1">
              <p class="text-sm font-medium text-green-800 dark:text-green-200">Payroll Saved</p>
              <p class="mt-1 text-sm text-green-700 dark:text-green-300">${formatCurrency(entry.amountDue)} allocated to ${entry.technicianName}</p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button onclick="document.getElementById('${toastId}').remove()" class="inline-flex text-green-400 hover:text-green-600 dark:hover:text-green-300 focus:outline-none">
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(toast);
        
        // Auto-remove the toast after 5 seconds
        setTimeout(() => {
          const toastElement = document.getElementById(toastId);
          if (toastElement) {
            toastElement.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => toastElement.remove(), 300);
          }
        }, 5000);
      });
    } catch (error) {
      console.error("Save Payroll Error:", error);
      toast({
        title: "Failed to save payroll",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while saving the payroll",
        status: "error",
        duration: 5000,
      });
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 p-4 animate-in fade-in slide-in-from-top-4">
            <Text className="text-red-600 dark:text-red-400 text-center font-medium">
              {error}
            </Text>
          </div>
        )}

        <div className="flex flex-col gap-6">
          <header className="flex items-center justify-between">
            <Heading className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Project Details
            </Heading>
          </header>

          <Tabs className="space-y-6">
            <TabList className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
              <Tab className="px-4 py-2 -mb-px text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border-b-2 border-transparent ui-selected:border-blue-500 ui-selected:text-blue-600 dark:ui-selected:text-blue-400 transition-colors">
                Project
              </Tab>
              <Tab className="px-4 py-2 -mb-px text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border-b-2 border-transparent ui-selected:border-blue-500 ui-selected:text-blue-600 dark:ui-selected:text-blue-400 transition-colors">
                Payroll
              </Tab>
            </TabList>

            <TabPanels className="mt-4">
              <TabPanel>
                {projectStatus === "loading" ? (
                  <div className="flex items-center justify-center h-64">
                    <Spinner className="text-blue-500" />
                  </div>
                ) : projectStatus === "failed" ? (
                  <div className="text-center text-red-500 py-12">
                    Failed to load project
                  </div>
                ) : project ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    {Object.entries({
                      homeowner: project.homeowner,
                      saleDate: project.saleDate,
                      products: project.products?.join(", "),
                      status: project.status,
                      stage: project.stage,
                      contractAmount: project.contractAmount,
                      systemSize: project.systemSize,
                      installer: project.installer,
                      phone: project.phone,
                      address: project.address,
                      utilityCompany: project.utilityCompany,
                      salesRep: project.salesRep,
                      projectManager: project.projectManager,
                      financing: project.financing,
                      source: project.source,
                      ahj: project.ahj,
                      qcStatus: project.qcStatus,
                      ptoStatus: project.ptoStatus,
                      duration: project.duration,
                      assignedTo: project.assignedTo,
                    }).map(([label, val]) => (
                      <Box key={label} className="py-1">
                        <Text
                          as="dt"
                          fontWeight="semibold"
                          className="capitalize"
                        >
                          {label}
                        </Text>
                        <Text as="dd">{val || "-"}</Text>
                      </Box>
                    ))}
                  </div>
                ) : null}
              </TabPanel>

              <TabPanel>
                <div className="max-w-2xl mx-auto space-y-8 py-6">
                  {/* Contract and Piecemeal Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                      Contract Details
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium text-gray-800 dark:text-gray-200">Contract Amount:</span>{" "}
                        {formatCurrency(project?.contractAmount || 0)}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Piecemeal Percentage:
                        </label>
                        <div className="w-full sm:w-36">
                          <PercentageInput
                            value={piecemealPercent}
                            onChange={setPiecemealPercent}
                            max={100}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 pt-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">Total Allocation for Piecemeal:</span>{" "}
                        <span className="text-teal-600 dark:text-teal-400 font-semibold">
                          {formatCurrency(totalAllocation)}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Technician Allocation Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                      Technician Allocation
                    </h3>
                    <div className="space-y-6">
                      {assignedTechIds.map((val, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          <label htmlFor={`tech-${i}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 md:col-span-1">
                            Technician {i + 1}
                          </label>
                          <div className="md:col-span-1">
                            <select
                              id={`tech-${i}`}
                              value={val}
                              onChange={(e) => {
                                handleTechChange(i, e.target.value);
                                distributePercentages();
                              }}
                              className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-3 py-2.5 h-[42px]"
                            >
                              <option value="" disabled>Select Technician</option>
                              {techUsers.map((t) => (
                                <option key={t._id} value={t._id || ""}>
                                  {t.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="md:col-span-1">
                            <PercentageInput
                              value={percents[i]}
                              onChange={(newVal) => handlePercentChange(i, newVal)}
                              isDisabled={!val}
                              remainingPercent={getRemainingPercent(i)}
                              className="w-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                      Payroll Summary
                    </h3>
                    {allocations.map((a, idx) => {
                      const tech = techUsers.find((t) => t._id === a.userId);
                      return (
                        <p key={a.userId} className="text-sm text-gray-700 dark:text-gray-300 flex justify-between">
                          <span>{tech?.name || "-"}:</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{formatCurrency(totals[idx])}</span>
                        </p>
                      );
                    })}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <p className="text-md font-semibold text-gray-900 dark:text-white flex justify-between">
                        <span>Total Distribution:</span>
                        <span>
                          {formatCurrency(totals.reduce((s, v) => s + v, 0))}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={disableSave}
                      className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save Payroll
                    </button>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </Box>
  );
};

export default ProjectDetailPage;
