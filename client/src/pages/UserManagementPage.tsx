import React, { useEffect, useState } from "react";
import CSVPreviewModal from "../components/CSVPreviewModal";
import { parseCSV, CSVRow } from "../utils/csv";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchUsers, User } from "../store/usersSlice";
import DataTable, { DataTableColumn } from "../components/DataTable";

const UserManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.items);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const openCsv = () => setCsvOpen(true);
  const closeCsv = () => setCsvOpen(false);
  const handleOpen = () => {
    setSuccess(null);
    onOpen();
  };
  const [csvUsers, setCsvUsers] = useState<CSVRow[]>([]);
  type EmailStatus = "valid" | "exists" | "invited" | "invalid" | null;
  const [emailStatus, setEmailStatus] = useState<EmailStatus>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isValidEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

  useEffect(() => {
    if (!isValidEmail(email)) {
      setEmailStatus(email ? "invalid" : null);
      return;
    }
    fetch(`/api/users/check-email?email=${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) setEmailStatus("exists");
        else if (data.invited) setEmailStatus("invited");
        else setEmailStatus("valid");
      });
  }, [email]);

  const onSubmitInvite = async () => {
    await fetch("/api/users/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role, phone }),
    });
    onClose();
    setSuccess(name);
    setName("");
    setEmail("");
    setRole("");
    setPhone("");
    dispatch(fetchUsers());
  };

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setCsvUsers(parseCSV(text));
    openCsv();
    e.target.value = "";
  };

  const confirmCsv = async (rows: CSVRow[]) => {
    await Promise.all(
      rows.map((r) =>
        fetch("/api/users/invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(r),
        })
      )
    );
    closeCsv();
    setCsvUsers([]);
    dispatch(fetchUsers());
  };

  const columns: DataTableColumn<User>[] = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Role", key: "role" },
    { header: "Phone", key: "phone" },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (

    <div className="flex-1 px-4 md:px-6 bg-gray-50 dark:bg-gray-800 overflow-auto">

      <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Users
        </h1>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept=".csv"
            onChange={handleCsvUpload}
            hidden
            ref={inputRef}
            id="csv-input"
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            Upload CSV
          </button>
          <button
            onClick={handleOpen}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            + Invite User
          </button>
        </div>
      </div>

      <div className="w-full h-full">
        <DataTable
          columns={columns}
          data={users}
          page={page}
          pageSize={pageSize}
          total={users.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Invite User</h2>
              <button onClick={onClose} className="text-gray-500">&times;</button>
            </div>
            <div className="space-y-4">
              <input
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div
                className={`space-y-1 ${
                  emailStatus === "exists" || emailStatus === "invalid" ? "" : ""
                }`}
              >
                <div className="relative">
                  <input
                    className="w-full border border-gray-300 rounded p-2"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="absolute right-2 top-2">
                    {emailStatus === "valid" && (
                      <span className="text-green-400">&#10003;</span>
                    )}
                    {emailStatus === "invited" && (
                      <span className="text-yellow-400">&#9888;</span>
                    )}
                    {emailStatus === "exists" && (
                      <span className="text-red-400">&#10005;</span>
                    )}
                  </div>
                </div>
                {emailStatus === "valid" && (
                  <p className="text-sm text-green-500">Valid email</p>
                )}
                {emailStatus === "invited" && (
                  <p className="text-sm text-yellow-600">User already invited</p>
                )}
                {emailStatus === "exists" && (
                  <p className="text-sm text-red-500">User already exists</p>
                )}
                {emailStatus === "invalid" && (
                  <p className="text-sm text-red-500">Invalid email address</p>
                )}
              </div>
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Technician">Technician</option>
                <option value="Sales Rep">Sales Rep</option>
              </select>
              <input
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={onSubmitInvite}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {emailStatus === "invited" ? "Resend Invite" : "Send Invite"}
              </button>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          {success} has been invited successfully.
        </div>
      )}

      <CSVPreviewModal
        isOpen={csvOpen}
        onClose={closeCsv}
        rows={csvUsers}
        onConfirm={confirmCsv}
      />
      </div>
    </div>
  );
};

export default UserManagementPage;
