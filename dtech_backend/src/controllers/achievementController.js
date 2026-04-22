const achievementService = require('../services/achievementService');

exports.getAllAchievements = async (req, res) => {
  try {
    const results = await achievementService.getAllAchievements();
    res.json(results);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.getAchievementDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await achievementService.getAchievementDetail(id);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.createAchievement = async (req, res) => {
  try {
    const result = await achievementService.createAchievement(req.body);
    res.status(201).json({
      message: 'Achievement berhasil dibuat',
      id: result.id
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    await achievementService.updateAchievement(id, req.body);
    res.json({ message: 'Achievement berhasil diupdate' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.softDeleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    await achievementService.softDeleteAchievement(id);
    res.json({ message: 'Achievement berhasil di-soft delete' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.restoreAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    await achievementService.restoreAchievement(id);
    res.json({ message: 'Achievement berhasil direstore' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};