import React, { useEffect, useState } from 'react';
import {
  Box,
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
import { useAppDispatch, useAppSelector } from '../store';
import { fetchUsers } from '../store/usersSlice';
import DataTable, { DataTableColumn } from "../components/DataTable";

const UserManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.items);
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
  type EmailStatus = 'valid' | 'exists' | 'invited' | 'invalid' | null;
  const [emailStatus, setEmailStatus] = useState<EmailStatus>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isValidEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

  useEffect(() => {
    if (!isValidEmail(email)) {
      setEmailStatus(email ? 'invalid' : null);
      return;
    }
    fetch(`/api/users/check-email?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        if (data.exists) setEmailStatus('exists');
        else if (data.invited) setEmailStatus('invited');
        else setEmailStatus('valid');
      });
  }, [email]);


  const onSubmitInvite = async () => {
    await fetch('/api/users/invite', {
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
    dispatch(fetchUsers());
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
      fetch('/api/users/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(r)
      })
    ));
    closeCsv();
    setCsvUsers([]);
    dispatch(fetchUsers());
  };

  const columns: DataTableColumn[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    { header: 'Phone', accessor: 'phone' }
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        overflowX="auto"
        maxH="60vh"
        overflowY="auto"
        className="overflow-x-auto"
      >
        <DataTable columns={columns} data={users} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
              <FormControl isInvalid={emailStatus === 'exists' || emailStatus === 'invalid'}>
                <InputGroup>
                  <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  <InputRightElement>
                    {emailStatus === 'valid' && <CheckIcon color="green.400" />}
                    {emailStatus === 'invited' && <WarningIcon color="yellow.400" />}
                    {emailStatus === 'exists' && <CloseIcon color="red.400" />}
                  </InputRightElement>
                </InputGroup>
                {emailStatus === 'valid' && <FormHelperText color="green.500">Valid email</FormHelperText>}
                {emailStatus === 'invited' && <FormHelperText color="yellow.600">User already invited</FormHelperText>}
                {emailStatus === 'exists' && <FormErrorMessage>User already exists</FormErrorMessage>}
                {emailStatus === 'invalid' && <FormErrorMessage>Invalid email address</FormErrorMessage>}
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
