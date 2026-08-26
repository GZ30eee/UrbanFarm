import React, { useState } from 'react';
import { addComment } from '../../services/plantService';
import { formatDate, getInitials } from '../../utils/helpers';
import { useNotification } from '../../hooks/useNotification';
import './PostCard.css';

const PostCard = ({ post, user, onLike }) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const { addNotification } = useNotification();

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const updated = await addComment(post._id, commentText);
      // In a real app, we would update the post in state; here we reload the page or fetch again.
      // For simplicity, we'll just refetch all posts via parent.
      window.location.reload(); // Ugly but works for demo
    } catch (error) {
      addNotification('Failed to add comment', 'error');
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">{getInitials(post.userId?.name)}</div>
        <div className="post-user">
          <span className="user-name">{post.userId?.name}</span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
        </div>
      </div>
      <h4 className="post-title">{post.title}</h4>
      <p className="post-content">{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
      <div className="post-actions">
        <button onClick={() => onLike(post._id)}>
          ❤️ {post.likes?.length || 0}
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          💬 {post.comments?.length || 0}
        </button>
      </div>
      {showComments && (
        <div className="post-comments">
          {post.comments?.map((c, idx) => (
            <div key={idx} className="comment">
              <strong>{c.userId?.name}:</strong> {c.content}
              <span className="comment-date">{formatDate(c.createdAt)}</span>
            </div>
          ))}
          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;