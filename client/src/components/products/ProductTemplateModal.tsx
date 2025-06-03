import React, { useState, useEffect } from 'react';
import { IoClose, IoAdd, IoTrash } from 'react-icons/io5';
import { ProductTemplate, EventTemplate, TaskTemplate, ProductType } from '../../types/task';
import { 
  useCreateProductTemplateMutation, 
  useUpdateProductTemplateMutation 
} from '../../store/productTemplatesSlice';

interface ProductTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: ProductTemplate | null;
}

const initialEventTemplate: EventTemplate = {
  id: '',
  name: '',
  description: '',
  defaultTasks: [],
  order: 0
};

const initialTaskTemplate: TaskTemplate = {
  id: '',
  name: '',
  description: '',
  estimatedHours: 1,
  requiredRoles: [],
  priority: 'medium'
};

const ProductTemplateModal: React.FC<ProductTemplateModalProps> = ({ 
  isOpen, 
  onClose, 
  template 
}) => {
  const [createTemplate, { isLoading: isCreating }] = useCreateProductTemplateMutation();
  const [updateTemplate, { isLoading: isUpdating }] = useUpdateProductTemplateMutation();
  
  const [formData, setFormData] = useState<Partial<ProductTemplate>>({
    name: '',
    description: '',
    type: 'Solar' as ProductType,
    defaultEvents: []
  });
  
  const [currentEvent, setCurrentEvent] = useState<EventTemplate | null>(null);
  const [currentTask, setCurrentTask] = useState<TaskTemplate | null>(null);
  const [currentEventIndex, setCurrentEventIndex] = useState<number | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  
  useEffect(() => {
    if (template) {
      setFormData({
        id: template.id,
        name: template.name,
        description: template.description || '',
        type: template.type,
        defaultEvents: [...template.defaultEvents]
      });
    } else {
      setFormData({
        name: '',
        description: '',
        type: 'Solar' as ProductType,
        defaultEvents: []
      });
    }
  }, [template]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (template) {
        // Update existing template
        await updateTemplate({
          id: template.id,
          template: {
            ...formData,
            updatedAt: new Date().toISOString()
          }
        }).unwrap();
      } else {
        // Create new template
        await createTemplate({
          ...formData,
          id: Date.now().toString(), // Generate a temporary ID (backend will replace)
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  };
  
  const addEvent = () => {
    setCurrentEvent({ ...initialEventTemplate, id: Date.now().toString(), order: formData.defaultEvents?.length || 0 });
    setCurrentEventIndex(null);
  };
  
  const editEvent = (index: number) => {
    if (formData.defaultEvents && formData.defaultEvents[index]) {
      setCurrentEvent({ ...formData.defaultEvents[index] });
      setCurrentEventIndex(index);
    }
  };
  
  const saveEvent = () => {
    if (!currentEvent) return;
    
    setFormData((prev) => {
      const updatedEvents = [...(prev.defaultEvents || [])];
      
      if (currentEventIndex !== null) {
        // Update existing event
        updatedEvents[currentEventIndex] = currentEvent;
      } else {
        // Add new event
        updatedEvents.push(currentEvent);
      }
      
      return {
        ...prev,
        defaultEvents: updatedEvents
      };
    });
    
    setCurrentEvent(null);
    setCurrentEventIndex(null);
  };
  
  const removeEvent = (index: number) => {
    setFormData((prev) => {
      const updatedEvents = [...(prev.defaultEvents || [])];
      updatedEvents.splice(index, 1);
      
      // Update order for remaining events
      updatedEvents.forEach((event, idx) => {
        event.order = idx;
      });
      
      return {
        ...prev,
        defaultEvents: updatedEvents
      };
    });
  };
  
  const addTask = () => {
    if (!currentEvent) return;
    
    setCurrentTask({ ...initialTaskTemplate, id: Date.now().toString() });
    setCurrentTaskIndex(null);
  };
  
  const editTask = (index: number) => {
    if (currentEvent && currentEvent.defaultTasks && currentEvent.defaultTasks[index]) {
      setCurrentTask({ ...currentEvent.defaultTasks[index] });
      setCurrentTaskIndex(index);
    }
  };
  
  const saveTask = () => {
    if (!currentEvent || !currentTask) return;
    
    setCurrentEvent((prev) => {
      if (!prev) return prev;
      
      const updatedTasks = [...(prev.defaultTasks || [])];
      
      if (currentTaskIndex !== null) {
        // Update existing task
        updatedTasks[currentTaskIndex] = currentTask;
      } else {
        // Add new task
        updatedTasks.push(currentTask);
      }
      
      return {
        ...prev,
        defaultTasks: updatedTasks
      };
    });
    
    setCurrentTask(null);
    setCurrentTaskIndex(null);
  };
  
  const removeTask = (index: number) => {
    if (!currentEvent) return;
    
    setCurrentEvent((prev) => {
      if (!prev) return prev;
      
      const updatedTasks = [...(prev.defaultTasks || [])];
      updatedTasks.splice(index, 1);
      
      return {
        ...prev,
        defaultTasks: updatedTasks
      };
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {currentEvent ? (
            /* Event Form */
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-medium text-gray-900">
                  {currentEventIndex !== null ? 'Edit Event' : 'Add Event'}
                </h3>
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => {
                    setCurrentEvent(null);
                    setCurrentEventIndex(null);
                  }}
                >
                  <IoClose className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-4">
                <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <input
                  type="text"
                  id="eventName"
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={currentEvent.name}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="eventDescription"
                  rows={3}
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={currentEvent.description || ''}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="eventOrder" className="block text-sm font-medium text-gray-700">
                  Order
                </label>
                <input
                  type="number"
                  id="eventOrder"
                  min="0"
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={currentEvent.order}
                  onChange={(e) => setCurrentEvent({ ...currentEvent, order: parseInt(e.target.value) })}
                  required
                />
              </div>
              
              {currentTask ? (
                /* Task Form */
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-900">
                      {currentTaskIndex !== null ? 'Edit Task' : 'Add Task'}
                    </h4>
                    <button
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() => {
                        setCurrentTask(null);
                        setCurrentTaskIndex(null);
                      }}
                    >
                      <IoClose className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
                      Task Name
                    </label>
                    <input
                      type="text"
                      id="taskName"
                      className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={currentTask.name}
                      onChange={(e) => setCurrentTask({ ...currentTask, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="taskDescription"
                      rows={2}
                      className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={currentTask.description || ''}
                      onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="taskHours" className="block text-sm font-medium text-gray-700">
                        Estimated Hours
                      </label>
                      <input
                        type="number"
                        id="taskHours"
                        min="0.5"
                        step="0.5"
                        className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={currentTask.estimatedHours}
                        onChange={(e) => setCurrentTask({ ...currentTask, estimatedHours: parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="taskPriority" className="block text-sm font-medium text-gray-700">
                        Priority
                      </label>
                      <select
                        id="taskPriority"
                        className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={currentTask.priority || 'medium'}
                        onChange={(e) => setCurrentTask({ ...currentTask, priority: e.target.value as any })}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      onClick={() => {
                        setCurrentTask(null);
                        setCurrentTaskIndex(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      onClick={saveTask}
                    >
                      Save Task
                    </button>
                  </div>
                </div>
              ) : (
                /* Tasks List */
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-medium text-gray-900">Tasks</h4>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      onClick={addTask}
                    >
                      <IoAdd className="-ml-1 mr-1 h-4 w-4" />
                      Add Task
                    </button>
                  </div>
                  
                  {currentEvent.defaultTasks?.length ? (
                    <ul className="divide-y divide-gray-200">
                      {currentEvent.defaultTasks.map((task, index) => (
                        <li key={task.id || index} className="py-2">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{task.name}</p>
                              <p className="text-xs text-gray-500">{task.estimatedHours} hours • {task.priority} priority</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => editTask(index)}
                              >
                                <span className="sr-only">Edit</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                className="text-gray-400 hover:text-red-500"
                                onClick={() => removeTask(index)}
                              >
                                <span className="sr-only">Delete</span>
                                <IoTrash className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No tasks added yet.</p>
                  )}
                </div>
              )}
              
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={saveEvent}
                >
                  Save Event
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setCurrentEvent(null);
                    setCurrentEventIndex(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* Main Template Form */
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    {template ? 'Edit Product Template' : 'Create Product Template'}
                  </h3>
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <IoClose className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Template Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Product Type
                  </label>
                  <select
                    name="type"
                    id="type"
                    className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="Solar">Solar</option>
                    <option value="HVAC">HVAC</option>
                    <option value="MPU">MPU</option>
                    <option value="Quiet Cool">Quiet Cool</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-medium text-gray-900">Events</h4>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      onClick={addEvent}
                    >
                      <IoAdd className="-ml-1 mr-1 h-4 w-4" />
                      Add Event
                    </button>
                  </div>
                  
                  {formData.defaultEvents && formData.defaultEvents.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {formData.defaultEvents.map((event, index) => (
                        <li key={event.id || index} className="py-3">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{event.name}</p>
                              <p className="text-xs text-gray-500">
                                Order: {event.order} • {event.defaultTasks?.length || 0} tasks
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => editEvent(index)}
                              >
                                <span className="sr-only">Edit</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                className="text-gray-400 hover:text-red-500"
                                onClick={() => removeEvent(index)}
                              >
                                <span className="sr-only">Delete</span>
                                <IoTrash className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-6 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-500">No events added yet.</p>
                      <button
                        type="button"
                        className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={addEvent}
                      >
                        <IoAdd className="-ml-1 mr-1 h-4 w-4" />
                        Add First Event
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                  disabled={isCreating || isUpdating}
                >
                  {isCreating || isUpdating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {template ? 'Saving...' : 'Creating...'}
                    </>
                  ) : (
                    template ? 'Save Template' : 'Create Template'
                  )}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTemplateModal;
