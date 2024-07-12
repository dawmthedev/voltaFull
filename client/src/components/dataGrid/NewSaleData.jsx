import React, { useState, useEffect, useMemo } from 'react';
import { Button, TextField, Typography, Modal, Box, CircularProgress } from '@mui/material';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { baseURL } from '../../libs/client/apiClient';

import axios from 'axios';




const EditModal = ({ open, onClose, data, onSave }) => {
  const [formData, setFormData] = useState({
    customerFirstName: '',
    customerLastName: '',
    customerFullName: '',
    customerEmail: '',
    customerPhone: ''  // Initialize customerPhone
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitMissingData = async (e) => {
    e.preventDefault();
    const QB_DOMAIN = "voltaic.quickbase.com";
    const API_ENDPOINT = "https://api.quickbase.com/v1/records";
    
    const headers = {
      Authorization: "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3",
      "QB-Realm-Hostname": QB_DOMAIN,
      "Content-Type": "application/json",
    };
  
    const requestBody = {
      to: "bs9fegk3x", // Table identifier in Quickbase
      data: [{
        3: { value: '83' },
        40: { value: formData.customerEmail },
        44: { value: formData.customerFirstName },
        45: { value: formData.customerLastName },
        46: { value: formData.customerPhone }, // Add customerPhone to the request
      }],
      fieldsToReturn: [] // Specify fields to return, if any
    };
  
    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      console.log("Success!", response.data);
      setIsSubmitted(true); // Set the submission status to true upon success
    } catch (error) {
      alert("Failed sending data")
      console.error("Failed to send data:", error);
    }
  };

  useEffect(() => {
    if (data.ownerName) {
      const [firstName, ...lastName] = data.ownerName.split(' ');
      setFormData((prevState) => ({
        ...prevState,
        customerFirstName: firstName,
        customerLastName: lastName.join(' '),
        customerFullName: `${firstName} ${lastName.join(' ')}`,
        customerEmail: data.customerEmail || '',
        customerPhone: data.customerPhone || '' // Ensure phone is correctly set
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        customerFirstName: '',
        customerLastName: '',
        customerFullName: '',
        customerEmail: data.customerEmail || '',
        customerPhone: data.customerPhone || '' // Ensure phone is correctly set
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = async (address) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=YOUR_API_KEY`);
    const result = await response.json();
    if (result.status === 'OK') {
      const addressComponents = result.results[0].address_components;
      const separatedAddress = {
        city: addressComponents.find(comp => comp.types.includes('locality'))?.long_name || '',
        state: addressComponents.find(comp => comp.types.includes('administrative_area_level_1'))?.short_name || '',
        zipCode: addressComponents.find(comp => comp.types.includes('postal_code'))?.long_name || '',
      };
      setFormData({
        ...formData,
        ...separatedAddress,
      });
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Sale Data
        </Typography>
        <TextField
          name="customerFullName"
          label="Customer Full Name"
          value={formData.customerFullName || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="customerEmail"
          label="Customer Email"
          value={formData.customerEmail || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="customerPhone"
          label="Customer Phone"
          value={formData.customerPhone || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="address"
          label="Address"
          onBlur={(e) => handleAddressChange(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={submitMissingData} variant="contained" color="primary" fullWidth>
          Send Welcome Call
        </Button>
      </Box>
    </Modal>
  );
};

export default function NewSaleData(props) {
  const { recordUserId } = props;

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchNewSaleData = async () => {
    try {
      const response = await fetch(`${baseURL}/auth/crmNewSales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId: "0000" })
      });
      const result = await response.json();
      if (response.ok && result.data && result.data.newSaleData) {
        const enrichedData = result.data.newSaleData.map((item, index) => ({
          ...item,
          id: index
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

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    const [firstName, ...lastName] = row.ownerName.split(' ');
    setFormData({
      ...row,
      customerFullName: `${firstName} ${lastName.join(' ')}`
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
    setFormData({});
  };

  const handleSave = (formData) => {
    // Save the updated data
    const updatedData = data.map(item => item.id === formData.id ? formData : item);
    setData(updatedData);
  };

  const columns = useMemo(() => [
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleOpenModal(params.row)}>
          Welcome Call
        </Button>
      )
    },
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
        <>
          <DataGridPro
            rows={data}
            columns={columns}
            disableSelectionOnClick={true}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection={false}
            components={{ Toolbar: GridToolbar }}
          />
          <EditModal
            open={openModal}
            onClose={handleCloseModal}
            data={selectedRow || {}}
            onSave={handleSave}
          />
        </>
      )}
    </div>
  );
}
