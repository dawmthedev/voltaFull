import { useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  ListItem,
  Divider,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notifications, setNotifications] = useState(mockNotifications);

  const totalUnRead = notifications.length;

  const handleMarkAllAsRead = () => {
    setNotifications([]);
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} placement="bottom-end">
      <PopoverTrigger>
        <IconButton onClick={onOpen} w={40} h={40} colorScheme={isOpen ? 'blue' : 'gray'}>
          {totalUnRead > 0 && (
            <Badge position="absolute" top="0" right="0" colorScheme="red">
              {totalUnRead}
            </Badge>
          )}
          <Iconify icon="eva:bell-fill" />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent mt={1.5} ml={0.75} w="360px">
        <PopoverArrow />
        <PopoverBody p={0}>
          <Box display="flex" alignItems="center" py={2} px={2.5}>
            <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Typography variant="body2" color="text.secondary">
              You have {totalUnRead} unread messages
            </Typography>
          </Box>
          {totalUnRead > 0 && (
            <Tooltip label="Mark all as read">
              <IconButton colorScheme="blue" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Divider borderStyle="dashed" />
        <List sx={{ p: 0, m: 0 }}>
          {notifications.map((notification) => (
            <ListItem key={notification.id} py={2} px={4} borderBottomWidth="1px">
              <Box>
                <Typography sx={{ fontWeight: 500 }}>{notification.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {notification.description}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
