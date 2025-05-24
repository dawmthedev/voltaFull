import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { Grid, Container, Typography } from '@mui/material';
import { useAppSelector } from '../hooks/hooks';
import { authSelector } from '../redux/slice/authSlice';

// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppTrafficBySite,
  AppWidgetSummary
} from '../sections/@dashboard/app';
import { baseURL } from '../libs/client/apiClient';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const data = useAppSelector(authSelector);

  // Previously this page fetched data for dashboard charts.
  // Those calls have been removed with the chart widgets.

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


          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Messages"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.findName(),
                description: faker.phone.phoneNumberFormat(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Hot Lead of the day"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Potential Lead',
                  'Qualified Lead',
                  'Scored Lead',
                  'Categorized Lead',
                  'Active Lead',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Follow up with Lead #1233' },
                { id: '2', label: 'Call Lead #1233' },
                { id: '3', label: 'Show Lead #1233 Property #346' },
                { id: '4', label: 'Backlog Lead #4' },
                { id: '5', label: 'Set Up Meeting' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
