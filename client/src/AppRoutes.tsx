import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserManagementPage from "./pages/UserManagementPage";
import ProjectsPage from "./pages/ProjectsPage";
import AccountsPayablePage from "./pages/AccountsPayablePage";
import TechnicianTasksPage from "./pages/TechnicianTasksPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard/*" element={<PrivateRoute />}> 
      <Route index element={<Dashboard />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="teams" element={<UserManagementPage />} />
      <Route path="settings" element={<AccountsPayablePage />} />
      <Route path="technician" element={<TechnicianTasksPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
