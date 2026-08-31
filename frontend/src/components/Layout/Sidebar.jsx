import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  // Hide the regular sidebar completely for admin users
  if (user?.role === 'admin') {
    return null;
  }

  const links = [
    { to: '/app/dashboard', icon: '📊', label: 'Dashboard' },
    { to: '/app/gardens', icon: '🌿', label: 'Gardens' },
    { to: '/app/plants', icon: '🌱', label: 'Plants' },
    { to: '/app/diagnose', icon: '🔬', label: 'Diagnose' },
    { to: '/app/crops', icon: '🌾', label: 'Crop AI' },
    { to: '/app/watering', icon: '💧', label: 'Watering' },
    { to: '/app/schedule', icon: '📅', label: 'Schedule' },
    { to: '/app/community', icon: '👥', label: 'Community' },
    { to: '/app/profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <aside className="sidebar">
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <span className="icon">{link.icon}</span>
              <span className="label">{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;