import React, { useState } from 'react';
import { IoAdd, IoFilter, IoSearch } from 'react-icons/io5';
import { useGetProductTemplatesQuery } from '../store/productTemplatesSlice';
import { ProductTemplate } from '../types/task';
import ProductTemplateCard from '../components/products/ProductTemplateCard';
import ProductTemplateModal from '../components/products/ProductTemplateModal';

const ProductsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProductTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  
  const { data: productTemplates = [], isLoading, error } = useGetProductTemplatesQuery();
  
  const filteredTemplates = productTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !filterType || template.type === filterType;
    
    return matchesSearch && matchesFilter;
  });
  
  const handleAddTemplate = () => {
    setSelectedTemplate(null);
    setIsModalOpen(true);
  };
  
  const handleEditTemplate = (template: ProductTemplate) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Product Templates</h1>
        <button
          onClick={handleAddTemplate}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <IoAdd className="-ml-1 mr-2 h-5 w-5" />
          Add Template
        </button>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search templates..."
                className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoFilter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                value={filterType || ''}
                onChange={(e) => setFilterType(e.target.value || null)}
              >
                <option value="">All Types</option>
                <option value="Solar">Solar</option>
                <option value="HVAC">HVAC</option>
                <option value="MPU">MPU</option>
                <option value="Quiet Cool">Quiet Cool</option>
                <option value="Service">Service</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error loading product templates.</p>
            </div>
          </div>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No product templates found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterType
              ? 'Try adjusting your search or filter.'
              : 'Get started by creating a new product template.'}
          </p>
          <div className="mt-6">
            <button
              onClick={handleAddTemplate}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <IoAdd className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Template
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <ProductTemplateCard
              key={template.id}
              template={template}
              onEdit={() => handleEditTemplate(template)}
            />
          ))}
        </div>
      )}
      
      {isModalOpen && (
        <ProductTemplateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          template={selectedTemplate}
        />
      )}
    </div>
  );
};

export default ProductsPage;
