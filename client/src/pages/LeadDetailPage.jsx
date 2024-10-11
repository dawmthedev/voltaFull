import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid, Dialog, Button, TextField, Autocomplete, Box, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Typography, Paper, List, ListItem, ListItemText,
  ListItemIcon, LinearProgress, CircularProgress
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { authSelector } from '../redux/slice/authSlice';
import { baseURL } from '../libs/client/apiClient';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';

import MainStepper from '../components/MainStepper';
import BatteryStepper from '../components/BatteryStepper';
import HvacStepper from '../components/HVACStepper';
import MPUStepper from '../components/MPUStepper';
import QuietCoolStepper from '../components/QuietCoolStepper';
import InsulationStepper from '../components/InsulationStepper';
import RoofStepper from '../components/RoofStepper';
import ServiceStepper from '../components/ServiceStepper';

const LeadDetailPage = () => {
  const styles = {
    stickyBanner: {
      position: 'sticky', top: 0, width: '100%', backgroundColor: 'red',
      color: 'white', textAlign: 'center', padding: '10px', zIndex: 1000,
      fontSize: '20px', fontWeight: 'bold'
    }
  };

  const UserData = useAppSelector(authSelector)?.data;
  const userName = UserData?.name;
  const { id } = useParams();
  
  const [homeownerData, setHomeownerData] = useState(null);
  const [phoneData, setPhoneData] = useState(null);
  const [emailData, setEmailData] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [products, setProducts] = useState(null);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(null);
  const [dealerFee, setDealerFee] = useState(null);
  const [contractAmount, setContractAmount] = useState(null);
  const [addersTotal, setAddersTotal] = useState(null);
  const [installer, setInstaller] = useState(null);
  const [financing, setFinancing] = useState(null);
  const [payrollData, setPayroll] = useState([]);
  const [addersData, setAddersData] = useState([]);
  const [messageData, setMessageData] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [users, setUsers] = useState([]);
  const [taskDates, setTaskDates] = useState({});
  const [BatteryTaskDates, setBatteryTaskDates] = useState({});
  const [HVACTaskDates, setHVACTaskDates] = useState({});
  const [MPUTaskDates, setMPUTaskDates] = useState({});
  const [QuietCoolTaskDates, setQuietCoolTaskDates] = useState({});
  const [InsulationTaskDates, setInsulationTaskDates] = useState({});
  const [RoofTaskDates, setRoofTaskDates] = useState({});
  const [ServiceTaskDates, setServiceTaskDates] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [ppwFinal, setPPWFinal] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [dealsError, setDealsError] = useState(null);




    // Function to update stages
    const updateStages = (data) => {
      console.log("Updating stages with data:", data);
      setTaskDates({
        saleDate: data.saleDate ? data.saleDate.replace(/^"|"$/g, '') : null,
        welcomeDate: data.welcomeDate ? data.welcomeDate.replace(/^"|"$/g, '') : null,
        siteSurveyDate: data.siteSurveyDate ? data.siteSurveyDate.replace(/^"|"$/g, '') : null,
        NTPDate: data.NTPDate && data.NTPDate !== "\"\"" ? data.NTPDate.replace(/^"|"$/g, '') : null,
        QcChecDate: data.QcChecDate && data.QcChecDate !== "\"\"" ? data.QcChecDate.replace(/^"|"$/g, '') : null,
        plansReceived: data.plansReceived && data.plansReceived !== "\"\"" ? data.plansReceived.replace(/^"|"$/g, '') : null,
        fdacp: data.fdacp && data.fdacp !== "\"\"" ? data.fdacp.replace(/^"|"$/g, '') : null,
        
        FLADate: data.FLADate && data.FLADate !== "\"\"" ? data.FLADate.replace(/^"|"$/g, '') : null,
        SolarPermitDate: data.SolarPermitDate && data.SolarPermitDate !== "\"\"" ? data.SolarPermitDate.replace(/^"|"$/g, '') : null,
        solarInstallDate: data.solarInstallDate && data.solarInstallDate !== "\"\"" ? data.solarInstallDate.replace(/^"|"$/g, '') : null,
        FIDate: data.FIDate && data.FIDate !== "\"\"" ? data.FIDate.replace(/^"|"$/g, '') : null,
        PTODate: data.PTODate && data.PTODate !== "\"\"" ? data.PTODate.replace(/^"|"$/g, '') : null,
      });
  
      setBatteryTaskDates({
        batteryPermitDate: data.batteryPermitDate ? data.batteryPermitDate.replace(/^"|"$/g, '') : null,
        batteryApprovalDate: data.batteryApprovalDate ? data.batteryApprovalDate.replace(/^"|"$/g, '') : null,
        orderBatteryDate: data.OrderBatteryDate ? data.OrderBatteryDate.replace(/^"|"$/g, '') : null,
        BatteryinstallDate: data.BatteryinstallDate && data.BatteryinstallDate !== "\"\"" ? data.BatteryinstallDate.replace(/^"|"$/g, '') : null,
        FireInspectionDate: data.FireInspectionDate && data.FireInspectionDate !== "\"\"" ? data.FireInspectionDate.replace(/^"|"$/g, '') : null,
      });
  
      setHVACTaskDates({
        HVACSaleDate: data.HVACSaleDate && data.HVACSaleDate !== "\"\"" ? data.HVACSaleDate.replace(/^"|"$/g, '') : null,
        HVACInstallDate: data.HVACInstallDate && data.HVACInstallDate !== "\"\"" ? data.HVACInstallDate.replace(/^"|"$/g, '') : null,
        HVACPermitDate: data.HVACPermitDate && data.HVACPermitDate !== "\"\"" ? data.HVACPermitDate.replace(/^"|"$/g, '') : null,
      });
  
      setMPUTaskDates({
        MeterspotDate: data.MeterspotDate && data.MeterspotDate !== "\"\"" ? data.MeterspotDate.replace(/^"|"$/g, '') : null,
        MPUPermitDate: data.MPUPermitDate && data.MPUPermitDate !== "\"\"" ? data.MPUPermitDate.replace(/^"|"$/g, '') : null,
        MPUInstallDate: data.MPUPInstallDate && data.MPUPInstallDate !== "\"\"" ? data.MPUPInstallDate.replace(/^"|"$/g, '') : null,
        MPUInspectionDate: data.MPUInspectionDate && data.MPUInspectionDate !== "\"\"" ? data.MPUInspectionDate.replace(/^"|"$/g, '') : null,
      });
  
      setQuietCoolTaskDates({
        QuietCoolDate: data.QuietCoolDate && data.QuietCoolDate !== "\"\"" ? data.QuietCoolDate.replace(/^"|"$/g, '') : null,
      });
  
      setInsulationTaskDates({
        InsulationDate: data.InsulationDate && data.InsulationDate !== "\"\"" ? data.InsulationDate.replace(/^"|"$/g, '') : null,
      });
  
      setRoofTaskDates({
        RoofPermitDate: data.RoofPermitDate && data.RoofPermitDate !== "\"\"" ? data.RoofPermitDate.replace(/^"|"$/g, '') : null,
        RoofInstallDate: data.RoofInstallDate && data.RoofInstallDate !== "\"\"" ? data.RoofInstallDate.replace(/^"|"$/g, '') : null,
        RoofInspectionDate: data.RoofInspectionDate && data.RoofInspectionDate !== "\"\"" ? data.RoofInspectionDate.replace(/^"|"$/g, '') : null,
        RoofColorSelectionDate: data.RoofColorSelectionDate && data.RoofColorSelectionDate !== "\"\"" ? data.RoofColorSelectionDate.replace(/^"|"$/g, '') : null,
      });
  
      setServiceTaskDates({
        ServiceInspectionDate: data.ServiceInspectionDate && data.ServiceInspectionDate !== "\"\"" ? data.ServiceInspectionDate.replace(/^"|"$/g, '') : null,
        ServiceDate: data.ServiceDate && data.ServiceDate !== "\"\"" ? data.ServiceDate.replace(/^"|"$/g, '') : null,
        PlansServiceDate: data.PlansServiceDate && data.PlansServiceDate !== "\"\"" ? data.PlansServiceDate.replace(/^"|"$/g, '') : null,
        FinalInspectionServiceDate: data.FinalInspectionServiceDate && data.FinalInspectionServiceDate !== "\"\"" ? data.FinalInspectionServiceDate.replace(/^"|"$/g, '') : null,
        PTOServiceDate: data.PTOServiceDate && data.PTOServiceDate !== "\"\"" ? data.PTOServiceDate.replace(/^"|"$/g, '') : null,
        PartnerSubmissionDate: data.PartnerSubmissionDate && data.PartnerSubmissionDate !== "\"\"" ? data.PartnerSubmissionDate.replace(/^"|"$/g, '') : null,
        InvoiceSerivceDate: data.InvoiceSerivceDate && data.InvoiceSerivceDate !== "\"\"" ? data.InvoiceSerivceDate.replace(/^"|"$/g, '') : null,
        InvoiceInspectionDate: data.InvoiceInspectionDate && data.InvoiceInspectionDate !== "\"\"" ? data.InvoiceInspectionDate.replace(/^"|"$/g, '') : null,
        InvoicePTODate: data.InvoicePTODate && data.InvoicePTODate !== "\"\"" ? data.InvoicePTODate.replace(/^"|"$/g, '') : null,
        FDACPServiceDate: data.FDACPServiceDate && data.FDACPServiceDate !== "\"\"" ? data.FDACPServiceDate.replace(/^"|"$/g, '') : null,
        ServicePackageSubmittedDate: data.ServicePackageSubmittedDate && data.ServicePackageSubmittedDate !== "\"\"" ? data.ServicePackageSubmittedDate.replace(/^"|"$/g, '') : null,
      });
    };
  



  const handleOpenMessageModal = () => setMessageModalOpen(true);
  const handleCloseMessageModal = () => {
    setMessageModalOpen(false);
    setSelectedUser([]);
    setFiles([]);
    setFileUrls([]);
    setUploadProgress({});
  };

  const submitNewMessage = async ({ Message, relatedProject, TaggedUsers, from }) => {
    const API_ENDPOINT = "https://api.quickbase.com/v1/records";
    const headers = {
      Authorization: "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3",
      "QB-Realm-Hostname": "voltaic.quickbase.com",
      "Content-Type": "application/json",
    };

    const requestBody = {
      to: "br5cqr42m",
      data: [{
        6: { value: Message },
        26: { value: relatedProject },
        61: { value: 'Project Manager' },
        62: { value: TaggedUsers },
        82: { value: from },
        83: { value: fileUrls[0] || null },
        84: { value: fileUrls[1] || null },
        85: { value: fileUrls[2] || null },
        86: { value: fileUrls[3] || null }
      }]
    };

    try {
      await axios.post(API_ENDPOINT, requestBody, { headers });
      setMessageText('');
      setMessageModalOpen(false);
      setSelectedUser([]);
      setFiles([]);
      setFileUrls([]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const preUri = `images/utility${uuidv4()}.jpg`;
      const pathReference = ref(getStorage(), preUri);

      uploadBytes(pathReference, file).then(() => {
        getDownloadURL(ref(getStorage(), preUri)).then((url) => setFileUrls((prev) => [...prev, url]));
      }).catch(error => console.error("Upload error:", error));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSendMessage = async () => {
    const taggedUserEmails = selectedUser.map(user => user.email).join('; ');
    try {
      await submitNewMessage({ Message: messageText, relatedProject: id, TaggedUsers: taggedUserEmails, from: UserData?.name });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  useEffect(() => {
    if (UserData) {
      fetch(`${baseURL}/auth/crmDeal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId: id || '3613' })
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.success && responseData.data) {
            const parsedData = responseData.data;
            setHomeownerData(parsedData.homeownerName.replace(/^"|"$/g, '') || 'Loading...');
            setPhoneData(parsedData.saleDate || 'Loading...');
            setFinancing(parsedData.financing || 'Loading...');
            setProducts(parsedData.products.replace(/^"|"$/g, '') || 'Loading...');
            setProgress(parsedData.progress ? parseFloat(parsedData.progress.replace('%', '')) : 0);
            setEmailData(parsedData.email.replace(/^"|"$/g, '') || 'Loading...');
            setAddressData(parsedData.address.replace(/^"|"$/g, '') || 'Loading...');
            setContractAmount(parsedData.contractAmount || 'Loading...');
            setAddersTotal(parsedData.addersTotal || 'Loading...');
            setDealerFee(parsedData.dealerFee || 'Loading...');
            setPPWFinal(parsedData.ppwFinal || 'Loading...');
            setInstaller(parsedData.installer);
            setStatus(parsedData.status || 'Loading...');
            setAddersData(parsedData.vcadders || []);
            setMessageData(parsedData.vcmessages || []);
            setPayroll(parsedData.vccommissions || []);
            setLoading(false);
            updateStages(parsedData);
          }
        })
        .catch(error => {
          console.error('API Error:', error);
          setDealsError(error);
          setLoading(false);
        });
    }
  }, [id, UserData]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (dealsError) {
    return <p>Error loading data: {dealsError.message}</p>;
  }

  return (
    <Grid container spacing={2} sx={{ overflow: 'hidden', padding: 2 }}>
      <Grid item xs={12}>
        <Box sx={{ position: 'relative', width: '100%', display: 'inline-flex', alignItems: 'center' }}>
          <LinearProgress variant="determinate" value={progress * 100} sx={{ width: '100%', height: 20, borderRadius: 2 }} />
          <Typography variant="body2" color="textSecondary" sx={{ position: 'absolute', width: '100%', textAlign: 'center' }}>
            {`${Math.round(progress * 100)}%`}
          </Typography>
        </Box>
      </Grid>

      {status !== 'Active' && (
        <div style={styles.stickyBanner}>Project Status: {status}</div>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, margin: 2, backgroundColor: status === 'Active' ? 'lightgreen' : 'red' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'whitesmoke' }}>Homeowner Details</Typography>
            <List>
              <ListItem>
                <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
                <ListItemText primary={homeownerData} secondary="Homeowner Name" />
              </ListItem>
              <ListItem>
                <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
                <ListItemText primary={addressData} secondary="Address" />
              </ListItem>
              <ListItem>
                <ListItemIcon><EmailIcon color="primary" /></ListItemIcon>
                <ListItemText primary={emailData} secondary="Email" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Economics Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, margin: 2, backgroundColor: status === 'Active' ? 'lightgreen' : 'red' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'whitesmoke' }}>Economics</Typography>
            <List>
              <ListItem>
                <ListItemText primary={financing} secondary="Financing" />
              </ListItem>
              <ListItem>
                <ListItemText primary={`$ ${addersTotal}`} secondary="Adders Total" />
              </ListItem>
              <ListItem>
                <ListItemText primary={`$ ${dealerFee}`} secondary="Dealer Fee" />
              </ListItem>
              <ListItem>
                <ListItemText primary={`$ ${contractAmount}`} secondary="Contract Amount" />
              </ListItem>
              <ListItem>
                <ListItemText primary={`$ ${ppwFinal}`} secondary="PPW Final" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Products Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, margin: 2, backgroundColor: status === 'Active' ? 'lightgreen' : 'red' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'whitesmoke' }}>Products</Typography>
            <List>
              <ListItem>
                <ListItemText primary={products} secondary="Products" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Grid item xs={12} md={8}>
        <div style={{ minHeight: '100px', maxHeight: '400px', overflowY: 'auto' }}>
          {products.includes("Solar") && (
            <MainStepper activeStep={activeStep} taskDates={taskDates} financing={financing} />
          )}
          {products.includes("Battery") && (
            <BatteryStepper activeStep={activeStep} taskDates={BatteryTaskDates} financing={financing} />
          )}
          {products.includes("HVAC") && (
            <HvacStepper activeStep={activeStep} taskDates={HVACTaskDates} financing={financing} />
          )}
          {products.includes("MPU") && (
            <MPUStepper activeStep={activeStep} taskDates={MPUTaskDates} financing={financing} />
          )}
          {products.includes("Quiet Cool") && (
            <QuietCoolStepper activeStep={activeStep} taskDates={QuietCoolTaskDates} financing={financing} />
          )}
          {products.includes("Insulation") && (
            <InsulationStepper activeStep={activeStep} taskDates={InsulationTaskDates} financing={financing} />
          )}
          {products.includes("Roof") && (
            <RoofStepper activeStep={activeStep} taskDates={RoofTaskDates} financing={financing} />
          )}
          {products.includes("Service") && (
            <ServiceStepper activeStep={activeStep} taskDates={ServiceTaskDates} financing={financing} />
          )}
        </div>

        {/* Payroll Section */}
        <Grid item sx={{ p: 2, backgroundColor: 'whitesmoke', borderRadius: 2, mt: 2 }}>
          <Typography variant="h6" sx={{ color: 'brown', fontWeight: 'bold' }}>Payroll</Typography>
          {payrollData.map((payrollItem) => (
            <PayrollCard key={payrollItem.id} data={payrollItem} getItem={null} />
          ))}
        </Grid>

        {/* Adders Section */}
        <Grid item sx={{ p: 2, backgroundColor: 'whitesmoke', borderRadius: 2, mt: 2 }}>
          <Typography variant="h6" sx={{ color: 'brown', fontWeight: 'bold' }}>Adders</Typography>
          {addersData.map((adder) => (
            <AddersCard key={adder.id} data={adder} getItem={null} />
          ))}
        </Grid>

        {/* Messages Section */}
        <Grid item sx={{ p: 2, backgroundColor: 'whitesmoke', borderRadius: 2, mt: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" sx={{ color: 'brown', fontWeight: 'bold' }}>Messages</Typography>
            <Button onClick={handleOpenMessageModal} sx={{ backgroundColor: 'blue', color: 'white' }}>Add Message</Button>
          </Box>
          {messageData.map((msg) => (
            <Card key={msg.id} data={msg} from={msg.from} />
          ))}
        </Grid>

        {/* Message Modal */}
        <Dialog open={isMessageModalOpen} onClose={handleCloseMessageModal}>
          <DialogTitle>New Message</DialogTitle>
          <DialogContent>
            <DialogContentText>To send a message, please enter your message here.</DialogContentText>
            <TextField fullWidth margin="dense" label="Message" value={messageText} onChange={(e) => setMessageText(e.target.value)} />
            <Autocomplete multiple id="tags-outlined" options={users} getOptionLabel={(option) => option.email} filterSelectedOptions value={selectedUser} onChange={(event, newValue) => setSelectedUser(newValue)} renderInput={(params) => <TextField {...params} label="Tag Users" />} />
            <section {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </section>
            <aside>
              <ul>{fileUrls.map((url, index) => <li key={index}><InsertDriveFileIcon /><a href={url} target="_blank" rel="noopener noreferrer">{url.slice(0, 20) + '...'}</a></li>)}</ul>
            </aside>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMessageModal}>Cancel</Button>
            <Button onClick={handleSendMessage}>Send</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default LeadDetailPage;

const AddersCard = ({ data }) => (
  <Box sx={{ boxShadow: '0px 0px 10px #e3e3e3', marginTop: '16px', padding: '16px', cursor: 'pointer' }}>
    <Typography variant="subtitle2">{data.description || ' '}</Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Status: {data.status}</Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Price: $ {data.price}</Typography>
  </Box>
);

const Card = ({ data, from }) => (
  <Box sx={{ boxShadow: '0px 0px 10px #e3e3e3', marginTop: '16px', padding: '16px', cursor: 'pointer' }}>
    <Typography sx={{color: 'black'}} variant="subtitle2">{from.replace(/^"|"$/g, '')} :</Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{data.text.replace(/^"|"$/g, '')}</Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{data.createdAt.replace(/^"|"$/g, '')}</Typography>
  </Box>
);

const PayrollCard = ({ data }) => (
  <Box sx={{ boxShadow: '0px 0px 10px #e3e3e3', marginTop: '16px', padding: '16px', cursor: 'pointer' }}>
    <Typography variant="subtitle2">{data.milestone}</Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>User: {data.user}</Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Amount: {data.amount}</Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Status: {data.status}</Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Date Paid: {data.datePaid}</Typography>
  </Box>
);













































// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Grid,
//   Dialog,
//   Button,
//   IconButton,
//   TextField,
//   Autocomplete,
//   Box,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Avatar,
//   Tooltip,
//   Zoom,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   Stepper,
//   Step,
//   CircularProgress,
//   ListItemIcon,
//   StepLabel,
//   LinearProgress
// } from '@mui/material';
// import { v4 as uuidv4 } from "uuid";
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import moment from 'moment';
// import { useAppDispatch } from '../hooks/hooks';
// import { useDropzone } from 'react-dropzone'; // Add this import
// import { useParams } from 'react-router-dom';
// import EmailIcon from '@mui/icons-material/Email';
// import PersonIcon from '@mui/icons-material/Person';
// import  MainStepper from '../components/MainStepper';
// import BatteryStepper from '../components/BatteryStepper';
// import HvacStepper from '../components/HVACStepper';
// import MPUStepper from '../components/MPUStepper';
// import QuietCoolStepper from '../components/QuietCoolStepper';
// import InsulationStepper from '../components/InsulationStepper';
// import RoofStepper from '../components/RoofStepper';
// import ServiceStepper from '../components/ServiceStepper';
// // Import Timeline components if they are from MUI
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineDot from '@mui/lab/TimelineDot';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import { useAppSelector } from '../hooks/hooks';
// import { authSelector } from '../redux/slice/authSlice';
// import { baseURL } from '../libs/client/apiClient';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from '../API/firebase';
// import axios from 'axios';


// const LeadDetailPage = () => {

//   const styles = {
//     stickyBanner: {
//       position: 'sticky',
//       top: 0,
//       width: '100%',
//       backgroundColor: 'red',
//       color: 'white',
//       textAlign: 'center',
//       padding: '10px',
//       zIndex: 1000,
//       fontSize: '20px',
//       fontWeight: 'bold'
//     }
//   };

//   //User object
//   const UserData = useAppSelector(authSelector)?.data;
//   const userName = UserData?.name;


//   // State for the message modal and message text
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState([]);
//   const [isMessageModalOpen, setMessageModalOpen] = useState(false);
//   const [messageText, setMessageText] = useState('');
//   const [files, setFiles] = useState([]);
//   const [fileUrls, setFileUrls] = useState([]);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const submitNewMessage= async ({
//     Message,
//     relatedProject,
//     TaggedUsers,
//     from
  
//   }) => {
//     const QB_DOMAIN = "voltaic.quickbase.com";
//     const API_ENDPOINT = "https://api.quickbase.com/v1/records";
    
//     const headers = {
//       Authorization: "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3",
//       "QB-Realm-Hostname": QB_DOMAIN,
//       "Content-Type": "application/json",
//     };
  
//     const requestBody = {
//       to: "br5cqr42m", // Table identifier in Quickbase
//       data: [{
//         6: { value: Message},
//         26: { value: relatedProject },
//          61: { value: 'Project Manager'},
//          62: { value: TaggedUsers},
//          82: { value: from},
//          83: { value: fileUrls[0]?fileUrls[0]: null},
//          84: { value: fileUrls[1]?fileUrls[1]: null},
//          85: { value: fileUrls[2]?fileUrls[2]: null},
//          86: { value: fileUrls[3]?fileUrls[3]: null}
//       }],
//       fieldsToReturn: [] // Specify fields to return, if any
//     };
  
//     try {
//       const response = await axios.post(API_ENDPOINT, requestBody, { headers });
//       console.log("Success!", response.data);
//     //  return response.data; // You can modify what to return based on your needs
//     } catch (error) {
//       console.error("Failed to send data:", error);
//       throw error; // Rethrow or handle error as needed
//     }
//   };
  

//   const stepLabels = [
//     { label: 'New Sale', key: 'saleDate' },
//     { label: 'Welcome Call', key: 'welcomeDate' },
//     { label: 'Site Survey', key: 'siteSurveyDate' },
//     { label: 'NTP', key: 'NTPDate' },
//     { label: 'QC Check', key: 'QcChecDate' },
//     { label: 'Plans', key: 'plansReceived' },
//     { label: 'FLA', key: 'FLADate' },
//     { label: 'Solar Permit', key: 'SolarPermitDate' },
//     { label: 'Solar Install', key: 'solarInstallDate' },
//     { label: 'Final Inspection', key: 'FIDate' },
//     { label: 'PTO', key: 'PTODate' },
//     // { label: 'Complete', key: 'completeDate' }
//   ];




//   // State to hold the task dates
//   const [taskDates, setTaskDates] = useState({});




//   const [BatteryTaskDates, setBatteryTaskDates] = useState({});
//   const [HVACTaskDates, setHVACTaskDates] = useState({});
//   const [MPUTaskDates, setMPUTaskDates] = useState({});
//   const [QuietCoolTaskDates, setQuietCoolTaskDates] = useState({});
//   const [InsulationTaskDates, setInsulationTaskDates] = useState({});
//   const [RoofTaskDates, setRoofTaskDates] = useState({});
//   const [ServiceTaskDates, setServiceTaskDates] = useState({});

//   // User redux object
//   //update prod
//   const { Projectdata } = useAppSelector(authSelector);
//   const recordId = Projectdata?.recordID;

//   const { id } = useParams();

//   const [data, setData] = useState(null);
//   const [isLoading, setLoading] = useState(true);
//   const [dealsError, setDealsError] = useState(null);
  

//   // Sample hardcoded call data
//   const sampleCalls = [
//     { id: 1, type: 'call', body: 'Note', createdAt: new Date().toString() }
//     // ... (more sample calls)
//   ];
//   const sampleNotes = [
//     { id: 1, type: 'note', text: 'Note', createdAt: new Date().toString() }
//     // ... (more sample calls)
//   ];
//   const sampleMessages = [
//     { id: 1, type: 'message', text: 'Test Account needs to have John Symons set as leadgen. Thanks.', createdAt: new Date().toString() },

//     {
//       id: 2,
//       type: 'message',
//       text: 'Welcome call was a bit rough. Could not get a hold of the homeowner.',
//       createdAt: new Date().toString()
//     },

//     {
//       id: 3,
//       type: 'message',
//       text: 'Hello Team New Sunnova deal has been processed. Dom please add John Symons as the lead gen here. Thank you! NTP Submitted. Site Survey scheduled on Thursday, 11/9 at 12 Nn. Welcome Call was completed by Lisa. Welcome email was sent. VC Email Beryl Loughlin',
//       createdAt: new Date().toString()
//     }
//     // ... (more sample calls)
//   ];

//   const hardcodedData = {
//     lead: {
//       homeownerName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       phone: '123-456-7890',
//       address: '123 Main st',
//       description: 'Description here...',
//       categoriesList: ['Category 1', 'Category 2'],
//       tagsList: ['Tag 1', 'Tag 2']
//     },
//     calls: [], // Add actual call data here
//     emails: [], // Add actual email data here
//     texts: [], // Add actual text data here
//     notes: [], // Add actual notes data here
//     voiceCalls: [], // Add actual voice call data here
//     taskTypes: [] // Add actual task type data here
//   };

//   const [homeownerData, setHomeownerData] = useState(null);


//   const [ppwFinal, setPPWFinal] = useState(null);

//   const [status, setStatus] = useState(null)
//   const [products, setProducts] = useState(null)
//   const [progress, setProgress] = useState(null)
//   const [dealerFee, setDealerFee] = useState(null);
//   const [contractAmount, setContractAmount] = useState(null);
//   const [addersTotal, setAddersTotal] = useState(null);
//   const [installer, setInstaller] = useState(null);
//   const [financing, setFinancing] = useState(null);
  

//   const [stage, setStage] = useState(null);
//   const [phoneData, setPhoneData] = useState(null);
//   const [emailData, setEmailData] = useState(null);
//   const [addressData, setAddressData] = useState(null);
//   const [messageData, setMessageData] = useState([]);
//   const [addersData, setAddersData] = useState([]);

//   const [payrollData, setPayroll] = useState([]);
  
//   const [activeStep, setActiveStep] = useState(0);

//   // Function to handle opening the message modal
//   const handleOpenMessageModal = () => {
//     // alert("opening message modal")
//     setMessageModalOpen(true);
//   };

//   // Function to handle closing the message modal
//   const handleCloseMessageModal = () => {
//     setMessageModalOpen(false);
//     setSelectedUser([]);
//     setFiles([]);
//     setFileUrls([]);
//     setUploadProgress({});
//   };

//   // Function to handle sending the message
//   // const handleSendMessage = () => {
//   //   console.log('Message to send:', messageText);
//   //   console.log('recordiD', id)


//   //   submitNewMessage({ Message: messageText, relatedProject: id });

//   //   // Here you would typically handle the message sending logic, e.g., an API call
//   //   // Resetting the message text and closing the modal
//   //   setMessageText('');
//   //   setMessageModalOpen(false);






//   const handleFileUpload = async (file) => {
//     const fileRef = ref(storage, `messages/${file.name}`);
//     const uploadTask = uploadBytes(fileRef, file);
    
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));
//       },
//       (error) => {
//         console.error('File upload error:', error);
//       },
//       async () => {
//         const downloadUrl = await getDownloadURL(fileRef);
//         setFileUrls((prev) => [...prev, downloadUrl]);
//       }
//     );
//   };


    
//   // };
//   const onDrop = useCallback((acceptedFiles) => {

//     const file = acceptedFiles[0];
//     if (file) {
//       const preUri = "images/utility" + uuidv4() + ".jpg";
//       const pathReference = ref(storage, preUri);
//       uploadBytes(pathReference, file, {
//         onProgress: (snapshot) => {
//           const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
//         },
//       }).then(() => {
//         const httpsReference = ref(storage, "https://firebasestorage.googleapis.com/v0/b/voltaic-383203.appspot.com/o/" + encodeURIComponent(preUri));
//         getDownloadURL(httpsReference).then((url) => {
//           setFileUrls((prev) => [...prev, url]);
         
//         });
//       }).catch(error => {
 
//         console.error("Upload error:", error);
//       });
//     }
//   }, []);
  
//   const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
 

//   const handleSendMessage = async () => {
//     console.log('Message to send:', messageText);
//     console.log('recordID', id);


//     if (!selectedUser) {
//       // alert('Please select a user');
//       // return;
//       console.log("No User Set")
//     }else{ 
//       console.log('Sending message to:', selectedUser.email, 'Message:', messageText);

//     }

  
//      // Extract emails from the selected users
//      const taggedUserEmails = selectedUser.map(user => user.email).join('; '); // Join emails with semicolon and space



//     try {



//      // Message text here....
//      console.log(messageText)
       
//         // Make the API call to send the message
//         const response = await submitNewMessage({ Message: messageText, relatedProject: id , TaggedUsers: taggedUserEmails, from: UserData?.name});
//         console.log('Message sent successfully:', response);

//         // Optionally update the message with real data returned from the backend if necessary
//         // setMessageData(prevMessages => prevMessages.map(msg => msg.id === newMessage.id ? { ...msg, ...updatedDataFromResponse } : msg));

//         setMessageText(''); // Clear the message input
//         setMessageModalOpen(false); // Close the modal
//         setSelectedUser([]); // Reset the selected users

//         setFiles([]);
//         setFileUrls([]);
//     } catch (error) {
//         console.error('Failed to send message:', error);
//         // Handle the error, e.g., by removing the optimistic message or showing an error message
//        // setMessageData(prevMessages => prevMessages.filter(msg => msg.id !== newMessage.id));
//     }
// };


//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   //details

//   const updateStages = (data) => {
//     console.log("Updating stages with data:", data);
//     setTaskDates({
//       saleDate: data.saleDate ? data.saleDate.replace(/^"|"$/g, '') : null,
//       welcomeDate: data.welcomeDate ? data.welcomeDate.replace(/^"|"$/g, '') : null,
//       siteSurveyDate: data.siteSurveyDate ? data.siteSurveyDate.replace(/^"|"$/g, '') : null,
//       NTPDate: data.NTPDate && data.NTPDate !== "\"\"" ? data.NTPDate.replace(/^"|"$/g, '') : null,
//       QcChecDate: data.QcChecDate && data.QcChecDate !== "\"\"" ? data.QcChecDate.replace(/^"|"$/g, '') : null,
//       plansReceived: data.plansReceived && data.plansReceived !== "\"\"" ? data.plansReceived.replace(/^"|"$/g, '') : null,
//       FLADate: data.FLADate && data.FLADate !== "\"\"" ? data.FLADate.replace(/^"|"$/g, '') : null,
//       SolarPermitDate: data.SolarPermitDate && data.SolarPermitDate !== "\"\"" ? data.SolarPermitDate.replace(/^"|"$/g, '') : null,
//       solarInstallDate: data.solarInstallDate && data.solarInstallDate !== "\"\"" ? data.solarInstallDate.replace(/^"|"$/g, '') : null,
//       FIDate: data.FIDate && data.FIDate !== "\"\"" ? data.FIDate.replace(/^"|"$/g, '') : null,
//       PTODate: data.PTODate && data.PTODate !== "\"\"" ? data.PTODate.replace(/^"|"$/g, '') : null,
//       //completeDate: data.PTODate && data.PTODate !== "\"\"" ? data.PTODate.replace(/^"|"$/g, '') : null,  // Assume no completion date available
//     });




//     setBatteryTaskDates({
//       batteryPermitDate: data.batteryPermitDate ? data.batteryPermitDate.replace(/^"|"$/g, '') : null,
//       batteryApprovalDate: data.batteryApprovalDate ? data.batteryApprovalDate.replace(/^"|"$/g, '') : null,
//       orderBatteryDate: data.OrderBatteryDate ? data.OrderBatteryDate.replace(/^"|"$/g, '') : null,
//       BatteryinstallDate: data.BatteryinstallDate && data.BatteryinstallDate !== "\"\"" ? data.BatteryinstallDate.replace(/^"|"$/g, '') : null,
//       FireInspectionDate: data.FireInspectionDate && data.FireInspectionDate !== "\"\"" ? data.FireInspectionDate.replace(/^"|"$/g, '') : null,
     
  
  
     

     
     
//       //completeDate: data.PTODate && data.PTODate !== "\"\"" ? data.PTODate.replace(/^"|"$/g, '') : null,  // Assume no completion date available
//     });

//     setHVACTaskDates({
    
//       HVACSaleDate: data.HVACSaleDate && data.HVACSaleDate !== "\"\"" ? data.HVACSaleDate.replace(/^"|"$/g, '') : null,
//       HVACInstallDate: data.HVACInstallDate && data.HVACInstallDate !== "\"\"" ? data.HVACInstallDate.replace(/^"|"$/g, '') : null,
//       HVACPermitDate: data.HVACPermitDate && data.HVACPermitDate !== "\"\"" ? data.HVACPermitDate.replace(/^"|"$/g, '') : null,
     

//     })
//     setMPUTaskDates({

//       MeterspotDate: data.MeterspotDate && data.MeterspotDate !== "\"\"" ? data.MeterspotDate.replace(/^"|"$/g, '') : null,
//       MPUPermitDate: data.MPUPermitDate && data.MPUPermitDate !== "\"\"" ? data.MPUPermitDate.replace(/^"|"$/g, '') : null,
//       MPUInstallDate: data.MPUPInstallDate && data.MPUPInstallDate !== "\"\"" ? data.MPUPInstallDate.replace(/^"|"$/g, '') : null,
//       MPUInspectionDate: data.MPUInspectionDate && data.MPUInspectionDate !== "\"\"" ? data.MPUInspectionDate.replace(/^"|"$/g, '') : null,
     
//     })

//     setQuietCoolTaskDates({
//       QuietCoolDate: data.QuietCoolDate && data.QuietCoolDate !== "\"\"" ? data.QuietCoolDate.replace(/^"|"$/g, '') : null,
      
//     })

//     setInsulationTaskDates({
//         InsulationDate: data.InsulationDate && data.InsulationDate !== "\"\"" ? data.InsulationDate.replace(/^"|"$/g, '') : null,
     
//     })

//     setRoofTaskDates({

//       RoofPermitDate: data.RoofPermitDate && data.RoofPermitDate !== "\"\"" ? data.RoofPermitDate.replace(/^"|"$/g, '') : null,
//       RoofInstallDate: data.RoofInstallDate && data.RoofInstallDate !== "\"\"" ? data.RoofInstallDate.replace(/^"|"$/g, '') : null,
//       RoofInspectionDate: data.RoofInspectionDate && data.RoofInspectionDate !== "\"\"" ? data.RoofInspectionDate.replace(/^"|"$/g, '') : null,
//       RoofColorSelectionDate: data.RoofColorSelectionDate && data.RoofColorSelectionDate !== "\"\"" ? data.RoofColorSelectionDate.replace(/^"|"$/g, '') : null,
    
    

//     })

//     setServiceTaskDates({

//       ServiceInspectionDate: data.ServiceInspectionDate && data.ServiceInspectionDate !== "\"\"" ? data.ServiceInspectionDate.replace(/^"|"$/g, '') : null,
//       ServiceDate: data.ServiceDate && data.ServiceDate !== "\"\"" ? data.ServiceDate.replace(/^"|"$/g, '') : null,
//       PlansServiceDate: data.PlansServiceDate && data.PlansServiceDate !== "\"\"" ? data.PlansServiceDate.replace(/^"|"$/g, '') : null,
//       FinalInspectionServiceDate: data.FinalInspectionServiceDate && data.FinalInspectionServiceDate !== "\"\"" ? data.FinalInspectionServiceDate.replace(/^"|"$/g, '') : null,
//       PTOServiceDate: data.PTOServiceDate && data.PTOServiceDate !== "\"\"" ? data.PTOServiceDate.replace(/^"|"$/g, '') : null,
//       PartnerSubmissionDate: data.PartnerSubmissionDate && data.PartnerSubmissionDate !== "\"\"" ? data.PartnerSubmissionDate.replace(/^"|"$/g, '') : null,
//       InvoiceSerivceDate: data.InvoiceSerivceDate && data.InvoiceSerivceDate !== "\"\"" ? data.InvoiceSerivceDate.replace(/^"|"$/g, '') : null,
//       InvoiceInspectionDate: data.InvoiceInspectionDate && data.InvoiceInspectionDate !== "\"\"" ? data.InvoiceInspectionDate.replace(/^"|"$/g, '') : null,
//       InvoicePTODate: data.InvoicePTODate && data.InvoicePTODate !== "\"\"" ? data.InvoicePTODate.replace(/^"|"$/g, '') : null,
//       InvoiceSerivceDate: data.InvoiceSerivceDate && data.InvoiceSerivceDate !== "\"\"" ? data.InvoiceSerivceDate.replace(/^"|"$/g, '') : null,
//       FDACPServiceDate: data.FDACPServiceDate && data.FDACPServiceDate !== "\"\"" ? data.FDACPServiceDate.replace(/^"|"$/g, '') : null,
//       ServicePackageSubmittedDate: data.ServicePackageSubmittedDate && data.ServicePackageSubmittedDate !== "\"\"" ? data.ServicePackageSubmittedDate.replace(/^"|"$/g, '') : null,
     
//     })


//   }


  
//   useEffect(() => {
//     if (financing === 'Sunnova') {
//       stepLabels.splice(3, 0, { label: 'Submit NTP at Permit Submit by Design', key: 'permitSubmitDate' });
//     }
//   }, [financing]);

  
//   useEffect(() => {
//     const fetchCRMUsers = async () => {
//       const API_URL = "https://api.quickbase.com/v1/records/query";
//       const USER_TOKEN = "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3";
//       const QB_DOMAIN = "voltaic.quickbase.com";

//       const requestBody = {
//         from: "br5cqr4wu",
//         where: "({53.EX.'Active'})",
        
//         sortBy: [
//           { fieldId: 12, order: "ASC" },
//           { fieldId: 1049, order: "ASC" },
//           { fieldId: 52, order: "ASC" },
//           { fieldId: 10, order: "ASC" },
//           { fieldId: 602, order: "ASC" },
//         ],
//         groupBy: [
//           { fieldId: 12, grouping: "equal-values" },
//           { fieldId: 53, grouping: "equal-values" },
//           { fieldId: 1049, grouping: "equal-values" },
//           { fieldId: 10, grouping: "equal-values" },
//           { fieldId: 602, grouping: "equal-values" },
//         ],
//         options: { skip: 0, top: 0, compareWithAppLocalTime: false },
//       };

//       const headers = {
//         Authorization: USER_TOKEN,
//         "QB-Realm-Hostname": QB_DOMAIN,
//         "Content-Type": "application/json",
//       };

//       try {
//         const response = await axios.post(API_URL, requestBody, { headers });
//         if (response.data && response.data.data) {
//           const activeUsers = response.data.data
//             .filter((user) => user['53'] && user['53'].value === 'Active') // Filter for 'isLeft' users
//             .map((user) => ({
//               id: user['6'] && user['6'].value, // If '6' is the ID field, it should be a string in quotes
//               name: user['12'] ? user['12'].value.trim() : 'No Name', // .trim() is used to remove whitespace
//               email: user['10'] ? user['10'].value : 'No Email',
//             }));
//           setUsers(activeUsers);
//         }
//       } catch (error) {
//         console.error('Failed to fetch users:', error);
//       }
//     };

//     fetchCRMUsers();
//   }, []);




//   useEffect(() => {
//     if (UserData) {
//       console.log('UserData in LeadDetailPage:', UserData);

//       fetch(`${baseURL}/auth/crmDeal`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ recordId: id ? id : '3613' })
//       })
//         .then((response) => response.json())
//         .then((responseData) => {
//           console.log('API Response:', responseData);
//           if (responseData.success && responseData.data) {
//             const homeownerInfo = responseData.data.homeownerName ? responseData.data.homeownerName.replace(/^"|"$/g, '') : 'Loading...';
//             const phoneInfo = responseData.data.saleDate ? responseData.data.saleDate.replace(/^"|"$/g, '') : 'Loading...';
//             const financing = responseData.data.financing ? responseData.data.financing.replace(/^"|"$/g, '') : 'Loading...';
//             const stage = responseData.data.stage ? responseData.data.stage.replace(/^"|"$/g, '') : 'Loading...';
//             const products = responseData.data.products ? responseData.data.products.replace(/^"|"$/g, '') : 'Loading...';
//             const progress = responseData.data.progress ? responseData.data.progress.replace(/^"|"$/g, '') : 'Loading...';
  
//             const emailInfo = responseData.data.email ? responseData.data.email.replace(/^"|"$/g, '') : 'Loading...';
//             const addressInfo = responseData.data.address ? responseData.data.address.replace(/^"|"$/g, '') : 'Loading...';
//             const messageInfo = responseData.data.vcmessages ? responseData.data.vcmessages : [];

//             const payrollItems = responseData.data.vccommissions ? responseData.data.vccommissions : [];
//             const projectStatus = responseData.data.status ? responseData.data.status.replace(/^"|"$/g, '') : 'Loading...';

//             const contractAmount = responseData.data.contractAmount ? responseData.data.contractAmount.replace(/^"|"$/g, '') : 'Loading...';
//             const adderTotal = responseData.data.addersTotal ? responseData.data.addersTotal.replace(/^"|"$/g, '') : 'Loading...';
//             const installer = responseData.data.installer ? responseData.data.installer.replace(/^"|"$/g, '') : 'Loading...';
//             const dealerFee = responseData.data.dealerFee ? responseData.data.dealerFee.replace(/^"|"$/g, '') : 'Loading...';
//             const ppwFinal = responseData.data.ppwFinal ? responseData.data.ppwFinal.replace(/^"|"$/g, '') : 'Loading...';





//             const messagesArray = messageInfo
//   .map((message) => ({
//     id: message.id,
//     from: message.from.replace(/^"|"$/g, ''),
//     type: 'message',
//     text: message.text.replace(/^"|"$/g, ''),
//     createdAt: new Date(message.createdAt.replace(/^"|"$/g, '')) // Store as Date object for sorting
//   }))
//   .sort((a, b) => b.createdAt - a.createdAt) // Sort by createdAt in descending order
//   .map((message) => ({
//     ...message,
//     createdAt: message.createdAt.toLocaleString('en-US', {
//       month: '2-digit',
//       day: '2-digit',
//       year: '2-digit',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//       hourCycle: 'h12'
//     })
//   }));

//             if (responseData.success) {
//               console.log("Received data for stages update:", responseData.data);
//               updateStages(responseData.data);
//             }

//             const addersInfo = responseData.data.vcadders ? responseData.data.vcadders : [];
//             const addersArray = addersInfo.map((adder) => ({
//               id: adder.relatedProject,
//               description: adder.description.replace(/^"|"$/g, ''),
//               type: 'call',
//               quantity: adder.quantity,
//               price: truncateDecimals(parseFloat(adder.price), 2),
//               status: adder.status.replace(/^"|"$/g, ''),
//               billTo: adder.billTo
//             }));



//             const progressValue = parseFloat(progress.replace('%', ''));
//             setProgress(progressValue);
      
//             setContractAmount(contractAmount);
//             setFinancing(financing)
//             setAddersTotal(adderTotal);





//             const payrollInfo = payrollItems.map((payrollItem) => ({
//               id: payrollItem.relatedProject.replace(/^"|"$/g, ''),
//               user: payrollItem.user.replace(/^"|"$/g, ''),
//               type:  payrollItem.itemType.replace(/^"|"$/g, ''),
//               status: payrollItem.status.replace(/^"|"$/g, ''),
//               milestone: payrollItem.milestone.replace(/^"|"$/g, ''),
//               datePaid: payrollItem.datePaid.replace(/^"|"$/g, ''),
//               amount: payrollItem.amount.replace(/^"|"$/g, ''),
//               paidBy: payrollItem.paidBy.replace(/^"|"$/g, ''),
//             }));


//             setPayroll(payrollInfo)
//             setInstaller(installer);
//             setDealerFee(dealerFee);
//             setProducts(products);
//             setPPWFinal(ppwFinal);
//             setStatus(projectStatus)
//             setLoading(false);



            
//             setAddersData(addersArray);
//             setMessageData(messagesArray);

//             setHomeownerData(String(homeownerInfo));
//             setPhoneData(phoneInfo);
//             setEmailData(emailInfo);
//             setAddressData(addressInfo);

//             console.log('homeowner name', homeownerInfo);
//           }
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('API Error:', error);
//           setDealsError(error);
//           setLoading(false);
//         });
//     }
//   }, [id, UserData]);


//   function truncateDecimals(number, decimalPlaces) {
//     const multiplier = Math.pow(10, decimalPlaces);
//     return Math.floor(number * multiplier) / multiplier;
//   }

//   // State for UI control
//   const [description, setDescription] = useState(hardcodedData.lead.description);
//   const [open, setOpen] = useState(false);
//   const [taskOpen, setTaskOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [isMessageModal, setIsMessageModal] = useState(false);
//   const [confirmCall, setConfirmCall] = useState(false);
//   const [singleNoteModal, setSingleNoteModal] = useState(false);
//   const [emailOpen, setEmailOpen] = useState(false);
//   const [typeData, setTypeData] = useState(hardcodedData.taskTypes);
//   const [addType, setAddType] = useState(false);
//   const [type, setType] = useState('');
//   const [formData, setFormData] = useState({
//     contactId: '',
//     firstName: '',
//     lastName: '',
//     notes: '',
//     buyerAgent: '',
//     listingAgent: ''
//   });
//   const [value, setValue] = useState({
//     title: '',
//     note: '',
//     date: ''
//   });

//   // Handlers for UI interactions
//   const handleClose = () => setOpen(false);
//   const getSelected = (item) => {
//     setSelectedItem(item);
//     setOpen(true);
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setValue({ ...value, [name]: value });
//   };

//   // Placeholder functions for actions
//   const handleCall = () => console.log('Simulate call action');
//   const handleInputChange = (e) => setDescription(e.target.value);
//   const handleSubmit = () => console.log('Simulate submit action');


 
//   if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (dealsError) {
//     return <p>Error loading data: {dealsError.message}</p>;
//   }



//   return (


//     <Grid container spacing={2} sx={{ overflow: 'hidden', padding: 2 }}>
//  <Grid item xs={12}>
//         <Box sx={{ position: 'relative', width: '100%', display: 'inline-flex', alignItems: 'center' }}>
//           <LinearProgress variant="determinate" value={progress * 100} sx={{ width: '100%', height: 20, borderRadius: 2 }} />
//           <Typography
//             variant="body2"
//             color="textSecondary"
//             sx={{ position: 'absolute', width: '100%', textAlign: 'center' }}
//           >
//             {`${Math.round(progress * 100)}%`}
//           </Typography>
//         </Box>
//       </Grid>




//           {/* Sticky Banner */}
//     {status !== 'Active' && (
//       <div style={styles.stickyBanner}>
//         Project Status: {status}
//       </div>
//     )}


//       {/* Profile and general project details */}
//       {/* Main Content Grid */}
//       <Grid container spacing={2}>
//         {/* Top-left Paper Box */}


//        <Grid item xs={12} md={4}>
//        <Paper elevation={3} sx={{ p: 2, margin: 2, backgroundColor: status === 'Active' ? 'lightgreen' : 'red' }}>
//    <Typography variant="h6" gutterBottom sx={{color : 'whitesmoke'}}>
//             Homeowner Details
//           </Typography>
//           <List sx={{ padding: 0 }}>
//             <ListItem sx={{ paddingY: 1, alignItems: 'flex-start' }}>
//               <ListItemIcon sx={{ minWidth: '40px' }}>
//                 <PersonIcon color="primary" />
//               </ListItemIcon>
//               <ListItemText primary={homeownerData !== null ? homeownerData : 'Loading...'} secondary="Homeowner Name" primaryTypographyProps={{ variant: 'body1', style: { marginBottom: '4px' } }} secondaryTypographyProps={{ variant: 'caption' }} />
//             </ListItem>

      
//             <ListItem sx={{ paddingY: 1, alignItems: 'flex-start' }}>
//               <ListItemIcon sx={{ minWidth: '40px' }}>
//                 <PersonIcon color="primary" />
//               </ListItemIcon>
//               <ListItemText primary={addressData !== null ? addressData : 'Loading...'} secondary="Address" primaryTypographyProps={{ variant: 'body1', style: { marginBottom: '4px' } }} secondaryTypographyProps={{ variant: 'caption' }} />
//             </ListItem>
//             <ListItem sx={{ paddingY: 1, alignItems: 'flex-start' }}>
//               <ListItemIcon sx={{ minWidth: '40px' }}>
//                 <EmailIcon color="primary" />
//               </ListItemIcon>
//               <ListItemText primary={emailData !== null ? emailData : 'Loading...'} secondary="Email" primaryTypographyProps={{ variant: 'body1', style: { marginBottom: '4px' } }} secondaryTypographyProps={{ variant: 'caption' }} />
//             </ListItem>
//           </List>
//         </Paper>
//       </Grid>


//       <Grid item xs={12} md={4}>
//         <Paper elevation={3} sx={{ p: 2, margin: 2, backgroundColor: status === 'Active' ? 'lightgreen' : 'red', color : 'whitesmoke' }}>
//           <Typography variant="h6" gutterBottom>
//             Economics
//           </Typography>
//           <List sx={{ padding: 0 , color:'black'}}>



//           <ListItem sx={{ paddingY: 1, alignItems: 'flex-start' }}>
//               <ListItemIcon sx={{ minWidth: '40px' }}>
           
//               </ListItemIcon>
//               <ListItemText primary={dealerFee !== null ?""+ financing : 'Loading...'} secondary="Financing" primaryTypographyProps={{ variant: 'body1', style: { marginBottom: '4px' } }} secondaryTypographyProps={{ variant: 'caption' }} />
//             </ListItem>


//             {/* <ListItem sx={{ paddingY: 1, alignItems: 'flex-start' }}>
//               <ListItemIcon sx={{ minWidth: '40px' }}>
//               </ListItemIcon>
//               <ListItemText primary={installer !== null ? installer : 'Loading...'} secondary="Project Installer" primaryTypographyProps={{ variant: 'body1', style: { marginBottom: '4px' , fontWeight: 250} }} secondaryTypographyProps={{ variant: 'caption' }} />
//             </ListItem> */}




//             <ListItem sx={{ paddingY: 1, alignItems: 'flex-start' }}>
//               <ListItemIcon sx={{ minWidth: '40px' }}>
           
//               </ListItemIcon>
//               <ListItemText primary={addersTotal !== null ? "$ "+ addersTotal : 'Loading...'} secondary="Adders Total" primaryTypographyProps={{ variant: 'body1', style: { marginBottom: '4px' } }} secondaryTypographyProps={{ variant: 'caption' }} />
//             </ListItem>
//             <ListItem sx={{ paddingY: 1, alignItems: 'flex-start' }}>
//               <ListItemIcon sx={{ minWidth: '40px' }}>
           
//               </ListItemIcon>
//               <ListItemText primary={dealerFee !== null ?"$ "+ dealerFee : 'Loading...'} secondary="Dealer Fee" primaryTypographyProps={{ variant: 'body1', style: { marginBottom: '4px' } }} secondaryTypographyProps={{ variant: 'caption' }} />
//             </ListItem>



            
//             <ListItem sx={{ paddingY: 1, alignItems: 'flex-start' }}>
//               <ListItemIcon sx={{ minWidth: '40px' }}>
               
//               </ListItemIcon>
//               <ListItemText primary={contractAmount !== null ? "$ "+contractAmount : 'Loading...'} secondary="Contract Amount" primaryTypographyProps={{ variant: 'body1', style: { marginBottom: '4px' } }} secondaryTypographyProps={{ variant: 'caption' }} />
//             </ListItem>
//             <ListItem sx={{ paddingY: 1, alignItems: 'flex-start' }}>
//               <ListItemIcon sx={{ minWidth: '40px' }}>
     
//               </ListItemIcon>
//               <ListItemText primary={ppwFinal !== null ?"$ "+ ppwFinal : 'Loading...'} secondary="PPW FInal" primaryTypographyProps={{ variant: 'body1', style: { marginBottom: '4px' } }} secondaryTypographyProps={{ variant: 'caption' }} />
//             </ListItem>
      



//           </List>
//         </Paper>
     
     
     
     
     
     
//       </Grid>

//       <Grid item xs={12} md={4}>
//         <Paper elevation={3} sx={{ p: 2, margin: 2, backgroundColor: status === 'Active' ? 'lightgreen' : 'red', color : 'whitesmoke' }}>
//           <Typography variant="h6" gutterBottom>
//             Products
//           </Typography>
//           <List sx={{ padding: 0 , color:'black'}}>



//           <ListItem sx={{ paddingY: 1, alignItems: 'flex-start' }}>
//               <ListItemIcon sx={{ minWidth: '40px' }}>
           
//               </ListItemIcon>
//               <ListItemText primary={products !== null ?""+ products : 'Loading...'} secondary="Products" primaryTypographyProps={{ variant: 'body1', style: { marginBottom: '4px' } }} secondaryTypographyProps={{ variant: 'caption' }} />
//             </ListItem>


//             {/* <ListItem sx={{ paddingY: 1, alignItems: 'flex-start' }}>
//               <ListItemIcon sx={{ minWidth: '40px' }}>
//               </ListItemIcon>
//               <ListItemText primary={installer !== null ? installer : 'Loading...'} secondary="Project Installer" primaryTypographyProps={{ variant: 'body1', style: { marginBottom: '4px' , fontWeight: 250} }} secondaryTypographyProps={{ variant: 'caption' }} />
//             </ListItem> */}




       
      



//           </List>
//         </Paper>
     
     
     
     
     
     
//       </Grid>

//         {/* Left side: Horizontal Stepper */}
//         <Grid item xs={12} md={8}>
//           <div
//             style={{  minHeight: '100px', maxHeight: '400px', overflowY: 'auto', scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
//           >










// <div>
//             {products.includes("Solar") && (
//                 <MainStepper activeStep={activeStep} taskDates={taskDates} financing={financing} />
//             )}
//             {products.includes("Battery") && (
//                 <BatteryStepper activeStep={activeStep} taskDates={BatteryTaskDates} financing={financing} />
//             )}
//             {products.includes("HVAC") && (
//                 <HvacStepper activeStep={activeStep} taskDates={HVACTaskDates} financing={financing} />
//             )}
//             {products.includes("MPU") && (
//                 <MPUStepper activeStep={activeStep} taskDates={MPUTaskDates} financing={financing} />
//             )}
//             {products.includes("Quiet Cool") && (
//                 <QuietCoolStepper activeStep={activeStep} taskDates={QuietCoolTaskDates} financing={financing} />
//             )}
//             {products.includes("Insulation") && (
//                 <InsulationStepper activeStep={activeStep} taskDates={InsulationTaskDates} financing={financing} />
//             )}
//             {products.includes("Roof") && (
//                 <RoofStepper activeStep={activeStep} taskDates={RoofTaskDates} financing={financing} />
//             )}
//             {products.includes("Service") && (
//                 <ServiceStepper activeStep={activeStep} taskDates={ServiceTaskDates} financing={financing} />
//             )}
//         </div>

// {/* <MainStepper activeStep={activeStep} taskDates={taskDates} financing={financing} />
//      */}



//           </div>

//           <Grid sx={{ p: 2, backgroundColor: 'none' }} container direction="column" spacing={2}>
            
//                {/* Payroll */}
//                <Grid item sx={{ p: 2, backgroundColor: 'none', marginTop: 2, marginLeft: 2 ,backgroundColor: 'whitesmoke' , borderRadius: 2}} container direction="column" spacing={2} >
//               <h4 style={{ margin: 0, fontWeight: 'bold', color: 'brown' }}>Payroll</h4>
//               {payrollData !== null ? (
//                 payrollData.map((payrollItem) => (
//                   <PayrollCard key={payrollItem.id} data={payrollItem} text={payrollItem.id} getItem={getSelected} type={'note'} />
//                 ))
//               ) : (
//                 <p>Loading...</p>
//               )}
//             </Grid>

            
            
            
            
//             {/* Adders */}
//             <Grid item sx={{ p: 2, backgroundColor: 'none', marginTop: 2, marginLeft: 2 ,backgroundColor: 'whitesmoke' , borderRadius: 2}} container direction="column" spacing={2} >
//               <h4 style={{ margin: 0, fontWeight: 'bold', color: 'brown' }}>Adders</h4>
//               {addersData !== null ? (
//                 addersData.map((adder) => (
//                   <AddersCard key={adder.id} data={adder} text={adder.text} getItem={getSelected} type={adder.type} />
//                 ))
//               ) : (
//                 <p>Loading...</p>
//               )}
//             </Grid>

//             {/* Messages */}
//             <Grid item sx={{ p: 2, backgroundColor: 'none', marginTop: 2, marginLeft: 2, backgroundColor: 'whitesmoke' , borderRadius: 2 }} container direction="column" spacing={2} >


//             <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//     <h4 style={{ margin: 0, fontWeight: 'bold', color: 'brown' }}>Messages</h4>
//       {/* Button to open the message modal */}
//       <Button onClick={handleOpenMessageModal} style={{ backgroundColor: 'blue', color: 'white', padding: '8px 15px', fontSize: '16px', borderRadius: '5px' }}>Add Message</Button>

//       {/* Message Modal Dialog */}


//       <Dialog open={isMessageModalOpen} onClose={handleCloseMessageModal}>
//         <DialogTitle>New Message</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To send a message, please enter your message here.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="message"
//             label="Message"
//             type="text"
//             fullWidth
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//           />
//           <Autocomplete
//             multiple
//             id="tags-outlined"
//             options={users}
//             getOptionLabel={(option) => option.email}
//             filterSelectedOptions
//             value={selectedUser}
//             onChange={(event, newValue) => setSelectedUser(newValue)}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 variant="outlined"
//                 label="Tag Users"
//                 placeholder="Add users"
//               />
//             )}
//           />
//           <section className="container">
//             <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center' , marginTop: '20px'}}>
//               <input {...getInputProps()} />
//               <p style={{border: '2px'}}>Drag 'n' drop some files here, or click to select files</p>
        
        
//             </div>
//             <aside>
//               <h4>Files</h4>
//               <ul>
//   {fileUrls.slice(0, 10).map((url, index) => (
//     <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
//       <InsertDriveFileIcon style={{ marginRight: '8px' }} />
//       <a href={url} target="_blank" rel="noopener noreferrer">
//         {url.slice(0, 20) + '...'}
//       </a>
//     </li>
//   ))}
// </ul>


//             </aside>
//           </section>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseMessageModal}>Cancel</Button>
//           <Button onClick={handleSendMessage}>Send</Button>
//         </DialogActions>
//       </Dialog>

// </Box>

              
//               {messageData !== null ? (
//                 messageData.map((msg) => (
//                   <Card key={msg.id} data={msg} text={msg.text} from={msg.from} getItem={getSelected} type={msg.type} />
//                 ))
//               ) : (
//                 <p>Loading...</p>
//               )}
//             </Grid>



//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default LeadDetailPage;

// const AddersCard = ({ data, getItem, type, leadName }) => {
//   return (
//     <Box sx={{ boxShadow: '0px 0px 10px #e3e3e3', marginTop: '16px', padding: '16px', cursor: 'pointer' }} onClick={() => getItem(data)}>
  
//       <Box sx={{ display: 'flex', gap: '8px' }}>
//         <TimelineSeparator>
//           <TimelineDot
//             sx={{ margin: '6px 0' }}
//             color={
//               // disable eslint
//               // eslint-disable-next-line no-nested-ternary
//               type === 'note' ? 'primary' : type === 'call' ? 'success' : type === 'note' ? 'info' : type === 'message' ? 'secondary' : ''
//             }
//           />
//           <TimelineConnector />
//         </TimelineSeparator>
//         <Box>
//           <Typography variant="subtitle2">{data?.description || ' '}</Typography>
//           <Box display="flex" flexDirection="column">
//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               {/* {data?.note || data?.message || data?.text || data?.description} */}
//               Status: {data?.status && data.status.length > 500 ? data.status.slice(0, 40) + '...' : data.status}
//               {/* {data?.createdAt ? fDateTime(new Date(1685299278395).getTime()) : fDateTime(new Date().getTime())} */}
//             </Typography>

//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               {/* {data?.note || data?.message || data?.text || data?.description} */}
//               Price: $ {data?.price && data.price}
//               {/* {data?.createdAt ? fDateTime(new Date(1685299278395).getTime()) : fDateTime(new Date().getTime())} */}
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// const Card = ({ data, getItem, type, leadName, from }) => {
//   return (
//     <Box sx={{ boxShadow: '0px 0px 10px #e3e3e3', marginTop: '16px', padding: '16px', cursor: 'pointer' }} onClick={() => getItem(data)}>
//       <Box sx={{ display: 'flex', gap: '8px' }}>
//         <TimelineSeparator>
//           <TimelineDot
//             sx={{ margin: '6px 0' }}
//             color={
//               // disable eslint
//               // eslint-disable-next-line no-nested-ternary
//               type === 'note' ? 'primary' : type === 'call' ? 'success' : type === 'note' ? 'info' : type === 'message' ? 'secondary' : ''
//             }
//           />
//           <TimelineConnector />
//         </TimelineSeparator>
//         <Box>
//           <Typography variant="subtitle2">{data?.FirstName || leadName}</Typography>
//           <Box display="flex" flexDirection="column">
//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               {/* {data?.note || data?.message || data?.text || data?.description} */}
//               From: {data?.from && data.from.length > 500 ? data.from.slice(0, 40) + '...' : data.from}
//               {/* {data?.createdAt ? fDateTime(new Date(1685299278395).getTime()) : fDateTime(new Date().getTime())} */}
//             </Typography>
//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               {/* {data?.note || data?.message || data?.text || data?.description} */}
//               {data?.text && data.text.length > 500 ? data.text.slice(0, 40) + '...' : data.text}
//               {/* {data?.createdAt ? fDateTime(new Date(1685299278395).getTime()) : fDateTime(new Date().getTime())} */}
//             </Typography>
//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               {/* {data?.note || data?.message || data?.text || data?.description} */}
//               {data?.createdAt && data.createdAt}
//               {/* {data?.createdAt ? fDateTime(new Date(1685299278395).getTime()) : fDateTime(new Date().getTime())} */}
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// const PayrollCard = ({ data, getItem, type, leadName }) => {
//   return (
//     <Box sx={{ boxShadow: '0px 0px 10px #e3e3e3', marginTop: '16px', padding: '16px', cursor: 'pointer' }} onClick={() => getItem(data)}>
//       <Box sx={{ display: 'flex', gap: '8px' }}>
//         <TimelineSeparator>
//           <TimelineDot
//             sx={{ margin: '6px 0' }}
//             color={type === 'note' ? 'primary' : type === 'call' ? 'success' : type === 'message' ? 'secondary' : ''}
//           />
//           <TimelineConnector />
//         </TimelineSeparator>
//         <Box>
//           <Typography variant="subtitle2">{data?.FirstName || leadName}</Typography>
//           <Box display="flex" flexDirection="column">
//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               Milestone: {data?.milestone && data.milestone.length > 500 ? data.milestone.slice(0, 40) + '...' : data.milestone}
//             </Typography>

//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               Type: {data?.itemType && data.type.length > 500 ? data.type.slice(0, 40) + '...' : data.type}
//             </Typography>

//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               User Name: {data?.user && data.user.length > 500 ? data.id.slice(0, 40) + '...' : data.user}
//             </Typography>
            
//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               Amount: {data?.amount && data.amount.length > 500 ? data.amount.slice(0, 40) + '...' : data.amount}
//             </Typography>
            
//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               Status: {data?.status && data.status.length > 500 ? data.status.slice(0, 40) + '...' : data.status}
//             </Typography>

            
//             <Typography variant="caption" sx={{ color: 'text.secondary' }}>
//               Date Paid: {data?.datePaid && data.datePaid.length > 500 ? data.datePaid.slice(0, 40) + '...' : data.datePaid}
//             </Typography>
            
            

//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };
