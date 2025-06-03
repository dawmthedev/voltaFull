import React, { useState, useEffect } from 'react';
import { Task, Technician, TaskPriority } from '../../types/task';
import { IoClose, IoPerson, IoCalendar, IoTime, IoFlag, IoCheckmark } from 'react-icons/io5';

interface TaskAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  technicians: Technician[];
  onSave: (updatedTask: Partial<Task>) => void;
}

export const TaskAssignmentModal: React.FC<TaskAssignmentModalProps> = ({
  isOpen,
  onClose,
  task,
  technicians,
  onSave,
}) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedTechIds, setAssignedTechIds] = useState<string[]>([]);
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [estimatedHours, setEstimatedHours] = useState<number | undefined>(undefined);
  const [dueDate, setDueDate] = useState<string>('');

  // Initialize form when task changes
  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setTaskDescription(task.description || '');
      setAssignedTechIds(task.assignedTo || []);
      setPriority(task.priority);
      setEstimatedHours(task.estimatedHours);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    } else {
      // Reset form for new task
      setTaskName('');
      setTaskDescription('');
      setAssignedTechIds([]);
      setPriority('medium');
      setEstimatedHours(undefined);
      setDueDate('');
    }
  }, [task]);

  const handleTechnicianToggle = (techId: string) => {
    setAssignedTechIds(prev => {
      if (prev.includes(techId)) {
        return prev.filter(id => id !== techId);
      } else {
        return [...prev, techId];
      }
    });
  };

  const handleSave = () => {
    const updatedTask: Partial<Task> = {
      ...(task?.id ? { id: task.id } : {}),
      name: taskName,
      description: taskDescription,
      assignedTo: assignedTechIds,
      priority,
      estimatedHours,
      ...(dueDate ? { dueDate: new Date(dueDate) } : {}),
      status: assignedTechIds.length > 0 ? 'assigned' : 'pending',
    };

    onSave(updatedTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div 
          className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          {/* Header */}
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                {task?.id ? 'Edit Task' : 'New Task'}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <IoClose className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="px-4 pb-5 sm:p-6 space-y-4">
            {/* Task Name */}
            <div>
              <label htmlFor="task-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Task Name
              </label>
              <input
                type="text"
                id="task-name"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>

            {/* Task Description */}
            <div>
              <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                id="task-description"
                rows={3}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>

            {/* Task Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Priority
              </label>
              <div className="mt-1 grid grid-cols-4 gap-2">
                {(['low', 'medium', 'high', 'critical'] as TaskPriority[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`${
                      priority === p
                        ? 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 border-teal-500'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    } px-3 py-2 rounded-md text-sm font-medium border flex items-center justify-center capitalize`}
                    onClick={() => setPriority(p)}
                  >
                    <IoFlag className={`mr-1.5 h-4 w-4 ${priority === p ? 'text-teal-500' : ''}`} />
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Due Date */}
              <div>
                <label htmlFor="due-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Due Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="due-date"
                    className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              {/* Estimated Hours */}
              <div>
                <label htmlFor="estimated-hours" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Estimated Hours
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoTime className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="estimated-hours"
                    min="0"
                    step="0.5"
                    className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={estimatedHours === undefined ? '' : estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value ? parseFloat(e.target.value) : undefined)}
                  />
                </div>
              </div>
            </div>

            {/* Technician Assignment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assign Technicians
              </label>
              <div className="max-h-60 overflow-y-auto rounded-md border border-gray-300 dark:border-gray-600">
                {technicians.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                    No technicians available
                  </div>
                ) : (
                  technicians.map(tech => (
                    <div 
                      key={tech.id}
                      className={`p-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer`}
                      onClick={() => handleTechnicianToggle(tech.id)}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                          <IoPerson className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{tech.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{tech.role}</p>
                        </div>
                      </div>
                      <div>
                        {assignedTechIds.includes(tech.id) ? (
                          <div className="h-5 w-5 bg-teal-500 rounded-full flex items-center justify-center">
                            <IoCheckmark className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="h-5 w-5 border border-gray-300 dark:border-gray-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSave}
              disabled={!taskName.trim()}
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignmentModal;
