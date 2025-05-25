import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';
import apiClient from '../../libs/client/apiClient';
import { DatePicker } from '@mui/x-date-pickers';
import PlacesAutocomplete from 'react-places-autocomplete';
import { MultiSelect } from 'react-multi-select-component';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import logger from '../../utils/logger';

const AddUserForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hisLicense: '',
    role: '',
    payrollType: 'W2', // Default to 'W2'
    hireDate: null, // New date field
    location: '', // New location field
    selectedTeamMembers: [] // New multi-select field
  });

  const [errors, setErrors] = useState({
    hisLicense: ''
  });

  const [missingFields, setMissingFields] = useState([]); // Store missing fields
  const [openModal, setOpenModal] = useState(false); // State to control modal

  const validateForm = () => {
    let valid = true;
    const missingFieldsList = [];

    if (!formData.firstName) missingFieldsList.push('First Name');
    if (!formData.lastName) missingFieldsList.push('Last Name');
    if (!formData.email) missingFieldsList.push('Email');
    if (!formData.phone) missingFieldsList.push('Phone');
    if (!formData.hireDate) missingFieldsList.push('Hire Date');
    if (!formData.location) missingFieldsList.push('Location');
    if (formData.role !== 'Dealer' && formData.role !== 'Setter' && !formData.hisLicense) {
      missingFieldsList.push('HIS License (required for Sales Rep or Manager)');
    }

    if (missingFieldsList.length > 0) {
      setMissingFields(missingFieldsList);
      setOpenModal(true); // Open modal to show missing fields
      valid = false;
    }

    return valid;
  };

  const submitNewUserData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }

    const token = process.env.REACT_APP_QB_TOKEN;

    const userPayload = { ...formData };

    if (!token) {
      logger.success('Token missing, logging data instead', userPayload);
      onClose();
      return;
    }

    try {
      const { data } = await apiClient.post('/user', userPayload);
      logger.success('Success!', data);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      alert('Failed sending data');
      console.error('Failed to send data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    let newPayrollType = formData.payrollType;
    if (value === 'Dealer') {
      newPayrollType = '1099';
    }
    setFormData({
      ...formData,
      role: value,
      payrollType: newPayrollType
    });
  };

  const handlePayrollTypeChange = (event) => {
    const newPayrollType = event.target.checked ? '1099' : 'W2';
    let newRole = formData.role;

    if (newPayrollType === '1099' && formData.role !== 'Dealer') {
      newRole = 'Dealer';
    }

    if (newPayrollType === 'W2' && formData.role === 'Dealer') {
      newRole = ''; // Clear role if switching to W2 from Dealer
    }

    setFormData({
      ...formData,
      payrollType: newPayrollType,
      role: newRole
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={submitNewUserData}>
        <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" />

        <FormControl fullWidth margin="normal">
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select labelId="role-select-label" name="role" value={formData.role} onChange={handleRoleChange}>
            <MenuItem value="Manager">Manager</MenuItem>
            <MenuItem value="Dealer">Dealer</MenuItem>
            <MenuItem value="Sales Rep">Sales Rep</MenuItem>
            <MenuItem value="Setter">Setter</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label={formData.role === 'Sales Rep' || formData.role === 'Manager' ? 'HIS License (required)' : 'HIS License (optional)'}
          name="hisLicense"
          value={formData.hisLicense}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.hisLicense}
          helperText={errors.hisLicense}
        />

        <DatePicker
          label="Hire Date"
          value={formData.hireDate}
          onChange={(newDate) => {
            const formattedDate = format(new Date(newDate), 'EEEE, MMM do'); // Format: "Tuesday, Aug 13th"
            setFormData({ ...formData, hireDate: formattedDate });
          }}
        />

        <PlacesAutocomplete
          value={formData.location}
          onChange={(location) => setFormData({ ...formData, location })}
          onSelect={(location) => setFormData({ ...formData, location })}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <TextField
                {...getInputProps({
                  placeholder: 'Enter Location',
                  label: 'Location',
                  variant: 'outlined'
                })}
                fullWidth
                margin="normal"
              />
              <div style={{ zIndex: 3000, backgroundColor: 'white', position: 'absolute', width: '100%' }}>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
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

        <MultiSelect
          options={[
            { label: 'Nick Finger', value: 'Nick Finger' },
            { label: 'Jake Gerber', value: 'Jake Gerber' },
            { label: 'Bryce Felkner', value: 'Bryce Felkner' },
            { label: 'Remy Levine', value: 'Remy Levine' }
          ]}
          value={formData.selectedTeamMembers.map((member) => ({ label: member, value: member }))}
          onChange={(selected) =>
            setFormData({
              ...formData,
              selectedTeamMembers: selected.map((option) => option.value)
            })
          }
          labelledBy="Select Team Members"
        />

        <FormGroup>
          <FormControlLabel
            control={<Switch checked={formData.payrollType === '1099'} onChange={handlePayrollTypeChange} />}
            label={formData.payrollType}
          />
        </FormGroup>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>

        {/* Modal for missing fields */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>You are missing some required data:</DialogTitle>
          <DialogContent>
            {missingFields.length > 0 && (
              <Typography>
                {missingFields.map((field, index) => (
                  <div key={index}>- {field}</div>
                ))}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </LocalizationProvider>
  );
};

export default AddUserForm;
