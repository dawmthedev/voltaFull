import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { baseURL } from "../apiConfig";
import { Project } from "../store/projectsSlice";
import { User } from "../store/usersSlice";
import { useAppDispatch } from "../store";
import { savePayroll } from "../store/projectsSlice";

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [project, setProject] = useState<Project | null>(null);
  const [techUsers, setTechUsers] = useState<User[]>([]);
  const [assignedTechIds, setAssignedTechIds] = useState<string[]>(["", "", "", ""]);
  const [percents, setPercents] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    if (!id) return;
    fetch(`${baseURL}/projects/${id}`)
      .then((res) => res.json())
      .then((d) => setProject(d.data))
      .catch(() => setProject(null));
    fetch(`${baseURL}/users`)
      .then((res) => res.json())
      .then((d) => setTechUsers(d.data.filter((u: User) => u.role === "tech")))
      .catch(() => setTechUsers([]));
  }, [id]);

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
    .map((techId, i) => ({ technicianId: techId, percent: percents[i] }))
    .filter((a) => a.technicianId);

  const totals = allocations.map((a) =>
    ((project?.contractAmount || 0) * a.percent) / 100
  );

  const handleSave = () => {
    if (!id) return;
    dispatch(
      savePayroll({ projectId: id, allocations })
    );
  };

  return (
    <Box>
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
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(project, null, 2)}
            </pre>
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
                  const tech = techUsers.find((t) => t._id === a.technicianId);
                  return (
                    <Text key={a.technicianId}>
                      {tech?.name || "-"}: ${totals[idx].toFixed(2)}
                    </Text>
                  );
                })}
                <Text fontWeight="bold" mt={2}>
                  Total: $
                  {totals.reduce((s, v) => s + v, 0).toFixed(2)}
                </Text>
              </Box>
              <Button onClick={handleSave} colorScheme="blue">
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
