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
import { fetchUnpaid, markPaid } from "../store/accountsPayableSlice";

const AccountsPayablePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const records = useAppSelector((s) => s.accountsPayable.items);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchUnpaid());
  }, [dispatch]);

  const handlePaid = async (id: string) => {
    try {
      await dispatch(markPaid(id)).unwrap();
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
          {records.map((r) => (
            <Tr key={r._id}>
              <Td>{r.project}</Td>
              <Td>{r.technician}</Td>
              <Td>{r.allocationPct}</Td>
              <Td>${r.amountDue.toFixed(2)}</Td>
              <Td>
                <span className={r.paid ? "text-green-600" : "text-yellow-600"}>
                  {r.paid ? "Paid out" : "Upcoming"}
                </span>
              </Td>
              <Td textAlign="center">
                <Checkbox
                  isChecked={r.paid}
                  onChange={() => handlePaid(r._id)}
                />
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
