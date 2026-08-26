import React, { useState } from 'react';
import { getCropRecommendations } from '../../services/plantService';
import { useNotification } from '../../hooks/useNotification';
import CropCard from './CropCard';
import './CropRecommendation.css';

const CropRecommendation = () => {
  const [inputs, setInputs] = useState({
    soilType: 'Loam',
    ph: 6.5,
    temperature: 25,
    humidity: 60,
    rainfall: 100,
    season: 'Summer',
    region: 'Temperate',
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getCropRecommendations(inputs);
      setRecommendations(data.recommendations || []);
      addNotification('Recommendations ready', 'success');
    } catch (error) {
      addNotification('Failed to get recommendations', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crop-recommendation">
      <h2>🌾 AI Crop Recommendations</h2>
      <p>Enter your environmental conditions to get crop suggestions.</p>
      <form onSubmit={handleSubmit} className="crop-form">
        <div className="form-row">
          <div className="form-group">
            <label>Soil Type</label>
            <input name="soilType" value={inputs.soilType} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>pH</label>
            <input name="ph" type="number" step="0.1" value={inputs.ph} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Temperature (°C)</label>
            <input name="temperature" type="number" value={inputs.temperature} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Humidity (%)</label>
            <input name="humidity" type="number" value={inputs.humidity} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Rainfall (mm)</label>
            <input name="rainfall" type="number" value={inputs.rainfall} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Season</label>
            <input name="season" value={inputs.season} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label>Region</label>
          <input name="region" value={inputs.region} onChange={handleChange} />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Thinking...' : 'Get Recommendations'}
        </button>
      </form>

      {recommendations.length > 0 && (
        <div className="crop-grid">
          {recommendations.map((crop, idx) => (
            <CropCard key={idx} crop={crop} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;