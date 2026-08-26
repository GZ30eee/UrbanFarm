import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, posts: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, postRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/community'),
        ]);
        setUsers(userRes.data.users);
        setStats({ users: userRes.data.users.length, posts: postRes.data.posts.length });
      } catch (error) {
        console.error('Failed to load admin data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>🛡️ Admin Dashboard</h2>
      <div className="admin-stats">
        <div className="stat-card">👥 Users: {stats.users}</div>
        <div className="stat-card">📝 Posts: {stats.posts}</div>
      </div>
      <h3>User List</h3>
      <ul>
        {users.map(u => (
          <li key={u._id}>{u.name} ({u.email}) - {u.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;