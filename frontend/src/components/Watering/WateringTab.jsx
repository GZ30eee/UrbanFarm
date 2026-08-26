import React, { useState, useEffect } from 'react';
import { getPlants, generateWateringSchedule, getWateringSchedules } from '../../services/plantService';
import { useNotification } from '../../hooks/useNotification';
import WateringSchedule from './WateringSchedule';
import './WateringTab.css';

const WateringTab = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const data = await getPlants();
      setPlants(data);
      if (data.length > 0) setSelectedPlant(data[0]);
    } catch (error) {
      console.error('Failed to load plants', error);
    }
  };

  const handleGenerate = async () => {
    if (!selectedPlant) return;
    setLoading(true);
    try {
      const sched = await generateWateringSchedule(selectedPlant._id);
      setSchedule(sched);
      addNotification('Watering schedule generated', 'success');
    } catch (error) {
      addNotification('Failed to generate schedule', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="watering-tab">
      <h2>💧 Smart Watering</h2>
      <div className="plant-selector">
        <label>Select Plant:</label>
        <select value={selectedPlant?._id || ''} onChange={(e) => {
          const plant = plants.find(p => p._id === e.target.value);
          setSelectedPlant(plant);
          setSchedule(null);
        }}>
          {plants.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
        <button className="btn-primary" onClick={handleGenerate} disabled={!selectedPlant || loading}>
          {loading ? 'Generating...' : 'Generate Schedule'}
        </button>
      </div>
      {schedule && <WateringSchedule schedule={schedule} />}
    </div>
  );
};

export default WateringTab;