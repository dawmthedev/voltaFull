import React, { useEffect, useState, Fragment } from "react";
import { FaCalendarAlt, FaCheck, FaChevronDown, FaTimes } from "react-icons/fa";
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
  const [productsOpen, setProductsOpen] = useState(false);
  const [techsOpen, setTechsOpen] = useState(false);

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
            <div className="relative">  
              <button 
                type="button" 
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-left"
                onClick={() => setProductsOpen(!productsOpen)}
              >
                <span>{products.length > 0 ? `${products.length} products selected` : 'Select products'}</span>
                <FaChevronDown className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {productsOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                  {[
                    { label: "Solar", value: "Solar" },
                    { label: "Battery", value: "Battery" },
                    { label: "EV Charger", value: "EV Charger" },
                    { label: "Roofing", value: "Roofing" },
                    { label: "HVAC", value: "HVAC" },
                    { label: "Service", value: "Service" }
                  ].map((option) => (
                    <div 
                      key={option.value}
                      className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        if (products.includes(option.value)) {
                          setProducts(products.filter(p => p !== option.value));
                        } else {
                          setProducts([...products, option.value]);
                        }
                      }}
                    >
                      <div className={`w-4 h-4 border rounded flex items-center justify-center mr-2 ${products.includes(option.value) ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-500'}`}>
                        {products.includes(option.value) && <FaCheck className="text-white text-xs" />}
                      </div>
                      <span>{option.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {products.map(product => (
                <span key={product} className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-md dark:bg-blue-900 dark:text-blue-300">
                  {product}
                  <button 
                    type="button" 
                    onClick={() => setProducts(products.filter(p => p !== product))}
                    className="ml-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <FaTimes size={12} />
                  </button>
                </span>
              ))}
            </div> 
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
            <div className="relative">
              <button 
                type="button" 
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-left"
                onClick={() => setTechsOpen(!techsOpen)}
              >
                <span>
                  {technicians.length > 0 
                    ? `${technicians.length} technician${technicians.length > 1 ? 's' : ''} selected` 
                    : 'Assign Technician'}
                </span>
                <FaChevronDown className={`transition-transform ${techsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {techsOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                  {techUsers.map((tech) => (
                    <div 
                      key={tech._id}
                      className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        if (technicians.includes(tech._id)) {
                          setTechnicians(technicians.filter(id => id !== tech._id));
                        } else {
                          // Limit to 3 technicians
                          if (technicians.length < 3) {
                            setTechnicians([...technicians, tech._id]);
                          }
                        }
                      }}
                    >
                      <div className={`w-4 h-4 border rounded flex items-center justify-center mr-2 ${technicians.includes(tech._id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-500'}`}>
                        {technicians.includes(tech._id) && <FaCheck className="text-white text-xs" />}
                      </div>
                      <span>{`${tech.name} (${tech.role})`}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {techUsers
                .filter(tech => technicians.includes(tech._id))
                .map(tech => (
                  <span key={tech._id} className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-md dark:bg-blue-900 dark:text-blue-300">
                    {tech.name}
                    <button 
                      type="button" 
                      onClick={() => setTechnicians(technicians.filter(id => id !== tech._id))}
                      className="ml-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}
            </div>
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
