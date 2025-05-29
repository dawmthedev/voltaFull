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
import { fetchUnpaid, markPaid } from "../store/accountsPayableSlice";
import { useAppDispatch, useAppSelector } from "../store";

const AccountsPayablePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const records = useAppSelector((s) => s.accountsPayable.items);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchUnpaid());
  }, [dispatch]);

  const handlePaid = async (projectId: string, techId: string) => {
    const payroll = records.filter(r => r.projectId === projectId).map(r => ({
      technicianId: r.techId,
      percentage: r.allocationPct,
      paid: r.projectId === projectId && r.techId === techId ? true : r.paid,
    }));
    try {
      await dispatch(markPaid({ projectId, payroll })).unwrap();
      toast({ title: "Marked as paid", status: "success", duration: 2000, isClosable: true });
    } catch {
      toast({ title: "Failed to mark paid", status: "error", duration: 2000, isClosable: true });
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
          {records.map((r, i) => (
            <Tr key={i}>
              <Td>{r.projectName}</Td>
              <Td>{r.techId}</Td>
              <Td>{r.allocationPct}</Td>
              <Td>${r.amountDue.toFixed(2)}</Td>
              <Td textAlign="center">
                <Checkbox isChecked={r.paid} onChange={() => handlePaid(r.projectId, r.techId)} />
              </Td>
            </Tr>
          ))}
          {records.length === 0 && (
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
