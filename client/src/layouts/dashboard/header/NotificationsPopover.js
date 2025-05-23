import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Box, Badge, IconButton, Popover, Typography, List, ListItem, ListItemText, Divider, Tooltip } from '@mui/material';
import Iconify from '../../../components/iconify';

const mockNotifications = [...Array(3)].map(() => ({
  id: faker.datatype.uuid(),
  title: 'New notification',
  description: 'You have a new message',
  createdAt: new Date(),
}));

export default function NotificationsPopover() {
  const [open, setOpen] = useState(null);
  const [notifications, setNotifications] = useState(mockNotifications);

  const totalUnRead = notifications.length;

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications([]);
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { mt: 1.5, ml: 0.75, width: 360 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>
          {totalUnRead > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <List disablePadding>
          {notifications.map((notification) => (
            <ListItem key={notification.id} button>
              <ListItemText
                primary={notification.title}
                secondary={notification.description}
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}
