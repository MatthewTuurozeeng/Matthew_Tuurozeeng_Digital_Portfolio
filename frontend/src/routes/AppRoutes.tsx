import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Projects from '../pages/Projects';
import Impact from '../pages/Impact';
import Contact from '../pages/Contact';
import CV from '../pages/CV';


// Admin pages
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import ManageProjects from '../pages/admin/ManageProjects';
import ManageImpact from '../pages/admin/ManageImpact';
import ManageProfile from '../pages/admin/ManageProfile';
import ManageContacts from '../pages/admin/ManageContacts';

// Protected Route
import ProtectedRoute from '../utils/ProtectedRoutes';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/contact" element={<Contact />} />
       <Route path="/cv" element={<CV />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <ManageProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/impact"
        element={
          <ProtectedRoute>
            <ManageImpact />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <ManageProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/contacts"
        element={
          <ProtectedRoute>
            <ManageContacts />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;