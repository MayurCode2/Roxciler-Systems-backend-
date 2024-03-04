const combinedService = require('../services/combinedService');

const getCombinedData = async (req, res) => {
  try {
    const combinedData = await combinedService.getCombinedData(req.query.month);
    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCombinedData,
};
