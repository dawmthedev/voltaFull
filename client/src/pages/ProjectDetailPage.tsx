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
import {
  fetchProjectById,
  Project,
} from "../store/projectsSlice";
import { fetchUsers } from "../store/usersSlice";
import { useAddPayrollMutation } from "../services/api";
import PercentageInput from "../components/PercentageInput";

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
  const getRemainingPercent = (currentIndex: number) => {
    const otherTotal = percents.reduce(
      (sum, p, idx) => (idx !== currentIndex && p != null ? sum + p : sum),
      0
    );
    return 100 - otherTotal;
  };

  // Format with proper rounding
  const calculateAmount = (baseAmount: number, percentage: number) => {
    return Math.round(baseAmount * percentage) / 100;
  };

  const totalAllocation = useMemo(() => {
    if (!project?.contractAmount || piecemealPercent == null) return 0;
    return calculateAmount(project.contractAmount, piecemealPercent);
  }, [project?.contractAmount, piecemealPercent]);

  const allocations = assignedTechIds
    .map((techId, i) => ({ userId: techId, allocationPercent: percents[i] }))
    .filter((a) => a.userId);

  const totals = allocations.map(
    (a) => (totalAllocation * a.allocationPercent) / 100
  );

  const disableSave =
    allocations.length === 0 ||
    allocations.reduce((s, a) => s + a.allocationPercent, 0) > 100;

  const [addPayroll] = useAddPayrollMutation();

  const handleSave = async () => {
    if (!projectId) return;
    const payroll = allocations.map((a) => ({
      technicianId: a.userId,
      percentage: a.allocationPercent,
    }));

    try {
      await addPayroll({ projectId, payroll }).unwrap();
    } catch {
      toast({ title: "Failed to save payroll", status: "error" });
    }
  };

  return (
    <Box className="flex-1 flex flex-col h-full px-4 md:px-6 bg-gray-50 dark:bg-gray-800 text-gray-900">
      {error && (
        <Text color="red.600" textAlign="center" mb={4}>
          {error}
        </Text>
      )}
      <Heading size="lg" mb={4}>
        Project Details
      </Heading>
      <Tabs>
        <TabList>
          <Tab>Project</Tab>
          <Tab>Payroll</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {projectStatus === "loading" && <Spinner aria-busy="true" />}
            {projectStatus === "failed" && (
              <Text color="red.500">Failed to load project</Text>
            )}
            {project && (
              <Box className="bg-gray-50 p-4" as="dl">
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
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
                </SimpleGrid>
              </Box>
            )}
          </TabPanel>
          <TabPanel>
            <Stack spacing={4} maxW="md">
              <Box p={4} borderWidth="1px" borderRadius="md">
                <Text fontSize="lg" fontWeight="bold">
                  Contract Amount:{" "}
                  {formatCurrency(project?.contractAmount || 0)}
                </Text>
                <Stack direction="row" align="center" mt={2}>
                  <Text>Piecemeal Percentage:</Text>
                  <PercentageInput
                    value={piecemealPercent}
                    onChange={setPiecemealPercent}
                    max={100}
                  />
                </Stack>
                <Text mt={2}>
                  Total Allocation: {formatCurrency(totalAllocation)}
                </Text>
              </Box>

              {assignedTechIds.map((val, i) => (
                <Stack key={i} direction="row" align="center">
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
                </Stack>
              ))}

              <Box p={4} borderWidth="1px" borderRadius="md">
                {allocations.map((a, idx) => {
                  const tech = techUsers.find((t) => t._id === a.userId);
                  const amount = calculateAmount(
                    totalAllocation,
                    a.allocationPercent
                  );
                  return (
                    <Text key={a.userId}>
                      {tech?.name || "-"}: {formatCurrency(amount)}
                    </Text>
                  );
                })}
                <Text fontWeight="bold" mt={2}>
                  Total Distribution:{" "}
                  {formatCurrency(totals.reduce((s, v) => s + v, 0))}
                </Text>
              </Box>

              <Button
                onClick={handleSave}
                colorScheme="blue"
                isDisabled={disableSave}
              >
                Save Payroll
              </Button>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProjectDetailPage;
