import React, { useEffect, useState } from "react";
import { fetchProjects, createProject, Project } from "../store/projectsSlice";
import { useAppDispatch, useAppSelector } from "../store";
import AddProjectModal from "../components/AddProjectModal";
import CSVPreviewModal from "../components/CSVPreviewModal";
import { CSVRow, parseCSV } from "../utils/csv";
import DataTable, { DataTableColumn } from "../components/DataTable";

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

    <div className="flex-1 px-4 md:px-6 bg-gray-50 dark:bg-gray-800 overflow-auto">

      <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Projects Dashboard
        </h1>
        <div className="flex flex-wrap items-center space-x-2">
          <input
            type="file"
            accept=".csv"
            onChange={handleUpload}
            hidden
            ref={inputRef}
            data-testid="csv-input"
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            Upload CSV
          </button>
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            + Add Project
          </button>
        </div>
      </div>
      <div className="h-4" />

      <div className="w-full h-full">
        <DataTable
          columns={columns}
          data={projects}
          page={page}
          pageSize={pageSize}
          total={projects.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      <AddProjectModal isOpen={isOpen} onClose={onClose} />
      <CSVPreviewModal
        isOpen={previewOpen}
        onClose={closePreview}
        rows={csvQueue}
        onConfirm={handleConfirm}
      />
      </div>
    </div>
  );
};

export default ProjectsPage;
