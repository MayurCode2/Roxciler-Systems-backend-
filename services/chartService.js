const axios = require('axios');

const getChartData = async (month) => {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    let transactions = response.data;

    // Filter transactions by month
    transactions = transactions.filter(transaction => {
      const saleDate = new Date(transaction.dateOfSale);
      const saleMonth = saleDate.toLocaleString('default', { month: 'long' });
      return saleMonth.toLowerCase() === month.toLowerCase();
    });

    // Categorize transactions by price ranges
    const priceRanges = [
      { range: '0 - 100', count: 0 },
      { range: '101 - 200', count: 0 },
      { range: '201 - 300', count: 0 },
      { range: '301 - 400', count: 0 },
      { range: '401 - 500', count: 0 },
      { range: '501 - 600', count: 0 },
      { range: '601 - 700', count: 0 },
      { range: '701 - 800', count: 0 },
      { range: '801 - 900', count: 0 },
      { range: '901 - above', count: 0 },
    ];

    transactions.forEach(transaction => {
      const price = transaction.price;
      if (price <= 100) {
        priceRanges[0].count++;
      } else if (price <= 200) {
        priceRanges[1].count++;
      } else if (price <= 300) {
        priceRanges[2].count++;
      } else if (price <= 400) {
        priceRanges[3].count++;
      } else if (price <= 500) {
        priceRanges[4].count++;
      } else if (price <= 600) {
        priceRanges[5].count++;
      } else if (price <= 700) {
        priceRanges[6].count++;
      } else if (price <= 800) {
        priceRanges[7].count++;
      } else if (price <= 900) {
        priceRanges[8].count++;
      } else {
        priceRanges[9].count++;
      }
    });

    return priceRanges;
};


const getPieChart = async (month) => {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    let transactions = response.data;

    // Filter transactions by month
    transactions = transactions.filter(transaction => {
      const saleDate = new Date(transaction.dateOfSale);
      const saleMonth = saleDate.toLocaleString('default', { month: 'long' });
      return saleMonth.toLowerCase() === month.toLowerCase();
    });

    // Count items by category
    const categories = {};
    transactions.forEach(transaction => {
      const category = transaction.category;
      if (!categories[category]) {
        categories[category] = 0;
      }
      categories[category]++;
    });

    // Convert categories object to array
    const categoriesArray = Object.entries(categories).map(([category, count]) => ({ category, count }));

    return categoriesArray;
}
module.exports = {
  getChartData,
  getPieChart
};
