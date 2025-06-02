import React, { useEffect, useState, Fragment } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Select from "react-select";
import axios from "axios";
import { useAppDispatch } from "../store";
import { createProject } from "../store/projectsSlice";
import { baseURL } from "../apiConfig";
import UserDropdown, { UserOption } from "./UserDropdown";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [homeowner, setHomeowner] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [products, setProducts] = useState<string[]>([]);
  const [contractAmount, setContractAmount] = useState("");
  const [status, setStatus] = useState("");
  const [stage, setStage] = useState("");
  const [salesRepId, setSalesRepId] = useState("");
  const [technicians, setTechnicians] = useState<string[]>([]);
  const [salesReps, setSalesReps] = useState<UserOption[]>([]);
  const [techUsers, setTechUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    axios
      .get<UserOption[]>(`${baseURL}/users`)
      .then((res) => {
        const all = res.data;
        setSalesReps(all.filter((u) => u.role === "sales"));
        setTechUsers(all.filter((u) => u.role === "tech"));
      })
      .catch(() => {
        setSalesReps([]);
        setTechUsers([]);
      });
  }, [isOpen]);

  const handleSubmit = async () => {
    setLoading(true);
    await dispatch(
      createProject({
        homeowner,
        saleDate,
        products,
        contractAmount: Number(contractAmount),
        status,
        stage,
        salesRep: salesRepId, // Change salesRepId to salesRep
        technicians,
      })
    );
    setLoading(false);
    onClose();
    setHomeowner("");
    setSaleDate("");
    setProducts([]);
    setContractAmount("");
    setStatus("");
    setStage("");
    setSalesRepId("");
    setTechnicians([]);
  };

  return (
    <>      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
          <div className="relative bg-white dark:bg-gray-800 w-full max-w-lg rounded-lg shadow-xl p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Add New Project</h3>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Homeowner"
              value={homeowner}
              onChange={(e) => setHomeowner(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="relative">
              <input
                id="saleDate"
                aria-label="Sale Date"
                type="date"
                placeholder="Sale Date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
            </div>
            <Select
              isMulti
              options={[
                { label: "Solar", value: "Solar" },
                { label: "Battery", value: "Battery" },
                { label: "Service", value: "Service" },
                { label: "Roofing", value: "Roofing" },
                { label: "EV Charger", value: "EV Charger" },
                { label: "HVAC", value: "HVAC" },
              ]}
              placeholder="Products"
              value={products.map((p) => ({ label: p, value: p }))}
              onChange={(vals: any) => setProducts(vals.map((v: any) => v.value))}
              className="react-select-container"
              classNamePrefix="react-select"
            />
            <input
              id="contractAmount"
              aria-label="Contract Amount"
              placeholder="Contract Amount"
              value={contractAmount}
              onChange={(e) => setContractAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Hold">Hold</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Stage</option>
              <option value="NTP">NTP</option>
              <option value="Voltaic Check">Voltaic Check</option>
              <option value="Install Scheduled">Install Scheduled</option>
            </select>
            <select
              value={salesRepId}
              onChange={(e) => setSalesRepId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Sales Rep</option>
              {salesReps.map((rep) => (
                <option key={rep._id} value={rep._id}>
                  {rep.name} - ({rep.region || rep.org})
                </option>
              ))}
            </select>
            <Select
              isMulti
              placeholder="Assign Technician"
              options={techUsers.map((t) => ({
                label: `${t.name} (${t.role})`,
                value: t._id,
              }))}
              value={techUsers
                .filter((t) => technicians.includes(t._id))
                .map((t) => ({ label: `${t.name} (${t.role})`, value: t._id }))}
              onChange={(vals: any) =>
                setTechnicians(vals.slice(0, 3).map((v: any) => v.value))
              }
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
          <pre className="mt-4 text-xs bg-gray-100 p-2 rounded">
            {JSON.stringify(
              {
                homeowner,
                saleDate,
                products,
                contractAmount,
                status,
                stage,
                salesRepId,
                technicians,
              },
              null,
              2
            )}
          </pre>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={!homeowner || !salesRepId || products.length === 0 || loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default AddProjectModal;
