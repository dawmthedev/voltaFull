import React, { useState, useEffect } from 'react';

import {
  Grid, Box, Typography, Paper, List, ListItem, ListItemText,
  ListItemIcon, LinearProgress, CircularProgress
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { authSelector } from '../redux/slice/authSlice';

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
      position: 'sticky', top: 0, width: '100vw', backgroundColor: 'red',
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
  





useEffect(() => {
  setHomeownerData('John Doe');
  setAddressData('123 Main St');
  setEmailData('john@example.com');
  setProducts('Solar');
  setMessageData([{ id: 1, from: 'Admin', Message: 'Welcome!' }]);
  setLoading(false);
}, []);

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

  <Grid item xs={12}>
        <Box sx={{ position: 'relative', width: '100%', display: 'inline-flex', alignItems: 'center' }}>
        {status.replace(/^"|"$/g, '') !== 'Active' && (
        <div style={styles.stickyBanner}>Project Status: {status.replace(/^"|"$/g, '')}</div>
        
      )}
        </Box>
      </Grid>

   

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, margin: 2, backgroundColor: status.replace(/^"|"$/g, '') === 'Active' ? 'lightgreen' : 'red' }}>
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
          <Paper elevation={3} sx={{ p: 2, margin: 2, backgroundColor: status.replace(/^"|"$/g, '') === 'Active' ? 'lightgreen' : 'red' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'whitesmoke' }}>Economics</Typography>
            <List>
              <ListItem>
                <ListItemText primary={financing.replace(/^"|"$/g, '')} secondary="Financing" />
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
          <Paper elevation={3} sx={{ p: 2, margin: 2, backgroundColor: status.replace(/^"|"$/g, '') === 'Active' ? 'lightgreen' : 'red' }}>
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
          </Box>
          {messageData.map((msg) => (
            <Card key={msg.id} data={msg} from={msg.from} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LeadDetailPage;

const AddersCard = ({ data }) => (
  <Box sx={{ 
    boxShadow: '0px 0px 10px #e3e3e3', 
    marginTop: '16px', 
    padding: '16px', 
    borderRadius: '8px', // Adds rounded corners
    backgroundColor: '#fff', // Ensure background stands out
    cursor: 'pointer'
  }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: '8px', color:'black' }}>
      {data.description.replace(/^"|"$/g, '') || 'No Description Available'}
    </Typography>
    <Box sx={{ marginLeft: '16px' }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginBottom: '4px' }}>
        <strong>Status:</strong> {data.status.replace(/^"|"$/g, '') || 'N/A'}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
        <strong>Price:</strong> ${data.price || '0.00'}
      </Typography>
    </Box>
  </Box>
);



const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};


const Card = ({ data, from }) => (
  <Box sx={{
    boxShadow: '0px 0px 10px #e3e3e3',
    marginTop: '16px',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    cursor: 'pointer'
  }}>
    <Typography variant="subtitle2" sx={{ color: 'black', fontWeight: 'bold', marginBottom: '8px' }}>
      {from.replace(/^"|"$/g, '')}:
    </Typography>
    <Box sx={{ marginLeft: '16px' }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginBottom: '8px' }}>
        {(data.text || data.Message || '').replace(/["]/g, '').replace(/\r?\n|\r/g, ' ')}
      </Typography>
      {data.createdAt && (
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          <strong>Created At:</strong> {formatDate(data.createdAt.replace(/^"|"$/g, ''))}
        </Typography>
      )}
    </Box>
  </Box>
);


const PayrollCard = ({ data }) => (
  <Box sx={{ 
    boxShadow: '0px 0px 10px #e3e3e3', 
    marginTop: '16px', 
    padding: '16px', 
    borderRadius: '8px', // Adds rounded corners
    backgroundColor: '#fff', // Ensure background stands out
    cursor: 'pointer' 
  }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', marginBottom: '8px', color: 'black' }}>
      {data.milestone.replace(/^"|"$/g, '')}
    </Typography>
    <Box sx={{ marginLeft: '16px' }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginBottom: '4px' }}>
        <strong>User:</strong> {data.user.replace(/^"|"$/g, '')}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginBottom: '4px' }}>
        <strong>Amount:</strong> {data.amount.replace(/^"|"$/g, '')}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', marginBottom: '4px' }}>
        <strong>Status:</strong> {data.status.replace(/^"|"$/g, '')}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
        <strong>Date Paid:</strong> {data.datePaid.replace(/^"|"$/g, '')}
      </Typography>
    </Box>
  </Box>
);





