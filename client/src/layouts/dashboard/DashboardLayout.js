import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import Header from './header';
import Nav from './nav';
import { useAppSelector } from '../../hooks/hooks';  // For accessing user authentication state
import { authSelector } from '../../redux/slice/authSlice';
import axios from 'axios';
import { Button, Card, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, CircularProgress, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from '../../API/firebase';
import DeleteIcon from '@mui/icons-material/Delete';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#D2C5B4',
  color: 'white',
  minHeight: '100vh', // Set minHeight to 100vh to take up the full viewport height
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const UploadCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  textAlign: 'center',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
}));

const docTypes = ["Social Security", "Driver's License", "US Passport"];

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [fileUrls, setFileUrls] = useState({});
  const [selectedDocType, setSelectedDocType] = useState("");
  const [availableDocTypes, setAvailableDocTypes] = useState(docTypes);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  // Get the authenticated user's data, including recordID
  const { data } = useAppSelector(authSelector);
  const recordID = data?.recordID || 'N/A';

  // Define onClose function to close the modal
  const onClose = () => {
    setMessageModalOpen(false);
  };

  // Fetch verification status
  const fetchCRMVerification = async () => {
    setLoading(true); // Set loading to true before the request
    const API_URL = "https://api.quickbase.com/v1/records/query";
    const USER_TOKEN = process.env.REACT_APP_QB_USER_TOKEN;
    const QB_DOMAIN = process.env.REACT_APP_QB_DOMAIN;

    const requestBody = {
      from: "br5cqr4wu",
      where: `({3.EX.'${recordID}'})`,
      sortBy: [{ fieldId: 1083, order: "ASC" }],
      groupBy: [{ fieldId: 1083, grouping: "equal-values" }],
      options: { skip: 0, top: 1, compareWithAppLocalTime: false }
    };

    const headers = {
      Authorization: USER_TOKEN,
      "QB-Realm-Hostname": QB_DOMAIN,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(API_URL, requestBody, { headers });
      if (response.data && response.data.data) {
        const user = response.data.data[0];
        if (user && user['1083'] && user['1083'].value === true) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      }
    } catch (error) {
      console.error('Failed to fetch verification status:', error);
    }
    setLoading(false); // Set loading to false after the request completes
  };

  useEffect(() => {
    fetchCRMVerification();
  }, [recordID]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (selectedDocType && acceptedFiles.length === 1 && !uploadedFiles[selectedDocType]) {
        handleFileUpload(acceptedFiles[0]);
      } else {
        alert('Please select a document type and ensure only one file is uploaded per type.');
      }
    }
  });

  const handleFileUpload = async (file) => {
    const fileName = `${selectedDocType}/${uuidv4()}-${file.name}`;
    const fileRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
      },
      (error) => {
        console.error('File upload error:', error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(fileRef);
        setFileUrls((prev) => ({ ...prev, [selectedDocType]: downloadUrl }));
        setUploadedFiles((prev) => ({ ...prev, [selectedDocType]: file.name }));
        setAvailableDocTypes((prev) => prev.filter((type) => type !== selectedDocType));
        setSelectedDocType("");
      }
    );
  };

  // Handle file removal
  const handleRemoveFile = (docType) => {
    setUploadedFiles((prev) => {
      const updatedFiles = { ...prev };
      delete updatedFiles[docType];
      return updatedFiles;
    });
    setFileUrls((prev) => {
      const updatedUrls = { ...prev };
      delete updatedUrls[docType];
      return updatedUrls;
    });
    setAvailableDocTypes((prev) => [...prev, docType]); // Add the doc type back to available options
  };

  const submitNewUserData = async (e) => {
    e.preventDefault();

    const driversLicenseURL = fileUrls["Driver's License"] || null;
    const socialSecurityURL = fileUrls["Social Security"] || null;
    const passportURL = fileUrls["US Passport"] || null;

    const QB_DOMAIN = process.env.REACT_APP_QB_DOMAIN;
    const API_ENDPOINT = "https://api.quickbase.com/v1/records";

    const headers = {
      Authorization: process.env.REACT_APP_QB_USER_TOKEN,
      "QB-Realm-Hostname": QB_DOMAIN,
      "Content-Type": "application/json",
    };

    const requestBody = {
      to: "br5cqr4wu", // Table identifier in Quickbase
      data: [{
        3: { value: recordID },
        1081: { value: driversLicenseURL },
        1080: { value: socialSecurityURL },
        1082: { value: passportURL },
      }],
      fieldsToReturn: [] // Specify fields to return, if any
    };

    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      console.log("Success!", response.data);
      setTimeout(() => {
        onClose(); // Close the modal after 2 seconds
      }, 2000);
      fetchCRMVerification(); // Re-fetch the verification status after submission
    } catch (error) {
      alert("Failed sending data");
      console.error("Failed to send data:", error);
    }
  };

  const handleOpenMessageModal = () => {
    setMessageModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setMessageModalOpen(false);
    setSelectedDocType("");
  };

  // Add a loading screen to prevent the page from rendering before the status is fetched
  if (loading) {
    return (
      <Main>
        <CircularProgress color="inherit" />
      </Main>
    );
  }

  // If user is verified, show the regular layout
  if (isVerified) {
    return (
      <StyledRoot>
        <Header onOpenNav={() => setOpen(true)} />
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />
        <Main>
          <Outlet />
        </Main>
      </StyledRoot>
    );
  }

  // If user is not verified, show the verification prompt
  return (
    <Main>
      <UploadCard>
        <InsertDriveFileIcon style={{ fontSize: 60, color: '#1976d2' }} />
        <Typography variant="h5" sx={{ mt: 2 }}>
          One more step! Please submit your verification documents.
        </Typography>
        {/* Display the user's recordID */}
        {/* <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Your Record ID: {recordID}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          Verified?: No
        </Typography> */}

        <Button
          variant="contained"
          onClick={handleOpenMessageModal}
          sx={{ mt: 3, backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' } }}
        >
          Upload Now
        </Button>
      </UploadCard>

      {/* Modal for document upload */}
      <Dialog open={isMessageModalOpen} onClose={handleCloseMessageModal} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Verification Documents</DialogTitle>
        <DialogContent>
          <Typography>Select the type of document you are uploading:</Typography>
          <TextField
            select
            label="Document Type"
            value={selectedDocType}
            onChange={(e) => setSelectedDocType(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {availableDocTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          {/* Show uploaded files in a queue */}
          <List>
            {Object.keys(uploadedFiles).map((docType) => (
              <ListItem key={docType}>
                <ListItemText primary={docType} secondary={uploadedFiles[docType]} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleRemoveFile(docType)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {/* Drag and drop area */}
          {selectedDocType && (
            <section style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
              <div
                {...getRootProps({ className: 'dropzone' })}
                style={{
                  border: '2px dashed #ddd',
                  padding: '40px',
                  textAlign: 'center',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.3s ease',
                  '&:hover': { borderColor: '#1976d2' }
                }}
              >
                <input {...getInputProps()} />
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Drag 'n' drop a file here, or{' '}
                  <span style={{ color: '#1976d2', fontWeight: 'bold', cursor: 'pointer' }}>click to select a file</span>
                </p>
              </div>
            </section>
          )}
        </DialogContent>

        {/* Show submit button only if there's at least one uploaded file */}
        {Object.keys(uploadedFiles).length > 0 && (
          <DialogActions>
            <Button onClick={handleCloseMessageModal} sx={{ color: '#666' }}>
              Cancel
            </Button>
            <Button
              onClick={submitNewUserData}
              sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#1565c0' } }}
            >
              Submit
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Main>
  );
}



// import { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// // @mui
// import { styled } from '@mui/material/styles';
// //
// import Header from './header';
// import Nav from './nav';

// // ----------------------------------------------------------------------

// const APP_BAR_MOBILE = 64;
// const APP_BAR_DESKTOP = 92;

// const StyledRoot = styled('div')({
//   display: 'flex',
//   minHeight: '100%',
//   overflow: 'hidden',
// });

// const Main = styled('div')(({ theme }) => ({
//   flexGrow: 1,
//   overflow: 'auto',
//   backgroundColor: '#D2C5B4',
//   color: 'white',
//   minHeight: '100%',
//   paddingTop: APP_BAR_MOBILE + 24,
//   paddingBottom: theme.spacing(10),
//   [theme.breakpoints.up('lg')]: {
//     paddingTop: APP_BAR_DESKTOP + 24,
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(2),
//   },
// }));

// // ----------------------------------------------------------------------

// export default function DashboardLayout() {
//   const [open, setOpen] = useState(false);

//   return (
//     <StyledRoot>
      
//       <Header onOpenNav={() => setOpen(true)} />

//       <Nav openNav={open} onCloseNav={() => setOpen(false)} />

//       <Main>
//         <Outlet />
//       </Main>
//     </StyledRoot>
//   );
// }
