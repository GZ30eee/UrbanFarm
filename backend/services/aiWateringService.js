const axios = require('axios');
const aiConfig = require('../config/aiConfig');

/**
 * Generate a watering schedule based on plant type, weather, and soil
 * Uses OpenAI for intelligent recommendations, with a fallback rule-based system.
 */
exports.generateSchedule = async (plant, weatherData) => {
  // 1. Rule-based fallback (works without OpenAI API)
  const ruleBasedSchedule = generateRuleBasedSchedule(plant, weatherData);

  // 2. Try to enhance with OpenAI if available
  try {
    const openai = require('openai');
    const openaiClient = new openai.OpenAI({ apiKey: aiConfig.openai.apiKey });

    const prompt = `
You are a smart irrigation expert. Generate a watering schedule for a ${plant.name} plant.

Plant details:
- Type: ${plant.name}
- Sunlight: ${plant.sunlight || 'full'}
- Current status: ${plant.status || 'growing'}
- Water frequency baseline: every ${plant.waterFrequency || 3} days

Weather (forecast for next 7 days):
${JSON.stringify(weatherData, null, 2)}

Return a JSON array of watering events for the next 7 days.
Each event: { "date": "YYYY-MM-DD", "amount": "500ml", "timeOfDay": "morning", "notes": "reason" }
`;

    const response = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a precise agricultural AI. Return only valid JSON array.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 600,
    });

    const content = response.choices[0].message.content;
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return ruleBasedSchedule;
  } catch (error) {
    console.warn('OpenAI watering fallback to rule-based:', error.message);
    return ruleBasedSchedule;
  }
};

/**
 * Simple rule-based watering schedule generator
 */
function generateRuleBasedSchedule(plant, weatherData) {
  const schedule = [];
  const baseInterval = plant.waterFrequency || 3;
  const today = new Date();

  // Adjust based on temperature (if weatherData is available)
  let tempAdjustment = 0;
  if (weatherData && weatherData.list && weatherData.list.length > 0) {
    const avgTemp = weatherData.list.reduce((acc, d) => acc + d.main.temp, 0) / weatherData.list.length;
    if (avgTemp > 30) tempAdjustment = -1; // water more often
    else if (avgTemp < 15) tempAdjustment = 1; // water less often
  }

  const interval = Math.max(1, baseInterval + tempAdjustment);

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    if (i % interval === 0) {
      schedule.push({
        date: date.toISOString().split('T')[0],
        amount: plant.size === 'large' ? '1L' : '500ml',
        timeOfDay: i % 2 === 0 ? 'morning' : 'evening',
        notes: tempAdjustment < 0 ? 'Hot weather – extra water' : 'Normal watering',
      });
    }
  }
  return schedule;
}