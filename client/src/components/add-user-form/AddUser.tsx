import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const AddUserForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hisLicense: '',
    role: '',
  });

  const [errors, setErrors] = useState({
    hisLicense: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    message: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { hisLicense: '' };

    if (formData.role === 'admin' || formData.role === 'user') {
      if (!formData.hisLicense) {
        newErrors.hisLicense = 'HIS License is required for Manager or Sales Rep roles.';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const submitNewUserData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const QB_DOMAIN = "voltaic.quickbase.com";
    const API_ENDPOINT = "https://api.quickbase.com/v1/records";

    const headers = {
      Authorization: "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3",
      "QB-Realm-Hostname": QB_DOMAIN,
      "Content-Type": "application/json",
    };

    const requestBody = {
      to: "br5cqr4wu", // Table identifier in Quickbase
      data: [{
        10: { value: formData.email },
        6: { value: formData.firstName },
        7: { value: formData.lastName },
        14: { value: formData.phone },
        796: { value: formData.hisLicense }, // Assuming field ID for HIS License
        931: { value: formData.role }, // Assuming field ID for Role
      }],
      fieldsToReturn: [] // Specify fields to return, if any
    };

    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      console.log("Success!", response.data);
      setSubmissionStatus({
        success: true,
        message: 'User added successfully!',
      });
      setTimeout(() => {
        onClose(); // Close the modal after 2 seconds
      }, 2000);
    } catch (error) {
      alert("Failed sending data");
      console.error("Failed to send data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={submitNewUserData}>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="admin">Manager</MenuItem>
          <MenuItem value="user">Sales Rep</MenuItem>
          <MenuItem value="manager">Setter</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label={formData.role === 'admin' || formData.role === 'user' ? 'HIS License (required)' : 'HIS License (optional)'}
        name="hisLicense"
        value={formData.hisLicense}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.hisLicense}
        helperText={errors.hisLicense}
      />

      {submissionStatus.success && (
        <div style={{ margin: '16px 0', color: 'green' }}>
          {submissionStatus.message}
        </div>
      )}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default AddUserForm;
