import React, { useState } from "react";
import {
  IoLayersOutline,
  IoAddCircleOutline,
  IoSearchOutline,
  IoCloseOutline,
  IoSunny,
  IoThunderstorm,
  IoCube,
  IoWater,
  IoConstruct,
} from "react-icons/io5";
import {
  ProductTemplate,
  ProductType,
  EventTemplate,
  StatusTemplate,
} from "../types/task";
import {
  useGetProductTemplatesQuery,
  useCreateProductTemplateMutation,
  useUpdateProductTemplateMutation,
  useDeleteProductTemplateMutation,
} from "../store/productTemplatesSlice";

const ProductTemplatesPage: React.FC = () => {
  const {
    data: productTemplates,
    isLoading,
    refetch,
  } = useGetProductTemplatesQuery();
  const [createProductTemplate] = useCreateProductTemplateMutation();
  const [updateProductTemplate] = useUpdateProductTemplateMutation();
  const [deleteProductTemplate] = useDeleteProductTemplateMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<ProductType | "all">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] =
    useState<ProductTemplate | null>(null);

  // Get appropriate icon based on product type
  const getProductIcon = (type: ProductType) => {
    switch (type) {
      case "Solar":
        return <IoSunny className="h-6 w-6" />;
      case "HVAC":
        return <IoThunderstorm className="h-6 w-6" />;
      case "MPU":
        return <IoCube className="h-6 w-6" />;
      case "Quiet Cool":
        return <IoWater className="h-6 w-6" />;
      case "Service":
        return <IoConstruct className="h-6 w-6" />;
      default:
        return <IoCube className="h-6 w-6" />;
    }
  };

  const filteredTemplates = productTemplates?.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    const matchesType = filterType === "all" || template.type === filterType;

    return matchesSearch && matchesType;
  });

  const handleCreateTemplate = async (
    newTemplate: Omit<ProductTemplate, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      await createProductTemplate({
        ...newTemplate,
        defaultEvents: newTemplate.defaultEvents || [],
        isPublished: false, // Start unpublished
      }).unwrap();
      refetch();
      setIsModalOpen(false);
      setCurrentTemplate(null);
    } catch (error) {
      console.error("Failed to create template:", error);
    }
  };

  const handleUpdateTemplate = async (updatedTemplate: ProductTemplate) => {
    try {
      await updateProductTemplate({
        id: updatedTemplate.id,
        template: {
          name: updatedTemplate.name,
          description: updatedTemplate.description,
          type: updatedTemplate.type,
          defaultEvents: updatedTemplate.defaultEvents || [],
          isPublished: updatedTemplate.isPublished,
        },
      }).unwrap();
      refetch();
      setIsModalOpen(false);
      setCurrentTemplate(null);
    } catch (error) {
      console.error("Failed to update template:", error);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      try {
        await deleteProductTemplate(id).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to delete template:", error);
      }
    }
  };

  const openCreateModal = () => {
    setCurrentTemplate(null);
    setIsModalOpen(true);
  };

  const openEditModal = (template: ProductTemplate) => {
    setCurrentTemplate(template);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <IoLayersOutline className="h-8 w-8 text-teal-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Product Workflows
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <IoCloseOutline className="h-5 w-5" />
              </button>
            )}
          </div>

          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as ProductType | "all")
            }
            className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Types</option>
            <option value="Solar">Solar</option>
            <option value="HVAC">HVAC</option>
            <option value="MPU">MPU</option>
            <option value="Quiet Cool">Quiet Cool</option>
            <option value="Service">Service</option>
          </select>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            <IoAddCircleOutline className="h-5 w-5 mr-2" />
            New Template
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : filteredTemplates?.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <IoLayersOutline className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No Templates Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {searchTerm || filterType !== "all"
              ? "No templates match your search criteria."
              : "You haven't created any product templates yet."}
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            <IoAddCircleOutline className="h-5 w-5 mr-2" />
            Create Your First Template
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates?.map((template) => (
            <div
              key={template.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    {getProductIcon(template.type)}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {template.type}
                    </p>
                  </div>
                </div>
              </div>

              {template.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {template.description}
                </p>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {template.defaultEvents.length}{" "}
                    {template.defaultEvents.length === 1 ? "Event" : "Events"}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(template)}
                      className="p-2 text-teal-600 hover:text-teal-800 hover:bg-teal-50 dark:text-teal-400 dark:hover:text-teal-300 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Template Modal */}
      {isModalOpen && (
        <TemplateFormModal
          template={currentTemplate}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentTemplate(null);
          }}
          onSave={currentTemplate ? handleUpdateTemplate : handleCreateTemplate}
        />
      )}
    </div>
  );
};

interface TemplateFormModalProps {
  template: ProductTemplate | null;
  onClose: () => void;
  onSave: (template: any) => void;
}

const TemplateFormModal: React.FC<TemplateFormModalProps> = ({
  template,
  onClose,
  onSave,
}: TemplateFormModalProps) => {
  const [formData, setFormData] = useState<
    Omit<ProductTemplate, "id" | "createdAt" | "updatedAt">
  >({
    name: template?.name || "",
    description: template?.description || "",
    type: template?.type || "Solar",
    defaultEvents: template?.defaultEvents || [],
    isPublished: template?.isPublished || false,
  });

  const [currentEventName, setCurrentEventName] = useState("");
  const [currentEventDescription, setCurrentEventDescription] = useState("");
  const [currentEventIndex, setCurrentEventIndex] = useState<number | null>(
    null
  );

  // Status management
  const [currentStatusName, setCurrentStatusName] = useState("");
  const [editingStatuses, setEditingStatuses] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addEvent = () => {
    if (!currentEventName.trim()) return;

    const newEvent: EventTemplate = {
      id: Date.now().toString(), // Use timestamp as temporary ID
      name: currentEventName,
      description: currentEventDescription,
      defaultTasks: [],
      order: formData.defaultEvents.length + 1,
      statuses: [], // Initialize with empty statuses array
    };

    setFormData({
      ...formData,
      defaultEvents: [...formData.defaultEvents, newEvent],
    });

    setCurrentEventName("");
    setCurrentEventDescription("");
  };

  const removeEvent = (index: number) => {
    setFormData({
      ...formData,
      defaultEvents: formData.defaultEvents.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(template ? { id: template.id } : {}),
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black opacity-40"
          onClick={onClose}
        ></div>

        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-auto z-10">
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {template ? "Edit Product Template" : "Create Product Template"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <IoCloseOutline className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Template Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product Type*
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="Solar">Solar</option>
                  <option value="HVAC">HVAC</option>
                  <option value="MPU">MPU</option>
                  <option value="Quiet Cool">Quiet Cool</option>
                  <option value="Service">Service</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Default Events
                </label>

                <div className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Event name"
                      value={currentEventName}
                      onChange={(e) => setCurrentEventName(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Description (optional)"
                      value={currentEventDescription}
                      onChange={(e) =>
                        setCurrentEventDescription(e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={addEvent}
                      className="whitespace-nowrap px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow-sm transition-colors"
                    >
                      Add Event
                    </button>
                  </div>
                </div>

                {formData.defaultEvents.length > 0 ? (
                  <div className="space-y-3 max-h-60 overflow-y-auto p-1">
                    {formData.defaultEvents.map((event, index) => (
                      <div
                        key={event.id}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white">
                              {event.name}
                            </h4>
                            {event.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {event.description}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentEventIndex(index);
                                setEditingStatuses(true);
                              }}
                              className="text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 p-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => removeEvent(index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Status chips */}
                        {event.statuses && event.statuses.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                              Statuses:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {[...event.statuses]
                                .sort((a, b) => a.order - b.order)
                                .map((status, statusIndex) => (
                                  <span
                                    key={status.id}
                                    className={`px-2 py-1 text-xs rounded-full ${status.isFinal ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"}`}
                                  >
                                    {status.name}
                                    {statusIndex <
                                      event.statuses.length - 1 && (
                                      <span className="ml-1 text-gray-400 dark:text-gray-500">
                                        →
                                      </span>
                                    )}
                                  </span>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    No events added yet. Add some events to this template.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                {template ? "Update Template" : "Create Template"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Status editing modal */}
      {editingStatuses && currentEventIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Manage Statuses for{" "}
              {formData.defaultEvents[currentEventIndex].name}
            </h3>

            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Add a status"
                  value={currentStatusName}
                  onChange={(e) => setCurrentStatusName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!currentStatusName.trim()) return;

                    const newStatus: StatusTemplate = {
                      id: Date.now().toString(),
                      name: currentStatusName,
                      description: "",
                      order:
                        formData.defaultEvents[currentEventIndex].statuses
                          .length,
                      isFinal:
                        formData.defaultEvents[currentEventIndex].statuses
                          .length === 0,
                    };

                    const updatedEvents = [...formData.defaultEvents];
                    updatedEvents[currentEventIndex].statuses = [
                      ...updatedEvents[currentEventIndex].statuses,
                      newStatus,
                    ];

                    setFormData({
                      ...formData,
                      defaultEvents: updatedEvents,
                    });

                    setCurrentStatusName("");
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow-sm transition-colors"
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                The last status in the list will be marked as the final status
                (green).
              </p>
            </div>

            {/* Status list with drag handles for reordering */}
            <div className="space-y-2 mb-4">
              {formData.defaultEvents[currentEventIndex].statuses.length > 0 ? (
                [...formData.defaultEvents[currentEventIndex].statuses]
                  .sort((a, b) => a.order - b.order)
                  .map((status, statusIndex) => {
                    // Update isFinal flag based on position
                    const isLast =
                      statusIndex ===
                      formData.defaultEvents[currentEventIndex].statuses
                        .length -
                        1;
                    if (status.isFinal !== isLast) {
                      status.isFinal = isLast;
                    }

                    return (
                      <div
                        key={status.id}
                        className={`flex items-center justify-between p-2 border ${status.isFinal ? "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900" : "border-gray-200 dark:border-gray-700"} rounded-md`}
                      >
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 mr-2">
                            {statusIndex + 1}
                          </span>
                          <span className="font-medium text-gray-800 dark:text-white">
                            {status.name}
                          </span>
                          {status.isFinal && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 px-2 py-0.5 rounded-full">
                              Final
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {statusIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                // Move status up in order
                                const updatedEvents = [
                                  ...formData.defaultEvents,
                                ];
                                const updatedStatuses = [
                                  ...updatedEvents[currentEventIndex].statuses,
                                ].sort((a, b) => a.order - b.order);

                                const currentStatus =
                                  updatedStatuses[statusIndex];
                                const prevStatus =
                                  updatedStatuses[statusIndex - 1];

                                const tempOrder = currentStatus.order;
                                currentStatus.order = prevStatus.order;
                                prevStatus.order = tempOrder;

                                updatedEvents[currentEventIndex].statuses =
                                  updatedStatuses;

                                setFormData({
                                  ...formData,
                                  defaultEvents: updatedEvents,
                                });
                              }}
                              className="text-gray-500 hover:text-gray-700 p-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          )}
                          {statusIndex <
                            formData.defaultEvents[currentEventIndex].statuses
                              .length -
                              1 && (
                            <button
                              type="button"
                              onClick={() => {
                                // Move status down in order
                                const updatedEvents = [
                                  ...formData.defaultEvents,
                                ];
                                const updatedStatuses = [
                                  ...updatedEvents[currentEventIndex].statuses,
                                ].sort((a, b) => a.order - b.order);

                                const currentStatus =
                                  updatedStatuses[statusIndex];
                                const nextStatus =
                                  updatedStatuses[statusIndex + 1];

                                const tempOrder = currentStatus.order;
                                currentStatus.order = nextStatus.order;
                                nextStatus.order = tempOrder;

                                updatedEvents[currentEventIndex].statuses =
                                  updatedStatuses;

                                setFormData({
                                  ...formData,
                                  defaultEvents: updatedEvents,
                                });
                              }}
                              className="text-gray-500 hover:text-gray-700 p-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              // Remove status
                              const updatedEvents = [...formData.defaultEvents];
                              updatedEvents[currentEventIndex].statuses =
                                updatedEvents[currentEventIndex].statuses
                                  .filter((s) => s.id !== status.id)
                                  .map((s, idx) => ({ ...s, order: idx }));

                              // Update final status if needed
                              if (
                                updatedEvents[currentEventIndex].statuses
                                  .length > 0
                              ) {
                                updatedEvents[currentEventIndex].statuses =
                                  updatedEvents[currentEventIndex].statuses.map(
                                    (s, idx) => ({
                                      ...s,
                                      isFinal:
                                        idx ===
                                        updatedEvents[currentEventIndex]
                                          .statuses.length -
                                          1,
                                    })
                                  );
                              }

                              setFormData({
                                ...formData,
                                defaultEvents: updatedEvents,
                              });
                            }}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  No statuses added yet. Add statuses to track the progress of
                  this event.
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setEditingStatuses(false);
                  setCurrentEventIndex(null);
                }}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTemplatesPage;
