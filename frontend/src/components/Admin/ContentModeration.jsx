import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNotification } from '../../hooks/useNotification';
import './ContentModeration.css';

const ContentModeration = () => {
  const [posts, setPosts] = useState([]);
  const { addNotification } = useNotification();

  useEffect(() => {
    loadFlaggedPosts();
  }, []);

  const loadFlaggedPosts = async () => {
    try {
      const res = await api.get('/admin/flagged-posts');
      setPosts(res.data.posts);
    } catch (error) {
      console.error('Failed to load flagged posts', error);
    }
  };

  const handleModerate = async (postId, action) => {
    try {
      await api.put(`/admin/posts/${postId}/moderate`, { isApproved: action === 'approve', isFlagged: action === 'flag' });
      addNotification('Post moderated', 'success');
      loadFlaggedPosts();
    } catch (error) {
      addNotification('Moderation failed', 'error');
    }
  };

  return (
    <div className="content-moderation">
      <h3>⚠️ Flagged Content</h3>
      {posts.length === 0 && <p>No flagged posts.</p>}
      {posts.map(p => (
        <div key={p._id} className="mod-item">
          <h4>{p.title}</h4>
          <p>{p.content}</p>
          <button className="btn-primary" onClick={() => handleModerate(p._id, 'approve')}>Approve</button>
          <button className="btn-danger" onClick={() => handleModerate(p._id, 'flag')}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ContentModeration;