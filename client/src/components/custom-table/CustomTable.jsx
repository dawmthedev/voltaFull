import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';

export default function DataGridProDemo() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [skip, setSkip] = useState(0);

  // handle page changes
  const handlePageChange = async (newPage) => {
    // call api
    setSkip(newPage * pageSize);
    setPage(newPage);
  };
  const handlePageSizeChange = async (newPageSize) => {
    // call api
    setPageSize(newPageSize);
    setPage(0);
    setSkip(0);
  };

  const columns = tableHeader.map((column) => ({
    ...column,
    disableClickEventBubbling: true,
    editable: true
  }));

  return (
    <Box sx={{ height: '40vh', width: '100%' }}>
      <DataGridPro
        rows={tableData}
        columns={columns}
        components={{
          Toolbar: GridToolbar
        }}
        checkboxSelection
        disableColumnFilter
        disableColumnSelector
        pagination="true" // enable pagination
        paginationMode="server"
        onPageChange={(value) => handlePageChange(value)} // handle page changes
        onPageSizeChange={(value) => handlePageSizeChange(value)} // handle page size changes
      />
    </Box>
  );
}

const tableHeader = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'commodity', headerName: 'Commodity', width: 200 },
  { field: 'origin', headerName: 'Origin', width: 200 },
  { field: 'destination', headerName: 'Destination', width: 200 },
  { field: 'quantity', headerName: 'Quantity', width: 200 },
  { field: 'price', headerName: 'Price', width: 200 },
  { field: 'status', headerName: 'Status', width: 200 }
];

const tableData = [
  { id: 1, commodity: 'Corn', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 2, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 3, commodity: 'Wheat', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 4, commodity: 'Corn', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 5, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 6, commodity: 'Wheat', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 7, commodity: 'Corn', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 8, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 8, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 8, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 8, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 8, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 8, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 8, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 8, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' }
];
