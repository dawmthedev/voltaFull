import React, { useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "../store";
import {
  fetchProjects,
  updateProjectPayroll,
  fetchProjectById,
} from "../store/projectsSlice";
import { fetchUsers } from "../store/usersSlice";

const AccountsPayablePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((s) => s.projects.items);
  const users = useAppSelector((s) => s.users.items);
  const project = useAppSelector((state) => state.projects.current);
  const toast = useToast();
  const projectId = useAppSelector((state) => state.projects.current._id);
  useEffect(() => {
    if (projects.length === 0) dispatch(fetchProjects());
    if (users.length === 0) dispatch(fetchUsers());
  }, [dispatch, projects.length, users.length]);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [projectId, dispatch]);

  const rows = projects.flatMap((p) =>
    (p.payroll || []).map((r) => ({
      projectId: p._id || "",
      project: p.homeowner,
      technicianId: r.technicianId,
      technician: users.find((u) => u._id === r.technicianId)?.name || "-",
      percentage: r.percentage,
      amount: ((p.contractAmount || 0) * r.percentage) / 100,
      paid: r.paid || false,
    }))
  );

  const handlePaid = async (projectId: string, techId: string) => {
    const payroll = rows
      .filter((r) => r.projectId === projectId)
      .map((r) => ({
        technicianId: r.technicianId,
        percentage: r.percentage,
        paid: r.technicianId === techId ? true : r.paid,
      }));
    try {
      await dispatch(
        updateProjectPayroll({
          id: projectId,
          payroll,
          piecemealPercent: project?.piecemealPercent || 10, // Use existing or default
        })
      ).unwrap();
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
    <Box p={4} className="overflow-x-auto bg-gray-50">
      <Heading size="md" mb={4}>
        Accounts Payable
      </Heading>
      <Table size="sm" className="min-w-max">
        <Thead className="sticky top-0 bg-white">
          <Tr>
            <Th>Project</Th>
            <Th>Technician</Th>
            <Th>Allocation %</Th>
            <Th>Payout</Th>
            <Th textAlign="center">Paid</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((r, i) => (
            <Tr key={i}>
              <Td>{r.project}</Td>
              <Td>{r.technician}</Td>
              <Td>{r.percentage}</Td>
              <Td>${r.amount.toFixed(2)}</Td>
              <Td textAlign="center">
                <Checkbox
                  isChecked={r.paid}
                  onChange={() => handlePaid(r.projectId, r.technicianId)}
                />
              </Td>
            </Tr>
          ))}
          {rows.length === 0 && (
            <Tr>
              <Td colSpan={3} className="text-center">
                No data
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AccountsPayablePage;
