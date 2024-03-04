const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartController');

router.get('/', chartController.getChart);
router.get("/piechart", chartController.getPieChart);

module.exports = router;
