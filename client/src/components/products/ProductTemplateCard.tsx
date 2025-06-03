import React from 'react';
import { IoSunny, IoSnow, IoFlash, IoThunderstorm, IoHammer, IoEllipsisVertical, IoPencil, IoTrash } from 'react-icons/io5';
import { ProductTemplate } from '../../types/task';
import { useDeleteProductTemplateMutation } from '../../store/productTemplatesSlice';

interface ProductTemplateCardProps {
  template: ProductTemplate;
  onEdit: () => void;
}

const ProductTemplateCard: React.FC<ProductTemplateCardProps> = ({ template, onEdit }) => {
  const [deleteTemplate, { isLoading: isDeleting }] = useDeleteProductTemplateMutation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the "${template.name}" template?`)) {
      try {
        await deleteTemplate(template.id).unwrap();
      } catch (error) {
        console.error('Failed to delete template:', error);
      }
    }
    setMenuOpen(false);
  };

  const getTypeIcon = () => {
    switch (template.type) {
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

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="mr-4 bg-gray-100 rounded-lg p-3">
              {getTypeIcon()}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{template.type}</p>
            </div>
          </div>
          <div className="relative" ref={menuRef}>
            <button
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <IoEllipsisVertical className="h-5 w-5" />
            </button>
            {menuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      onEdit();
                      setMenuOpen(false);
                    }}
                  >
                    <IoPencil className="mr-3 h-4 w-4 text-gray-500" />
                    Edit
                  </button>
                  <button
                    className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    <IoTrash className="mr-3 h-4 w-4 text-red-500" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500 line-clamp-2">
            {template.description || 'No description provided.'}
          </p>
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Events</span>
            <span className="font-medium text-gray-900">{template.defaultEvents.length}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-500">Last Updated</span>
            <span className="font-medium text-gray-900">
              {new Date(template.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTemplateCard;
