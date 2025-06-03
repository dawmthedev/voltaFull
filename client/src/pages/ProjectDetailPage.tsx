import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchProjectById } from "../store/projectsSlice";
import { Project } from "../types/task";
import { fetchUsers } from "../store/usersSlice";
import { useAddPayrollMutation } from "../services/api";
import PercentageInput from "../components/PercentageInput";

// Task Management Components
import ProductsList from "../components/products/ProductsList";
import ProductCard from "../components/products/ProductCard";
import ProductModal from "../components/products/ProductModal";
import TasksList from "../components/tasks/TasksList";
import TaskCard from "../components/tasks/TaskCard";
import TaskAssignmentModal from "../components/tasks/TaskAssignmentModal";
import MapContainer from "../components/map/MapContainer";
import ProjectProducts from "../components/projects/ProjectProducts";
import ProjectLocation from "../components/map/ProjectLocation"; // For displaying project map

// Task Service APIs
import {
  useGetProjectProductsQuery,
  useGetProductTasksQuery,
  useGetAllTechniciansQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../services/taskService";
import {
  Product,
  Task,
  Technician,
  ProductType,
  ProductStatus,
  TaskStatus,
  TaskPriority,
} from "../types/task";

// Import icons
import {
  BsCalendar3,
  BsFileEarmarkText,
  BsCreditCard,
  BsPeople,
  BsPinMap,
  BsExclamationCircle,
  BsGear,
  BsGraphUp,
  BsClock,
  BsCalendarCheck,
} from "react-icons/bs";
import {
  IoLocation as FiMapPin,
  IoHammer as FiTool,
  IoCheckmarkCircle as FiCheckCircle,
  IoAdd as FiPlus,
  IoCalendar as FiCalendar,
  IoList as FiList,
  IoCash as FiDollarSign,
  IoPencil as FiEdit,
  IoPeople as FiUsers,
} from "react-icons/io5";
import { HiOutlineOfficeBuilding, HiOutlineTruck } from "react-icons/hi";
import { MdOutlinePhone } from "react-icons/md";

interface Allocation {
  userId: string;
  allocationPercent: number;
}

interface ToastOptions {
  title: string;
  description: string;
  status: "success" | "error" | "warning" | "info";
  duration: number;
}

interface ProductModalData {
  isOpen: boolean;
  product?: Product;
}

interface TaskModalData {
  isOpen: boolean;
  task?: Task;
  productId?: string;
}

// Type guard for project status
const isStatus = (status: unknown, expectedStatus: string): boolean => {
  return status === expectedStatus;
};

const ProjectDetailPage = (): JSX.Element | null => {
  // Ensure the project type from the store is compatible or cast appropriately
  // For now, we'll use 'as any' and refine later if needed.
  // type ProjectFromStore = typeof project; // Example if project type is inferred
  // type ProjectForMap = import('../../types/task').Project;

  const { projectId } = useParams<{ projectId: string }>();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const project = useAppSelector((s) => s.projects.current);
  const projectStatus = useAppSelector((s) => s.projects.currentStatus);
  const users = useAppSelector((s) => s.users.items);
  const techUsers = useMemo(
    () => users.filter((u) => u.role === "Technician"),
    [users]
  );

  // Payroll state
  const [assignedTechIds, setAssignedTechIds] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);
  const [percents, setPercents] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [piecemealPercent, setPiecemealPercent] = useState<number | null>(10);

  // Active tab state - now including products, product templates, and tasks tabs
  const [activeTab, setActiveTab] = useState<
    "project" | "payroll" | "products" | "productTemplates" | "tasks"
  >("project");
  const [showMap, setShowMap] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  // Filter states
  const [productFilters, setProductFilters] = useState<{
    type?: ProductType;
    status?: ProductStatus;
  }>({});

  const [taskFilters, setTaskFilters] = useState<{
    status?: TaskStatus;
    priority?: TaskPriority;
    technicianId?: string;
  }>({});
  const [productModal, setProductModal] = useState<ProductModalData>({
    isOpen: false,
  });
  const [taskModal, setTaskModal] = useState<TaskModalData>({ isOpen: false });

  // Helper function for tab class names
  const getTabClassName = (tabName: typeof activeTab) => {
    const baseClasses =
      "px-4 py-2 -mb-px text-sm font-medium border-b-2 transition-colors";
    if (activeTab === tabName) {
      return `${baseClasses} border-teal-500 text-teal-600 dark:text-teal-400`;
    }
    return `${baseClasses} border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200`;
  };

  // Map state is already defined above

  // RTK Query hooks for task management
  const {
    data: products = [],
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useGetProjectProductsQuery(projectId || "", {
    skip: !projectId,
  });

  const {
    data: tasks = [],
    isLoading: tasksLoading,
    refetch: refetchTasks,
  } = useGetProductTasksQuery(selectedProductId || "", {
    skip: !selectedProductId,
  });

  const { data: technicians = [], isLoading: techniciansLoading } =
    useGetAllTechniciansQuery();

  // Mutation hooks
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  // Custom toast function to replace Chakra UI's useToast
  const showToast = ({
    title,
    description,
    status,
    duration,
  }: ToastOptions) => {
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
    }

    toast.className = `fixed top-4 right-4 z-50 w-80 p-4 ${statusClasses} border rounded-lg shadow-lg transform transition-all duration-300 translate-x-0`;
    toast.innerHTML = `
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-${status === "success" ? "green" : "red"}-600 dark:text-${status === "success" ? "green" : "red"}-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="${iconPath}" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3 w-0 flex-1">
          <p class="text-sm font-medium">${title}</p>
          <p class="mt-1 text-sm">${description}</p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button onclick="document.getElementById('${toastId}').remove()" class="inline-flex text-${status === "success" ? "green" : "red"}-400 hover:text-${status === "success" ? "green" : "red"}-600 dark:hover:text-${status === "success" ? "green" : "red"}-300 focus:outline-none">
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

  // Define toast as a function rather than a hook
  const toast = (options: ToastOptions) => showToast(options);

  useEffect(() => {
    if (!projectId) {
      setError("Invalid project ID");
      return;
    }
    dispatch(fetchProjectById(projectId))
      .unwrap()
      .catch(() => setError("Failed to load project"));
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [projectId, dispatch, users.length]);

  useEffect(() => {
    if (project) {
      // Remove payroll initialization since it's not included in project response
      setAssignedTechIds((prev) => Array(4).fill(""));
      setPercents((prev) => Array(4).fill(0));
    }
  }, [project]);

  const handleTechChange = (idx: number, val: string) => {
    setAssignedTechIds((prev) => {
      const arr = [...prev];
      arr[idx] = val;
      return arr;
    });
  };

  // Update the handlePercentChange function signature
  const handlePercentChange = (idx: number, val: number | null) => {
    setPercents((prev) => {
      const arr = [...prev];
      arr[idx] = val;
      return arr;
    });
  };

  // Add this new function
  const distributePercentages = () => {
    const activeCount = assignedTechIds.filter((id) => id).length;
    if (activeCount > 0) {
      const evenShare = 100 / activeCount;
      setPercents((prev) =>
        prev.map((p, i) => (assignedTechIds[i] ? evenShare : null))
      );
    }
  };

  // Format currency consistently
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate remaining percentage for each technician
  const getRemainingPercent = (currentIndex: number): number => {
    const otherTotal = percents.reduce(
      (sum: number, p: number | null, idx: number) =>
        idx !== currentIndex && p != null ? sum + p : sum,
      0
    );
    // Ensure we always return a number
    return Math.max(0, 100 - otherTotal);
  };

  const totalAllocation = useMemo(() => {
    if (!project?.contractAmount || piecemealPercent == null) return 0;
    // Convert to cents to avoid floating point issues
    return Math.floor((project.contractAmount * piecemealPercent) / 100);
  }, [project?.contractAmount, piecemealPercent]);

  // Move allocations definition before it's used
  const allocations: Allocation[] = assignedTechIds
    .map((techId, i) => ({
      userId: techId,
      allocationPercent: percents[i] ?? 0,
    }))
    .filter((a) => a.userId);

  const payrollEntries = allocations.map((allocation: Allocation) => {
    const tech = techUsers.find((t) => t._id === allocation.userId);
    // Convert to cents for calculation to avoid floating point issues
    const techAmount = Math.floor(
      (totalAllocation * allocation.allocationPercent) / 100
    );

    // const techAmount = 1;

    // alert(
    //   `Technician: ${tech?.name || "Unknown"}, Amount: ${formatCurrency(
    //     techAmount
    //   )}, Percentage: ${allocation.allocationPercent}%`
    // );

    return {
      technicianId: allocation.userId,
      technicianName: tech?.name || "",
      projectName: project?.homeowner || "",
      percentage: allocation.allocationPercent,
      amountDue: techAmount, // This should now be correct
      paid: false,
    };
  });

  // Remove the separate totals calculation and use the amounts from payrollEntries
  const totals = payrollEntries.map((entry) => entry.amountDue);

  const disableSave =
    allocations.length === 0 ||
    allocations.reduce((s, a) => s + a.allocationPercent, 0) > 100;

  const [addPayroll] = useAddPayrollMutation();

  const handleSave = async () => {
    if (!projectId || !project?.homeowner) {
      toast({
        title: "Error",
        description: "Project information is missing",
        status: "error",
        duration: 5000,
      });
      return;
    }

    // Step 3: Send to API

    console.log("Step 3 - Preparing to save payroll...");
    console.log("Project ID:", projectId);
    console.log("Payroll Entries:", payrollEntries);
    // alert("Saving here");

    try {
      console.log("Step 3 - Payload:", {
        projectId,
        payroll: payrollEntries,
      });

      await addPayroll({
        projectId,
        payroll: payrollEntries,
      }).unwrap();

      // Show success toasts for each allocation
      payrollEntries.forEach((entry) => {
        const toastId = `toast-${entry.technicianId}-${Date.now()}`;
        const toast = document.createElement("div");
        toast.id = toastId;
        toast.className =
          "fixed top-4 right-4 z-50 w-80 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg shadow-lg transform transition-all duration-300 translate-x-0";
        toast.innerHTML = `
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1">
              <p class="text-sm font-medium text-green-800 dark:text-green-200">Payroll Saved</p>
              <p class="mt-1 text-sm text-green-700 dark:text-green-300">${formatCurrency(entry.amountDue)} allocated to ${entry.technicianName}</p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button onclick="document.getElementById('${toastId}').remove()" class="inline-flex text-green-400 hover:text-green-600 dark:hover:text-green-300 focus:outline-none">
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
        }, 5000);
      });
    } catch (error) {
      console.error("Save Payroll Error:", error);
      toast({
        title: "Failed to save payroll",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while saving the payroll",
        status: "error",
        duration: 5000,
      });
    }
  };

  // Handle product modal actions
  const handleProductSave = async (productData: Partial<Product>) => {
    try {
      if (productModal.product?.id) {
        // Update existing product
        await updateProduct({
          ...productData,
          id: productModal.product.id,
        }).unwrap();
      } else {
        // Add new product
        await createProduct({
          ...productData,
          status: "not_started",
          projectId: projectId || "",
        }).unwrap();
      }
      setProductModal({ isOpen: false });
    } catch (err) {
      setError("Failed to save product");
    }
  };

  // Handle adding/updating a task
  const handleTaskSave = async (taskData: Partial<Task>) => {
    try {
      if (taskModal.task?.id) {
        // Update existing task
        await updateTask({
          ...taskData,
          id: taskModal.task.id,
        }).unwrap();
      } else {
        // Add new task
        await createTask({
          ...taskData,
          status: "pending",
          productId: selectedProductId || "",
        }).unwrap();
      }
      setTaskModal({ isOpen: false });
    } catch (err) {
      setError("Failed to save task");
    }
  };

  // Filter tasks (use for filter UI)
  const filteredTasks = tasks.filter((t: Task) => {
    if (taskFilters.status && t.status !== taskFilters.status) return false;
    if (taskFilters.priority && t.priority !== taskFilters.priority)
      return false;
    if (
      taskFilters.technicianId &&
      !t.assignedTo?.includes(taskFilters.technicianId)
    )
      return false;
    return true;
  });

  // Filter products (use for filter UI)
  const filteredProducts = products.filter((p: Product) => {
    if (productFilters.type && p.type !== productFilters.type) return false;
    if (productFilters.status && p.status !== productFilters.status)
      return false;
    return true;
  });

  // 1. Handle main project loading state
  if (projectStatus === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      </div>
    );
  }

  // 2. Handle project fetch error or project not found (even if status succeeded but project is missing)
  if (
    isStatus(projectStatus, "failed") ||
    (isStatus(projectStatus, "succeeded") && !project)
  ) {
    // Consider a more specific message if projectStatus === 'failed'
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500 dark:text-red-400">
        <h2 className="text-2xl font-semibold mb-4">Project Not Found</h2>
        <p className="text-lg mb-2">
          We couldn't find the project you're looking for.
        </p>
        <p className="text-sm">
          It might have been moved, deleted, or the ID is incorrect.
        </p>
        <Link
          to="/dashboard/projects"
          className="mt-6 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  // At this point, projectStatus is 'succeeded' AND project is guaranteed to be defined.
  // 3. Handle loading for dependent data (products, technicians)
  if (productsLoading || techniciansLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        <p className="ml-4 text-gray-700 dark:text-gray-300">
          Loading project details...
        </p>
      </div>
    );
  }

  // All checks passed. Project is defined and all necessary data should be loaded.
  // The final 'if (!project)' check before this refactor is now covered by the combined condition above.

  // Final explicit guard for project existence before rendering main content
  if (!project) {
    // This should ideally not be reached if the above logic is correct,
    // but serves as a definitive guarantee for TypeScript's control flow analysis.
    console.error(
      "ProjectDetailPage: Reached final guard, project is unexpectedly null."
    );
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 p-4 animate-in fade-in slide-in-from-top-4">
            <p className="text-red-600 dark:text-red-400 text-center font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Project Location Map - Placed above the tabs */}
        {project && (project as any).latitude && (project as any).longitude && (
          <div className="mb-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-1">
            <ProjectLocation
              project={project as any}
              className="h-80 w-full rounded-lg"
            />
          </div>
        )}

        <div className="flex flex-col gap-6">
          <header className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Project Details
            </h1>
          </header>

          <div className="space-y-6">
            {/* Custom tabs implementation */}
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("project")}
                className={getTabClassName("project")}
              >
                Project
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={getTabClassName("products")}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab("tasks")}
                className={getTabClassName("tasks")}
              >
                Tasks
              </button>
              <button
                onClick={() => setActiveTab("payroll")}
                className={getTabClassName("payroll")}
              >
                Payroll
              </button>
            </div>

            <div className="mt-4">
              {/* Project tab panel */}
              {activeTab === "project" &&
                (isStatus(projectStatus, "loading") ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                  </div>
                ) : isStatus(projectStatus, "failed") ? (
                  <div className="text-center text-red-500 py-12">
                    Failed to load project
                  </div>
                ) : project ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      {Object.entries({
                        homeowner: project.homeowner,
                        saleDate: project.saleDate,
                        products: project.products?.join(", "),
                        status: project.status,
                        stage: project.stage,
                        contractAmount: project.contractAmount,
                        systemSize: project.systemSize,
                        installer: project.installer,
                        phone: project.phone,
                        address: project.address,
                        utilityCompany: project.utilityCompany,
                        salesRep: project.salesRep,
                        projectManager: project.projectManager,
                        financing: project.financing,
                        source: project.source,
                        ahj: project.ahj,
                        qcStatus: project.qcStatus,
                        ptoStatus: project.ptoStatus,
                        duration: project.duration,
                        assignedTo: project.assignedTo,
                      }).map(([label, val]) => (
                        <div key={label} className="py-1">
                          <dt className="font-semibold capitalize text-gray-800 dark:text-gray-200">
                            {label}
                          </dt>
                          <dd className="text-gray-600 dark:text-gray-300">
                            {val || "-"}
                          </dd>
                        </div>
                      ))}
                    </div>

                    {/* Project Location Map */}
                    {project.address && (
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            Project Location
                          </h3>
                          <button
                            onClick={() => setShowMap(!showMap)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          >
                            {showMap ? "Hide Map" : "Show Map"}
                          </button>
                        </div>

                        {showMap && (
                          <div className="h-80 rounded-lg overflow-hidden">
                            <MapContainer
                              markers={[
                                {
                                  id: project._id || "1",
                                  latitude: 30.2672, // Placeholder - would be geocoded from project.address
                                  longitude: -97.7431, // Placeholder - would be geocoded from project.address
                                  title:
                                    project.homeowner || "Project Location",
                                  description: project.address,
                                  color: "#10B981", // teal-500
                                },
                              ]}
                              showDirectionsButton={true}
                              zoom={15}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : null)}

              {/* Products tab panel */}
              {activeTab === "products" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Products
                    </h2>
                    <button
                      type="button"
                      onClick={() => setProductModal({ isOpen: true })}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                      Add Product
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex flex-wrap gap-3">
                    <div>
                      <label
                        htmlFor="type-filter"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Type
                      </label>
                      <select
                        id="type-filter"
                        value={productFilters.type || ""}
                        onChange={(e) =>
                          setProductFilters({
                            ...productFilters,
                            type: (e.target.value as ProductType) || undefined,
                          })
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">All Types</option>
                        <option value="Solar">Solar</option>
                        <option value="HVAC">HVAC</option>
                        <option value="MPU">MPU</option>
                        <option value="Quiet Cool">Quiet Cool</option>
                        <option value="Service">Service</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="status-filter"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Status
                      </label>
                      <select
                        id="status-filter"
                        value={productFilters.status || ""}
                        onChange={(e) =>
                          setProductFilters({
                            ...productFilters,
                            status:
                              (e.target.value as ProductStatus) || undefined,
                          })
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">All Statuses</option>
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on_hold">On Hold</option>
                      </select>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    {productsLoading ? (
                      <div className="p-6 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                      </div>
                    ) : products.length === 0 ? (
                      <div className="p-6 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                          No products found. Add a product to get started.
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {products
                          .filter(
                            (product) =>
                              (!productFilters.type ||
                                product.type === productFilters.type) &&
                              (!productFilters.status ||
                                product.status === productFilters.status)
                          )
                          .map((product) => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              onClick={() => {
                                setSelectedProductId(product.id);
                                setActiveTab("tasks");
                              }}
                              onEdit={() =>
                                setProductModal({ isOpen: true, product })
                              }
                            />
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Product Templates tab panel */}
              {activeTab === "productTemplates" && (
                <div className="flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Product Templates
                    </h2>
                  </div>

                  {projectId && <ProjectProducts projectId={projectId} />}
                </div>
              )}

              {/* Tasks tab panel */}
              {activeTab === "tasks" && (
                <div className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  {selectedProductId ? (
                    <>
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                          <span>Tasks for </span>
                          <span className="ml-1 font-semibold">
                            {products.find((p) => p.id === selectedProductId)
                              ?.name || "Product"}
                          </span>
                        </h3>
                        <button
                          onClick={() => setSelectedProductId(null)}
                          className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-medium"
                        >
                          Back to all products
                        </button>
                      </div>

                      <TasksList
                        tasks={tasks}
                        technicians={technicians}
                        onTaskSelect={(taskId) => {
                          const selectedTask = tasks.find(
                            (t) => t.id === taskId
                          );
                          if (selectedTask) {
                            setTaskModal({
                              isOpen: true,
                              task: selectedTask,
                            });
                          }
                        }}
                        onAddTask={() =>
                          setTaskModal({
                            isOpen: true,
                            productId: selectedProductId,
                          })
                        }
                        isLoading={tasksLoading}
                      />
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Select a product to view its tasks
                      </p>
                      <button
                        onClick={() => setActiveTab("products")}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        Go to Products
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Payroll tab panel */}
              {activeTab === "payroll" && (
                <div className="max-w-2xl mx-auto space-y-8 py-6">
                  {/* Contract and Piecemeal Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-5">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Contract Amount
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Total project value to distribute
                      </p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        {project?.contractAmount
                          ? formatCurrency(project.contractAmount)
                          : "$0.00"}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 grid gap-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-600 dark:text-gray-300">
                            Piecemeal Allocation
                          </p>
                          <button
                            onClick={distributePercentages}
                            className="px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-900"
                          >
                            Distribute Evenly
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technician Allocation Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                      Technician Allocation
                    </h3>
                    <div className="space-y-6">
                      {assignedTechIds.map((val, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                        >
                          <label
                            htmlFor={"tech-" + i}
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 md:col-span-1"
                          >
                            Technician {i + 1}
                          </label>
                          <div className="md:col-span-1">
                            <select
                              id={"tech-" + i}
                              value={val}
                              onChange={(e) => {
                                handleTechChange(i, e.target.value);
                                distributePercentages();
                              }}
                              className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-3 py-2.5 h-[42px]"
                            >
                              <option value="" disabled>
                                Select Technician
                              </option>
                              {techUsers.map((t) => (
                                <option key={t._id} value={t._id || ""}>
                                  {t.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="md:col-span-1">
                            <PercentageInput
                              value={percents[i]}
                              onChange={(newVal) =>
                                handlePercentChange(i, newVal)
                              }
                              isDisabled={!val}
                              remainingPercent={getRemainingPercent(i)}
                              className="w-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-3">
                      Payroll Summary
                    </h3>
                    {allocations.map((a, idx) => {
                      const tech = techUsers.find((t) => t._id === a.userId);
                      return (
                        <p
                          key={a.userId}
                          className="text-sm text-gray-700 dark:text-gray-300 flex justify-between"
                        >
                          <span>{tech?.name || "-"}:</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {formatCurrency(totals[idx])}
                          </span>
                        </p>
                      );
                    })}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <p className="text-md font-semibold text-gray-900 dark:text-white flex justify-between">
                        <span>Total Distribution:</span>
                        <span>
                          {formatCurrency(totals.reduce((s, v) => s + v, 0))}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={disableSave}
                      className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save Payroll
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {productModal.isOpen && (
        <ProductModal
          isOpen={productModal.isOpen}
          onClose={() => setProductModal({ isOpen: false })}
          product={productModal.product}
          onSave={handleProductSave}
        />
      )}

      {/* Task Assignment Modal */}
      {taskModal.isOpen && (
        <TaskAssignmentModal
          isOpen={taskModal.isOpen}
          onClose={() => setTaskModal({ isOpen: false })}
          task={taskModal.task}
          technicians={technicians}
          onSave={handleTaskSave}
        />
      )}
    </div>
  );
};

export default ProjectDetailPage;
