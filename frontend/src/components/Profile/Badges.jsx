import React, { useState, useEffect } from 'react';
import { getBadges } from '../../services/authService';
import './Badges.css';

const Badges = () => {
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const loadBadges = async () => {
      try {
        const data = await getBadges();
        setBadges(data);
      } catch (error) {
        console.error('Failed to load badges', error);
      }
    };
    loadBadges();
  }, []);

  return (
    <div className="badges-section">
      <h3>🏅 Badges</h3>
      {badges.length === 0 ? (
        <p>No badges yet. Keep farming!</p>
      ) : (
        <div className="badges-grid">
          {badges.map((b, idx) => (
            <div key={idx} className="badge-item">⭐ {b}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Badges;