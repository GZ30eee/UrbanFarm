import React from 'react';
import './CropCard.css';

const CropCard = ({ crop }) => {
  return (
    <div className="crop-card">
      <h4>{crop.cropName}</h4>
      <div className="crop-confidence">
        Confidence: {Math.round(crop.confidence * 100)}%
      </div>
      <p className="crop-reason">{crop.reason}</p>
      <div className="crop-tips">
        <strong>Tips:</strong> {crop.plantingTips}
      </div>
      <div className="crop-yield">
        <strong>Expected yield:</strong> {crop.expectedYield}
      </div>
    </div>
  );
};

export default CropCard;