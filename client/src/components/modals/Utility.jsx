import React from 'react';

const UtilityBillUploadModal = ({ open, setOpen }) => {
  if (!open) return null;
  return (
    <div>
      <p>Upload Utility Bill</p>
      <button onClick={() => setOpen(false)}>Close</button>
    </div>
  );
};

export default UtilityBillUploadModal;
