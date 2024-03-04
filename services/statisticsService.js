const axios = require('axios');

const getStatistics = async (month) => {
    try {
      const response = await axios.get(
        "https://s3.amazonaws.com/roxiler.com/product_transaction.json",
      );
      const transactions = response.data;
  
      // Filter transactions for the specified month
      const filteredTransactions = transactions.filter((transaction) => {
        const saleDate = new Date(transaction.dateOfSale);
        const saleMonth = saleDate.toLocaleString("default", { month: "long" });
        return saleMonth.toLowerCase() === month.toLowerCase();
      });
      const filtered = filteredTransactions.filter(transaction => transaction.sold);
      // Calculate statistics
      const totalSaleAmount = filtered.reduce(
        (total, transaction) => total + transaction.price,
        0,
      );
      const totalSoldItems = filteredTransactions.filter(
        (transaction) => transaction.sold,
      ).length;
      const totalNotSoldItems = filteredTransactions.filter(
        (transaction) => !transaction.sold,
      ).length;
  
      return {
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems,
      };
    } catch (error) {
      console.error("Error fetching or processing transactions:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };
module.exports = {
  getStatistics,
};
