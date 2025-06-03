import React from 'react';
import { Task, Technician } from '../../types/task';
import { 
  IoAlertCircle, 
  IoCalendar, 
  IoTime, 
  IoCheckmarkCircle,
  IoWarning,
  IoPeople,
  IoFlag
} from 'react-icons/io5';

interface TaskCardProps {
  task: Task;
  technicians?: Technician[];
  onClick?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, technicians = [], onClick }) => {
  // Get priority color and icon
  const getPriorityInfo = () => {
    switch (task.priority) {
      case 'critical':
        return {
          icon: <IoFlag className="h-4 w-4" />,
          text: 'Critical',
          bgColor: 'bg-red-100 dark:bg-red-900/20',
          textColor: 'text-red-800 dark:text-red-400'
        };
      case 'high':
        return {
          icon: <IoFlag className="h-4 w-4" />,
          text: 'High',
          bgColor: 'bg-orange-100 dark:bg-orange-900/20',
          textColor: 'text-orange-800 dark:text-orange-400'
        };
      case 'medium':
        return {
          icon: <IoFlag className="h-4 w-4" />,
          text: 'Medium',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
          textColor: 'text-yellow-800 dark:text-yellow-400'
        };
      case 'low':
      default:
        return {
          icon: <IoFlag className="h-4 w-4" />,
          text: 'Low',
          bgColor: 'bg-blue-100 dark:bg-blue-900/20',
          textColor: 'text-blue-800 dark:text-blue-400'
        };
    }
  };

  // Get status color and icon
  const getStatusInfo = () => {
    switch (task.status) {
      case 'completed':
        return {
          icon: <IoCheckmarkCircle className="h-4 w-4" />,
          text: 'Completed',
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          textColor: 'text-green-800 dark:text-green-400'
        };
      case 'in_progress':
        return {
          icon: <IoTime className="h-4 w-4" />,
          text: 'In Progress',
          bgColor: 'bg-blue-100 dark:bg-blue-900/20',
          textColor: 'text-blue-800 dark:text-blue-400'
        };
      case 'assigned':
        return {
          icon: <IoPeople className="h-4 w-4" />,
          text: 'Assigned',
          bgColor: 'bg-purple-100 dark:bg-purple-900/20',
          textColor: 'text-purple-800 dark:text-purple-400'
        };
      case 'blocked':
        return {
          icon: <IoWarning className="h-4 w-4" />,
          text: 'Blocked',
          bgColor: 'bg-red-100 dark:bg-red-900/20',
          textColor: 'text-red-800 dark:text-red-400'
        };
      case 'pending':
      default:
        return {
          icon: <IoAlertCircle className="h-4 w-4" />,
          text: 'Pending',
          bgColor: 'bg-gray-100 dark:bg-gray-800',
          textColor: 'text-gray-800 dark:text-gray-400'
        };
    }
  };

  const priorityInfo = getPriorityInfo();
  const statusInfo = getStatusInfo();

  // Format date
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString();
  };

  // Get assigned technicians
  const assignedTechnicians = technicians.filter(tech => 
    task.assignedTo.includes(tech.id)
  );

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{task.name}</h3>
        <div className="flex space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.bgColor} ${priorityInfo.textColor}`}>
            {priorityInfo.icon}
            <span className="ml-1">{priorityInfo.text}</span>
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}>
            {statusInfo.icon}
            <span className="ml-1">{statusInfo.text}</span>
          </span>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <IoCalendar className="mr-1.5 h-4 w-4" />
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <IoTime className="mr-1.5 h-4 w-4" />
          <span>{task.estimatedHours || 0} hours est.</span>
        </div>
      </div>

      {assignedTechnicians.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Assigned To:
            </span>
            <div className="flex -space-x-2 overflow-hidden">
              {assignedTechnicians.slice(0, 3).map((tech) => (
                <div 
                  key={tech.id}
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium"
                  title={tech.name}
                >
                  {tech.name.charAt(0)}
                </div>
              ))}
              {assignedTechnicians.length > 3 && (
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium">
                  +{assignedTechnicians.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
