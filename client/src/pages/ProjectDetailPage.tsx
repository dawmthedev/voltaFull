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
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import {
  fetchProjectById,
  updateProjectPayroll,
  Project,
} from "../store/projectsSlice";
import { fetchUsers } from "../store/usersSlice";

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.projects.current);
  const projectStatus = useAppSelector((s) => s.projects.currentStatus);
  const users = useAppSelector((s) => s.users.items);
  const techUsers = useMemo(
    () => users.filter((u) => u.role === "Technician"),
    [users]
  );
  const [assignedTechIds, setAssignedTechIds] = useState<string[]>(["", "", "", ""]);
  const [percents, setPercents] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (!id) {
      navigate("/dashboard/projects");
      return;
    }
    dispatch(fetchProjectById(id));
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [id, dispatch]);

  const handleTechChange = (idx: number, val: string) => {
    setAssignedTechIds((prev) => {
      const arr = [...prev];
      arr[idx] = val;
      return arr;
    });
  };

  const handlePercentChange = (idx: number, val: string) => {
    setPercents((prev) => {
      const arr = [...prev];
      arr[idx] = Number(val);
      return arr;
    });
  };

  const allocations = assignedTechIds
    .map((techId, i) => ({ userId: techId, allocationPercent: percents[i] }))
    .filter((a) => a.userId);

  const totals = allocations.map((a) =>
    ((project?.contractAmount || 0) * a.allocationPercent) / 100
  );

  const disableSave =
    allocations.length === 0 ||
    allocations.reduce((s, a) => s + a.allocationPercent, 0) > 100;

  const handleSave = () => {
    if (!id) return;
    dispatch(updateProjectPayroll({ id, technicians: allocations }));
  };

  return (
    <Box className="bg-white text-gray-900 max-w-6xl mx-auto p-6">
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
                      <Text as="dt" fontWeight="semibold" className="capitalize">
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
            <Stack spacing={3} maxW="sm">
              {assignedTechIds.map((val, i) => (
                <Stack key={i} direction="row" align="center">
                  <Select
                    placeholder="Select Technician"
                    value={val}
                    onChange={(e) => handleTechChange(i, e.target.value)}
                  >
                    {techUsers.map((t) => (
                      <option key={t._id} value={t._id || ""}>
                        {t.name}
                      </option>
                    ))}
                  </Select>
                  <Input
                    type="number"
                    placeholder="%"
                    value={percents[i]}
                    onChange={(e) => handlePercentChange(i, e.target.value)}
                  />
                </Stack>
              ))}
              <Box>
                {allocations.map((a, idx) => {
                  const tech = techUsers.find((t) => t._id === a.userId);
                  return (
                    <Text key={a.userId}>
                      {tech?.name || "-"}: ${totals[idx].toFixed(2)}
                    </Text>
                  );
                })}
                <Text fontWeight="bold" mt={2}>
                  Total: $
                  {totals.reduce((s, v) => s + v, 0).toFixed(2)}
                </Text>
              </Box>
              <Button
                onClick={handleSave}
                colorScheme="blue"
                disabled={disableSave}
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
