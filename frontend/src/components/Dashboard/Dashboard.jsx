import React, { useState, useEffect } from 'react';
import { getGardens, getPlants, getTasks } from '../../services/plantService';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ gardens: 0, plants: 0, tasks: 0 });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gardens, plants, tasks] = await Promise.all([
          getGardens(),
          getPlants(),
          getTasks({ completed: 'false' }),
        ]);
        setStats({
          gardens: gardens.length,
          plants: plants.length,
          tasks: tasks.length,
        });
        // Recent activity: combine plants and tasks
        const recent = [
          ...plants.slice(0, 3).map((p) => ({ type: 'plant', text: `Added ${p.name}`, date: p.createdAt })),
          ...tasks.slice(0, 3).map((t) => ({ type: 'task', text: t.title, date: t.createdAt })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));
        setActivities(recent);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h1>🌱 Welcome back!</h1>
      <div className="stats-grid">
        <StatsCard title="Gardens" value={stats.gardens} icon="🌿" color="#b8a9c9" />
        <StatsCard title="Plants" value={stats.plants} icon="🌱" color="#a8d5ba" />
        <StatsCard title="Pending Tasks" value={stats.tasks} icon="📋" color="#f0d5c0" />
      </div>
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;