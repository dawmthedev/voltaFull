import React, { useEffect, useState } from "react";
import CSVPreviewModal from "../components/CSVPreviewModal";
import { parseCSV, CSVRow } from "../utils/csv";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchUsers, User, updateUser } from "../store/usersSlice";
import { baseURL } from "../apiConfig";
import DataTable, { DataTableColumn } from "../components/DataTable";
import { userService } from "../services/userService";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
// Custom toast function
const showToast = ({
  title,
  description,
  status,
  duration = 5000,
}: {
  title: string;
  description: string;
  status: "success" | "error" | "warning" | "info";
  duration?: number;
}) => {
  const toastId = `toast-${Date.now()}`;
  const toast = document.createElement("div");
  toast.id = toastId;

  // Apply different styles based on status
  let statusClasses = "";
  let iconPath = "";

  if (status === "success") {
    statusClasses =
      "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200";
    iconPath =
      "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z";
  } else if (status === "error") {
    statusClasses =
      "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200";
    iconPath =
      "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z";
  } else if (status === "warning") {
    statusClasses =
      "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200";
    iconPath =
      "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z";
  } else {
    statusClasses =
      "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200";
    iconPath =
      "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z";
  }

  toast.className = `fixed top-4 right-4 z-50 w-80 p-4 ${statusClasses} border rounded-lg shadow-lg transform transition-all duration-300 translate-x-0`;
  toast.innerHTML = `
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-${status === "success" ? "green" : status === "error" ? "red" : status === "warning" ? "amber" : "blue"}-600 dark:text-${status === "success" ? "green" : status === "error" ? "red" : status === "warning" ? "amber" : "blue"}-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="${iconPath}" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3 w-0 flex-1">
        <p class="text-sm font-medium">${title}</p>
        <p class="mt-1 text-sm">${description}</p>
      </div>
      <div class="ml-4 flex-shrink-0 flex">
        <button onclick="document.getElementById('${toastId}').remove()" class="inline-flex text-${status === "success" ? "green" : status === "error" ? "red" : status === "warning" ? "amber" : "blue"}-400 hover:text-${status === "success" ? "green" : status === "error" ? "red" : status === "warning" ? "amber" : "blue"}-600 dark:hover:text-${status === "success" ? "green" : status === "error" ? "red" : status === "warning" ? "amber" : "blue"}-300 focus:outline-none">
          <span class="sr-only">Close</span>
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(toast);

  // Auto-remove the toast after specified duration
  setTimeout(() => {
    const toastElement = document.getElementById(toastId);
    if (toastElement) {
      toastElement.classList.add("translate-x-full", "opacity-0");
      setTimeout(() => toastElement.remove(), 300);
    }
  }, duration);
};

// Available user roles in the system
const USER_ROLES = [
  "admin",
  "project_manager",
  "field_technician",
  "office_staff",
  "viewer",
];

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
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const openEdit = (user: User) => {
    setEditUser(user);
    setEditRole(user.role);
    onOpen();
  };
  const closeEdit = () => {
    setEditUser(null);
    setEditRole("");
    onClose();
  };
  const handleOpen = () => {
    setMessage(null);
    onOpen();
  };
  const [csvUsers, setCsvUsers] = useState<CSVRow[]>([]);
  type EmailStatus = "valid" | "exists" | "invited" | "invalid" | null;
  const [emailStatus, setEmailStatus] = useState<EmailStatus>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

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
    try {
      setIsUpdating(true);
      await userService.inviteUser({
        name,
        email,
        role,
        phone,
      });

      showToast({
        title: "Success",
        description: `${name} has been invited successfully! 👋`,
        status: "success",
      });

      // Reset form
      setName("");
      setEmail("");
      setRole("");
      setPhone("");
      onClose();

      // Refresh users list
      dispatch(fetchUsers());
    } catch (error) {
      console.error("Error inviting user:", error);
      showToast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to send invitation",
        status: "error",
      });
    } finally {
      setIsUpdating(false);
    }
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
    try {
      setIsUpdating(true);

      // Process all rows in parallel
      const results = await Promise.allSettled(
        rows.map((row) =>
          userService.inviteUser({
            name: row.name || "",
            email: row.email,
            role: row.role || "user",
            phone: row.phone || "",
          })
        )
      );

      // Count successful and failed invites
      const successCount = results.filter(
        (r) => r.status === "fulfilled"
      ).length;
      const errorCount = results.filter((r) => r.status === "rejected").length;

      // Show appropriate toast
      if (successCount > 0) {
        showToast({
          title: "Bulk Invite Complete",
          description: `Successfully invited ${successCount} user(s). ${errorCount > 0 ? `${errorCount} failed.` : ""}`,
          status: errorCount > 0 ? "warning" : "success",
        });
      }

      if (errorCount > 0) {
        console.error(
          "Some invites failed:",
          results.filter((r) => r.status === "rejected")
        );
      }

      // Close modal and refresh users list
      closeCsv();
      setCsvUsers([]);
      dispatch(fetchUsers());
    } catch (error) {
      console.error("Error in bulk invite:", error);
      showToast({
        title: "Error",
        description: "Failed to process bulk invites. Please try again.",
        status: "error",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const onSubmitUpdate = async () => {
    if (!editUser || !editRole) return;

    // Get user ID from _id property or fall back to type assertion if structure is different
    const userId = String(editUser._id || (editUser as any).id || "");

    // Validate that userId has the proper MongoDB ObjectId format (24 hex characters)
    if (!userId || !/^[0-9a-f]{24}$/i.test(userId)) {
      showToast({
        title: "Error",
        description: "Invalid user ID format",
        status: "error",
        duration: 5000,
      });
      return;
    }

    setIsUpdating(true);

    try {
      // Dispatch the update user action which will call our API
      await dispatch(updateUser({ id: userId, role: editRole })).unwrap();

      // No need to refresh users - our Redux state is updated automatically

      // Show success toast
      showToast({
        title: "Success",
        description: `User role updated to ${editRole}`,
        status: "success",
        duration: 5000,
      });

      // Close the modal on success
      closeEdit();
    } catch (error) {
      console.error("Failed to update user role:", error);

      // Show error toast
      showToast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update user role",
        status: "error",
        duration: 5000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const columns: DataTableColumn<User>[] = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Role", key: "role" },
    { header: "Phone", key: "phone" },
    {
      header: "Actions",
      key: "actions",
      renderCell: (u: User) => (
        <button
          onClick={() => openEdit(u)}
          className="text-indigo-600 hover:underline"
        >
          Edit
        </button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <PageContainer>
      <PageHeader
        title="Users"
        actions={
          <button
            onClick={handleOpen}
            className="flex-1 sm:flex-none min-w-[120px] px-4 py-2.5 bg-teal-600 text-white 
              rounded-xl text-sm font-medium shadow-lg active:scale-95 transition-transform
              hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            + Invite User
          </button>
        }
      />

      <div
        className="overflow-hidden rounded-t-2xl sm:rounded-xl shadow-lg 
        bg-white dark:bg-gray-900 transition-all duration-300"
      >
        <div className="overflow-x-auto">
          <div className="min-w-max sm:min-w-full">
            <DataTable
              columns={columns}
              data={users}
              page={page}
              pageSize={pageSize}
              total={users.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Edit User Role Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit User Role</h2>
              <button
                onClick={closeEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User: {editUser.name}
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email: {editUser.email}
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Select a role</option>
                  {USER_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={closeEdit}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmitUpdate}
                  disabled={!editRole}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    !editRole
                      ? "bg-teal-300 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {/* Edit Role Modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit User Role</h2>
              <button
                onClick={closeEdit}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  User: {editUser.name}
                </p>
                <p className="text-sm text-gray-600">Email: {editUser.email}</p>
              </div>

              <div>
                <label
                  htmlFor="role-select"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role
                </label>
                <select
                  id="role-select"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">Select a role</option>
                  {USER_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSubmitUpdate}
                  disabled={!editRole || isUpdating}
                  className={`px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                    !editRole || isUpdating
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isUpdating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Invite User</h2>
              <button onClick={onClose} className="text-gray-500">
                &times;
              </button>
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
                  emailStatus === "exists" || emailStatus === "invalid"
                    ? ""
                    : ""
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
                  <p className="text-sm text-yellow-600">
                    User already invited
                  </p>
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

      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit User</h2>
              <button onClick={closeEdit} className="text-gray-500">
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <select
                className="w-full border border-gray-300 rounded p-2"
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="Technician">Technician</option>
                <option value="Sales Rep">Sales Rep</option>
              </select>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={onSubmitUpdate}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div
          className={`mt-4 p-4 rounded ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <CSVPreviewModal
        isOpen={csvOpen}
        onClose={closeCsv}
        rows={csvUsers}
        onConfirm={confirmCsv}
      />
    </PageContainer>
  );
};

export default UserManagementPage;
