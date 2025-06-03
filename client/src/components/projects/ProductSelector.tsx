import React, { useState } from 'react';
import { IoClose, IoSearch, IoSunny, IoSnow, IoFlash, IoThunderstorm, IoHammer } from 'react-icons/io5';
import { ProductTemplate } from '../../types/task';

interface ProductSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  productTemplates: ProductTemplate[];
  onSelect: (templateId: string) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  isOpen,
  onClose,
  productTemplates,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTemplates = productTemplates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Solar':
        return <IoSunny className="h-6 w-6 text-yellow-500" />;
      case 'HVAC':
        return <IoThunderstorm className="h-6 w-6 text-blue-500" />;
      case 'MPU':
        return <IoFlash className="h-6 w-6 text-purple-500" />;
      case 'Quiet Cool':
        return <IoSnow className="h-6 w-6 text-cyan-500" />;
      case 'Service':
        return <IoHammer className="h-6 w-6 text-gray-500" />;
      default:
        return <IoSunny className="h-6 w-6 text-gray-400" />;
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
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Select Product Template</h3>
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
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="mt-2 max-h-80 overflow-y-auto">
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No templates found</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredTemplates.map((template) => (
                    <li key={template.id}>
                      <button
                        className="w-full px-4 py-4 flex items-center hover:bg-gray-50 focus:outline-none"
                        onClick={() => onSelect(template.id)}
                      >
                        <div className="mr-4 bg-gray-100 rounded-lg p-2">
                          {getTypeIcon(template.type)}
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
                          <p className="mt-1 text-xs text-gray-500">{template.type}</p>
                          {template.description && (
                            <p className="mt-1 text-xs text-gray-500 line-clamp-2">{template.description}</p>
                          )}
                          <p className="mt-1 text-xs text-gray-500">
                            {template.defaultEvents.length} events • 
                            {template.defaultEvents.reduce((acc, event) => acc + (event.defaultTasks?.length || 0), 0)} tasks
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm"
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

export default ProductSelector;
