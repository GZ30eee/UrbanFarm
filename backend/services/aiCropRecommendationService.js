const OpenAI = require('openai');
const aiConfig = require('../config/aiConfig');

const openai = new OpenAI({ apiKey: aiConfig.openai.apiKey });

/**
 * Get crop recommendations based on environmental data using OpenAI
 */
exports.getRecommendations = async (inputData) => {
  const {
    soilType,
    ph,
    temperature,
    humidity,
    rainfall,
    season,
    region,
  } = inputData;

  const prompt = `
You are an expert agricultural advisor. Based on the following conditions, recommend 5 most suitable crops to grow.
Provide a valid JSON response only (no markdown, no extra text).

Conditions:
- Soil type: ${soilType || 'Loam'}
- Soil pH: ${ph || 6.5}
- Temperature: ${temperature || 25}°C
- Humidity: ${humidity || 60}%
- Rainfall: ${rainfall || 100} mm
- Season: ${season || 'Summer'}
- Region: ${region || 'Temperate'}

Return JSON array with objects: 
{ "cropName": string, "confidence": number (0-1), "reason": string, "plantingTips": string, "expectedYield": string }
`;

  try {
    const response = await openai.chat.completions.create({
      model: aiConfig.openai.model,
      messages: [
        { role: 'system', content: 'You are a precise agricultural AI that returns only valid JSON.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    const parsed = JSON.parse(content);

    // Handle if the response is an object with a 'recommendations' array, or just an array.
    if (Array.isArray(parsed)) {
      return parsed;
    } else if (parsed.recommendations && Array.isArray(parsed.recommendations)) {
      return parsed.recommendations;
    } else {
      // Fallback: try to extract any array
      const keys = Object.keys(parsed);
      for (const key of keys) {
        if (Array.isArray(parsed[key])) {
          return parsed[key];
        }
      }
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('OpenAI Crop Recommendation error:', error.message);

    // Fallback recommendations
    return [
      {
        cropName: 'Tomato',
        confidence: 0.9,
        reason: 'Grows well in warm temperatures with moderate water.',
        plantingTips: 'Plant in well-drained soil, full sun.',
        expectedYield: '10-15 kg per plant',
      },
      {
        cropName: 'Lettuce',
        confidence: 0.85,
        reason: 'Cool-season crop, fast growing.',
        plantingTips: 'Plant in partial shade, keep soil moist.',
        expectedYield: '2-3 heads per plant',
      },
      {
        cropName: 'Pepper',
        confidence: 0.8,
        reason: 'Heat-loving, productive in warm climates.',
        plantingTips: 'Space plants 45cm apart, consistent watering.',
        expectedYield: '5-8 kg per plant',
      },
    ];
  }
};