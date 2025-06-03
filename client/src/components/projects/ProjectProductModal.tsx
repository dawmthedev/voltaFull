import React, { useState } from 'react';
import { IoClose, IoAdd, IoTrash, IoCalendarOutline } from 'react-icons/io5';
import { 
  ProjectProduct, 
  ProjectEvent, 
  EventStatus, 
  Task, 
  TaskStatus,
  TaskPriority
} from '../../types/task';
import {
  useGetProjectEventsQuery,
  useUpdateProjectEventMutation,
  useAddCustomEventMutation
} from '../../store/projectProductsSlice';

interface ProjectProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectProduct: ProjectProduct;
}

const ProjectProductModal: React.FC<ProjectProductModalProps> = ({
  isOpen,
  onClose,
  projectId,
  projectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'tasks'>('events');
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEventData, setNewEventData] = useState<Partial<ProjectEvent>>({
    name: '',
    description: '',
    status: 'pending' as EventStatus,
    scheduledDate: '',
  });
  
  const { data: events = [], refetch } = useGetProjectEventsQuery({ 
    projectId, 
    productId: projectProduct.id 
  });
  
  const [updateEvent] = useUpdateProjectEventMutation();
  const [addEvent] = useAddCustomEventMutation();
  
  const handleEventStatusChange = async (eventId: string, status: EventStatus) => {
    try {
      await updateEvent({
        projectId,
        productId: projectProduct.id,
        eventId,
        update: { status }
      }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to update event status:', error);
    }
  };
  
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addEvent({
        projectId,
        productId: projectProduct.id,
        event: {
          ...newEventData,
          templateId: '', // This is a custom event, no template
          order: events.length, // Add to the end
          tasks: []
        }
      }).unwrap();
      
      setIsAddEventOpen(false);
      setNewEventData({
        name: '',
        description: '',
        status: 'pending' as EventStatus,
        scheduledDate: '',
      });
      refetch();
    } catch (error) {
      console.error('Failed to add custom event:', error);
    }
  };
  
  // Helper function to get all tasks across all events
  const getAllTasks = (): Task[] => {
    return events.flatMap(event => event.tasks || []);
  };
  
  // Get status color class
  const getStatusColorClass = (status: EventStatus | TaskStatus) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get priority color class
  const getPriorityColorClass = (priority: TaskPriority) => {
    switch(priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {projectProduct.productTemplate.name}
                </h3>
                <p className="text-sm text-gray-500">{projectProduct.productTemplate.type}</p>
              </div>
              <button
                type="button"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <IoClose className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mb-6">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass(projectProduct.status)}`}>
                {projectProduct.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              <p className="mt-2 text-sm text-gray-500">
                {projectProduct.productTemplate.description || 'No description provided.'}
              </p>
            </div>
            
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  className={`
                    ${activeTab === 'events' 
                      ? 'border-teal-500 text-teal-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  `}
                  onClick={() => setActiveTab('events')}
                >
                  Events ({events.length})
                </button>
                <button
                  className={`
                    ${activeTab === 'tasks' 
                      ? 'border-teal-500 text-teal-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  `}
                  onClick={() => setActiveTab('tasks')}
                >
                  Tasks ({getAllTasks().length})
                </button>
              </nav>
            </div>
            
            <div className="mt-4">
              {activeTab === 'events' ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-900">Events</h4>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      onClick={() => setIsAddEventOpen(true)}
                    >
                      <IoAdd className="-ml-1 mr-1 h-4 w-4" />
                      Add Event
                    </button>
                  </div>
                  
                  {isAddEventOpen ? (
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <form onSubmit={handleAddEvent}>
                        <div className="mb-3">
                          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                            Event Name
                          </label>
                          <input
                            type="text"
                            id="eventName"
                            className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={newEventData.name}
                            onChange={(e) => setNewEventData({ ...newEventData, name: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea
                            id="eventDescription"
                            rows={2}
                            className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={newEventData.description || ''}
                            onChange={(e) => setNewEventData({ ...newEventData, description: e.target.value })}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="eventStatus" className="block text-sm font-medium text-gray-700">
                              Status
                            </label>
                            <select
                              id="eventStatus"
                              className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              value={newEventData.status}
                              onChange={(e) => setNewEventData({ 
                                ...newEventData, 
                                status: e.target.value as EventStatus 
                              })}
                              required
                            >
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="blocked">Blocked</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700">
                              Scheduled Date
                            </label>
                            <input
                              type="date"
                              id="scheduledDate"
                              className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              value={newEventData.scheduledDate || ''}
                              onChange={(e) => setNewEventData({ 
                                ...newEventData, 
                                scheduledDate: e.target.value 
                              })}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          <button
                            type="button"
                            className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            onClick={() => setIsAddEventOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          >
                            Add Event
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : null}
                  
                  {events.length === 0 ? (
                    <div className="text-center py-6 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-500">No events found for this product.</p>
                      <button
                        type="button"
                        className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        onClick={() => setIsAddEventOpen(true)}
                      >
                        <IoAdd className="-ml-1 mr-1 h-4 w-4" />
                        Add First Event
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-hidden bg-white shadow sm:rounded-md">
                      <ul className="divide-y divide-gray-200">
                        {events
                          .sort((a, b) => a.order - b.order)
                          .map((event) => (
                            <li key={event.id}>
                              <div className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <p className="truncate text-sm font-medium text-teal-600">
                                        {event.name}
                                      </p>
                                    </div>
                                    <div className="ml-2 flex flex-shrink-0">
                                      <select
                                        className={`text-xs font-medium h-6 rounded-full px-2 ${getStatusColorClass(event.status)}`}
                                        value={event.status}
                                        onChange={(e) => handleEventStatusChange(
                                          event.id, 
                                          e.target.value as EventStatus
                                        )}
                                      >
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="blocked">Blocked</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                      <p className="flex items-center text-sm text-gray-500">
                                        {event.description || 'No description'}
                                      </p>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                      {event.scheduledDate && (
                                        <p className="flex items-center text-sm text-gray-500">
                                          <IoCalendarOutline className="mr-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                                          {new Date(event.scheduledDate).toLocaleDateString()}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-500">
                                      {event.tasks?.length || 0} tasks • 
                                      {event.tasks?.filter(t => t.status === 'completed').length || 0} completed
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-medium text-gray-900">All Tasks</h4>
                  </div>
                  
                  {getAllTasks().length === 0 ? (
                    <div className="text-center py-6 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-500">No tasks found for this product.</p>
                    </div>
                  ) : (
                    <div className="overflow-hidden bg-white shadow sm:rounded-md">
                      <ul className="divide-y divide-gray-200">
                        {getAllTasks().map((task) => (
                          <li key={task.id}>
                            <div className="block hover:bg-gray-50">
                              <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <p className="truncate text-sm font-medium text-gray-900">
                                      {task.name}
                                    </p>
                                  </div>
                                  <div className="ml-2 flex space-x-2">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass(task.status)}`}>
                                      {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColorClass(task.priority)}`}>
                                      {task.priority.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                  <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                      {task.description || 'No description'}
                                    </p>
                                  </div>
                                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    {task.estimatedHours && (
                                      <p className="text-sm text-gray-500">
                                        Est: {task.estimatedHours} hours
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {task.assignedTo && task.assignedTo.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-500">
                                      Assigned to: {task.assignedTo.join(', ')}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProductModal;
