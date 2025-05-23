import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui

// components
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates
} from '../sections/@dashboard/app';
import { baseURL } from '../libs/client/apiClient';
// ----------------------------------------------------------------------
export default function DashboardAppPage() {
  const theme = useTheme();
  const [AHJTimelineData, setData] = useState([]);
  const [DealsData, setDealsData] = useState([]);
  const [DealsAvgTimelineData, setDealsAvgData] = useState([]);
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
      // Data successfully loaded
    } catch (error) {
      console.error(error);
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

        setDealsData(chartData);
      }
    } catch (error) {
      console.error(error);
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
        setDealsAvgData(chartData);
      }
    } catch (error) {
      console.error(error);
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={2} icon={'ant-design:home-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Leads" total={14} color="info" icon={'ant-design:profile-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tasks" total={4} color="warning" icon={'ant-design:profile-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Messages" total={234} color="error" icon={'ant-design:profile-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Installs Month to Month"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
                '12/01/2023'
              ]}
              chartData={DealsData}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Avg Stage Duration"
              chartData={DealsAvgTimelineData}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Projects by county"
              chartData={[
                { label: 'San Diego County', value: 400 },
                { label: 'Orange County', value: 430 },
                { label: 'Riverside County', value: 448 },
                { label: 'San Bernardino County', value: 470 },
                { label: 'Imperial County', value: 540 },
                { label: 'Los Angeles County', value: 580 },
                { label: 'Ventura County', value: 690 },
                { label: 'Santa Barbara County', value: 1100 },
                { label: 'Kern County', value: 1200 },
                { label: 'San Luis Obispo County', value: 1380 }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppCurrentSubject
              title="Stage duration by AHJ "
              chartLabels={[
                'Sale Date',
                'Welcome',
                'Site Survey',
                'NTP',
                'QC Check',
                'FLA',
                'Plans',
                'Install',
                'Inspection',
                'PTO'
              ]}
              chartData={AHJTimelineData}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
