import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Input,
  Select,
  IconButton,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { DeleteIcon, CheckIcon, WarningIcon, CloseIcon } from '@chakra-ui/icons';
import CSVPreviewModal from '../components/CSVPreviewModal';
import { parseCSV, CSVRow } from '../utils/csv';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => { setSuccess(null); onOpen(); };
  const {
    isOpen: csvOpen,
    onOpen: openCsv,
    onClose: closeCsv
  } = useDisclosure();
  const [csvUsers, setCsvUsers] = useState<CSVRow[]>([]);
  const [emailStatus, setEmailStatus] = useState<'valid' | 'invited' | 'exists' | 'invalid' | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isValidEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

  useEffect(() => {
    if (!email || !isValidEmail(email)) return setEmailStatus('invalid');
    fetch(`/rest/users/check-email?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.exists) setEmailStatus('exists');
        else if (data.invited) setEmailStatus('invited');
        else setEmailStatus('valid');
      });
  }, [email]);

  const fetchUsers = async () => {
    const res = await fetch('/rest/users');
    const json = await res.json();
    setUsers(json.data || []);
  };

  const onSubmitInvite = async () => {
    await fetch('/rest/users/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role, phone })
    });
    onClose();
    setSuccess(name);
    setName('');
    setEmail('');
    setRole('');
    setPhone('');
    fetchUsers();
  };

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setCsvUsers(parseCSV(text));
    openCsv();
    e.target.value = '';
  };

  const confirmCsv = async (rows: CSVRow[]) => {
    await Promise.all(rows.map((r) =>
      fetch('/rest/users/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(r)
      })
    ));
    closeCsv();
    setCsvUsers([]);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <HStack justify="space-between" mb={4}>
        <Text fontSize="xl" fontWeight="bold">Users</Text>
        <HStack>
          <input type="file" accept=".csv" onChange={handleCsvUpload} hidden id="csv-input" />
          <Button size="sm" onClick={() => document.getElementById('csv-input')?.click()}>Upload Users</Button>
          <Button colorScheme="teal" size="sm" onClick={handleOpen}>+ Invite User</Button>
        </HStack>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
              <FormControl isInvalid={emailStatus === 'invalid' || emailStatus === 'exists'}>
                <InputGroup>
                  <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  <InputRightElement>
                    {emailStatus === 'valid' && <CheckIcon color="green.400" />}
                    {emailStatus === 'invited' && <WarningIcon color="yellow.400" />}
                    {emailStatus === 'exists' && <CloseIcon color="red.400" />}
                  </InputRightElement>
                </InputGroup>
                {emailStatus === 'exists' && <FormErrorMessage>User already exists</FormErrorMessage>}
                {emailStatus === 'invited' && <FormHelperText>User already invited. You may re-send.</FormHelperText>}
              </FormControl>
              <Select placeholder="Select Role" value={role} onChange={e => setRole(e.target.value)}>
                <option value="Admin">Admin</option>
                <option value="Technician">Technician</option>
                <option value="Sales Rep">Sales Rep</option>
              </Select>
              <Input placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSubmitInvite}>{emailStatus === 'invited' ? 'Resend Invite' : 'Send Invite'}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {success && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          {success} has been invited successfully.
        </Alert>
      )}

      <CSVPreviewModal
        isOpen={csvOpen}
        onClose={closeCsv}
        rows={csvUsers}
        onConfirm={confirmCsv}
      />
    </div>
  );
};

export default UserManagementPage;
