import React from "react";
import { Avatar, Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import { useAppSelector } from "../store";

const UserAvatar: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);

  if (!user) {
    return (
      <Flex align="center" px={2} gap={2}>
        <Avatar size="sm" />
        <Box display={{ base: 'none', md: 'block' }}>
          <Text fontWeight="medium">Loading...</Text>
          <Text fontSize="xs" color="gray.500">&nbsp;</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Tooltip label={`${user.name} (${user.role})`} placement="left" hasArrow>
      <Flex align="center" px={2} gap={2}>
        <Avatar
          name={user.name}
          src={
            user.avatarUrl ||
            'https://api.dicebear.com/7.x/thumbs/svg?seed=voltauser'
          }
          borderRadius="10px"
          size="sm"
        />
        <Box lineHeight="short" display={{ base: 'none', md: 'block' }}>
          <Text fontWeight="medium">{user.name || 'N/A'}</Text>
          <Text fontSize="xs" color="gray.500">{user.role || 'N/A'}</Text>
        </Box>
      </Flex>
    </Tooltip>
  );
};

export default UserAvatar;
