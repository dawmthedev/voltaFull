import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const MessageForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    topic: '',
    message: '',
    headline: '',
    receiver: '',  // New state for the dropdown
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

    // Request body to pass the topic, message, headline, and receiver (FID 9)
    const requestBody = {
      to: "bufmzyuhi", // Table identifier in Quickbase
      data: [{
        7: { value: formData.topic }, // FID 7 for Topic
        6: { value: formData.message }, // FID 6 for Message
        8: { value: formData.headline }, // FID 8 for Headline
        9: { value: formData.receiver }, // FID 9 for Receiver (new field)
      }],
      fieldsToReturn: [] // Specify fields to return, if any
    };

    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      console.log("Success!", response.data);
      setSubmissionStatus({
        success: true,
        message: 'Message, Topic, and Receiver sent successfully!',
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

      {/* Dropdown for receiver */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="receiver-label">Receiver</InputLabel>
        <Select
          labelId="receiver-label"
          name="receiver"
          value={formData.receiver}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="Setter">Setter</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Sales Rep">Sales Rep</MenuItem>
          <MenuItem value="W2">W2</MenuItem>
          <MenuItem value="W9">W9</MenuItem>
          <MenuItem value="1099">1099</MenuItem>
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
// import { TextField, Button } from '@mui/material';
// import axios from 'axios';

// const MessageForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     topic: '',
//     message: '',
//     headline: '',
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

//     // Request body to pass the topic (FID 1) and message (FID 2)
//     const requestBody = {
//       to: "bufmzyuhi", // Table identifier in Quickbase
//       data: [{
//         7: { value: formData.topic }, // FID 1 for Topic
//         6: { value: formData.message }, // FID 2 for Message
//         8: { value: formData.headline }, // FID 2 for Message
//       }],
//       fieldsToReturn: [] // Specify fields to return, if any
//     };

//     try {
//       const response = await axios.post(API_ENDPOINT, requestBody, { headers });
//       console.log("Success!", response.data);
//       setSubmissionStatus({
//         success: true,
//         message: 'Message and Topic sent successfully!',
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
