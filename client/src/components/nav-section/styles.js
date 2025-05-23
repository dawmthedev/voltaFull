import { chakra } from '@chakra-ui/react';

export const StyledNavItem = chakra('a', {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    height: '48px',
    position: 'relative',
    textTransform: 'capitalize',
    color: 'gray.600',
    borderRadius: 'md',
    px: 2,
  },
});

export const StyledNavItemIcon = chakra('div', {
  baseStyle: {
    width: '22px',
    height: '22px',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mr: 2,
  },
});
