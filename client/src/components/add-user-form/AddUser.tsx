import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, FormGroup, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import axios from 'axios';
import { baseURL } from '../../libs/client/apiClient';
import { DatePicker } from '@mui/x-date-pickers';
import PlacesAutocomplete from 'react-places-autocomplete';
import { MultiSelect } from 'react-multi-select-component';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

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
    hisLicense: '',
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


    const requestBody = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      hisLicense: formData.hisLicense,
      role: formData.role,
      payrollType: formData.payrollType,
      hireDate: formData.hireDate,
      selectedTeamMembers: formData.selectedTeamMembers.join(', '),
      location: formData.location,
      active: true
    };

    try {
      const response = await axios.post(`${baseURL}/users`, requestBody);
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

  const handleRoleChange = (e) => {
    const { value } = e.target;
    let newPayrollType = formData.payrollType;
    if (value === 'Dealer') {
      newPayrollType = '1099';
    }
    setFormData({
      ...formData,
      role: value,
      payrollType: newPayrollType,
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
      role: newRole,
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            onChange={handleRoleChange}
          >
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

        <MultiSelect
          options={[
            { label: 'Nick Finger', value: 'Nick Finger' },
            { label: 'Jake Gerber', value: 'Jake Gerber' },
            { label: 'Bryce Felkner', value: 'Bryce Felkner' },
            { label: 'Remy Levine', value: 'Remy Levine' }
          ]}
          value={formData.selectedTeamMembers.map(member => ({ label: member, value: member }))}
          onChange={(selected) =>
            setFormData({
              ...formData,
              selectedTeamMembers: selected.map(option => option.value),
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








// import React, { useState } from 'react';
// import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, FormGroup } from '@mui/material';
// import axios from 'axios';
// import { DatePicker } from '@mui/x-date-pickers';
// import PlacesAutocomplete from 'react-places-autocomplete';
// import { MultiSelect } from 'react-multi-select-component';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { format } from 'date-fns';


// const AddUserForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     hisLicense: '',
//     role: '',
//     payrollType: 'W2', // Default to 'W2'
//     hireDate: null, // New date field
//     location: '', // New location field
//     selectedTeamMembers: [] // New multi-select field
//   });

//   const [errors, setErrors] = useState({
//     hisLicense: '',
//   });

//   const [submissionStatus, setSubmissionStatus] = useState({
//     success: false,
//     message: '',
//   });

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = { hisLicense: '' };

//     if (formData.role === 'admin' || formData.role === 'user') {
//       if (!formData.hisLicense) {
//         newErrors.hisLicense = 'HIS License is required for Manager or Sales Rep roles.';
//         valid = false;
//       }
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const submitNewUserData = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }


//       "QB-Realm-Hostname": QB_DOMAIN,
//       "Content-Type": "application/json",
//     };

//     const requestBody = {
//       to: "br5cqr4wu", // Table identifier in Quickbase
//       data: [{
//         10: { value: formData.email },
//         6: { value: formData.firstName },
//         7: { value: formData.lastName },
//         14: { value: formData.phone },
//         796: { value: formData.hisLicense }, // Assuming field ID for HIS License
//         931: { value: formData.role }, // Assuming field ID for Role
//         1071: { value: formData.payrollType }, // Field ID for Payroll Type
//         1072: { value: formData.hireDate }, // New date field for Hire Date
//         1073: { value: formData.selectedTeamMembers.join(', ') }, // New multi-select field
//         1074: { value: formData.location }, // New location field
//         1075: { value: "true" } // New location field
//       }],
//       fieldsToReturn: [] // Specify fields to return, if any
//     };

//     try {
//       const response = await axios.post(API_ENDPOINT, requestBody, { headers });
//       setSubmissionStatus({
//         success: true,
//         message: 'User added successfully!',
//       });
//       setTimeout(() => {
//         onClose(); // Close the modal after 2 seconds
//       }, 2000);
//     } catch (error) {
//       alert("Failed sending data");
//       console.error("Failed to send data:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePayrollTypeChange = (event) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       payrollType: event.target.checked ? '1099' : 'W2',
//     }));
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//        <form onSubmit={submitNewUserData}>
//       <TextField
//         label="First Name"
//         name="firstName"
//         value={formData.firstName}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Last Name"
//         name="lastName"
//         value={formData.lastName}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Phone"
//         name="phone"
//         value={formData.phone}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />

//       <FormControl fullWidth margin="normal">
//         <InputLabel id="role-select-label">Role</InputLabel>
//         <Select
//           labelId="role-select-label"
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//         >
//           <MenuItem value="Manager">Manager</MenuItem>
//           <MenuItem value="Dealer">Dealer</MenuItem>
//           <MenuItem value="Sales Rep">Sales Rep</MenuItem>
//           <MenuItem value="Setter">Setter</MenuItem>
//         </Select>
//       </FormControl>

//       <TextField
//         label={formData.role === 'admin' || formData.role === 'user' ? 'HIS License (required)' : 'HIS License (optional)'}
//         name="hisLicense"
//         value={formData.hisLicense}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         error={!!errors.hisLicense}
//         helperText={errors.hisLicense}
//       />

// <DatePicker
//   label="Hire Date"
//   value={formData.hireDate}
//   onChange={(newDate) => {
//     const formattedDate = format(new Date(newDate), 'EEEE, MMM do'); // Format: "Tuesday, Aug 13th"
//     setFormData({ ...formData, hireDate: formattedDate });
//   }}
// />


  
//       <PlacesAutocomplete
//         value={formData.location}
//         onChange={(location) => setFormData({ ...formData, location })}
//         onSelect={(location) => setFormData({ ...formData, location })}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <TextField
//               {...getInputProps({
//                 placeholder: 'Enter Location',
//                 label: 'Location',
//                 variant: 'outlined',
//               })}
//               fullWidth
//               margin="normal"
//             />
//             <div style={{ zIndex: 3000, backgroundColor: 'white', position: 'absolute', width: '100%' }}>
//               {loading && <div>Loading...</div>}
//               {suggestions.map(suggestion => {
//                 const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
//                 const style = suggestion.active
//                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style,
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>

//       <MultiSelect
//   options={[
//     { label: 'Nick Finger', value: 'Nick Finger' },
//     { label: 'Jake Gerber', value: 'Jake Gerber' },
//     { label: 'Bryce Felkner', value: 'Bryce Felkner' },
//     { label: 'Remy Levine', value: 'Remy Levine' }
//   ]}
//   value={formData.selectedTeamMembers.map(member => ({ label: member, value: member }))}
//   onChange={(selected) =>
//     setFormData({
//       ...formData,
//       selectedTeamMembers: selected.map(option => option.value),
//     })
//   }
//   labelledBy="Select Team Members"
// />


// <FormGroup>
//         <FormControlLabel
//           control={<Switch checked={formData.payrollType === '1099'} onChange={handlePayrollTypeChange} />}
//           label={formData.payrollType}
//         />
//       </FormGroup>

//       {submissionStatus.success && (
//         <div style={{ margin: '16px 0', color: 'green' }}>
//           {submissionStatus.message}
//         </div>
//       )}

//       <Button type="submit" variant="contained" color="primary" fullWidth>
//         Submit
//       </Button>
//     </form>

//     </LocalizationProvider>
//   );
// };

// export default AddUserForm;






































































































// import React, { useState } from 'react';
// import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, FormGroup } from '@mui/material';
// import axios from 'axios';

// const AddUserForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     hisLicense: '',
//     role: '',
//     payrollType: 'W2' // Default to 'W2'
//   });

//   const [errors, setErrors] = useState({
//     hisLicense: '',
//   });

//   const [submissionStatus, setSubmissionStatus] = useState({
//     success: false,
//     message: '',
//   });

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = { hisLicense: '' };

//     if (formData.role === 'admin' || formData.role === 'user') {
//       if (!formData.hisLicense) {
//         newErrors.hisLicense = 'HIS License is required for Manager or Sales Rep roles.';
//         valid = false;
//       }
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const submitNewUserData = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }


//       "QB-Realm-Hostname": QB_DOMAIN,
//       "Content-Type": "application/json",
//     };

//     const requestBody = {
//       to: "br5cqr4wu", // Table identifier in Quickbase
//       data: [{
//         10: { value: formData.email },
//         6: { value: formData.firstName },
//         7: { value: formData.lastName },
//         14: { value: formData.phone },
//         796: { value: formData.hisLicense }, // Assuming field ID for HIS License
//         931: { value: formData.role }, // Assuming field ID for Role
//         1071: { value: formData.payrollType } // Field ID for Payroll Type
//       }],
//       fieldsToReturn: [] // Specify fields to return, if any
//     };

//     try {
//       const response = await axios.post(API_ENDPOINT, requestBody, { headers });
//       setSubmissionStatus({
//         success: true,
//         message: 'User added successfully!',
//       });
//       setTimeout(() => {
//         onClose(); // Close the modal after 2 seconds
//       }, 2000);
//     } catch (error) {
//       alert("Failed sending data");
//       console.error("Failed to send data:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handlePayrollTypeChange = (event) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       payrollType: event.target.checked ? '1099' : 'W2',
//     }));
//   };

//   return (
//     <form onSubmit={submitNewUserData}>
//       <TextField
//         label="First Name"
//         name="firstName"
//         value={formData.firstName}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Last Name"
//         name="lastName"
//         value={formData.lastName}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />
//       <TextField
//         label="Phone"
//         name="phone"
//         value={formData.phone}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//       />

 

//       <FormControl fullWidth margin="normal">
//         <InputLabel id="role-select-label">Role</InputLabel>
//         <Select
//           labelId="role-select-label"
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//         >
//           <MenuItem value="admin">Manager</MenuItem>
//           <MenuItem value="user">Sales Rep</MenuItem>
//           <MenuItem value="manager">Setter</MenuItem>
//         </Select>
//       </FormControl>

//       <TextField
//         label={formData.role === 'admin' || formData.role === 'user' ? 'HIS License (required)' : 'HIS License (optional)'}
//         name="hisLicense"
//         value={formData.hisLicense}
//         onChange={handleChange}
//         fullWidth
//         margin="normal"
//         error={!!errors.hisLicense}
//         helperText={errors.hisLicense}
//       />

//       <FormGroup>
//         <FormControlLabel
//           control={<Switch checked={formData.payrollType === '1099'} onChange={handlePayrollTypeChange} />}
//           label={formData.payrollType}
//         />
//       </FormGroup>

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

// export default AddUserForm;
