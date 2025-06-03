import React, { useState } from 'react';
import { IoAdd, IoEllipsisVertical, IoPencil, IoTrash, IoCheckmarkCircle, IoTimeOutline, IoPauseCircle } from 'react-icons/io5';
import { useGetProductTemplatesQuery } from '../../store/productTemplatesSlice';
import { 
  useGetProjectProductsQuery, 
  useAddProductToProjectMutation,
  useUpdateProjectProductMutation,
  useRemoveProductFromProjectMutation
} from '../../store/projectProductsSlice';
import { ProjectProduct, ProductStatus } from '../../types/task';
import ProjectProductModal from './ProjectProductModal';
import ProductSelector from './ProductSelector';

interface ProjectProductsProps {
  projectId: string;
}

const ProjectProducts: React.FC<ProjectProductsProps> = ({ projectId }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProjectProduct | null>(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  
  const { data: projectProducts = [], isLoading, error, refetch } = useGetProjectProductsQuery(projectId);
  const { data: productTemplates = [] } = useGetProductTemplatesQuery();
  
  const [addProduct] = useAddProductToProjectMutation();
  const [updateProduct] = useUpdateProjectProductMutation();
  const [removeProduct] = useRemoveProductFromProjectMutation();
  
  const handleAddProduct = async (productTemplateId: string) => {
    try {
      await addProduct({ projectId, productTemplateId }).unwrap();
      setIsAddModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };
  
  const handleEditProduct = (product: ProjectProduct) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  
  const handleUpdateStatus = async (productId: string, status: ProductStatus) => {
    try {
      await updateProduct({
        projectId,
        productId,
        update: { status }
      }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to update product status:', error);
    }
  };
  
  const handleRemoveProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      try {
        await removeProduct({ projectId, productId }).unwrap();
        refetch();
      } catch (error) {
        console.error('Failed to remove product:', error);
      }
    }
  };
  
  const toggleMenu = (index: number) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };
  
  const getStatusIcon = (status: ProductStatus) => {
    switch (status) {
      case 'completed':
        return <IoCheckmarkCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <IoTimeOutline className="h-5 w-5 text-blue-500" />;
      case 'on_hold':
        return <IoPauseCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <IoTimeOutline className="h-5 w-5 text-gray-400" />;
    }
  };
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Products</h3>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <IoAdd className="-ml-1 mr-1 h-4 w-4" />
          Add Product
        </button>
      </div>
      
      {isLoading ? (
        <div className="px-4 py-5 sm:p-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
        </div>
      ) : error ? (
        <div className="px-4 py-5 sm:p-6">
          <div className="text-sm text-red-600">Error loading products</div>
        </div>
      ) : projectProducts.length === 0 ? (
        <div className="px-4 py-10 sm:p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products added</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a product to this project.</p>
          <div className="mt-6">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <IoAdd className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Product
            </button>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-200 divide-y divide-gray-200">
          {projectProducts.map((product, index) => (
            <div key={product.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 flex-shrink-0">
                    {getStatusIcon(product.status)}
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-gray-900">{product.productTemplate.name}</h4>
                    <p className="text-sm text-gray-500">{product.productTemplate.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    {product.events.length} events
                  </div>
                  
                  <div className="relative">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={() => toggleMenu(index)}
                    >
                      <IoEllipsisVertical className="h-5 w-5" />
                    </button>
                    
                    {menuOpenIndex === index && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <button
                            className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              handleEditProduct(product);
                              toggleMenu(index);
                            }}
                          >
                            <IoPencil className="mr-3 h-5 w-5 text-gray-400" />
                            Edit
                          </button>
                          
                          <div className="border-t border-gray-100">
                            <div className="px-4 py-2 text-xs text-gray-500">Set Status</div>
                            
                            <button
                              className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleUpdateStatus(product.id, 'not_started');
                                toggleMenu(index);
                              }}
                            >
                              <div className="mr-3 h-5 w-5 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                              </div>
                              Not Started
                            </button>
                            
                            <button
                              className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleUpdateStatus(product.id, 'in_progress');
                                toggleMenu(index);
                              }}
                            >
                              <IoTimeOutline className="mr-3 h-5 w-5 text-blue-500" />
                              In Progress
                            </button>
                            
                            <button
                              className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleUpdateStatus(product.id, 'completed');
                                toggleMenu(index);
                              }}
                            >
                              <IoCheckmarkCircle className="mr-3 h-5 w-5 text-green-500" />
                              Completed
                            </button>
                            
                            <button
                              className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleUpdateStatus(product.id, 'on_hold');
                                toggleMenu(index);
                              }}
                            >
                              <IoPauseCircle className="mr-3 h-5 w-5 text-yellow-500" />
                              On Hold
                            </button>
                          </div>
                          
                          <div className="border-t border-gray-100">
                            <button
                              className="flex w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                              onClick={() => {
                                handleRemoveProduct(product.id);
                                toggleMenu(index);
                              }}
                            >
                              <IoTrash className="mr-3 h-5 w-5 text-red-500" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span>Progress</span>
                      <span>
                        {product.events.filter(e => e.status === 'completed').length} / {product.events.length} events
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-teal-600 h-2 rounded-full"
                        style={{
                          width: `${product.events.length > 0
                            ? (product.events.filter(e => e.status === 'completed').length / product.events.length) * 100
                            : 0}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isAddModalOpen && (
        <ProductSelector
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          productTemplates={productTemplates}
          onSelect={handleAddProduct}
        />
      )}
      
      {isEditModalOpen && selectedProduct && (
        <ProjectProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          projectId={projectId}
          projectProduct={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProjectProducts;
