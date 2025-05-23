import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import { Box, List } from '@mui/material';
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
      as={RouterLink}
      to={path}
      _active={{ color: 'gray.800', bg: 'gray.100', fontWeight: 'bold' }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      <Text>{title}</Text>
      {info && info}
    </StyledNavItem>
  );
}
