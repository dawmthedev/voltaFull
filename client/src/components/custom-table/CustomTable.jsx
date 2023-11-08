import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { Button } from '@mui/material';

export default function DataGridProDemo() {
  const [clickedRow, setClickedRow] = React.useState();

  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };

  // handle page changes
  const handlePageChange = async (newPage) => {
    // call api
  };
  const handlePageSizeChange = async (newPageSize) => {
    // call api
  };

  const tableHeader = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'commodity', headerName: 'Commodity', width: 200 },
    { field: 'origin', headerName: 'Origin', width: 200 },
    { field: 'destination', headerName: 'Destination', width: 200 },
    { field: 'quantity', headerName: 'Quantity', width: 200 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      description: 'Actions column.',
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Box display="flex" gap={1}>
            <Button onClick={(e) => onButtonClick(e, params.row)} variant="contained">
              Delete
            </Button>
            <Button onClick={(e) => onButtonClick(e, params.row)} variant="contained">
              Edit
            </Button>
          </Box>
        );
      }
    }
  ];
  const columns = tableHeader.map((column) => ({
    ...column,
    disableClickEventBubbling: true,
    editable: column.field === 'actions' ? false : true
  }));

  return (
    <Box sx={{ height: '60vh', width: '100%' }}>
      <DataGridPro
        rows={tableData}
        columns={columns}
        components={{
          Toolbar: GridToolbar
        }}
        checkboxSelection
        disableColumnFilter
        disableColumnSelector
        pagination="true"
        // paginationMode="server"
        onPageChange={(value) => handlePageChange(value)} // handle page changes
        onPageSizeChange={(value) => handlePageSizeChange(value)} // handle page size changes
        rowCount={tableData.length}
        pageSizeOptions={[10, 25, 50, 100, 200]}
      />
    </Box>
  );
}

const tableData = [
  { id: 1, commodity: 'Corn', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 2, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 3, commodity: 'Wheat', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 4, commodity: 'Corn', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 5, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 6, commodity: 'Wheat', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 7, commodity: 'Corn', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 8, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 9, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 10, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 11, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 12, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 13, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 14, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 15, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 16, commodity: 'Corn', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 17, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 18, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 29, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 20, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 21, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 23, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 24, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 25, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 26, commodity: 'Corn', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 27, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' },
  { id: 28, commodity: 'Soybeans', origin: 'Iowa', destination: 'Chicago', quantity: 100, price: 100, status: 'Open' }
];
