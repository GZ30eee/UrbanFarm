// Centralized AI service configuration
module.exports = {
  plantId: {
    apiKey: process.env.PLANT_ID_API_KEY,
    baseUrl: 'https://api.plant.id/v2',
    endpoints: {
      healthAssessment: '/health_assessment',
    },
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-3.5-turbo', // or 'gpt-4'
  },
  openweather: {
    apiKey: process.env.OPENWEATHER_API_KEY,
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  },
};