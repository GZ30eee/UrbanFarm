import React, { useState, useEffect } from 'react';
import { getCommunityPosts, createPost, toggleLike } from '../../services/plantService';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
import PostCard from './PostCard';
import PostForm from './PostForm';
import './CommunityTab.css';

const CommunityTab = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const { addNotification } = useNotification();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getCommunityPosts();
      setPosts(data);
    } catch (error) {
      console.error('Failed to load posts', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const updated = await toggleLike(postId);
      setPosts(posts.map(p => p._id === postId ? { ...p, likes: updated.likes, liked: updated.liked } : p));
    } catch (error) {
      addNotification('Failed to like', 'error');
    }
  };

  return (
    <div className="community-tab">
      <div className="community-header">
        <h2>👥 Community</h2>
        <button className="btn-primary" onClick={() => setShowForm(true)}>+ Share</button>
      </div>
      {posts.map(post => (
        <PostCard key={post._id} post={post} user={user} onLike={handleLike} />
      ))}
      {showForm && <PostForm onClose={() => { setShowForm(false); loadPosts(); }} />}
    </div>
  );
};

export default CommunityTab;