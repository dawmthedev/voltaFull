import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../libs/client/apiClient';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';

const roles = ['All Users', 'Setter', 'Manager', 'Sales Rep', 'W2', '1099', 'Construction'];

const MessageForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    topic: '',
    message: '',
    headline: '',
    receiver: [],
  });
  const [status, setStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'receiver') {
      const val = typeof value === 'string' ? value.split(',') : value;
      setFormData({ ...formData, receiver: val });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    const requestBody = {
      topic: formData.topic,
      message: formData.message,
      headline: formData.headline,
      receiver: formData.receiver,
    };
    try {
      await axios.post(`${baseURL}/messages`, requestBody);
      setStatus({ success: true, message: 'Message sent successfully!' });
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to send data:', error);
      setStatus({ success: false, message: 'Failed to send data' });
    }
  };

  return (
    <form onSubmit={submitData}>
      <TextField
        label="Headline"
        name="headline"
        value={formData.headline}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
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
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="receiver-label">Receiver</InputLabel>
        <Select
          labelId="receiver-label"
          name="receiver"
          multiple
          value={formData.receiver}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {roles.map((option) => (
            <MenuItem
              key={option}
              value={option}
              disabled={option !== 'All Users' && formData.receiver.includes('All Users')}
            >
              <Checkbox checked={formData.receiver.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {status.message && (
        <div style={{ margin: '16px 0', color: status.success ? 'green' : 'red' }}>
          {status.message}
        </div>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default MessageForm;
