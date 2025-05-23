import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';

import { List, Typography, Box } from '@mui/material';

import { StyledNavItem, StyledNavItemIcon } from '../nav-section/styles';
import { useAppSelector } from '../../hooks/hooks';
import { authSelector } from '../../redux/slice/authSlice';

AdminNavSection.propTypes = {
  data: PropTypes.array,
};

export function AdminNavSection({ data = [], ...other }) {

  return (
    <Box {...other}>
      <List sx={{ p: 1 }}>
        {data.map((item) => {
          return <NavItem key={item.title} item={item} />;
        })}
      </List>
    </Box>
  );
}

AdminNavSection.propTypes = {
  data: PropTypes.array,
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

NavItem.propTypes = {
  item: PropTypes.object,
};
