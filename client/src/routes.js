import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import VerifyPage from './pages/VerifyPage';
import NonVerifiedPage from './pages/NonVerified';
import Leads from './pages/Leads';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import DynamicLead from './pages/DynamicLead';
import DealsPage from './pages/DealsPage';
import PayPage from './pages/PayPage';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'leads', element: <Leads /> },
        { path: 'pay', element: <PayPage /> },
        { path: 'deals', element: <DealsPage /> },
        { path: 'dynamic-leads', element: <DynamicLead /> }
      ]
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: 'verify',
      element: <VerifyPage />
    },
    {
      path: 'nonverified',
      element: <NonVerifiedPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    },
    {
      path: 'reset-password',
      element: <ResetPasswordPage />
    },
    {
      path: 'verify-email',
      element: <VerifyEmail />
    },
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
