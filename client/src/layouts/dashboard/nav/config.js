// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Deals',
    path: '/dashboard/deals',
    icon: icon('ic_cart')
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

export default navConfig;
