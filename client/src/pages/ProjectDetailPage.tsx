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

      payrollEntries.forEach((entry) => {
        toast({
          title: "Payroll Saved",
          description: `${formatCurrency(entry.amountDue)} allocated to ${entry.technicianName}`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
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
                <div className="max-w-2xl space-y-6">
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-4">
                    <Text className="text-lg font-semibold">
                      Contract Amount:{" "}
                      {formatCurrency(project?.contractAmount || 0)}
                    </Text>

                    <div className="flex items-center gap-4">
                      <Text>Piecemeal Percentage:</Text>
                      <div className="w-32">
                        <PercentageInput
                          value={piecemealPercent}
                          onChange={setPiecemealPercent}
                          max={100}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <Text className="font-medium">
                      Total Allocation: {formatCurrency(totalAllocation)}
                    </Text>
                  </div>

                  {/* Technician allocation section */}
                  <div className="space-y-4">
                    {assignedTechIds.map((val, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Text w="100px">Technician {i + 1}</Text>
                        <Select
                          placeholder="Select Technician"
                          value={val}
                          onChange={(e) => {
                            handleTechChange(i, e.target.value);
                            distributePercentages();
                          }}
                        >
                          {techUsers.map((t) => (
                            <option key={t._id} value={t._id || ""}>
                              {t.name}
                            </option>
                          ))}
                        </Select>
                        <PercentageInput
                          value={percents[i]}
                          onChange={(val) => handlePercentChange(i, val)}
                          isDisabled={!val}
                          remainingPercent={getRemainingPercent(i)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Summary section */}
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm space-y-3">
                    {allocations.map((a, idx) => {
                      const tech = techUsers.find((t) => t._id === a.userId);
                      return (
                        <Text key={a.userId}>
                          {tech?.name || "-"}: {formatCurrency(totals[idx])}
                        </Text>
                      );
                    })}
                    <Text fontWeight="bold" mt={2}>
                      Total Distribution:{" "}
                      {formatCurrency(totals.reduce((s, v) => s + v, 0))}
                    </Text>
                  </div>

                  <Button
                    onClick={handleSave}
                    isDisabled={disableSave}
                    className="w-full sm:w-auto px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors disabled:opacity-50"
                  >
                    Save Payroll
                  </Button>
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
