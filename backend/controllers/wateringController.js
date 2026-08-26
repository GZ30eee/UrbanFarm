const WateringSchedule = require('../models/WateringSchedule');
const Plant = require('../models/Plant');
const { getForecast } = require('../services/weatherService');
const { generateSchedule } = require('../services/aiWateringService');

// @desc    Generate watering schedule for a plant
// @route   POST /api/watering/generate
exports.generateWateringSchedule = async (req, res, next) => {
  try {
    const { plantId } = req.body;

    const plant = await Plant.findOne({ _id: plantId, userId: req.user.id });
    if (!plant) {
      return res.status(404).json({ success: false, message: 'Plant not found' });
    }

    // Get user location (from user profile)
    const user = req.user;
    const city = user.location?.city || 'London';

    // Fetch weather forecast
    let weatherData = null;
    try {
      weatherData = await getForecast(city);
    } catch (err) {
      console.warn('Weather fetch failed, using fallback');
    }

    // Generate schedule using AI service
    const scheduleEvents = await generateSchedule(plant, weatherData);

    // Save schedule to database
    const wateringSchedule = await WateringSchedule.create({
      userId: req.user.id,
      plantId: plant._id,
      schedule: scheduleEvents,
      weatherAdjusted: !!weatherData,
      nextWateringDate: scheduleEvents.length > 0 ? new Date(scheduleEvents[0].date) : null,
    });

    res.status(201).json({
      success: true,
      schedule: wateringSchedule,
      events: scheduleEvents,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get watering schedule for a plant
// @route   GET /api/watering/plant/:plantId
exports.getPlantWateringSchedule = async (req, res, next) => {
  try {
    const schedule = await WateringSchedule.findOne({
      plantId: req.params.plantId,
      userId: req.user.id,
      isActive: true,
    });
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'No schedule found for this plant' });
    }
    res.status(200).json({ success: true, schedule });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all watering schedules for user
// @route   GET /api/watering/all
exports.getAllWateringSchedules = async (req, res, next) => {
  try {
    const schedules = await WateringSchedule.find({ userId: req.user.id, isActive: true })
      .populate('plantId', 'name imageUrl');
    res.status(200).json({ success: true, schedules });
  } catch (error) {
    next(error);
  }
};

// @desc    Update watering schedule (mark completed, etc.)
// @route   PUT /api/watering/:scheduleId
exports.updateSchedule = async (req, res, next) => {
  try {
    const schedule = await WateringSchedule.findOneAndUpdate(
      { _id: req.params.scheduleId, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }
    res.status(200).json({ success: true, schedule });
  } catch (error) {
    next(error);
  }
};