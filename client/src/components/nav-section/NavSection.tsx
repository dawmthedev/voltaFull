import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { authSelector } from '../../redux/slice/authSlice';
import { useAppSelector } from '../../hooks/hooks';
import React, { ReactNode } from 'react';

interface NavItemData {
  title: string;
  path: string;
  icon?: ReactNode;
  info?: ReactNode;
  isSuperAdmin?: boolean;
}

interface NavSectionProps {
  data?: NavItemData[];
  [key: string]: any;
}

export default function NavSection({ data = [], ...other }: NavSectionProps) {
  const { data: loginData } = useAppSelector(authSelector);
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => {
          if (item.isSuperAdmin && !loginData?.isSuperAdmin) return null;
          return <NavItem key={item.title} item={item} />;
        })}
      </List>
    </Box>
  );
}

function NavItem({ item }: { item: NavItemData }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold'
        }
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
