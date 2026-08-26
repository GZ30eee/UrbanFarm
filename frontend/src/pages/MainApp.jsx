import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Dashboard from '../components/Dashboard/Dashboard';
import GrowthTracker from '../components/GrowthTracker/GrowthTracker';
import DiagnoseTab from '../components/Diagnose/DiagnoseTab';
import CropRecommendation from '../components/CropRecommendation/CropRecommendation';
import WateringTab from '../components/Watering/WateringTab';
import ScheduleTab from '../components/Schedule/ScheduleTab';
import CommunityTab from '../components/Community/CommunityTab';
import Profile from '../components/Profile/Profile';

const MainApp = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gardens" element={<GrowthTracker />} />
        <Route path="/plants" element={<GrowthTracker />} />
        <Route path="/diagnose" element={<DiagnoseTab />} />
        <Route path="/crops" element={<CropRecommendation />} />
        <Route path="/watering" element={<WateringTab />} />
        <Route path="/schedule" element={<ScheduleTab />} />
        <Route path="/community" element={<CommunityTab />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
};

export default MainApp;