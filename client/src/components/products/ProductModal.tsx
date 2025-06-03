import React, { useState, useEffect } from 'react';
import { Product, ProductType, ProductStatus } from '../../types/task';
import { IoClose, IoInformationCircle, IoHammer } from 'react-icons/io5';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSave: (updatedProduct: Partial<Product>) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave,
}) => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState<ProductType>('Solar');
  const [productDescription, setProductDescription] = useState('');

  // Initialize form when product changes
  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductType(product.type);
      setProductDescription(product.description || '');
    } else {
      // Reset form for new product
      setProductName('');
      setProductType('Solar');
      setProductDescription('');
    }
  }, [product]);

  const handleSave = () => {
    const updatedProduct: Partial<Product> = {
      ...(product?.id ? { id: product.id } : {}),
      name: productName,
      type: productType,
      description: productDescription,
    };

    onSave(updatedProduct);
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
                {product?.id ? 'Edit Product' : 'New Product'}
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
            {/* Product Name */}
            <div>
              <label htmlFor="product-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Name
              </label>
              <input
                type="text"
                id="product-name"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            {/* Product Type */}
            <div>
              <label htmlFor="product-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Product Type
              </label>
              <select
                id="product-type"
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={productType}
                onChange={(e) => setProductType(e.target.value as ProductType)}
              >
                {(['Solar', 'HVAC', 'MPU', 'Quiet Cool', 'Service'] as ProductType[]).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Product Description */}
            <div>
              <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                id="product-description"
                rows={3}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSave}
              disabled={!productName.trim()}
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

export default ProductModal;
