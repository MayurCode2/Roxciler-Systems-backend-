const express = require('express');
const app = express();
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const chartRoutes = require('./routes/chartRoutes');
const combinedRoutes = require('./routes/combinedRoutes');

app.use(express.json());
app.use(cors());

app.use('/transactions', transactionRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/chart', chartRoutes);
app.use('/combined', combinedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
