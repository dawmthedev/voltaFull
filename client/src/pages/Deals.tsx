import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button
} from '@chakra-ui/react';

interface Project {
  _id: string;
  homeowner: string;
  saleDate: string;
  products: string[];
  contractAmount: number;
  status: string;
  stage: string;
  duration: string;
  systemSize: string;
  assignedTo: string;
}

const Deals: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const res = await fetch('/rest/projects');
    const json = await res.json();
    setProjects(json.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    await fetch('/rest/projects/upload', {
      method: 'POST',
      body: form
    });
    fetchProjects();
  };

  return (
    <div className="p-4">
      <Input type="file" accept=".csv" onChange={handleUpload} mb={4} />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Homeowner</Th>
            <Th>Sale Date</Th>
            <Th>Products</Th>
            <Th>Contract Amount</Th>
            <Th>Status</Th>
            <Th>Stage</Th>
            <Th>System Size</Th>
            <Th>Assigned To</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((p) => (
            <Tr key={p._id}>
              <Td>{p.homeowner}</Td>
              <Td>{p.saleDate}</Td>
              <Td>{p.products.join(', ')}</Td>
              <Td>{p.contractAmount}</Td>
              <Td>{p.status}</Td>
              <Td>{p.stage}</Td>
              <Td>{p.systemSize}</Td>
              <Td>{p.assignedTo}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Deals;
