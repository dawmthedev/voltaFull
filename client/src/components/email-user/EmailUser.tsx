import { Button, Input, Box, Stack, Heading } from "@chakra-ui/react";
import React, { useState } from 'react';
import axios from 'axios';

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
    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
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
        label="Content"
        name="content"
        value={formData.content}
        multiline
        rows={4}
        label="Email"
        name="email"
        value={formData.email}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};
export default EmailUserForm;
