import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import logger from '../../utils/logger';

const EmailUserForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    email: ''
  });

  const submitEmailData = async (e) => {
    e.preventDefault();
    const API_ENDPOINT = "/sendEmailAlert"; // Your email sending endpoint

    const headers = {
      "Content-Type": "application/json",
    };

    const requestBody = {
      subject: formData.subject,
      letterContent: formData.content,
      email: formData.email,
    };

    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      logger.success("Success!", response.data);
      // Add any additional actions on success here
    } catch (error) {
      alert("Failed sending email");
      console.error("Failed to send email:", error);
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
    <form onSubmit={submitEmailData}>
      <TextField
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default EmailUserForm;
