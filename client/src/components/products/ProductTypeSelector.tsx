import React, { useState, useEffect } from 'react';
import { ProductType, ProductTemplate } from '../../types/task';
import { IoClose, IoCheckmarkCircle } from 'react-icons/io5';

interface ProductTypeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedTemplateIds: string[]) => void;
  availableTemplates: ProductTemplate[];
  existingProductTypes?: ProductType[];
}

const ProductTypeSelector: React.FC<ProductTypeSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  availableTemplates,
  existingProductTypes = [],
}) => {
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([]);

  // Filter templates to only show published ones
  const publishedTemplates = availableTemplates.filter(template => template.isPublished);

  // Group templates by product type
  const templatesByType = publishedTemplates.reduce((acc, template) => {
    if (!acc[template.type]) {
      acc[template.type] = [];
    }
    acc[template.type].push(template);
    return acc;
  }, {} as Record<ProductType, ProductTemplate[]>);

  const handleSelect = (templateId: string) => {
    if (selectedTemplateIds.includes(templateId)) {
      setSelectedTemplateIds(selectedTemplateIds.filter(id => id !== templateId));
    } else {
      setSelectedTemplateIds([...selectedTemplateIds, templateId]);
    }
  };

  const handleSave = () => {
    onSelect(selectedTemplateIds);
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
                Add Products to Project
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

          {/* Content */}
          <div className="px-4 pb-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select one or more product types to add to this project. Each product will automatically inherit its published workflow.
            </p>

            {Object.keys(templatesByType).length > 0 ? (
              Object.entries(templatesByType).map(([type, templates]) => (
                <div key={type} className="mb-4">
                  <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {type}
                  </h4>
                  <div className="space-y-2">
                    {templates.map(template => {
                      const isExisting = existingProductTypes.includes(template.type);
                      const isSelected = selectedTemplateIds.includes(template.id);
                      
                      return (
                        <div 
                          key={template.id}
                          className={`p-3 border rounded-md cursor-pointer transition-colors ${
                            isExisting 
                              ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 opacity-50' 
                              : isSelected 
                                ? 'border-teal-500 dark:border-teal-400 bg-teal-50 dark:bg-teal-900/20' 
                                : 'border-gray-300 dark:border-gray-600 hover:border-teal-300 dark:hover:border-teal-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => !isExisting && handleSelect(template.id)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h5 className="font-medium text-gray-800 dark:text-white">
                                {template.name}
                              </h5>
                              {template.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {template.description}
                                </p>
                              )}
                            </div>
                            {isExisting ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                Already Added
                              </span>
                            ) : isSelected ? (
                              <IoCheckmarkCircle className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                            ) : null}
                          </div>
                          
                          {/* Show event count */}
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {template.defaultEvents.length} events defined
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No published product templates available. Please create and publish templates first.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600"
              onClick={handleSave}
              disabled={selectedTemplateIds.length === 0}
            >
              Add Selected Products
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

export default ProductTypeSelector;
