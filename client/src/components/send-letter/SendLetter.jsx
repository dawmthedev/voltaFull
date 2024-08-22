import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import axios from 'axios';

const MessageForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    topic: '',
    message: '',
    headline: '',
    receiver: [],  // Holds selected roles
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'receiver') {
      // If "All Users" is selected, only allow that option and disable the others
      if (value.includes('All Users')) {
        setFormData({
          ...formData,
          receiver: ['All Users'],  // Deselect all other options when "All Users" is selected
        });
      } else {
        setFormData({
          ...formData,
          [name]: value, // Update the receiver array normally if "All Users" is not selected
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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

    const requestBody = {
      to: "bufmzyuhi", // Table identifier in Quickbase
      data: [{
        7: { value: formData.topic },    // FID 7 for Topic
        6: { value: formData.message },  // FID 6 for Message
        8: { value: formData.headline }, // FID 8 for Headline
        10: { value: formData.receiver.includes('Setter') ? 'true' : 'false' }, // FID 10 for Setter
        11: { value: formData.receiver.includes('Sales Rep') ? 'true' : 'false' }, // FID 11 for Sales Rep
        12: { value: formData.receiver.includes('Manager') ? 'true' : 'false' }, // FID 12 for Manager
        13: { value: formData.receiver.includes('1099') ? 'true' : 'false' }, // FID 13 for 1099
        14: { value: formData.receiver.includes('W2') ? 'true' : 'false' }, // FID 14 for W2
        15: { value: formData.receiver.includes('Construction') ? 'true' : 'false' }, // FID 15 for Construction
        16: { value: formData.receiver.includes('All Users') ? 'true' : 'false' }, // FID 16 for All Users
      }],
      fieldsToReturn: [] // Specify fields to return, if any
    };

    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      console.log("Success!", response.data);
      setSubmissionStatus({
        success: true,
        message: 'Message, Topic, and Receiver roles sent successfully!',
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
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />

      {/* Multi-select dropdown for receiver */}
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
          <MenuItem value="All Users">
            <Checkbox checked={formData.receiver.indexOf('All Users') > -1} />
            <ListItemText primary="All Users" />
          </MenuItem>
          <MenuItem value="Setter" disabled={formData.receiver.includes('All Users')}>
            <Checkbox checked={formData.receiver.indexOf('Setter') > -1} />
            <ListItemText primary="Setter" />
          </MenuItem>
          <MenuItem value="Manager" disabled={formData.receiver.includes('All Users')}>
            <Checkbox checked={formData.receiver.indexOf('Manager') > -1} />
            <ListItemText primary="Manager" />
          </MenuItem>
          <MenuItem value="Sales Rep" disabled={formData.receiver.includes('All Users')}>
            <Checkbox checked={formData.receiver.indexOf('Sales Rep') > -1} />
            <ListItemText primary="Sales Rep" />
          </MenuItem>
          <MenuItem value="W2" disabled={formData.receiver.includes('All Users')}>
            <Checkbox checked={formData.receiver.indexOf('W2') > -1} />
            <ListItemText primary="W2" />
          </MenuItem>
          <MenuItem value="1099" disabled={formData.receiver.includes('All Users')}>
            <Checkbox checked={formData.receiver.indexOf('1099') > -1} />
            <ListItemText primary="1099" />
          </MenuItem>
          <MenuItem value="Construction" disabled={formData.receiver.includes('All Users')}>
            <Checkbox checked={formData.receiver.indexOf('Construction') > -1} />
            <ListItemText primary="Construction" />
          </MenuItem>
        </Select>
      </FormControl>

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



















// import React, { useState } from 'react';
// import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import axios from 'axios';

// const MessageForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     topic: '',
//     message: '',
//     headline: '',
//     receiver: '',  // New state for the dropdown
//   });

//   const [submissionStatus, setSubmissionStatus] = useState({
//     success: false,
//     message: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const submitData = async (e) => {
//     e.preventDefault();

//     const QB_DOMAIN = "voltaic.quickbase.com";
//     const API_ENDPOINT = "https://api.quickbase.com/v1/records";

//     const headers = {
//       Authorization: "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3",
//       "QB-Realm-Hostname": QB_DOMAIN,
//       "Content-Type": "application/json",
//     };

//     // Request body to pass the topic, message, headline, and receiver (FID 9)
//     const requestBody = {
//       to: "bufmzyuhi", // Table identifier in Quickbase
//       data: [{
//         7: { value: formData.topic }, // FID 7 for Topic
//         6: { value: formData.message }, // FID 6 for Message
//         8: { value: formData.headline }, // FID 8 for Headline
//         9: { value: formData.receiver }, // FID 9 for Receiver (new field)
//       }],
//       fieldsToReturn: [] // Specify fields to return, if any
//     };

//     try {
//       const response = await axios.post(API_ENDPOINT, requestBody, { headers });
//       console.log("Success!", response.data);
//       setSubmissionStatus({
//         success: true,
//         message: 'Message, Topic, and Receiver sent successfully!',
//       });
//       setTimeout(() => {
//         onClose(); // Close the modal after 2 seconds
//       }, 2000);
//     } catch (error) {
//       alert("Failed sending data");
//       console.error("Failed to send data:", error);
//     }
//   };

//   return (
//     <form onSubmit={submitData}>

//       <TextField
//         label="Headline"
//         name="headline"
//         value={formData.headline}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
      
//       <TextField
//         label="Topic"
//         name="topic"
//         value={formData.topic}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
      
//       <TextField
//         label="Message"
//         name="message"
//         value={formData.message}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         multiline
//         rows={4}
//       />

//       {/* Dropdown for receiver */}
//       <FormControl fullWidth margin="normal">
//         <InputLabel id="receiver-label">Receiver</InputLabel>
//         <Select
//           labelId="receiver-label"
//           name="receiver"
//           value={formData.receiver}
//           onChange={handleChange}
//           fullWidth
//         >
//           <MenuItem value="Setter">Setter</MenuItem>
//           <MenuItem value="Manager">Manager</MenuItem>
//           <MenuItem value="Sales Rep">Sales Rep</MenuItem>
//           <MenuItem value="W2">W2</MenuItem>
//           <MenuItem value="W9">W9</MenuItem>
//           <MenuItem value="1099">1099</MenuItem>
//         </Select>
//       </FormControl>

//       {submissionStatus.success && (
//         <div style={{ margin: '16px 0', color: 'green' }}>
//           {submissionStatus.message}
//         </div>
//       )}

//       <Button type="submit" variant="contained" color="primary" fullWidth>
//         Submit
//       </Button>
//     </form>
//   );
// };

// export default MessageForm;






