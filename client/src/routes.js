import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import LoginPage from './pages/LoginPage';
import BlankDashboard from './pages/BlankDashboard';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [{ index: true, element: <BlankDashboard /> }]
    },
    { path: '/login', element: <LoginPage /> },
    {
      element: <SimpleLayout />,
      children: [
        { index: true, element: <Navigate to="/login" replace /> },
        { path: '*', element: <Navigate to="/login" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/login" replace /> }
  ]);

  return routes;
}
