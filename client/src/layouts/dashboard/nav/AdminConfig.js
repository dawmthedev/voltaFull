// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const AdminConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic_cart')
  }
];

export default AdminConfig;
