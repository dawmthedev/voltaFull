// TODO: add subscription to update the table when a new lead is added, NEW_LEAD_SUBSCRIPTION
import * as React from 'react';
import { Button, TextField, Typography, Select, MenuItem } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { baseURL } from '../../libs/client/apiClient';

import { useMemo, useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';

export default function NewSaleData(props) {
  const { recordUserId } = props;

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewSaleData = async () => {
    try {
      const response = await fetch(`${baseURL}/auth/crmNewSales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId: recordUserId })
      });
      const result = await response.json();
      if (response.ok && result.data && result.data.newSaleData) {
         // Assigning unique ids to each row
         const enrichedData = result.data.newSaleData.map((item, index) => ({
            ...item,
            id: index  // This could also be a unique attribute from your data, such as `installer` or `ownerName` combined with an index if necessary.
          }));
          setData(enrichedData);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewSaleData();
  }, [recordUserId]);

  const columns = useMemo(() => [
    { field: 'installer', headerName: 'Installer', width: 180 },
    { field: 'ownerName', headerName: 'Homeowner', width: 150 },
    { field: 'adders', headerName: 'Adders', width: 130 },
    { field: 'salesRep', headerName: 'Sales Rep', width: 150 },
    { field: 'design', headerName: 'Design', width: 150 },
    { field: 'batteries', headerName: 'Batteries', width: 120 },
    { field: 'batteryMode', headerName: 'Battery Mode', width: 140 },
    { field: 'batteryPlacement', headerName: 'Battery Placement', width: 170 },
    { field: 'atticImage', headerName: 'Attic Image', width: 200, renderCell: (params) => params.value ? <img src={params.value} alt="Attic" style={{ height: 50, width: 'auto' }} /> : 'None' },
    { field: 'utilityImage1', headerName: 'Utility Image 1', width: 200, renderCell: (params) => params.value ? <img src={params.value} alt="Utility 1" style={{ height: 50, width: 'auto' }} /> : 'None' },
    { field: 'utilityImage2', headerName: 'Utility Image 2', width: 200, renderCell: (params) => params.value ? <img src={params.value} alt="Utility 2" style={{ height: 50, width: 'auto' }} /> : 'None' },
    { field: 'utilityImage3', headerName: 'Utility Image 3', width: 200, renderCell: (params) => params.value ? <img src={params.value} alt="Utility 3" style={{ height: 50, width: 'auto' }} /> : 'None' },
    { field: 'utilityImage4', headerName: 'Utility Image 4', width: 200, renderCell: (params) => params.value ? <img src={params.value} alt="Utility 4" style={{ height: 50, width: 'auto' }} /> : 'None' },
    { field: 'utilityImage5', headerName: 'Utility Image 5', width: 200, renderCell: (params) => params.value ? <img src={params.value} alt="Utility 5" style={{ height: 50, width: 'auto' }} /> : 'None' },
    { field: 'utilityImage6', headerName: 'Utility Image 6', width: 200, renderCell: (params) => params.value ? <img src={params.value} alt="Utility 6" style={{ height: 50, width: 'auto' }} /> : 'None' },
    { field: 'utilityImage7', headerName: 'Utility Image 7', width: 200, renderCell: (params) => params.value ? <img src={params.value} alt="Utility 7" style={{ height: 50, width: 'auto' }} /> : 'None' },
    { field: 'atticImage2', headerName: 'Attic Image 2', width: 200, renderCell: (params) => params.value ? <img src={params.value} alt="Attic 2" style={{ height: 50, width: 'auto' }} /> : 'None' },
    { field: 'licenseimage', headerName: 'License Image', width: 200, renderCell: (params) => params.value ? <img src={params.value} alt="License" style={{ height: 50, width: 'auto' }} /> : 'None' },
    { field: 'depositImage', headerName: 'Deposit Image', width: 200, renderCell: (params) => params.value ? <img src={params.value} alt="Deposit" style={{ height: 50, width: 'auto' }} /> : 'None' },
    { field: 'program', headerName: 'Program', width: 150 },
    { field: 'notes', headerName: 'Notes', width: 200 },
    { field: 'leadGen', headerName: 'Lead Generator', width: 150 },
    { field: 'designNotes', headerName: 'Design Notes', width: 200 },
    { field: 'mpuNotes', headerName: 'MPU Notes', width: 200 },
    { field: 'mpu', headerName: 'MPU', width: 120 },
    { field: 'batteryQuantity', headerName: 'Battery Quantity', width: 150 },
    { field: 'batteryPlacementNotes', headerName: 'Battery Placement Notes', width: 200 },
    { field: 'inverter', headerName: 'Inverter', width: 150 },
  ], []);
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <DataGridPro
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </div>
  );
}
