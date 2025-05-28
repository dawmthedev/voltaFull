import React from 'react';
import {
  Flex,
  Heading,
  IconButton,
  Avatar,
  Box,
  Text,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { useAppSelector } from '../store';

interface NavbarProps {
  onOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpen }) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Flex
      as="header"
      position="sticky"
      top={0}
      zIndex="docked"
      bg="white"
      borderBottomWidth="1px"
      px={4}
      py={3}
      justify="space-between"
      align="center"
    >
      <Flex align="center" gap={2}>
        <IconButton
          display={{ base: 'inline-flex', md: 'none' }}
          aria-label="Open menu"
          icon={<FiMenu />}
          onClick={onOpen}
          variant="ghost"
        />
        <Heading size="md">Volta CRM</Heading>
      </Flex>
      {user && (
        <Flex align="center" gap={2}>
          <Avatar size="sm" name={user.name} src={user.avatarUrl} />
          <Box display={{ base: 'none', md: 'block' }} textAlign="left">
            <Text fontSize="sm" fontWeight="semibold">
              {user.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {user.role}
            </Text>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
