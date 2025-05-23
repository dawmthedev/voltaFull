import { useState } from 'react';
import { IconButton, Menu, MenuItem, Stack, Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

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

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          width: 44,
          height: 44,
          ...(open && { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12) }),
        }}
      >
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { p: 1, mt: 1.5, ml: 0.75, width: 180 } }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              onClick={handleClose}
              disabled={option.value === LANGS[0].value}
            >
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
}
