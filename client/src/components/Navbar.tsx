import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import UserAvatar from "./UserAvatar";

const Navbar: React.FC = () => (
  <Flex
    position="sticky"
    top={0}
    zIndex={50}
    px={4}
    py={2}
    bg="white"
    justify="space-between"
    align="center"
    boxShadow="sm"
  >
    <Heading size="md">Volta CRM</Heading>

    <UserAvatar />
  </Flex>
);

export default Navbar;
