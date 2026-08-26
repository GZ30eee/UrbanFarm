const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const gardenRoutes = require('./gardenRoutes');
const plantRoutes = require('./plantRoutes');
const diseaseRoutes = require('./diseaseRoutes');
const cropRoutes = require('./cropRoutes');
const wateringRoutes = require('./wateringRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const communityRoutes = require('./communityRoutes');
const adminRoutes = require('./adminRoutes');
const uploadRoutes = require('./uploadRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/gardens', gardenRoutes);
router.use('/plants', plantRoutes);
router.use('/disease', diseaseRoutes);
router.use('/crops', cropRoutes);
router.use('/watering', wateringRoutes);
router.use('/schedule', scheduleRoutes);
router.use('/community', communityRoutes);
router.use('/admin', adminRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;