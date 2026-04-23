const express = require('express');
const router = express.Router();

const achievementController = require('../controllers/achievementController');
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/upload');

router.get('/achievements', achievementController.getAllAchievements);
router.get('/achievements/:id', achievementController.getAchievementDetail);
router.post('/achievements', achievementController.createAchievement);
router.put('/achievements/:id', achievementController.updateAchievement);
router.delete('/achievements/:id', achievementController.softDeleteAchievement);
router.post('/uploads/image', upload.single('image'), uploadController.uploadImage);

module.exports = router;
