import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useDisclosure,
  useToast,
  Stack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { fetchProjects, createProject } from "../store/projectsSlice";
import { useAppDispatch, useAppSelector } from "../store";
import AddProjectModal from "../components/AddProjectModal";
import CSVPreviewModal from "../components/CSVPreviewModal";
import { CSVRow, parseCSV } from "../utils/csv";
import ProjectCard from "../components/ProjectCard";

const ProjectsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.items);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: previewOpen,
    onOpen: openPreview,
    onClose: closePreview,
  } = useDisclosure();
  const [csvQueue, setCsvQueue] = useState<CSVRow[]>([]);
  const toast = useToast();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreate = onOpen;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const rows = parseCSV(text);
    setCsvQueue(rows);
    openPreview();
    e.target.value = "";
  };

  const transformCSVToProject = (row: CSVRow) => ({
    homeowner: row["Homeowner"],
    saleDate: row["Sale Date"],
    products: row["Products"] ? row["Products"].split(";") : [],
    status: row["Solar Install - Status"] || row["Status"],
    stage: row["Stage"],
    contractAmount:
      parseFloat(
        (row["Contract Amount Final"] || "").replace(/[^0-9.]/g, "")
      ) || 0,
    systemSize:
      row["Final System Size (Watts)"] || row["Sold System Size (Watts)"],
    phone: row["Phone"],
    address: row["Address"],
    installer: row["Installer"],
    utilityCompany: row["Utility Company Text"],
    salesRep: row["Sales Rep"],
    projectManager: row["Project Manager"],
    financing: row["Financing"],
    source: row["Source"],
    ahj: row["AHJ"],
    qcStatus: row["QC Check - Status"],
    ptoStatus: row["PTO - Status"],
    assignedTo: row["email1"]?.toLowerCase() || null,
    duration: row["Project Duration"],
  });

  const handleConfirm = async (rows: CSVRow[]) => {
    for (const r of rows) {
      await dispatch(createProject(transformCSVToProject(r)));
    }
    closePreview();
    setCsvQueue([]);
    dispatch(fetchProjects());
    toast({
      title: `${rows.length} Projects Uploaded`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box px={{ base: 4, md: 8 }} py={6} flex="1" overflowY="auto">
      <Flex justify="space-between" align="center" wrap="wrap" mb={4}>
        <Heading size="md" className="text-balance">
          Projects Dashboard
        </Heading>
        <HStack spacing={{ base: 2, md: 4 }} flexWrap="wrap">
          <input
            type="file"
            accept=".csv"
            onChange={handleUpload}
            hidden
            ref={inputRef}
            data-testid="csv-input"
          />
          <Button onClick={() => inputRef.current?.click()} variant="ghost">
            Upload CSV
          </Button>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={handleCreate}
          >
            Add Project
          </Button>
        </HStack>
      </Flex>
      <Box height={4} />

      <Stack spacing={4} display={{ base: "block", md: "none" }}>
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </Stack>

      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        overflowX="auto"
        className="overflow-x-auto"
        display={{ base: "none", md: "block" }}
      >
        <Table size="md" variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th>Homeowner</Th>
              <Th>Sale Date</Th>
              <Th>Products</Th>
              <Th>Status</Th>
              <Th>Stage</Th>
              <Th isNumeric>Contract Amount</Th>
              <Th>System Size</Th>
              <Th>Installer</Th>
              <Th>Phone</Th>
              <Th display={{ base: "none", lg: "table-cell" }}>Sales Rep</Th>
              <Th display={{ base: "none", lg: "table-cell" }}>Address</Th>
              <Th display={{ base: "none", lg: "table-cell" }}>
                Utility Company
              </Th>
              <Th display={{ base: "none", lg: "table-cell" }}>PTO Status</Th>
              <Th display={{ base: "none", lg: "table-cell" }}>
                Project Manager
              </Th>
              <Th display={{ base: "none", lg: "table-cell" }}>Financing</Th>
              <Th display={{ base: "none", lg: "table-cell" }}>Source</Th>
              <Th display={{ base: "none", lg: "table-cell" }}>AHJ</Th>
              <Th display={{ base: "none", lg: "table-cell" }}>QC Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((p) => (
              <Tr key={p._id} _hover={{ bg: "gray.50" }}>
                <Td fontWeight="semibold">{p.homeowner}</Td>
                <Td>{p.saleDate}</Td>
                <Td>
                  <Flex flexWrap="wrap" gap="1">
                    {p.products?.map((prod) => (
                      <Badge
                        key={prod}
                        variant="solid"
                        colorScheme="teal"
                        className="whitespace-nowrap"
                      >
                        {prod}
                      </Badge>
                    ))}
                  </Flex>
                </Td>
                <Td>{p.status}</Td>
                <Td>{p.stage}</Td>
                <Td isNumeric>{p.contractAmount}</Td>
                <Td>{p.systemSize}</Td>
                <Td>{p.installer}</Td>
                <Td>{p.phone}</Td>
                <Td display={{ base: "none", lg: "table-cell" }}>
                  {p.salesRep}
                </Td>
                <Td display={{ base: "none", lg: "table-cell" }}>
                  {p.address}
                </Td>
                <Td display={{ base: "none", lg: "table-cell" }}>
                  {p.utilityCompany}
                </Td>
                <Td display={{ base: "none", lg: "table-cell" }}>
                  {p.ptoStatus}
                </Td>
                <Td display={{ base: "none", lg: "table-cell" }}>
                  {p.projectManager}
                </Td>
                <Td display={{ base: "none", lg: "table-cell" }}>
                  {p.financing}
                </Td>
                <Td display={{ base: "none", lg: "table-cell" }}>{p.source}</Td>
                <Td display={{ base: "none", lg: "table-cell" }}>{p.ahj}</Td>
                <Td display={{ base: "none", lg: "table-cell" }}>
                  {p.qcStatus}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <AddProjectModal isOpen={isOpen} onClose={onClose} />
      <CSVPreviewModal
        isOpen={previewOpen}
        onClose={closePreview}
        rows={csvQueue}
        onConfirm={handleConfirm}
      />
    </Box>
  );
};

export default ProjectsPage;
