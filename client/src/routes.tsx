import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserManagementPage from "./pages/UserManagementPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AccountsPayablePage from "./pages/AccountsPayablePage";
import TechnicianTasksPage from "./pages/TechnicianTasksPage";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import ProductTemplatesPage from "./pages/ProductTemplatesPage";
// MapDashboard functionality is now merged into ProjectDashboard
import TechnicianDashboard from "./pages/TechnicianDashboard"; // Import the Technician Dashboard
import ProjectDashboard from "./pages/ProjectDashboard"; // Import the Project Dashboard

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }
    >
      <Route index element={<Navigate to="projects" replace />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="projects/:projectId" element={<ProjectDetailPage />} />
      <Route path="accounts" element={<AccountsPayablePage />} />
      <Route path="users" element={<UserManagementPage />} />
      <Route path="technician" element={<TechnicianTasksPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="product-templates" element={<ProductTemplatesPage />} />
      {/* Map dashboard merged into project-locations */}
      <Route path="technicians" element={<TechnicianDashboard />} />
      {/* Technician dashboard route */}
      <Route path="project-locations" element={<ProjectDashboard />} />
      {/* Project locations dashboard for visualizing project locations on a map */}
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
