import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { updateProfile } from '../../services/authService';
import { useNotification } from '../../hooks/useNotification';
import Badges from './Badges';
import { GARDENING_LEVELS } from '../../utils/constants';
import './Profile.css';

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location?.city || '',
    gardeningLevel: user?.gardeningLevel || 'beginner',
  });
  const { addNotification } = useNotification();
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProfile(formData);
      login(updated, localStorage.getItem('token')); // update context
      addNotification('Profile updated', 'success');
      setEditing(false);
    } catch (error) {
      addNotification('Update failed', 'error');
    }
  };

  return (
    <div className="profile-page">
      <h2>👤 My Profile</h2>
      {!editing ? (
        <div className="profile-view">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Location:</strong> {user?.location?.city || 'Not set'}</p>
          <p><strong>Gardening Level:</strong> {user?.gardeningLevel}</p>
          <button className="btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>City</label>
            <input name="location" value={formData.location} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Gardening Level</label>
            <select name="gardeningLevel" value={formData.gardeningLevel} onChange={handleChange}>
              {GARDENING_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      )}
      <Badges />
    </div>
  );
};

export default Profile;