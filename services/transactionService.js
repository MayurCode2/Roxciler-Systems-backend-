const axios = require('axios');

const getAllTransactions = async (queryParams, includeSold = false) => {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    let transactions = response.data;

    // Filter transactions by month if month parameter is provided
    if (queryParams.month) {
        transactions = transactions.filter(transaction => {
            const saleDate = new Date(transaction.dateOfSale);
            const saleMonth = saleDate.toLocaleString('default', { month: 'long' });
            return saleMonth.toLowerCase() === queryParams.month.toLowerCase();
        });
    }

    // Apply search filter if search parameter is provided
    if (queryParams.search) {
        const searchQuery = queryParams.search.toLowerCase();
        transactions = transactions.filter(transaction =>
            transaction.title.toLowerCase().includes(searchQuery) ||
            transaction.description.toLowerCase().includes(searchQuery) ||
            transaction.price.toString().includes(searchQuery)
        );
    }

    // Filter out sold items if includeSold is false
   

    // Apply pagination
    const page = parseInt(queryParams.page) || 1;
    const perPage = parseInt(queryParams.perPage) || 10;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedTransactions = transactions.slice(startIndex, endIndex);

    // Calculate statistics
    const totalSaleAmount = transactions.reduce((total, transaction) => total + transaction.price, 0);
    const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
    const totalNotSoldItems = transactions.filter(transaction => !transaction.sold).length;

    return {
        paginatedTransactions,
        statistics: {
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        }
    };
};

module.exports = {
    getAllTransactions,
};
