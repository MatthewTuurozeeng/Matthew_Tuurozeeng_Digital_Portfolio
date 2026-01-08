import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className="sidebar"
      style={{
        width: '250px',
        height: '100vh',
        backgroundColor: '#994545',
        color: 'white',
        position: 'fixed',
        left: 0,
        top: 0,
        overflowY: 'auto',
      }}
    >
      <div className="p-4">
        <h4 className="mb-4">Admin Dashboard</h4>
        <p className="small mb-4">Welcome, {user?.email}</p>
      </div>

      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/admin/dashboard"
          className={`text-white px-4 py-3 ${isActive('/admin/dashboard') ? 'bg-dark' : ''}`}
          style={{ borderLeft: isActive('/admin/dashboard') ? '4px solid #F5C9AE' : 'none' }}
        >
          📊 Dashboard
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/projects"
          className={`text-white px-4 py-3 ${isActive('/admin/projects') ? 'bg-dark' : ''}`}
          style={{ borderLeft: isActive('/admin/projects') ? '4px solid #F5C9AE' : 'none' }}
        >
          💼 Projects
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/impact"
          className={`text-white px-4 py-3 ${isActive('/admin/impact') ? 'bg-dark' : ''}`}
          style={{ borderLeft: isActive('/admin/impact') ? '4px solid #F5C9AE' : 'none' }}
        >
          🌟 Impact
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/profile"
          className={`text-white px-4 py-3 ${isActive('/admin/profile') ? 'bg-dark' : ''}`}
          style={{ borderLeft: isActive('/admin/profile') ? '4px solid #F5C9AE' : 'none' }}
        >
          👤 Profile
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/contacts"
          className={`text-white px-4 py-3 ${isActive('/admin/contacts') ? 'bg-dark' : ''}`}
          style={{ borderLeft: isActive('/admin/contacts') ? '4px solid #F5C9AE' : 'none' }}
        >
          📧 Contacts
        </Nav.Link>
      </Nav>

      <div className="px-4 py-3" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Nav.Link as={Link} to="/" className="text-white mb-2">
          🏠 View Site
        </Nav.Link>
        <button
          onClick={logout}
          className="btn btn-outline-light w-100"
          style={{ fontSize: '0.9rem' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;