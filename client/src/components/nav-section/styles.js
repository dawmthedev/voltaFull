import { styled } from '@mui/material/styles';

export const StyledNavItem = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '48px',
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.grey[600],
  borderRadius: theme.shape.borderRadius,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export const StyledNavItemIcon = styled('div')(({ theme }) => ({
  width: '22px',
  height: '22px',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
}));
