import React from 'react';
import { getConfidenceEmoji } from '../../utils/helpers';
import './DiseaseResult.css';

const DiseaseResult = ({ result }) => {
  return (
    <div className="disease-result">
      <h3>Diagnosis Result</h3>
      <div className="result-detail">
        <span className="label">Disease:</span>
        <span className="value">{result.disease}</span>
      </div>
      <div className="result-detail">
        <span className="label">Confidence:</span>
        <span className="value">{Math.round(result.confidence * 100)}% {getConfidenceEmoji(result.confidence)}</span>
      </div>
      {result.treatment && (
        <div className="result-detail">
          <span className="label">Treatment:</span>
          <span className="value">{result.treatment}</span>
        </div>
      )}
      {result.description && (
        <div className="result-detail">
          <span className="label">Description:</span>
          <span className="value">{result.description}</span>
        </div>
      )}
    </div>
  );
};

export default DiseaseResult;