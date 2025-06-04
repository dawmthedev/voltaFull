import React, { useState } from 'react';
import { Product, ProjectProduct, ProjectEvent } from '../../types/task';
import { 
  IoSunny, // Solar
  IoThunderstorm, // HVAC
  IoCube, // MPU
  IoWater, // Quiet Cool
  IoConstruct, // Service
  IoAlertCircle,
  IoCheckmarkCircle,
  IoTime,
  IoPause,
  IoChevronDown,
  IoChevronUp
} from 'react-icons/io5';
import WorkflowDisplay from './WorkflowDisplay';

interface ProductCardProps {
  product: Product | ProjectProduct;
  onClick?: () => void;
  onEdit?: () => void;
  onStatusUpdate?: (productId: string, eventId: string, statusId: string) => Promise<void>;
}

// Type guard to check if the product is a ProjectProduct
const isProjectProduct = (product: Product | ProjectProduct): product is ProjectProduct => {
  return 'productTemplateId' in product && 'events' in product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onEdit, onStatusUpdate }) => {
  const [showWorkflow, setShowWorkflow] = useState(false);
  
  // Calculate completion percentage
  const totalTasks = product.tasks.length;
  const completedTasks = product.tasks.filter(task => task.status === 'completed').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get appropriate icon based on product type
  const getProductIcon = () => {
    switch (product.type) {
      case 'Solar':
        return <IoSunny className="h-6 w-6" />;
      case 'HVAC':
        return <IoThunderstorm className="h-6 w-6" />;
      case 'MPU':
        return <IoCube className="h-6 w-6" />;
      case 'Quiet Cool':
        return <IoWater className="h-6 w-6" />;
      case 'Service':
        return <IoConstruct className="h-6 w-6" />;
      default:
        return <IoCube className="h-6 w-6" />;
    }
  };

  // Get status icon and color
  const getStatusInfo = () => {
    switch (product.status) {
      case 'completed':
        return {
          icon: <IoCheckmarkCircle className="h-5 w-5 text-green-500" />,
          text: 'Completed',
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          textColor: 'text-green-800 dark:text-green-400'
        };
      case 'in_progress':
        return {
          icon: <IoTime className="h-5 w-5 text-blue-500" />,
          text: 'In Progress',
          bgColor: 'bg-blue-100 dark:bg-blue-900/20',
          textColor: 'text-blue-800 dark:text-blue-400'
        };
      case 'on_hold':
        return {
          icon: <IoPause className="h-5 w-5 text-amber-500" />,
          text: 'On Hold',
          bgColor: 'bg-amber-100 dark:bg-amber-900/20',
          textColor: 'text-amber-800 dark:text-amber-400'
        };
      case 'not_started':
      default:
        return {
          icon: <IoAlertCircle className="h-5 w-5 text-gray-500" />,
          text: 'Not Started',
          bgColor: 'bg-gray-100 dark:bg-gray-800',
          textColor: 'text-gray-800 dark:text-gray-400'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
      <div className="relative">
        <div className="absolute top-0 right-0 flex space-x-1">
          {/* Workflow toggle button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowWorkflow(!showWorkflow);
            }}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          >
            {showWorkflow ? (
              <IoChevronUp className="h-5 w-5" />
            ) : (
              <IoChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <div 
          onClick={onClick}
          className="cursor-pointer"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {getProductIcon()}
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{product.type}</p>
              </div>
            </div>

            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}>
              {statusInfo.icon}
              <span className="ml-1">{statusInfo.text}</span>
            </span>
          </div>

          {product.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {completedTasks}/{totalTasks} tasks
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-teal-600 h-2.5 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Workflow section - conditionally displayed */}
          {showWorkflow && onStatusUpdate && isProjectProduct(product) && (
            <div 
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to card
            >
              <WorkflowDisplay 
                product={product} 
                onStatusUpdate={onStatusUpdate} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
