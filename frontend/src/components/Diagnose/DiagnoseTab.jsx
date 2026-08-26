import React, { useState } from 'react';
import { diagnosePlant } from '../../services/plantService';
import { useNotification } from '../../hooks/useNotification';
import DiseaseResult from './DiseaseResult';
import './DiagnoseTab.css';

const DiagnoseTab = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    try {
      const diagnosis = await diagnosePlant(formData);
      setResult(diagnosis);
      addNotification('Diagnosis complete', 'success');
    } catch (error) {
      addNotification('Diagnosis failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diagnose-tab">
      <h2>🔬 Plant Disease Diagnosis</h2>
      <p>Upload a photo of your plant's leaf to detect diseases.</p>
      <form onSubmit={handleSubmit}>
        <div className="upload-area">
          {preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <label className="upload-label">
              <span>📸 Click to upload</span>
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
          )}
        </div>
        <button type="submit" className="btn-primary" disabled={!image || loading}>
          {loading ? 'Analyzing...' : 'Diagnose'}
        </button>
      </form>
      {result && <DiseaseResult result={result} />}
    </div>
  );
};

export default DiagnoseTab;