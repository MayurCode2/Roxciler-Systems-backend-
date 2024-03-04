const chartService = require('../services/chartService');

const getChart = async (req, res) => {
  try {
    const chartData = await chartService.getChartData(req.query.month);
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPieChart = async (req, res) => {
  try {
    const pieChartData = await chartService.getPieChart(req.query.month);
    res.json(pieChartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getChart,
    getPieChart,
};


