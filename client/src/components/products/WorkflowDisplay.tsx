import React, { useState } from 'react';
import { ProjectProduct, ProjectEvent, Status, Product } from '../../types/task';
import { IoCheckmarkCircle, IoClose, IoChevronForward } from 'react-icons/io5';

interface WorkflowDisplayProps {
  product: ProjectProduct;
  onStatusUpdate: (productId: string, eventId: string, statusId: string) => Promise<void>;
}

interface StatusModalData {
  isOpen: boolean;
  productId?: string;
  event?: ProjectEvent;
}

const WorkflowDisplay: React.FC<WorkflowDisplayProps> = ({ product, onStatusUpdate }) => {
  const [statusModal, setStatusModal] = useState<StatusModalData>({ isOpen: false });
  const [loading, setLoading] = useState(false);
  
  // Sort events by their order property
  const sortedEvents = [...(product.events || [])].sort((a, b) => a.order - b.order);
  
  const handleOpenStatusModal = (event: ProjectEvent) => {
    setStatusModal({
      isOpen: true,
      productId: product.id,
      event
    });
  };
  
  const handleCloseStatusModal = () => {
    setStatusModal({ isOpen: false });
  };
  
  const handleStatusUpdate = async (statusId: string) => {
    if (!statusModal.productId || !statusModal.event) return;
    
    setLoading(true);
    try {
      await onStatusUpdate(statusModal.productId, statusModal.event.id, statusId);
      handleCloseStatusModal();
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Status Modal Component
  const StatusModal = () => {
    if (!statusModal.isOpen || !statusModal.event) return null;
    
    const event = statusModal.event;
    
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            {/* Header */}
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Update Status: {event.name}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  onClick={handleCloseStatusModal}
                >
                  <span className="sr-only">Close</span>
                  <IoClose className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Status options */}
            <div className="px-4 pb-5 sm:p-6 space-y-2 max-h-[60vh] overflow-y-auto">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Select a status for this event:
              </p>
              
              {event.statuses.map((status) => {
                const isCurrentStatus = status.id === event.currentStatusId;
                const isFinalStatus = status.isFinal;
                
                return (
                  <div 
                    key={status.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      isCurrentStatus 
                        ? isFinalStatus
                          ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30'
                          : 'border-teal-500 dark:border-teal-400 bg-teal-50 dark:bg-teal-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => !isCurrentStatus && !loading && handleStatusUpdate(status.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${
                        isFinalStatus 
                          ? 'text-green-700 dark:text-green-400' 
                          : 'text-gray-800 dark:text-white'
                      }`}>
                        {status.name}
                      </span>
                      
                      {isCurrentStatus && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-200">
                          Current
                        </span>
                      )}
                      
                      {isFinalStatus && !isCurrentStatus && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200">
                          Final
                        </span>
                      )}
                    </div>
                    
                    {status.description && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {status.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={handleCloseStatusModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-2">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
        {product.name} Workflow
      </h3>
      
      <div className="space-y-4">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => {
            const currentStatus = event.statuses.find(s => s.id === event.currentStatusId);
            const isCompleted = currentStatus?.isFinal;
            
            return (
              <div
                key={event.id}
                className={`p-4 border rounded-lg ${
                  isCompleted
                    ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                      {isCompleted && (
                        <IoCheckmarkCircle className="mr-2 h-5 w-5 text-green-500 dark:text-green-400" />
                      )}
                      {event.name}
                    </h4>
                    
                    {event.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {event.description}
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleOpenStatusModal(event)}
                    className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
                      isCompleted
                        ? 'text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800/30'
                        : 'text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-800/30'
                    }`}
                  >
                    {currentStatus?.name || 'Set Status'}
                    <IoChevronForward className="ml-1 h-4 w-4" />
                  </button>
                </div>
                
                {/* Status Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center space-x-1">
                    {event.statuses.map((status, index) => {
                      const isActive = status.id === event.currentStatusId;
                      const isPast = event.statuses.findIndex(s => s.id === event.currentStatusId) > index;
                      
                      return (
                        <div key={status.id} className="flex-1 flex items-center">
                          {/* Status Dot */}
                          <div
                            className={`h-3 w-3 rounded-full ${
                              isActive
                                ? status.isFinal
                                  ? 'bg-green-500 dark:bg-green-400 ring-2 ring-green-200 dark:ring-green-800'
                                  : 'bg-teal-500 dark:bg-teal-400 ring-2 ring-teal-200 dark:ring-teal-800'
                                : isPast
                                  ? 'bg-gray-400 dark:bg-gray-500'
                                  : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          />
                          
                          {/* Connector Line */}
                          {index < event.statuses.length - 1 && (
                            <div 
                              className={`h-0.5 flex-1 ${
                                isPast 
                                  ? 'bg-gray-400 dark:bg-gray-500' 
                                  : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Status Names (only show current) */}
                  <div className="mt-1 text-xs text-center text-gray-500 dark:text-gray-400">
                    {currentStatus?.name}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No events in this workflow
            </p>
          </div>
        )}
      </div>
      
      {/* Status Update Modal */}
      <StatusModal />
    </div>
  );
};

export default WorkflowDisplay;
