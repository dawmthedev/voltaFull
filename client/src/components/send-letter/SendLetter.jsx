import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const MessageForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    topic: '',
    message: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    const QB_DOMAIN = "voltaic.quickbase.com";
    const API_ENDPOINT = "https://api.quickbase.com/v1/records";

    const headers = {
      Authorization: "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3",
      "QB-Realm-Hostname": QB_DOMAIN,
      "Content-Type": "application/json",
    };

    // Request body to pass the topic (FID 1) and message (FID 2)
    const requestBody = {
      to: "bufmzyuhi", // Table identifier in Quickbase
      data: [{
        7: { value: formData.topic }, // FID 1 for Topic
        6: { value: formData.message }, // FID 2 for Message
      }],
      fieldsToReturn: [] // Specify fields to return, if any
    };

    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      console.log("Success!", response.data);
      setSubmissionStatus({
        success: true,
        message: 'Message and Topic sent successfully!',
      });
      setTimeout(() => {
        onClose(); // Close the modal after 2 seconds
      }, 2000);
    } catch (error) {
      alert("Failed sending data");
      console.error("Failed to send data:", error);
    }
  };

  return (
    <form onSubmit={submitData}>
      <TextField
        label="Topic"
        name="topic"
        value={formData.topic}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
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

export default MessageForm;
