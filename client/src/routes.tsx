import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import UserManagementPage from './pages/UserManagementPage';
import ProjectsPage from './pages/ProjectsPage';
import AccountsPayablePage from './pages/AccountsPayablePage';
import TechnicianTasksPage from './pages/TechnicianTasksPage';
import DashboardLayout from './components/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }
    >
      <Route index element={<Navigate to="projects" replace />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="accounts" element={<AccountsPayablePage />} />
      <Route path="users" element={<UserManagementPage />} />
      <Route path="technician" element={<TechnicianTasksPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
