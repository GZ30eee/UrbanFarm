import React, { useState } from 'react';
import { createPost } from '../../services/plantService';
import { useNotification } from '../../hooks/useNotification';
import './PostForm.css';

const PostForm = ({ onClose }) => {
  const [formData, setFormData] = useState({ title: '', content: '', category: 'general' });
  const [image, setImage] = useState(null);
  const { addNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('category', formData.category);
    if (image) data.append('image', image);
    try {
      await createPost(data);
      addNotification('Post created!', 'success');
      onClose();
    } catch (error) {
      addNotification('Failed to create post', 'error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Share with Community</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea name="content" value={formData.content} onChange={handleChange} rows="4" required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="general">General</option>
              <option value="question">Question</option>
              <option value="tip">Tip</option>
              <option value="showcase">Showcase</option>
              <option value="event">Event</option>
            </select>
          </div>
          <div className="form-group">
            <label>Image (optional)</label>
            <input type="file" accept="image/*" onChange={handleFile} />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;