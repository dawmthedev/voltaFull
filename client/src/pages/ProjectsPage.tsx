import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  useDisclosure,
  useToast,
  Stack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { fetchProjects, createProject, Project } from "../store/projectsSlice";
import { useAppDispatch, useAppSelector } from "../store";
import AddProjectModal from "../components/AddProjectModal";
import CSVPreviewModal from "../components/CSVPreviewModal";
import { CSVRow, parseCSV } from "../utils/csv";
import ProjectCard from "../components/ProjectCard";
import DataTable, { DataTableColumn } from "../components/DataTable";

const ProjectsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.items);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
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

  const columns: DataTableColumn<Project>[] = [
    { header: "Homeowner", key: "homeowner" },
    { header: "Sale Date", key: "saleDate" },
    { header: "Products", key: "products" },
    { header: "Status", key: "status" },
    { header: "Stage", key: "stage" },
    { header: "Contract Amount", key: "contractAmount" },
    { header: "System Size", key: "systemSize" },
    { header: "Installer", key: "installer" },
    { header: "Phone", key: "phone" },
    { header: "Sales Rep", key: "salesRep" },
    { header: "Address", key: "address" },
    { header: "Utility Company", key: "utilityCompany" },
    { header: "PTO Status", key: "ptoStatus" },
    { header: "Project Manager", key: "projectManager" },
    { header: "Financing", key: "financing" },
    { header: "Source", key: "source" },
    { header: "AHJ", key: "ahj" },
    { header: "QC Status", key: "qcStatus" },
  ];

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

      <div className="w-full h-full overflow-auto">
        <DataTable
          columns={columns}
          data={projects}
          pagination={{
            page,
            pageSize,
            total: projects.length,
            onPageChange: setPage,
            onPageSizeChange: setPageSize,
          }}
          renderMobileRow={(p) => <ProjectCard project={p} />}
        />
      </div>

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
