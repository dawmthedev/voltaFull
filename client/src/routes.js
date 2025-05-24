import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DealsPage from './pages/DealsPage';
import LeadDetailPage from './pages/LeadDetailPage';
import CalendarPage from './pages/CalendarPage';
import LandingPage from './pages/LandingPage';
import ProjectsPage from './pages/ProjectsPage';
import TechnicianAllocation from './pages/TechnicianAllocation';
import MessagingNotifications from './pages/MessagingNotifications';
import AnalyticsDashboard from './pages/AnalyticsDashboard';


import RegisterPage from './pages/RegisterPage';


export default function Router() {
  let session = document.cookie.split(';').find((item) => item.includes('session'));
  session = session ? session.split('=')[1] : null;
  const routes = useRoutes([
    {
      path: '/',
      element: session ? <Navigate to="/dashboard/deals" replace /> : <LandingPage />,
    },
    {
      path: '/dashboard',
      element: session ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: [
        { index: true, element: <Navigate to="/dashboard/deals" /> },
        { path: 'deals', element: <DealsPage /> },

        { path: 'projects', element: <ProjectsPage /> },
        { path: 'technician-allocation', element: <TechnicianAllocation /> },
        { path: 'messaging-notifications', element: <MessagingNotifications /> },
        { path: 'analytics-dashboard', element: <AnalyticsDashboard /> },

        { path: 'deals/:id', element: <LeadDetailPage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'user', element: <UserPage /> }

      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    { path: '/register', element: <RegisterPage /> },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ]);

  return routes;
}
