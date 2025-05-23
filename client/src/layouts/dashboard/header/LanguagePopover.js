import { useState } from 'react';

import {
  IconButton,


  Stack,
} from '@chakra-ui/react';

import { Box, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

import { transparentize } from '@chakra-ui/theme-tools';




const LANGS = [
  {
    value: 'en',
    label: 'CRM',
    icon: '/assets/Statuses/crm.png',
  },
  {
    value: 'de',
    label: 'Website',
    icon: '/assets/Statuses/website.png',
  },
];

export default function LanguagePopover() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };




  return (
    <>
      <IconButton
        onClick={handleOpen}


        p={0}
        w="44px"
        h="44px"

        bg={anchorEl ? (theme) => transparentize(theme.colors.primary[500], 0.12) : undefined}

      >
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}

        open={Boolean(anchorEl)}


        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { p: 1, mt: 1.5, ml: 0.75, width: 180 } }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (


            <MenuItem key={option.value} onClick={handleClose} disabled={option.value === LANGS[0].value}>
              <Box as="img" alt={option.label} src={option.icon} w={28} mr={2} />


              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
}
