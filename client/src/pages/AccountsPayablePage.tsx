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
            <Th>Status</Th>
            <Th textAlign="center">Paid</Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((r: PayrollRecord) => (
            <Tr key={r._id}>
              <Td>{r.projectName}</Td>
              <Td>{r.technicianName}</Td>
              <Td>{r.percentage}%</Td>
              <Td>${r.amountDue.toFixed(2)}</Td>
              <Td>
                <StatusChip stage={r.projectStage} paid={r.paid} />
              </Td>
            </Tr>
          ))}
          {records.length === 0 && (
            <Tr>
              <Td colSpan={6} className="text-center">
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
