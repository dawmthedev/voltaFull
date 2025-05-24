import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DealsPage from './pages/DealsPage';
import LeadDetailPage from './pages/LeadDetailPage';
import CalendarPage from './pages/CalendarPage';

import RegisterPage from './pages/RegisterPage';


export default function Router() {
  let session = document.cookie.split(';').find((item) => item.includes('session'));
  session = session ? session.split('=')[1] : null;
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: session ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: [
        { index: true, element: <Navigate to="/dashboard/deals" /> },
        { path: 'deals', element: <DealsPage /> },

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
        { element: <Navigate to="/login" />, index: true },
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
