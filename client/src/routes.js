import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import NewSalePage from './pages/NewSales';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import VerifyPage from './pages/VerifyPage';
import NonVerifiedPage from './pages/NonVerified';
import Leads from './pages/Leads';
import VCDashboardAppPage from './pages/VCDash';
// import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import DynamicLead from './pages/DynamicLead';
import CompleteRegistration from './pages/CompleteRegistration';
import PayPage from './pages/PayPage';
import DealsPage from './pages/DealsPage';
import { authSelector } from './redux/slice/authSlice';
import { useAppSelector } from './hooks/hooks';
import Planner from './pages/Planner';
import LeadDetailPage from './pages/LeadDetailPage';
import DealerRates from './pages/DealerRates';
import Assistant from './pages/Assistant';
import Rookies from './pages/Rookies';
import AvailabilityPlanner from './pages/AvailabilityPlanner';
import UpcomingPayPage from './pages/UpcomingPayPge';
import PreviousPayPage from './pages/PreviousPay';
import UtilitySign from './pages/UtilitySign';
import Exam from './pages/Exam';

export default function Router() {
  const sessionCookie = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('session='));
  const session = sessionCookie ? sessionCookie.split('=')[1] : null;
  const { data } = useAppSelector(authSelector);

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: session ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: [
        {
          element: data && data?.isSuperAdmin ? <Navigate to="/dashboard/app" /> : <Navigate to="/deals" />,
          index: true
        },
        {
          path: 'app',
          element: data && data?.isSuperAdmin ? <DashboardAppPage /> : <Navigate to="/deals" replace />
        },
        {
          path: 'user',
          element: data && data?.isSuperAdmin ? <UserPage /> : <Navigate to="/deals" replace />
        },
        { path: 'vcdash', element: data && data?.isSuperAdmin ? <VCDashboardAppPage /> : <Navigate to="/deals" replace /> },

        { path: 'products', element: <ProductsPage /> },

        { path: 'utilitySign', element: <UtilitySign /> },
        { path: 'exam', element: <Exam /> },
        { path: 'assistant', element: <Assistant /> },
        { path: 'lead/:id', element: <LeadDetailPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'newSalePage', element: <NewSalePage /> },
        { path: 'leads', element: <Leads /> },
        { path: 'rookies', element: <Rookies /> },
        { path: 'dynamic-leads', element: <DynamicLead /> },
        { path: 'lead/:id', element: <LeadDetailPage /> },
        { path: 'rates', element: <DealerRates /> },
        { path: 'pay', element: <PayPage /> },
        { path: 'dynamic-leads', element: <DynamicLead /> },
        { path: 'planner', element: <Planner /> },
        { path: 'availability-planner', element: <AvailabilityPlanner /> },
        { path: 'deals', element: <DealsPage /> },
        { path: 'upcomingPay', element: <UpcomingPayPage /> },
        { path: 'lastweekPay', element: <PreviousPayPage /> }
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
      element: <CompleteRegistration />
    },
    // {
    //   path: 'register/user',
    //   element: <CompleteRegistration />
    // },
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
