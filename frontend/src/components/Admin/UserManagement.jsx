import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNotification } from '../../hooks/useNotification';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const { addNotification } = useNotification();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data.users);
    } catch (error) {
      console.error('Failed to load users', error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      addNotification('Role updated', 'success');
      loadUsers();
    } catch (error) {
      addNotification('Update failed', 'error');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      addNotification('User deleted', 'success');
      loadUsers();
    } catch (error) {
      addNotification('Delete failed', 'error');
    }
  };

  return (
    <div className="user-management">
      <h3>👥 Manage Users</h3>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} ({u.email}) - {u.role}
            <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button className="btn-danger" onClick={() => handleDelete(u._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;