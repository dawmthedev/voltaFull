import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { authSelector } from '../redux/slice/authSlice';

// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates
} from '../sections/@dashboard/app';
import { baseURL } from '../libs/client/apiClient';

// ----------------------------------------------------------------------

export default function VCDashboardAppPage() {
  const boxStyle = {
    display: 'flex',
    flexDirection: 'column', // Set the flex direction to column
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    margin: 0,
    padding: 0
  };

  const paperStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    textAlign: 'center' // Center text within Paper
  };

  // const paperStyle = { display: 'flex',
  // flexDirection: 'column', // Set the flex direction to column
  // justifyContent: 'center',
  // alignItems: 'center',
  // height: '100%',
  // width:' 100%',
  // margin: 0,
  // padding: 0,}

  const theme = useTheme();
  const data = useAppSelector(authSelector);

  const [AHJTimelineData, setData] = useState([]);

  const [DealsData, setDealsData] = useState([]);

  const [DealsAvgTimelineData, setDealsAvgData] = useState([]);

  const [AhjKeys, setAhjKeys] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [payError, setPayError] = useState(null);

  const fetchAhjTimelineData = async () => {
    try {
      const response = await fetch(`${baseURL}/auth/crmAHJTimelines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ repId: '00000' })
      });

      const responseData = await response.json();

      if (responseData && responseData.data && responseData.data.timeline) {
        const formattedArray = responseData.data.timeline.map((item) => ({
          name: item.AHJ.replace(/"/g, ''),
          data: [
            parseFloat(item.saleStage) || 0,
            parseFloat(item.welcometage) || 0,
            parseFloat(item.sstage) || 0,
            parseFloat(item.ntpstage) || 0,
            parseFloat(item.qcStage) || 0,
            parseFloat(item.planStage) || 0,
            parseFloat(item.flatage) || 0,
            parseFloat(item.permitStage) || 0,
            parseFloat(item.installStage) || 0,
            parseFloat(item.inspectStage) || 0
          ]
        }));

        setData(formattedArray);
      }

      setLoading(false);
    } catch (error) {
      setPayError(error);
      setLoading(false);
    }
  };

  const fetchDealsData = async () => {
    try {
      const response = await fetch(`${baseURL}/auth/crmDealsGlobal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recordId: '7777' })
      });

      const responseData = await response.json();

      if (responseData && responseData.data && responseData.data.deals) {
        const financingTypes = ['Sunnova', 'Enium', 'Cash'];

        // Initialize data structure
        const monthlyData = financingTypes.map((financingType) => ({
          name: financingType,
          type: 'column', // Change the type as needed
          fill: 'solid', // Change the fill as needed
          data: Array(12).fill(0) // Initialize an array for each month
        }));

        responseData.data.deals.forEach((item) => {
          const saleDate = new Date(item.saleDate);
          const month = saleDate.getMonth();
          const year = saleDate.getFullYear();
          const financingType = item.financing.replace(/"/g, ''); // Remove double quotes

          const index = financingTypes.indexOf(financingType);
          if (index !== -1) {
            monthlyData[index].data[month] += 1;
          }
        });

        const chartData = monthlyData.map((item) => ({
          name: item.name,
          type: item.type,
          fill: item.fill,
          data: item.data
        }));

        console.log(chartData);
        setDealsData(chartData);
      }

      setLoading(false);
    } catch (error) {
      setPayError(error);
      setLoading(false);
    }
  };
  const fetchDealsAvgData = async () => {
    try {
      const response = await fetch(`${baseURL}/auth/crmAvgTimelines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ repId: '7777' })
      });

      const responseData = await response.json();

      if (responseData && responseData.data && responseData.data.timeline) {
        const timeline = responseData.data.timeline;

        const chartData = Object.entries(timeline).map(([label, value]) => ({
          label,
          value: parseFloat(value) || 0
        }));

        console.log(chartData);
        setDealsAvgData(chartData);
      }

      setLoading(false);
    } catch (error) {
      setPayError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAhjTimelineData();
    fetchDealsData();
    fetchDealsAvgData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | Voltaic </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={0} sx={{ height: '80vh', backgroundColor: 'purple', textAlign: 'center' }}>
          {/* Column 1 */}
          <Grid item xs={12} md={4} sx={{ backgroundColor: 'blue', height: '100%', ...boxStyle }}>
            {/* Box 1 (100% Height) */}
            <Grid container spacing={3} sx={{ backgroundColor: 'green', height: '100%', ...boxStyle }}>
              <Grid item xs={12} sx={paperStyle}>
                <Paper sx={paperStyle}>
                  <Typography variant="h4" color="black">
                    1
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} md={4} sx={{ backgroundColor: 'green', height: '100%', ...boxStyle }}>
            {/* Box 2 (50% Height) */}
            <Grid container spacing={3} sx={{ backgroundColor: 'purple', height: '50%', ...boxStyle }}>
              <Grid item xs={12} sx={paperStyle}>
                <Paper sx={paperStyle}>
                  <Typography variant="h4" color="black">
                    2
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Box 3 (50% Height) */}
            <Grid container spacing={3} sx={{ backgroundColor: 'pink', height: '50%', ...boxStyle }}>
              <Grid item xs={12} sx={paperStyle}>
                <Paper sx={paperStyle}>
                  <Typography variant="h4" color="black">
                    3
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} md={4} sx={{ backgroundColor: 'blue', height: '100%', ...boxStyle }}>
            {/* Box 4 (40% height) */}
            <Grid container spacing={3} sx={{ height: '40%', backgroundColor: 'yellow', ...boxStyle }}>
              <Grid item xs={12} sx={paperStyle}>
                <Paper sx={paperStyle}>
                  <Typography variant="h4" color="black">
                    4
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Box 5 (60% height) */}
            <Grid container spacing={3} sx={{ height: '60%', backgroundColor: 'orange', ...boxStyle }}>
              <Grid item xs={12} sx={paperStyle}>
                <Paper sx={paperStyle}>
                  <Typography variant="h4" color="black">
                    5
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
