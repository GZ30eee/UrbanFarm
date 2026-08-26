import React, { useState, useEffect } from 'react';
import { addPlant, getGardens } from '../../services/plantService';
import { PLANT_STATUSES, SUNLIGHT_OPTIONS } from '../../utils/constants';
import { useNotification } from '../../hooks/useNotification';
import './PlantForm.css';

const PlantForm = ({ onClose, plant }) => {
  const [gardens, setGardens] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    gardenId: '',
    variety: '',
    plantingDate: '',
    status: 'seedling',
    waterFrequency: 3,
    sunlight: 'full',
    notes: '',
  });
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchGardens = async () => {
      try {
        const data = await getGardens();
        setGardens(data);
        if (data.length > 0 && !plant) {
          setFormData((prev) => ({ ...prev, gardenId: data[0]._id }));
        }
      } catch (error) {
        console.error('Failed to load gardens', error);
      }
    };
    fetchGardens();
    if (plant) {
      setFormData({
        name: plant.name,
        gardenId: plant.gardenId?._id || plant.gardenId,
        variety: plant.variety || '',
        plantingDate: plant.plantingDate?.slice(0,10) || '',
        status: plant.status || 'seedling',
        waterFrequency: plant.waterFrequency || 3,
        sunlight: plant.sunlight || 'full',
        notes: plant.notes || '',
      });
    }
  }, [plant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPlant(formData);
      addNotification('Plant added successfully!', 'success');
      onClose();
    } catch (error) {
      addNotification('Failed to add plant', 'error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{plant ? 'Edit Plant' : 'Add New Plant'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Garden</label>
            <select name="gardenId" value={formData.gardenId} onChange={handleChange} required>
              {gardens.map((g) => (
                <option key={g._id} value={g._id}>{g.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Variety</label>
            <input name="variety" value={formData.variety} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Planting Date</label>
            <input type="date" name="plantingDate" value={formData.plantingDate} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              {PLANT_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Water Frequency (days)</label>
            <input type="number" name="waterFrequency" value={formData.waterFrequency} onChange={handleChange} min="1" max="10" />
          </div>
          <div className="form-group">
            <label>Sunlight</label>
            <select name="sunlight" value={formData.sunlight} onChange={handleChange}>
              {SUNLIGHT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlantForm;