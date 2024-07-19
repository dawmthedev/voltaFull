import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hisLicense: '',
    role: '',
  });

  const submitNewUserData = async (e) => {
    e.preventDefault();
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
        14: { value: formData.phone }, // Add phone to the request
        // You can add HIS License and Role here if needed in Quickbase table
      }],
      fieldsToReturn: [] // Specify fields to return, if any
    };

    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      console.log("Success!", response.data);
      // Add any additional actions on success here
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
      <TextField
        label="HIS License (optional)"
        name="hisLicense"
        value={formData.hisLicense}
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
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default AddUserForm;
