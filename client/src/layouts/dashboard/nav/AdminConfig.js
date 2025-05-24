// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const AdminConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_homet')
  },
  {
    title: 'Deals',
    path: '/dashboard/deals',
    icon: icon('ic_cart')
  },
  {
    title: 'Projects',
    path: '/dashboard/projects',
    icon: icon('ic_blog')
  },
  {
    title: 'Technician Allocation',
    path: '/dashboard/technician-allocation',
    icon: icon('ic_user')
  },
  {
    title: 'Messaging & Notifications',
    path: '/dashboard/messaging-notifications',
    icon: icon('ic_blog')
  },
  {
    title: 'Analytics Dashboard',
    path: '/dashboard/analytics-dashboard',
    icon: icon('ic_analytics')
  },
  {
    title: 'Accounts Payable',
    path: '/dashboard/accounts-payable',
    icon: icon('ic_user')
  },
  {
    title: 'Admin',
    path: '/dashboard/user',
    icon: icon('ic_lock'),
    isSuperAdmin: true
  }
];

export default AdminConfig;
