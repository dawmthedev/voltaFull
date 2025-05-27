import React from "react";
import { Avatar, Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import { useAppSelector } from "../store";

const UserAvatar: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return <p>Loading...</p>;

  return (
    <Tooltip label={`${user.name} (${user.role})`} placement="left" hasArrow>
      <Flex align="center" px={2} gap={2}>
        <Avatar
          name={user.name}
          src={
            user.avatarUrl ||
            "https://api.dicebear.com/7.x/thumbs/svg?seed=voltauser"
          }
          borderRadius="10px"
          size="sm"
        />
        <Box lineHeight="short">
          <Text fontSize="sm" className="font-semibold">
            {user.name}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {user.role}
          </Text>
        </Box>
      </Flex>
    </Tooltip>
  );
};

export default UserAvatar;
