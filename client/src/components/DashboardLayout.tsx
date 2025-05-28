import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout: React.FC = () => (
  <Box h="100vh" overflow="hidden" display="flex">
    <Sidebar />
    <Box as="main" flex="1" overflowY="auto">
      <Navbar />

      <Box px={{ base: 4, md: 8 }} py={6}>
        <Outlet />
      </Box>
    </Box>
  </Box>
);

export default DashboardLayout;
