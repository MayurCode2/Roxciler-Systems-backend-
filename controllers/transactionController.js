const transactionService = require('../services/transactionService');

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions(req.query);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTransactions,
};
