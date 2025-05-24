import React, { useState, useEffect, useMemo } from 'react';
import { Button, TextField, Typography, Modal, Box, Skeleton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { baseURL } from '../../libs/client/apiClient';
import axios from 'axios';
import { startOfDay, startOfWeek, startOfMonth, startOfYear, isWithinInterval } from 'date-fns';
import Autocomplete from 'react-google-autocomplete';
import { useCallback } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';




const isToday = (date) => {
  return isWithinInterval(new Date(date), {
    start: startOfDay(new Date()),
    end: new Date(),
  });
};

const isThisWeek = (date) => {
  return isWithinInterval(new Date(date), {
    start: startOfWeek(new Date()),
    end: new Date(),
  });
};

const isThisMonth = (date) => {
  return isWithinInterval(new Date(date), {
    start: startOfMonth(new Date()),
    end: new Date(),
  });
};

const isThisYear = (date) => {
  return isWithinInterval(new Date(date), {
    start: startOfYear(new Date()),
    end: new Date(),
  });
};



const EditModal = ({ open, onClose, data, onSave }) => {


  const [formData, setFormData] = useState({
    customerFirstName: '',
    customerLastName: '',
    customerFullName: '',
    customerEmail: '',
    recordID: '',
    customerPhone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    financing: ''
  });

  useEffect(() => {
    if (data) {
      setFormData({
        customerFirstName: data.customerFirstName || '',
        customerLastName: data.customerLastName || '',
        customerFullName: data.customerFullName || '',
        customerEmail: data.customerEmail || '',
        recordID: data.recordID || '',  // Ensure recordID is correctly set
        customerPhone: data.customerPhone || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zipCode: data.zipCode || '',
        country: data.country || '',
        financing: data.financing || ''
      });
    }
  }, [data]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'customerFullName') {
      const [firstName, ...lastName] = value.split(' ');
      setFormData(prevData => ({
        ...prevData,
        customerFullName: value,
        customerFirstName: firstName,
        customerLastName: lastName.join(' '),
  
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const submitMissingData = async (e) => {

    console.log("formData")
    console.log(formData);
    e.preventDefault();
    const headers = {
      Authorization: "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3",
      "QB-Realm-Hostname": "voltaic.quickbase.com",
      "Content-Type": "application/json",
    };

    const requestBody = {
      to: "bs9fegk3x",
      data: [{
        3: { value: formData.recordID },
        40: { value: formData.customerEmail },
        44: { value: formData.customerFirstName },
        45: { value: formData.customerLastName },
        46: { value: formData.customerPhone },
        48: { value: formData.financing } // Pass the selected financing as fid 50
      }],
      fieldsToReturn: []
    };
  
    try {
      const response = await axios.post("https://api.quickbase.com/v1/records", requestBody, { headers });
      console.log("Success!", response.data);
      pushNewProject(e)
      setIsSubmitted(true);
      onClose(); // Close the modal here

    



    } catch (error) {
      alert("Failed sending data");
      console.error("Failed to send data:", error);
    }
  };




  const pushNewProject = async (e) => {
    e.preventDefault();
    const QB_DOMAIN = "voltaic.quickbase.com";
    const API_ENDPOINT = "https://api.quickbase.com/v1/records";

    const headers = {
      Authorization: "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3",
      "QB-Realm-Hostname": QB_DOMAIN,
      "Content-Type": "application/json",
    };


    // const mapFinancingToValue = (financing) => {
    //   switch (financing) {
    //     case "Sunnova":
    //       return "133";
    //     case "Lightreach":
    //       return "22";
    //     case "Enium":
    //       return "23";
    //     default:
    //       return "";  // Default value in case of an unknown option
    //   }
    // };
    


    console.log("pushing new project" , formData)


    console.log("pushing new project" , formData)
  
    const requestBody = {
      to: "br5cqr4r3",
      data: [{
        90: { value: formData.customerEmail },
        84: { value: formData.customerFirstName },
        85: { value: formData.customerLastName },
        88: { value: formData.customerPhone },
        93: { value: formData.address },
        37: { value: 'Incomplete' },
        633: { value: '71' },
        95: { value: formData.city },
        96: { value: 'California' },
        97: { value: formData.zipCode },
        98: { value: formData.country },
      }],
      fieldsToReturn: []
    };

    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      console.log("Success!", response.data);
      setIsSubmitted(true);

      onClose(); // Close the modal here
    } catch (error) {
      alert("Failed sending data");
      console.error("Failed to send data:", error);
    }
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
        zIndex: 1300
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Sale Data
        </Typography>


        {/* not showing  record ID  here*/}
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
      
 <PlacesAutocomplete
          value={formData.address}
          onChange={(address) => setFormData(prevData => ({ ...prevData, address }))}
          onSelect={(address) => {
            const addressParts = address.split(',');  // Split the address into parts
            const streetAddress = addressParts[0]?.trim() || "";
            const city = addressParts[1]?.trim() || "";
            const stateZip = addressParts[2]?.trim().split(' ') || [];
            const state = stateZip[0] || "";
            const zipCode = stateZip[1] || "";
            const country = addressParts[3]?.trim() || "";
        
            setFormData(prevData => ({
              ...prevData,
              address,  // Set the full address
              city,
              state,
              zipCode,
              country
            }));
          }}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <TextField
                {...getInputProps({
                  placeholder: 'Enter Address',
                  label: 'Address',
                  variant: 'outlined',
                })}
                fullWidth
                margin="normal"
              />
              <div style={{ zIndex: 3000, backgroundColor: 'white', position: 'absolute', width: '100%' }}>
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>



        <FormControl fullWidth margin="normal">
          <InputLabel>Financing</InputLabel>
          <Select
            name="financing"
            value={formData.financing}
            label="Financing"
            onChange={handleChange}
          >
            <MenuItem value="Sunnova">Sunnova</MenuItem>
            <MenuItem value="Lightreach">Lightreach</MenuItem>
            <MenuItem value="Enium">Enium</MenuItem>
          </Select>
        </FormControl>
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

    console.log("Selected Row:", row);  // This logs correctly, including recordID
  

  
      

    const [firstName, ...lastName] = row.ownerName.split(' ');
    setFormData({
      ...row,
      customerFullName: `${firstName} ${lastName.join(' ')}`,
      recordID: row.recordID || 'N/A'


    });


    setSelectedRow(row);


    console.log(selectedRow)
    setOpenModal(true);
  };

  const handleCloseModal = () => {

    console.log( selectedRow)
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
    { field: 'recordID', headerName: 'record ID', width: 150 },
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

  const calculateCounts = () => {
    const today = data.filter((item) => isToday(item.salesRep)).length;
    const thisWeek = data.filter((item) => isThisWeek(item.salesRep)).length;
    const thisMonth = data.filter((item) => isThisMonth(item.salesRep)).length;
    const thisYear = data.filter((item) => isThisYear(item.salesRep)).length;

    return { today, thisWeek, thisMonth, thisYear };
  };

  const counts = calculateCounts();

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px', background: '#f9f9f9' }}>
        <Typography variant="body1">Submitted Today: {counts.today}</Typography>
        <Typography variant="body1">Submitted This Week: {counts.thisWeek}</Typography>
        <Typography variant="body1">Submitted This Month: {counts.thisMonth}</Typography>
        <Typography variant="body1">Submitted This Year: {counts.thisYear}</Typography>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
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
    </div>
  );
}





//