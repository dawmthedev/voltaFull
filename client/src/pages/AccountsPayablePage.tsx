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

  const handlePaid = async (id: string) => {
    try {
      await dispatch(markPaid(id)).unwrap();
      toast({ title: "Marked as paid", status: "success", duration: 2000, isClosable: true });
    } catch {
      toast({ title: "Failed to mark paid", status: "error", duration: 2000, isClosable: true });
    }
  };

  return (
    <Box p={4} overflowX="auto">
      <Heading size="md" mb={4}>
        Accounts Payable
      </Heading>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Project</Th>
            <Th>Technician</Th>
            <Th textAlign="center">Paid</Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((r) => (
            <Tr key={r._id}>
              <Td>{r.project}</Td>
              <Td>{r.technician}</Td>
              <Td textAlign="center">
                <Checkbox onChange={() => handlePaid(r._id)} />
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
