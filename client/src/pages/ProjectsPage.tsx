import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import { fetchProjects, createProject, Project } from "../store/projectsSlice";
import { useAppDispatch, useAppSelector } from "../store";
import AddProjectModal from "../components/AddProjectModal";
import CSVPreviewModal from "../components/CSVPreviewModal";
import { CSVRow, parseCSV } from "../utils/csv";
import DataTable, { DataTableColumn } from "../components/DataTable";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";

const ProjectsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.items);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isOpen, setIsOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const openPreview = () => setPreviewOpen(true);
  const closePreview = () => setPreviewOpen(false);
  const [csvQueue, setCsvQueue] = useState<CSVRow[]>([]);
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
    window.alert(`${rows.length} Projects Uploaded`);
  };

  const columns: DataTableColumn<Project>[] = [
    {
      header: "",
      key: "edit",
      renderCell: (p: Project) => (
        <Link
          to={`/dashboard/projects/${p._id || (p as any).id}`}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
          aria-label="Edit Project"
        >
          <EditIcon />
        </Link>
      ),
    },
    { header: "Homeowner", key: "homeowner" },
    { header: "Sale Date", key: "saleDate" },
    { header: "Products", key: "products" },
    { header: "Status", key: "status" },
    { header: "Stage", key: "stage" },
    { header: "Contract Amount", key: "contractAmount" },
    {
      header: "Piecemeal %",
      key: "piecemealPercent",
      renderCell: (p: Project) => `${p.piecemealPercent || 0}%`,
    },
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

  const tableActions = {
    label: "Actions",
    items: [
      {
        label: "Log Items",
        action: (selected: Project[]) => {
          console.log("Logging selected items:", selected);
          // Implement your logging logic here
        },
      },
    ],
  };

  const actionButtons = (
    <>
      <input
        type="file"
        accept=".csv"
        onChange={handleUpload}
        hidden
        ref={inputRef}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="flex-1 sm:flex-none min-w-[120px] px-4 py-2.5 bg-teal-600 text-white 
          rounded-xl text-sm font-medium shadow-lg active:scale-95 transition-transform
          hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        Upload CSV
      </button>
      <button
        onClick={handleCreate}
        className="flex-1 sm:flex-none min-w-[120px] px-4 py-2.5 bg-teal-600 text-white 
          rounded-xl text-sm font-medium shadow-lg active:scale-95 transition-transform
          hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        + Add Project
      </button>
    </>
  );

  return (
    <PageContainer>
      <PageHeader title="Projects" actions={actionButtons} />

      <div
        className="overflow-hidden rounded-t-2xl sm:rounded-xl shadow-lg 
        bg-white dark:bg-gray-900 transition-all duration-300"
      >
        <div className="overflow-x-auto">
          <div className="min-w-max sm:min-w-full">
            <DataTable
              columns={columns}
              data={projects}
              page={page}
              pageSize={pageSize}
              total={projects.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              allowSelection={true}
              actions={tableActions}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile-optimized loading skeleton */}
      {projects.length === 0 && (
        <div className="space-y-4 animate-pulse p-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"
            />
          ))}
        </div>
      )}

      <AddProjectModal isOpen={isOpen} onClose={onClose} />
      <CSVPreviewModal
        isOpen={previewOpen}
        onClose={closePreview}
        rows={csvQueue}
        onConfirm={handleConfirm}
      />
    </PageContainer>
  );
};

export default ProjectsPage;
