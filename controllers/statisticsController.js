const statisticsService = require('../services/statisticsService');

const getStatistics = async (req, res) => {
  try {
    const statistics = await statisticsService.getStatistics(req.query.month);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStatistics,
};
