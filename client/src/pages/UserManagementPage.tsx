import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, HStack, Text } from '@chakra-ui/react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await fetch('/rest/users');
    const json = await res.json();
    setUsers(json.data || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <HStack justify="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">Users</Text>
        <Button size="sm">Upload Users</Button>
      </HStack>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Phone</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((u) => (
            <Tr key={u.id}>
              <Td>{u.name}</Td>
              <Td>{u.email}</Td>
              <Td>{u.role}</Td>
              <Td>{u.phone || ''}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default UserManagementPage;
