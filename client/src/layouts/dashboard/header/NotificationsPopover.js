import { useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  Badge,
  Box,
  Divider,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  ListItem,
  Popover,
  Tooltip,

  Badge,

  useDisclosure,
} from '@chakra-ui/react';

import { Box, List, Typography } from '@mui/material';


import Iconify from '../../../components/iconify';

const mockNotifications = [...Array(3)].map(() => ({
  id: faker.datatype.uuid(),
  title: 'New notification',
  description: 'You have a new message',
  createdAt: new Date(),
}));

export default function NotificationsPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(mockNotifications);


  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const totalUnRead = notifications.length;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications([]);
  };

  return (
    <>

      <IconButton onClick={handleOpen} sx={{ width: 40, height: 40, color: anchorEl ? 'primary.main' : 'inherit' }}>
        <Badge badgeContent={totalUnRead} color="error" invisible={totalUnRead === 0}>
          <Iconify icon="eva:bell-fill" />

        </IconButton>
      </PopoverTrigger>
      <PopoverContent mt={1.5} ml={0.75} w="360px">
        <PopoverArrow />
        <PopoverBody p={0}>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>

            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>


            <Typography variant="body2" color="text.secondary">

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


        <Divider borderStyle="dashed" />
        <List sx={{ p: 0, m: 0 }}>

          {notifications.map((notification) => (
            <ListItem key={notification.id} sx={{ py: 2, px: 2, borderBottomWidth: 1, borderColor: 'divider' }}>
              <Box>


                <Typography sx={{ fontWeight: 500 }}>{notification.title}</Typography>


                <Typography variant="body2" color="text.secondary">

                  {notification.description}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}
