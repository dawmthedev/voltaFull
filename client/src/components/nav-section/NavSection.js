import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';



import { Box, List, Typography } from '@mui/material';



import { StyledNavItem, StyledNavItemIcon } from './styles';
import { useAppSelector } from '../../hooks/hooks';
import { authSelector } from '../../redux/slice/authSlice';

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const { data: loginData } = useAppSelector(authSelector);

  return (
    <Box {...other}>
      <List sx={{ p: 1 }}>
        {data.map((item) => {
          if (item.isSuperAdmin && !loginData?.isSuperAdmin) return null;
          return <NavItem key={item.title} item={item} />;
        })}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'grey.800',
          bgcolor: 'grey.100',
          fontWeight: 'bold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      <Typography>{title}</Typography>
      {info && info}
    </StyledNavItem>
  );
}
