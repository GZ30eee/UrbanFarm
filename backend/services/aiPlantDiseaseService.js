const axios = require('axios');
const FormData = require('form-data');
const aiConfig = require('../config/aiConfig');

/**
 * Identify plant disease from an image URL using Plant.id API
 */
exports.identifyDisease = async (imageUrl) => {
  try {
    const form = new FormData();
    form.append('images', imageUrl);
    form.append('organs', 'leaf'); // Focus on leaf diseases

    const response = await axios.post(
      `${aiConfig.plantId.baseUrl}${aiConfig.plantId.endpoints.healthAssessment}`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Api-Key': aiConfig.plantId.apiKey,
        },
        timeout: 30000,
      }
    );

    const data = response.data;
    const suggestion = data.suggestions?.[0] || {};

    return {
      disease: suggestion.name || 'Unknown',
      confidence: suggestion.probability || 0,
      treatment: suggestion.treatment?.recommendation || 'No treatment information available.',
      description: suggestion.description || 'No description available.',
      scientificName: suggestion.scientific_name || '',
    };
  } catch (error) {
    console.error('Plant.id API error:', error.response?.data || error.message);

    // Fallback: return a generic response so the app doesn't break
    return {
      disease: 'Unable to identify (API error)',
      confidence: 0,
      treatment: 'Please consult a local plant expert or try again later.',
      description: 'The disease identification service is temporarily unavailable.',
    };
  }
};