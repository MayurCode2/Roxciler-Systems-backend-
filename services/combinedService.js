const axios = require('axios');
const transactionService = require('./transactionService');
const statisticsService = require('./statisticsService');
const chartService = require('./chartService');
const piechartService = require('./chartService');

const getCombinedData = async (month) => {
  try {
    // Fetch data from each API asynchronously
    const [transactions, statistics, chartData,piechart] = await Promise.all([
      transactionService.getAllTransactions({ month }),
      statisticsService.getStatistics(month),
      chartService.getChartData(month),
      piechartService.getPieChart(month),
    ]);

    // Combine the responses
    const combinedData = {
      transactions,
      statistics,
      chartData,
       piechart
       
    };

    return combinedData;
  } catch (error) {
    throw new Error(`Error while fetching combined data: ${error.message}`);
  }
};

module.exports = {
  getCombinedData,
};
