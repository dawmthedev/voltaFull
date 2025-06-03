import React, { useState } from 'react';
import { Task, Technician, TaskStatus, TaskPriority } from '../../types/task';
import TaskCard from './TaskCard';
import { IoAdd, IoFilter, IoList, IoCalendarOutline } from 'react-icons/io5';

interface TasksListProps {
  tasks: Task[];
  technicians: Technician[];
  onTaskSelect: (taskId: string) => void;
  onAddTask: () => void;
  isLoading?: boolean;
}

export const TasksList: React.FC<TasksListProps> = ({
  tasks,
  technicians,
  onTaskSelect,
  onAddTask,
  isLoading = false,
}) => {
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'all'>('all');
  const [filterTechId, setFilterTechId] = useState<string | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    if (filterTechId !== 'all' && !task.assignedTo.includes(filterTechId)) return false;
    return true;
  });

  // Task statuses for filter
  const taskStatuses: Array<TaskStatus | 'all'> = ['all', 'pending', 'assigned', 'in_progress', 'completed', 'blocked'];
  
  // Task priorities for filter
  const taskPriorities: Array<TaskPriority | 'all'> = ['all', 'low', 'medium', 'high', 'critical'];

  // Format status for display
  const formatStatus = (status: TaskStatus | 'all') => {
    if (status === 'all') return 'All Statuses';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Format priority for display
  const formatPriority = (priority: TaskPriority | 'all') => {
    if (priority === 'all') return 'All Priorities';
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Filters and Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* View Mode Toggle */}
        <div className="flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
              viewMode === 'list'
                ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-500 z-10'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <IoList className="h-4 w-4 mr-1" />
            List
          </button>
          <button
            type="button"
            onClick={() => setViewMode('calendar')}
            className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
              viewMode === 'calendar'
                ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-500 z-10'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <IoCalendarOutline className="h-4 w-4 mr-1" />
            Calendar
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              className="pl-10 pr-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-gray-900 dark:text-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as TaskStatus | 'all')}
            >
              {taskStatuses.map(status => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoFilter className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <select
              className="pl-10 pr-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-gray-900 dark:text-white"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as TaskPriority | 'all')}
            >
              {taskPriorities.map(priority => (
                <option key={priority} value={priority}>
                  {formatPriority(priority)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoFilter className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <select
              className="pl-10 pr-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-gray-900 dark:text-white"
              value={filterTechId}
              onChange={(e) => setFilterTechId(e.target.value)}
            >
              <option value="all">All Technicians</option>
              {technicians.map(tech => (
                <option key={tech.id} value={tech.id}>
                  {tech.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoFilter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <button
          onClick={onAddTask}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <IoAdd className="-ml-1 mr-2 h-5 w-5" />
          Add Task
        </button>
      </div>

      {/* Tasks Content */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {tasks.length === 0 
              ? 'No tasks found. Add a task to get started.' 
              : 'No tasks match your filters.'}
          </p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              technicians={technicians}
              onClick={() => onTaskSelect(task.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Calendar view coming soon...
          </p>
          {/* Calendar view implementation would go here */}
        </div>
      )}
    </div>
  );
};

export default TasksList;
