const express = require('express');
const { getAllHouses, getHouseById } = require('../controllers/houseController');

const router = express.Router();

// Get all houses
router.get('/', getAllHouses);

// Get house by ID
router.get('/:id', getHouseById);

module.exports = router;
