import React, { useState } from 'react';
import { Product, ProductType, ProductStatus } from '../../types/task';
import ProductCard from './ProductCard';
import { IoAdd, IoFilter } from 'react-icons/io5';

interface ProductsListProps {
  products: Product[];
  onProductSelect: (productId: string) => void;
  onAddProduct: () => void;
  isLoading?: boolean;
}

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onProductSelect,
  onAddProduct,
  isLoading = false,
}) => {
  const [filterType, setFilterType] = useState<ProductType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<ProductStatus | 'all'>('all');

  // Filter products
  const filteredProducts = products.filter(product => {
    if (filterType !== 'all' && product.type !== filterType) return false;
    if (filterStatus !== 'all' && product.status !== filterStatus) return false;
    return true;
  });

  // Product types for filter
  const productTypes: Array<ProductType | 'all'> = ['all', 'Solar', 'HVAC', 'MPU', 'Quiet Cool', 'Service'];
  
  // Product statuses for filter
  const productStatuses: Array<ProductStatus | 'all'> = ['all', 'not_started', 'in_progress', 'completed', 'on_hold'];

  // Format status for display
  const formatStatus = (status: ProductStatus | 'all') => {
    if (status === 'all') return 'All Statuses';
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Filters and Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              className="pl-10 pr-3 py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-gray-900 dark:text-white"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as ProductType | 'all')}
            >
              {productTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ProductStatus | 'all')}
            >
              {productStatuses.map(status => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoFilter className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Add Product Button */}
        <button
          onClick={onAddProduct}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <IoAdd className="-ml-1 mr-2 h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {products.length === 0 
              ? 'No products found. Add a product to get started.' 
              : 'No products match your filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onProductSelect(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
